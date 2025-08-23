"use client";

import FeaturedProjectsCard from "@/components/FeaturedProjectsCard";
import type { Content } from "@prismicio/client";
import { motion } from "framer-motion";
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-24"
      >
        {sortedItems.map((item, index) => (
          <FeaturedProjectsCard key={item.id} item={item} index={index} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-32 text-center"
      >
        <div className="relative inline-block">
          <Link
            href="/projects"
            className="group relative inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/80 px-8 py-4 text-lg font-semibold text-gray-900 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-white/90 dark:border-gray-700/30 dark:bg-gray-900/80 dark:text-white dark:hover:bg-gray-900/90"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
