"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useLayoutEffect, useRef, type JSX } from "react";
import { MdCircle } from "react-icons/md";
import { CodeXml } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "@/components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

export type TechListProps = SliceComponentProps<Content.TechListSlice>;

const TechList = ({ slice }: TechListProps): JSX.Element => {
  const component = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          pin: true, // pin the trigger element while active
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
      });

      tl.fromTo(
        ".tech-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(600, 400)
              : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400);
          },
          ease: "power1.inOut",
        },
      );
    }, component);
    return () => ctx.revert(); // cleanup!
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={component}
    >
      <div className="px-4 pt-14 md:px-6 md:pt-14 lg:pt-16">
        <TitleHeader
          title={slice.primary.heading || ""}
          subtitle={slice.primary.sub_heading || ""}
          intro={slice.primary.intro || ""}
          icon={
            <CodeXml className="h-5 w-5 text-white-50" />
          }
        />
      </div>

      {slice.items.map(({ tech_color, tech_name }, index) => (
        <div
          key={index}
          className="tech-row mb-4 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-700 md:mb-8"
          aria-label={tech_name || ""}
        >
          {Array.from({ length: 15 }, (_, index) => (
            <React.Fragment key={index}>
              <span
                className={
                  "tech-item text-3xl font-extrabold uppercase tracking-tighter sm:text-5xl"
                }
                style={{
                  color: index === 7 && tech_color ? tech_color : "inherit",
                }}
              >
                {tech_name}
              </span>
              <span className="text-3xl">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;
