"use client";

import { type FC, useRef } from "react";
import type { Content } from "@prismicio/client";
import { type SliceComponentProps, PrismicRichText } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Heading";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicNextImage } from "@prismicio/next";
import MagicButton from "@/components/ui/MagicButton";
import { motion, useInView } from "motion/react";

/**
 * Props for `FeaturedProjects`.
 */
export type FeaturedProjectsProps =
  SliceComponentProps<Content.FeaturedProjectsSlice>;

/**
 * Component for "FeaturedProjects" Slices.
 */
const FeaturedProjects: FC<FeaturedProjectsProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="featured-projects"
      className="overflow-hidden max-md:-my-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h2" size="lg" className="max-md:text-5xl">
          {slice.primary.heading}
        </Heading>

        <div className="prose prose-sm prose-invert col-start-1 mt-5 text-black sm:prose-lg dark:text-slate-300">
          <p>{slice.primary.intro_text}</p>
        </div>
      </motion.div>

      <div className="mx-auto mt-8 max-w-7xl">
        <div className="grid grid-cols-1 gap-12">
          {slice.items.map((item, index) => (
            <ProjectCard key={index} item={item} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          tabIndex={0}
        >
          <PrismicNextLink field={slice.primary.view_all_projects}>
            <MagicButton
              title="View All Projects"
              icon={
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              }
              position="right"
              otherClasses="group"
            />
          </PrismicNextLink>
        </motion.div>
      </div>
    </Bounded>
  );
};

interface ProjectCardProps {
  item: any;
  index: number;
}

const ProjectCard: FC<ProjectCardProps> = ({ item, index }) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

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
        <PrismicNextLink field={item.project_slug}>
        <PrismicNextImage field={item.featured_project_image} />
        </PrismicNextLink>
      </motion.div>

      <motion.div
        className={`space-y-4 ${isEven ? "lg:order-2" : "lg:order-1"}`}
        variants={contentVariants}
      >
        <motion.h2
          className="text-2xl font-bold tracking-tight dark:text-white md:text-3xl"
          variants={itemVariants}
        >
          {item.title}
        </motion.h2>

        <motion.div className="dark:text-slate-300" variants={itemVariants}>
          <PrismicRichText
            field={item.description}
            components={{
              paragraph: ({ children }) => (
                <p className="line-clamp-3">{children}</p>
              ),
            }}
          />
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2 pt-2 capitalize"
          variants={itemVariants}
        >
          {item.tags?.split(",").map((tag: string, tagIndex: number) => (
            <motion.div
              key={tagIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * tagIndex }}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            >
              <Badge
                variant="outline"
                className="hover:bg-white/20 dark:bg-white dark:text-black"
              >
                {tag.trim()}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} whileTap={{ scale: 0.95 }}>
          <Button
            className="mt-4 border-black-100 bg-black-100 text-white dark:border-white dark:bg-white dark:text-black dark:hover:bg-black-100 dark:hover:text-white"
            variant="outline"
          >
            <PrismicNextLink field={item.project_slug}>
              View Project
            </PrismicNextLink>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FeaturedProjects;
