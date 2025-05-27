import * as Prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/FormatDate";

type TagPageProps = {
  params: { tag: string };
};

export default async function RelatedPosts({ params }: TagPageProps) {
  const client = createClient();
  const { tag } = params;

  if (!tag) return null;

  const relatedPosts = await client.getByType("blog_post", {
    predicates: [Prismic.filter.at("document.tags", [tag])],
    orderings: [
      { field: "document.first_publication_date", direction: "desc" },
    ],
    pageSize: 3,
  });

  if (!relatedPosts.results.length) return null;

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-black-50 dark:text-white">
        Related Posts
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {relatedPosts.results.map((post) => {
          const formattedDate = formatDate(post.data.date);

          const firstParagraph =
            post.data.slices
              .find((slice) => {
                return (
                  slice.slice_type === "text_block" &&
                  Array.isArray((slice as any).primary?.text) &&
                  (slice as any).primary.text.some(
                    (block: any) => block.type === "paragraph",
                  )
                );
              })
              ?.primary?.text.find((block: any) => block.type === "paragraph")
              ?.text || "";

          return (
            <Link
              key={post.id}
              href={`/blog/${post.uid}`}
              className="group overflow-hidden rounded-xl border border-zinc-400 bg-white/20 shadow-xl backdrop-blur-sm transition-transform hover:-translate-y-1 dark:border-slate-800 dark:bg-blue-850/50"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={post.data.hover_image?.url || ""}
                  alt={post.data.title || "Blog Post"}
                  fill
                  className="object-fill transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="mb-2 text-xs text-black/80 dark:text-gray-400">
                  {formattedDate}
                </p>
                <h3 className="mb-2 font-bold transition-colors group-hover:text-black/50 dark:text-white dark:group-hover:text-purple-400">
                  {post.data.title}
                </h3>
                <p className="line-clamp-3 text-sm text-black/80 dark:text-gray-400">
                  {post.data.excerpt || firstParagraph}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
