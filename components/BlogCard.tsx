"use client";

import { motion } from "framer-motion";
import {
  IconArrowRight,
  IconCalendar,
  IconClock,
  IconTag,
} from "@tabler/icons-react";
import type { Content } from "@prismicio/client";
import Link from "next/link";
import { formatDate } from "@/utils/FormatDate";
import {
  extractFirstParagraphFromSlices,
  extractTextFromSlices,
} from "@/utils/extractSliceText";
import { readingTime } from "reading-time-estimator";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  item: Content.BlogPostDocument;
  index: number;
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
}

export default function BlogCard({ item, index, viewMoreText }: BlogCardProps) {
  const firstParagraph = extractFirstParagraphFromSlices(item.data.slices);

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
        className="hover:bg-muted/40 block rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg"
      >
        <div className="text-muted-foreground mb-3 flex items-center gap-2 text-sm">
          <IconCalendar className="size-4" />
          <time>{formatDate(item.data.date)}</time>
          <>
            <span>•</span>
            <IconClock className="size-4" />
            <span>{readTime.text}</span>
          </>
        </div>

        <h2 className="font-heading text-foreground mb-3 text-lg font-semibold md:text-xl">
          {item.data.title}
        </h2>

        <p className="text-muted-foreground mb-4 line-clamp-3">
          {item.data.excerpt || firstParagraph}
        </p>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag, tagIndex) => (
              <Badge key={tagIndex} variant="secondary">
                <IconTag data-icon="inline-start" />
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="outline">+{item.tags.length - 3} more</Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-primary inline-flex items-center gap-2 font-medium transition-all duration-300 group-hover:gap-3">
            {viewMoreText}
            <IconArrowRight
              data-icon="inline-end"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
