import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { asImageSrc } from "@prismicio/client";
import Link from "next/link";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { formatDate } from "@/utils/FormatDate";
import Bounded from "@/components/Bounded";
import { Clock, Calendar, ChevronLeft, Tag } from "lucide-react";
import AuthorCard from "@/components/AuthorCard";
import RelatedPosts from "@/components/RelatedPost";
import { readingTime } from "reading-time-estimator";
import { extractTextFromSlices } from "@/utils/extractSliceText";
import FeaturedProjects from "@/components/FeaturedProjectCard";
import SharePost from "@/components/SharePost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Params = { uid: string };

export default async function BlogPostPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  const allTags = await client.getAllByType("blog_post", { fetch: ["tags"] });

  const tagCounts: Record<string, number> = {};
  allTags.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  // filter tags that occur more than once
  const popularTags = Object.keys(tagCounts).filter(
    (tag) => tagCounts[tag] > 1,
  );

  const formattedDate = formatDate(page.data.date);
  const textContent = extractTextFromSlices(page.data.slices);
  const readTime = readingTime(textContent);

  return (
    <article>
      <Bounded>
        <div className="relative z-20 w-full py-6 md:py-10">
          <Link
            href="/blog"
            className="mb-4 inline-flex items-center text-sm transition-colors hover:text-black/50 dark:text-purple-400 dark:hover:text-purple-300"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to all blogs
          </Link>
          <h1 className="max-w-4xl text-xl font-bold text-black-50 dark:text-white md:text-2xl lg:text-3xl">
            {page.data.title}
          </h1>
        </div>

        <div className="relative z-20 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-xl border-[0.5px] border-zinc-400 bg-white/20 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-blue-850/50">
              <div className="border-b-[0.5px] border-zinc-400 p-6 dark:border-slate-800 md:p-8">
                <div className="flex flex-wrap items-center gap-4 text-sm text-black/50  dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-black-50 dark:text-white-100" />
                    {formattedDate}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-black-50 dark:text-white-100" />
                    {readTime.text}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {page.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-black/80 px-2 py-1 text-[6px] md:text-[8px] font-medium text-white dark:bg-purple-500/20 dark:text-purple-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4 ">
                <div className="overflow-x-auto">
                <div className="prose prose-base mx-auto max-w-prose break-words dark:prose-invert md:prose-lg">
                  <SliceZone slices={page.data.slices} components={components} />
                </div>
                </div>
              </div>

              <SharePost
                title={page.data.title}
                url={`https://nnamdiekechi.com/blog/${page.uid}`}
              />
            </div>

            <AuthorCard className="mt-8" />

            <RelatedPosts params={{ tag: page.tags[0] || "" }} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Popular Tags */}
              <div className="rounded-xl border-[0.5px] border-zinc-400 bg-white/20 p-6 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-blue-850/50">
                <h3 className="mb-4 text-lg font-bold text-black-50 dark:text-white">
                  Popular Topics By Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                      className="rounded-full bg-[#131a41] inline-flex items-center gap-1 px-2 py-1 text-xs uppercase text-gray-300 transition-colors hover:bg-[#1a2150] hover:text-white"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
              <FeaturedProjects tags={page.tags} />
            </div>
          </div>
        </div>
        <ToastContainer />
      </Bounded>
    </article>
  );
}

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const params = await props.params;
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
