"use client";

import { type FC, useRef } from "react";
import { motion, useInView } from "motion/react";
import type { Content } from "@prismicio/client";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";

type FeaturedProjectProps = {
  items: Content.ProjectDocument[];
  index: number;
};

const ProjectCard: FC<FeaturedProjectProps> = ({ items, index }) => {
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
        duration: 0.6,
        ease: "easeOut",
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
      className={`grid grid-cols-1 items-center gap-8 rounded-xl lg:grid-cols-2 ${isEven ? "" : "lg:flex-row-reverse"}`}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div
        className={`relative overflow-hidden rounded-xl border border-b-0 border-slate-800 shadow-lg ${isEven ? "lg:order-1" : "lg:order-2"}`}
        variants={imageVariants}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <Link href={`/projects/${items[index].uid}`}>
          <PrismicNextImage
            field={items[index].data.hover_image}
            className="max-h-[200px] w-full object-fill sm:max-h-[380px]"
          />
        </Link>
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

        <motion.div variants={itemVariants} whileTap={{ scale: 0.95 }}>
          <Button
            className="border-black-100 border-[0.5px] md:mt-4 text-black-100 hover:text-neutral-700 dark:hover:text-gray-300 dark:border-white bg-white-50 dark:text-white dark:bg-black-100"
            variant="outline"
          >
            <Link href={`/projects/${items[index].uid}`}>View Project</Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
