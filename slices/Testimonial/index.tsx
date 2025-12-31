"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useState, type JSX } from "react";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import { FaStar } from "react-icons/fa6";

/**
 * Props for `Testimonial`.
 */
export type TestimonialProps = SliceComponentProps<Content.TestimonialSlice>;

/**
 * Component for "Testimonial" Slices.
 */
const Testimonial = ({ slice }: TestimonialProps): JSX.Element => {
  const InfiniteMovingCards = ({
    direction = "left",
    speed = "normal",
    pauseOnHover = true,
    className,
  }: {
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
  }) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
      addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });

        getDirection();
        getSpeed();
        setStart(true);
      }
    }
    const getDirection = () => {
      if (containerRef.current) {
        if (direction === "left") {
          containerRef.current.style.setProperty(
            "--animation-direction",
            "forwards",
          );
        } else {
          containerRef.current.style.setProperty(
            "--animation-direction",
            "reverse",
          );
        }
      }
    };
    const getSpeed = () => {
      if (containerRef.current) {
        if (speed === "fast") {
          containerRef.current.style.setProperty("--animation-duration", "20s");
        } else if (speed === "normal") {
          containerRef.current.style.setProperty("--animation-duration", "40s");
        } else {
          containerRef.current.style.setProperty("--animation-duration", "80s");
        }
      }
    };
    return (
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 w-screen overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
          className,
        )}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            " flex w-max min-w-full shrink-0 flex-nowrap gap-10 py-4",
            start && "animate-scroll ",
            pauseOnHover && "hover:[animation-play-state:paused]",
          )}
        >
          {slice.items.map((item, idx) => (
            <li
              className="relative w-[280px] max-w-full shrink-0 rounded-xl border-[0.5px] border-b-0 border-zinc-100 bg-white/20 p-4 dark:border-slate-800 dark:bg-[linear-gradient(90deg,_rgba(4,7,29,1)_0%,_rgba(12,14,35,1)_100%)] sm:w-[350px] sm:rounded-2xl sm:p-5 md:w-[50vw] md:p-12 lg:p-16"
              key={idx}
            >
              <blockquote>
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <span className=" prose relative z-20 text-xs font-normal leading-[1.6] text-neutral-800 dark:text-gray-100 sm:text-sm md:text-base">
                  <PrismicRichText field={item.feedback} />
                </span>
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:gap-0">
                  <div className="relative z-20 mt-4 flex flex-row items-center sm:mt-6">
                    <div className="me-2 sm:me-3">
                      <PrismicNextImage
                        field={item.avatar}
                        className="h-8 w-8 rounded-full object-cover sm:h-10 sm:w-10 md:h-12 md:w-12"
                      />
                    </div>
                    <span className="flex flex-col gap-0.5 sm:gap-1">
                      <span className="text-sm font-bold leading-[1.6] dark:text-white sm:text-base md:text-lg lg:text-xl">
                        {item.name}
                      </span>
                      <span className="text-xs font-normal dark:text-white-200 sm:text-sm">
                        {item.occupation}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 self-start sm:gap-1.5 sm:self-end md:gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className="h-3 w-3 text-yellow-400 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4"
                      />
                    ))}
                  </div>
                </div>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <Bounded
        as="section"
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="px-4 py-16 max-md:-my-20 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:py-28"
      >
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          {slice.primary.title?.split(" ").slice(0, -2).join(" ")}{" "}
          <span className="text-purple-500">
            {slice.primary.title?.split(" ").slice(-2).join(" ")}
          </span>
        </h1>
      </Bounded>

      <div className="-mt-12 mb-5 flex flex-col items-center max-lg:mt-10 sm:-mt-16 md:-mt-20">
        <div className="relative flex h-[40vh] flex-col items-center justify-center overflow-hidden rounded-md antialiased sm:h-[45vh] md:h-[30rem]">
          <InfiniteMovingCards />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 px-4 sm:mt-12 sm:gap-4 md:mt-16 md:gap-8 lg:gap-16">
          {slice.primary.companies.map((item, index) => (
            <div
              key={index}
              className="flex max-w-24 px-2 sm:max-w-32 md:max-w-40 lg:max-w-60"
            >
              <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-2">
                <PrismicNextImage
                  field={item.company_logo}
                  className="h-4 w-4 sm:h-5 sm:w-5 md:h-8 md:w-8 lg:h-10 lg:w-10"
                />

                <h3 className="text-xs font-bold sm:text-sm md:text-base lg:text-lg">
                  {item.company_name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Testimonial;
