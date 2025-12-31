"use client";

import FeaturedProjectsCard from "@/components/FeaturedProjectsCard";
import type { Content } from "@prismicio/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type FeaturedProjectListProps = {
  item: Content.ProjectDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
};

export default function FeaturedProjectList({
  item,
}: FeaturedProjectListProps) {
  const sortedItems = [...item].sort((a, b) => {
    const dateA = new Date(a.data.date || "").getTime();
    const dateB = new Date(b.data.date || "").getTime();
    return dateB - dateA;
  });

  return (
    <section>
      <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-28">
        {sortedItems.map((item, index) => (
          <FeaturedProjectsCard key={item.id} item={item} index={index} />
        ))}
      </div>

      <div className="mt-16 text-center sm:mt-20 md:mt-24 lg:mt-28 xl:mt-32">
        <div className="relative inline-block">
          <div className="absolute inset-0 animate-pulse rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl sm:rounded-2xl" />
          <Link
            href="/projects"
            className="group relative inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white/95 px-5 py-2.5 text-sm font-bold text-gray-900 shadow-xl backdrop-blur-xl transition-all duration-200 hover:scale-105 hover:border-gray-400 hover:bg-white hover:shadow-2xl active:scale-95 dark:border-gray-600/50 dark:bg-gray-900/95 dark:text-white dark:hover:border-gray-500 dark:hover:bg-gray-900 sm:gap-3 sm:rounded-2xl sm:px-7 sm:py-3.5 sm:text-base md:px-8 md:py-4 md:text-lg"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
