"use client";

import { type FC } from "react";
import type { Content } from "@prismicio/client";
import { ArrowRight, Tag, ExternalLink, Eye } from "lucide-react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

type FeaturedProjectProps = {
  item: Content.ProjectDocument;
  index: number;
};

const FeaturedProjectsCard: FC<FeaturedProjectProps> = ({ item, index }) => {
  const isEven = index % 2 === 0;

  const firstParagraph =
    item.data.slices
      .find((slice) => {
        return (
          slice.slice_type === "text_block" &&
          Array.isArray((slice as any).primary?.text) &&
          (slice as any).primary.text.some(
            (block: any) => block.type === "paragraph",
          )
        );
      })
      ?.primary?.text.find((block: any) => block.type === "paragraph")?.text ||
    "";

  return (
    <div
      className={`grid grid-cols-1 items-center gap-6 rounded-2xl sm:gap-8 md:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16`}
    >
      <div className={`relative ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        <div className="group relative transition-transform duration-300 hover:scale-[1.02]">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.data.color} rotate-1 transform rounded-2xl backdrop-blur-sm transition-all duration-300 group-hover:rotate-2 sm:rounded-3xl`}
          />

          <div className="relative rounded-2xl border border-slate-100 bg-slate-200 p-3 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900 sm:rounded-3xl sm:p-4 md:p-6">
            <div className="relative aspect-[5/3] overflow-hidden rounded-xl sm:rounded-2xl">
              <PrismicNextImage
                field={item.data.hover_image}
                className="rounded-xl object-cover transition-transform duration-500 group-hover:scale-105 sm:rounded-2xl"
              />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/0 opacity-0 backdrop-blur-0 transition-all duration-300 group-hover:bg-black/50 group-hover:opacity-100 group-hover:backdrop-blur-sm dark:group-hover:bg-black/60 sm:rounded-3xl">
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
              <PrismicNextLink
                field={item.data.view_live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-xl active:scale-95 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
              >
                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Live Demo</span>
                <span className="sm:hidden">Live</span>
              </PrismicNextLink>

              <PrismicNextLink
                field={item.data.source_code}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-gray-900/95 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-gray-900 hover:shadow-xl active:scale-95 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
              >
                <FaGithub className="h-3 w-3 sm:h-4 sm:w-4" />
                Code
              </PrismicNextLink>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`space-y-3 sm:space-y-4 md:space-y-5 ${isEven ? "lg:order-2" : "lg:order-1"}`}
      >
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl lg:text-3xl">
          {item.data.title}
        </h2>

        <div className="text-sm leading-relaxed text-gray-700 dark:text-slate-300 sm:text-base md:text-lg">
          <p className="line-clamp-3">{firstParagraph}</p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1 capitalize sm:pt-2">
          {item.tags && item.tags.length > 0 && (
            <>
              {item.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                <span
                  key={tagIndex}
                  className="inline-flex items-center gap-1 rounded-full bg-gray-900/80 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-gray-900 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-800 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  <Tag className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  {tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="inline-flex items-center rounded-full bg-gray-200/80 px-2.5 py-1 text-[10px] font-medium text-gray-600 backdrop-blur-sm dark:bg-gray-700/80 dark:text-gray-300 sm:px-3 sm:py-1.5 sm:text-xs">
                  +{item.tags.length - 3}
                </span>
              )}
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-2.5 pt-2 sm:gap-3 md:gap-4 md:pt-3">
          <Link
            href={`/projects/${item.uid}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-800 hover:shadow-xl active:scale-95 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 sm:gap-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 md:text-base"
          >
            <span className="hidden sm:inline">View Project</span>
            <span className="sm:hidden">View</span>
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>
          <PrismicNextLink
            field={item.data.view_live}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-gray-900 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-gray-400 hover:bg-slate-100 hover:shadow-lg active:scale-95 dark:border-gray-600/50 dark:bg-gray-800/90 dark:text-white dark:hover:border-gray-500 dark:hover:bg-gray-800 sm:gap-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 md:text-base"
          >
            <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Live Demo</span>
            <span className="sm:hidden">Demo</span>
          </PrismicNextLink>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectsCard;
