import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { formatDate } from "@/utils/FormatDate";
import { PrismicNextLink } from "@prismicio/next";
import { FaGithub } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import clsx from "clsx";

type Params = { uid: string };

export default async function Page(props: { params: Promise<Params> }) {
  const params = await props.params;
  const client = createClient();
  const page = await client
    .getByUID("project", params.uid)
    .catch(() => notFound());

  const formattedDate = formatDate(page.data.date);

  return (
    <Bounded as="article">
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20">
        <Heading size="md" as="h1">
          {page.data.title}
        </Heading>
        <div className="mt-2 flex flex-wrap gap-2">
          {page.tags.map((tag) => (
            <span className="text-[14px] font-bold text-white-600" key={tag}>
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-2 flex justify-between">
          <PrismicNextLink
            field={page.data.source_code}
            className={clsx(
              "group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 px-4  py-2 font-bold text-slate-800 transition-transform ease-out  hover:scale-105",
            )}
            aria-label="View source code"
          >
            <span
              className={clsx(
                "absolute inset-0 z-0 h-full translate-y-9 bg-purple transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
              )}
            />
            <span className="relative flex items-center justify-center gap-2 hover:text-white">
              Source Code <FaGithub className="inline-block" />
            </span>
          </PrismicNextLink>
          <PrismicNextLink
            field={page.data.view_live}
            className={clsx(
              "group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 px-4  py-2 font-bold text-slate-800 transition-transform ease-out  hover:scale-105",
            )}
            aria-label="View source code"
          >
            <span
              className={clsx(
                "absolute inset-0 z-0 h-full translate-y-9 bg-purple transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
              )}
            />
            <span className="relative flex items-center justify-center gap-2 hover:text-white">
              View Live <MdArrowOutward className="inline-block" />
            </span>
          </PrismicNextLink>
        </div>
        <p className="mt-5 border-b border-slate-600 text-sm font-medium text-slate-300">
          {formattedDate}
        </p>
        <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
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
    .getByUID("project", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("project");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
