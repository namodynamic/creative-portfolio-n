import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import Link from "next/link";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { formatDate } from "@/utils/FormatDate";
import Bounded from "@/components/Bounded";
import { Clock, Calendar, ChevronLeft } from "lucide-react";
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
            className="mb-4 inline-flex items-center text-sm text-indigo-400 transition-colors hover:text-indigo-300"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to all blogs
          </Link>
          <h1 className="max-w-4xl text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {page.data.title}
          </h1>
        </div>

        <div className="relative z-20 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-xl border-[0.5px] border-slate-800 bg-blue-850/50 shadow-xl backdrop-blur-sm">
              <div className="border-b-[0.5px] border-slate-800 p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-indigo-500" />
                    {formattedDate}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-indigo-500" />
                    {readTime.text}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {page.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4 ">
                <div className="prose prose-base prose-invert mx-auto max-w-prose md:prose-lg">
                  <SliceZone
                    slices={page.data.slices}
                    components={components}
                  />
                </div>
              </div>

              <SharePost title={page.data.title} url={`https://nnamdiekechi.com/blog/${page.uid}`} />
            </div>

            <AuthorCard className="mt-8" />

            <RelatedPosts params={{ tag: page.tags[0] || "" }}  />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Popular Tags */}
              <div className="rounded-xl border-[0.5px] border-slate-800 bg-blue-850/50 p-6 shadow-xl backdrop-blur-sm">
                <h3 className="mb-4 text-lg font-bold text-white">
                  Popular Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                      className="rounded-full bg-[#131a41] px-3 py-1 text-xs uppercase text-gray-300 transition-colors hover:bg-[#1a2150] hover:text-white"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
              <FeaturedProjects tags={page.tags}   />
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
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
