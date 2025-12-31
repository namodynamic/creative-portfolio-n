"use client";

import type { JSX } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { FaArrowDown } from "react-icons/fa6";
import Link from "next/link";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32"
    >
      <div className="relative mt-3 w-full overflow-hidden px-4 sm:mt-8 md:mt-16 lg:mt-20">
        <div className="relative flex justify-center">
          <div className="flex w-full max-w-full flex-col items-center justify-center py-6 sm:py-8 md:max-w-2xl md:py-10 lg:max-w-[60vw]">
            <p className="max-w-[90%] text-center text-[8px] uppercase tracking-tight dark:text-blue-100 sm:max-w-80 sm:text-xs">
              {slice.primary.intro_text}
            </p>

            <TextGenerateEffect
              words={slice.primary.text_generate || ""}
              className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            />

            <p className="mb-6 max-w-[95%] text-center text-sm tracking-tight text-black-100 dark:text-blue-100 sm:mb-8 sm:text-base md:text-lg md:tracking-wider lg:text-xl xl:text-2xl">
              {slice.primary.introduction}
            </p>

            <div className="mb-2 mt-6 text-center sm:mt-8 md:mt-10">
              <div className="relative inline-block">
                <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-lg" />
                <Link
                  href="/#featured-projects"
                  className="group relative inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black-100 px-5 py-3 text-sm font-semibold text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-gray-950/80 dark:border-gray-700/30 dark:bg-gray-900/80 dark:text-white dark:hover:bg-gray-900/90 sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-3.5 sm:text-base md:px-8 md:py-4 md:text-lg"
                >
                  <span>Explore my Projects</span>
                  <FaArrowDown className="ml-1 h-4 w-4 rounded-full bg-white p-0.5 text-black transition-transform group-hover:animate-bounce sm:ml-2 sm:h-5 sm:w-5 sm:p-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
