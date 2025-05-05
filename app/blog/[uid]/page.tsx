import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { formatDate } from "@/utils/FormatDate";

type Params = { uid: string };

export default async function Page(props: { params: Promise<Params> }) {
  const params = await props.params;
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  const formattedDate = formatDate(page.data.date);

  return (
    <Bounded as="section">
      <div className="rounded-lg border-[0.5px] border-slate-800 bg-blue-850/50 justify-center items-center px-4 md:py-10 py-5 my-10 md:px-8 md:my-20">
        <Heading size="sm" as="h1">{page.data.title}</Heading>
        <div className="flex gap-2 flex-wrap mt-2 text-sm font-bold text-slate-500">
          {page.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
        <p className="mt-5 border-b border-slate-800 text-sm font-medium text-slate-300">
          {formattedDate}
        </p>
        <div className="prose prose-base sm:prose-lg prose-invert mt-12  max-w-prose mx-auto md:mt-20">
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Bounded>
  );
}

export async function generateMetadata(
  props: {
    params: Promise<Params>;
  }
): Promise<Metadata> {
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
