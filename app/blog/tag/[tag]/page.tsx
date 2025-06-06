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
  const allPosts = await client.getAllByType("blog_post", { pageSize: 100 });
  const posts = allPosts.filter((post) =>
    post.tags.some((tag) => tag.toLowerCase() === decodedTag.toLowerCase()),
  );

  return (
    <Bounded className="">
      <div className="relative z-20 w-full py-6 md:py-10">
        <Link
          href="/blog"
          className="mb-4 inline-flex items-center text-sm transition-colors hover:text-black/50 dark:text-purple-400 dark:hover:text-purple-300"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to all blogs
        </Link>
      </div>

      {/* Header */}
      <div className="pb-8 pt-5 md:pt-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full bg-black/50 px-4 py-2 text-white dark:bg-purple-900/20 dark:text-purple-300">
            <Tag className="h-4 w-4" />
            <span className="text-sm font-medium">Tag</span>
          </div>
          <Heading
            as="h1"
            size="sm"
            className="mb-4 text-black-50 dark:text-white"
          >
            #{decodedTag}
          </Heading>
          <p className="mx-auto max-w-2xl text-2xl text-black/50 dark:text-slate-400">
            Articles tagged with &quot;{decodedTag}&quot;
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="mt-5 md:mt-10">
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
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
                  ?.primary?.text.find(
                    (block: any) => block.type === "paragraph",
                  )?.text || "No description available.";

              const formattedDate = formatDate(post.data.date);

              return (
                <article
                  key={post.id}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-zinc-400 bg-white/20 transition-all hover:border-slate-700 hover:bg-white-50 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:bg-slate-900/50"
                >
                  <Link href={`/blog/${post.uid}`} className="overflow-hidden">
                    <Image
                      src={post.data.hover_image?.url || ""}
                      alt={post.data.title || ""}
                      width={600}
                      height={340}
                      className="max-h-48 w-full object-fill transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-grow flex-col p-6">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-black-50 text-white-50 hover:bg-black/50 dark:bg-violet-900/20 dark:text-violet-300 dark:hover:bg-violet-900/30"
                        >
                          #{tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500 dark:bg-violet-800/20 dark:text-gray-400">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/blog/${post.uid}`}
                      className="group-hover:text-blue-300"
                    >
                      <h2 className="mb-2 line-clamp-2 text-xl font-bold text-black-50 transition-colors dark:text-white">
                        {post.data.title}
                      </h2>
                    </Link>
                    <p className="mb-4 line-clamp-3 text-sm text-black/80 dark:text-slate-400">
                      {firstParagraph}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <time className="text-xs text-slate-500">
                        {formattedDate}
                      </time>
                      <Link
                        href={`/blog/${post.uid}`}
                        className="text-sm font-medium transition-colors hover:text-black/50 dark:text-purple-400 dark:hover:text-purple-300"
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
            <h2 className="mb-2 text-2xl font-bold text-black dark:text-white">
              No posts found
            </h2>
            <p className="mx-auto mb-8 max-w-md text-slate-400">
              There are no posts with the tag #{decodedTag}. Try checking out
              other tags or browse all posts.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-md bg-violet-600 px-6 py-3 font-medium text-white transition-colors hover:bg-violet-700"
            >
              Browse all posts
            </Link>
          </div>
        )}
      </div>
    </Bounded>
  );
}
