"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import type { Content } from "@prismicio/client";
import Link from "next/link";
import { formatDate } from "@/utils/FormatDate";
import { extractTextFromSlices } from "@/utils/extractSliceText";
import { readingTime } from "reading-time-estimator";

interface BlogCardProps {
  item: Content.BlogPostDocument;
  index: number;
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
}

export default function BlogCard({ item, index, viewMoreText }: BlogCardProps) {
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

  const textContent = extractTextFromSlices(item.data.slices);
  const readTime = readingTime(textContent);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link
        href={`/blog/${item.uid}`}
        className="block rounded-2xl  p-6 transition-all  duration-500 hover:scale-[1.02] hover:bg-white/20 hover:shadow-lg dark:border-gray-800 dark:hover:bg-blue-850/50  dark:hover:shadow-xl"
      >
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <time>{formatDate(item.data.date)}</time>
          <>
            <span>•</span>
            <Clock className="h-4 w-4" />
            <span>{readTime.text}</span>
          </>
        </div>

        <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
          {item.data.title}
        </h2>

        <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-300">
          {item.data.excerpt || firstParagraph}
        </p>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="inline-flex items-center gap-1 rounded-full bg-black/50 text-white px-2 py-1 text-xs font-medium dark:bg-slate-800/60 dark:text-slate-300"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                +{item.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 font-medium text-purple-600 transition-all duration-300 group-hover:gap-3 dark:text-purple-400">
            {viewMoreText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
