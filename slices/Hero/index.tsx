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


/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
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
    <>
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        ref={component}
      >
        <div className="relative mt-10 w-full overflow-hidden md:mt-20">
          <div className="relative z-10 flex justify-center">
            <div className="flex max-w-full flex-col items-center justify-center md:max-w-2xl lg:max-w-[60vw]">
              <p className="intro max-w-80 text-center text-xs uppercase tracking-tight text-blue-100">
                {slice.primary.intro_text}
              </p>

              <TextGenerateEffect
                words={slice.primary.text_generate || ""}
                className="text-center text-3xl md:text-5xl lg:text-6xl"
              />

              <p className="mb-8 text-center text-sm tracking-tight text-blue-100 md:text-lg md:tracking-wider lg:text-2xl">
                {slice.primary.introduction}
              </p>

              <Link href="/#featured-projects" className="group mb-2">
                <MagicButton
                  title="Explore my projects"
                  icon={
                    <FaArrowDown className="ml-2 transition-transform duration-500 group-hover:animate-bounce " />
                  }
                  position="right"
                  otherClasses=""
                />
              </Link>
            </div>
          </div>
        </div>
      </Bounded>
    </>
  );
};

export default Hero;
