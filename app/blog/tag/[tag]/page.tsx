import * as Prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import Image from "next/image";
import { formatDate } from "@/utils/FormatDate";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Tag } from "lucide-react";
import Heading from "@/components/Heading";

type TagPageProps = {
  params: { tag: string };
};

export default async function TagPage({ params }: TagPageProps) {
  const client = createClient();
  const decodedTag = decodeURIComponent(params.tag);

  // Fetch posts with the specified tag
  const posts = await client
    .getAllByType("blog_post", {
      predicates: [Prismic.filter.at("document.tags", [decodedTag])],
    })
    .catch(() => []);

  return (
    <Bounded className="">
      <div className="relative z-20 w-full py-6 md:py-10">
        <Link
          href="/blog"
          className="mb-4 inline-flex items-center text-sm text-indigo-400 transition-colors hover:text-indigo-300"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to all blogs
        </Link>
      </div>

      {/* Header */}
      <div className="pb-8 pt-5 md:pt-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full bg-indigo-900/20 px-4 py-2 text-indigo-300">
            <Tag className="h-4 w-4" />
            <span className="text-sm font-medium">Tag</span>
          </div>
          <Heading as="h1" size="sm" className="mb-4 text-white">
            #{decodedTag}
          </Heading>
          <p className="mx-auto max-w-2xl text-2xl text-slate-400">
            Articles tagged with &quot;{decodedTag}&quot;
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="mt-5 md:mt-10">
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              // Extract the first paragraph text from slices for excerpt
              const firstParagraph =
                post.data.slices.find(
                  (slice) =>
                    slice.slice_type === "text_block" &&
                    slice.primary?.text &&
                    slice.primary.text[0]?.type === "paragraph",
                )?.primary?.text[0]?.text || "No description available.";

              const formattedDate = formatDate(post.data.date);

              return (
                <article
                  key={post.id}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-800 bg-slate-950/50 transition-all hover:border-slate-700 hover:bg-slate-900/50"
                >
                  <Link href={`/blog/${post.uid}`} className="overflow-hidden">
                    <Image
                      src={post.data.hover_image?.url || ""}
                      alt={post.data.title || ""}
                      width={600}
                      height={340}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-grow flex-col p-6">
                    <div className="mb-4 flex gap-2">
                      {post.tags.slice(0, 5).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-indigo-900/20 text-indigo-300 hover:bg-indigo-900/30"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <Link
                      href={`/blog/${post.uid}`}
                      className="group-hover:text-blue-300"
                    >
                      <h2 className="mb-2 line-clamp-2 text-xl font-bold text-white transition-colors">
                        {post.data.title}
                      </h2>
                    </Link>
                    <p className="mb-4 line-clamp-3 text-sm text-slate-400">
                      {firstParagraph}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <time className="text-xs text-slate-500">
                        {formattedDate}
                      </time>
                      <Link
                        href={`/blog/${post.uid}`}
                        className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-800">
              <Tag className="h-8 w-8 text-slate-400" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-white">
              No posts found
            </h2>
            <p className="mx-auto mb-8 max-w-md text-slate-400">
              There are no posts with the tag #{decodedTag}. Try checking out
              other tags or browse all posts.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Browse all posts
            </Link>
          </div>
        )}
      </div>
    </Bounded>
  );
}
