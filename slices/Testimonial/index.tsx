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
              className="relative w-[350px] max-w-full shrink-0 rounded-2xl border-[0.5px] border-b-0 border-zinc-100 bg-white/20 p-5 dark:border-slate-800 dark:bg-[linear-gradient(90deg,_rgba(4,7,29,1)_0%,_rgba(12,14,35,1)_100%)] md:w-[50vw] md:p-16"
              key={idx}
            >
              <blockquote>
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <span className=" prose relative z-20 text-sm font-normal leading-[1.6] text-neutral-800 dark:text-gray-100">
                  <PrismicRichText field={item.feedback} />
                </span>
                <div className="flex justify-between">
                  <div className="relative z-20 mt-6 flex flex-row items-center">
                    <div className="me-3">
                      <PrismicNextImage
                        field={item.avatar}
                        className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
                      />
                    </div>
                    <span className="flex flex-col gap-1">
                      <span className="text-md font-bold leading-[1.6] dark:text-white sm:text-xl">
                        {item.name}
                      </span>
                      <span className=" text-sm font-normal dark:text-white-200">
                        {item.occupation}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 self-end">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} className="h-4 w-4" />
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
        className="max-md:-my-20"
      >
        <h1 className="heading">
          {slice.primary.title?.split(" ").slice(0, -2).join(" ")}{" "}
          <span className="text-violet-500">
            {slice.primary.title?.split(" ").slice(-2).join(" ")}
          </span>
        </h1>
      </Bounded>

      <div className="-mt-20 mb-5 flex flex-col items-center max-lg:mt-10">
        <div className="relative flex h-[50vh] flex-col items-center justify-center  overflow-hidden rounded-md antialiased md:h-[30rem]">
          <InfiniteMovingCards />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-16 md:gap-16">
          {slice.primary.companies.map((item, index) => (
            <div key={index} className="flex max-w-32 px-2 md:max-w-60">
              <div className="flex flex-row items-center justify-center gap-2">
                <PrismicNextImage
                  field={item.company_logo}
                  className="h-5 w-5 md:h-10 md:w-10"
                />

                <h3 className="text-sm font-bold md:text-lg">
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
