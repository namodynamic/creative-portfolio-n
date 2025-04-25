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
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";

export const gridItems = [
  {
    id: 1,
    title: "Clear communication, shared goals, better outcomes.",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "Refining skills, refining code",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Real projects, Real challenges, Real growth.",
    description: "Behind the Build",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Have an idea? Let’s bring it to life together.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

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
        <div className="relative my-10 w-full overflow-hidden md:my-20">
          <div className="relative z-10 flex justify-center">
            <div className="flex max-w-full flex-col items-center justify-center md:max-w-2xl lg:max-w-[60vw]">
              <p className="intro max-w-80 text-center text-xs uppercase tracking-tight text-blue-100">
                {slice.primary.intro_text}
              </p>

              <TextGenerateEffect
                words={slice.primary.text_generate || ""}
                className="text-center text-[40px] md:text-5xl lg:text-6xl"
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
        <BentoGrid className="w-full py-10">
          {gridItems.map((item, i) => (
            <BentoGridItem
              id={item.id}
              key={i}
              title={item.title}
              description={item.description}
              className={item.className}
              img={item.img}
              imgClassName={item.imgClassName}
              titleClassName={item.titleClassName}
              spareImg={item.spareImg}
            />
          ))}
        </BentoGrid>
      </Bounded>
    </>
  );
};

export default Hero;
