"use client";

import { useEffect, useRef, type JSX } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import Bounded from "@/components/Bounded";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import MagicButton from "@/components/ui/MagicButton";
import { FaArrowDown } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".intro",
        {
          y: 20,
          opacity: 0,
          scale: 1.2,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "elastic.out(1,0.3)",
          duration: 1,
        },
      );
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="relative mt-5 w-full overflow-hidden md:mt-20">
        <div className="relative flex justify-center">
          <div className="flex max-w-full flex-col items-center justify-center py-10 md:max-w-2xl lg:max-w-[60vw]">
            <p className="intro max-w-80 text-center text-xs uppercase tracking-tight dark:text-blue-100">
              {slice.primary.intro_text}
            </p>

            <TextGenerateEffect
              words={slice.primary.text_generate || ""}
              className="text-center text-3xl md:text-5xl lg:text-6xl"
            />

            <p className="mb-8 text-center text-base tracking-tight text-black-100 dark:text-blue-100 md:text-lg md:tracking-wider lg:text-2xl">
              {slice.primary.introduction}
            </p>

            {/*<Link href="/#featured-projects" className="group mb-2 mt-10">*/}
            {/*  <MagicButton*/}
            {/*    title="Explore my projects"*/}
            {/*    icon={*/}
            {/*      <FaArrowDown className="ml-2 h-5 w-5 rounded-full bg-white p-1 text-black transition-transform group-hover:animate-bounce " />*/}
            {/*    }*/}
            {/*    position="right"*/}
            {/*    otherClasses="hover:bg-slate-800 dark:hover:bg-stone-950 transition-all duration-300 ease-in-out"*/}
            {/*  />*/}
            {/*</Link>*/}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-2 mt-10 text-center"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-lg" />
                <Link
                  href="/#featured-projects"
                  className="group relative inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-black-100 px-8 py-4 text-lg font-semibold text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-gray-950/80 dark:border-gray-700/30 dark:bg-gray-900/80 dark:text-white dark:hover:bg-gray-900/90"
                >
                  <span>Explore my Projects</span>
                  <FaArrowDown className="ml-2 h-5 w-5 rounded-full bg-white p-1 text-black transition-transform group-hover:animate-bounce " />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
