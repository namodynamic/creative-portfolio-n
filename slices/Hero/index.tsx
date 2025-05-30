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
    <>
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        ref={component}
      >
        <div className="relative mt-16 w-full overflow-hidden md:mt-32">
          <div className="relative z-10 flex justify-center">
            <div className="flex max-w-full flex-col items-center justify-center md:max-w-2xl lg:max-w-[60vw]">
              <p className="intro max-w-80 text-center text-xs uppercase tracking-tight dark:text-blue-100">
                {slice.primary.intro_text}
              </p>

              <TextGenerateEffect
                words={slice.primary.text_generate || ""}
                className="text-center text-3xl md:text-5xl lg:text-6xl"
              />

              <p className="mb-8 text-center text-base tracking-tight dark:text-blue-100 text-black-100 md:text-lg md:tracking-wider lg:text-2xl">
                {slice.primary.introduction}
              </p>

              <Link href="/#featured-projects" className="group mb-2 mt-10">
                <MagicButton
                  title="Explore my projects"
                  icon={
                    <FaArrowDown className="ml-2 transition-transform h-5 w-5 bg-white text-black rounded-full p-1 group-hover:animate-bounce " />
                  }
                  position="right"
                  otherClasses="hover:bg-slate-800 dark:hover:bg-stone-950 transition-all duration-300 ease-in-out"
                />
              </Link>
            </div>
          </div>
        </div>
      </Bounded>
      <div className="absolute inset-0 -z-10 block dark:hidden bg-blend-lighten hero-light-bg" />
      <div className="absolute inset-0 -z-10 dark:block hidden hero-dark-bg" />
    </>
  );
};

export default Hero;
