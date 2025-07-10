"use client";

import { type FC, useRef } from "react";
import { motion, useInView } from "motion/react";
import type { Content } from "@prismicio/client";
import { ArrowRight, Tag, ExternalLink, Eye } from "lucide-react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

type FeaturedProjectProps = {
  items: Content.ProjectDocument[];
  index: number;
};

const FeaturedProjectsCard: FC<FeaturedProjectProps> = ({ items, index }) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  const firstParagraph =
    items[index].data.slices
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

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isEven ? -50 : 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className={`grid grid-cols-1 items-center gap-8 rounded-xl lg:grid-cols-2 ${isEven ? "" : ""}`}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div
        className={`relative  ${isEven ? "lg:order-1" : "lg:order-2"}`}
        variants={imageVariants}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <div className="group relative">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${items[index].data.color} rotate-1 transform rounded-3xl backdrop-blur-sm transition-transform duration-700 group-hover:rotate-2`}
          />

          <div className="relative rounded-3xl border border-white/20 bg-white-50/80 p-4 shadow-2xl backdrop-blur-xl dark:border-gray-700/30 dark:bg-gray-900/80 md:p-6">
            <div className="relative aspect-[5/3] overflow-hidden rounded-2xl">
              <PrismicNextImage
                field={items[index].data.hover_image}
                className="h-full object-fill transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/10 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 dark:bg-black/40"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <div className="flex gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <PrismicNextLink
                  field={items[index].data.view_live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-sm transition-colors hover:bg-white"
                >
                  <Eye className="h-4 w-4" />
                  Live Demo
                </PrismicNextLink>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <PrismicNextLink
                  field={items[index].data.source_code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-gray-900/90 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-gray-900"
                >
                  <FaGithub className="h-4 w-4" />
                  Code
                </PrismicNextLink>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className={`space-y-4 ${isEven ? "lg:order-2" : "lg:order-1"}`}
        variants={contentVariants}
      >
        <motion.h2
          className="text-2xl font-bold tracking-tight dark:text-white md:text-3xl"
          variants={itemVariants}
        >
          {items[index].data.title}
        </motion.h2>

        <motion.div className="dark:text-slate-300" variants={itemVariants}>
          <p className="line-clamp-3">{firstParagraph}</p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2 pt-2 capitalize"
          variants={itemVariants}
        >
          {items[index].tags && items[index].tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {items[index].tags
                .slice(0, 3)
                .map((tag: string, tagIndex: number) => (
                  <motion.span
                    key={tagIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * tagIndex }}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                    className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white dark:bg-slate-800/70 dark:text-slate-100"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </motion.span>
                ))}
              {items[index].tags.length > 3 && (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                  +{items[index].tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileTap={{ scale: 0.95 }}
          className="flex gap-4"
        >
          <Link
            href={`/projects/${items[index].uid}`}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            View Project
            <ArrowRight className="h-4 w-4" />
          </Link>

          <PrismicNextLink
            field={items[index].data.view_live}
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/60 px-6 py-3 font-medium text-gray-900 backdrop-blur-sm transition-colors hover:bg-white/80 dark:border-gray-700/30 dark:bg-gray-800/60 dark:text-white dark:hover:bg-gray-800/80"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </PrismicNextLink>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FeaturedProjectsCard;
