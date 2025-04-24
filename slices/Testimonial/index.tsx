"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useState, type JSX } from "react";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { companies } from "@/data";
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";

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
    speed = "fast",
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
            " flex w-max min-w-full shrink-0 flex-nowrap gap-16 py-4",
            start && "animate-scroll ",
            pauseOnHover && "hover:[animation-play-state:paused]",
          )}
        >
          {slice.items.map((item, idx) => (
            <li
              className="relative w-[90vw] max-w-full flex-shrink-0 rounded-2xl border
               border-b-0 border-slate-800 p-5 md:w-[60vw] md:p-16"
              style={{
                background: "rgb(4,7,29)",
                backgroundColor:
                  "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              }}
              key={idx}
            >
              <blockquote>
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <span className=" relative z-20 text-sm font-normal leading-[1.6] text-white md:text-lg">
                  <PrismicRichText field={item.feedback} />
                </span>
                <div className="flex justify-between">
                  <div className="relative z-20 mt-6 flex flex-row items-center">
                    <div className="me-3">
                      <PrismicNextImage
                        field={item.avatar}
                        className="w-10 rounded-full md:w-[50px]"
                      />
                    </div>
                    <span className="flex flex-col gap-1">
                      <span className="text-md font-bold leading-[1.6] text-white sm:text-xl">
                        {item.name}
                      </span>
                      <span className=" text-sm font-normal leading-[1.6] text-white-200">
                        {item.occupation}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 self-end">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <img
                        key={i}
                        src="/star.png"
                        alt="star"
                        className="h-4 w-4"
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
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div">
        <h1 className="heading">
          {slice.primary.title?.split(" ").slice(0, -2).join(" ")}{" "}
          <span className="text-purple">
            {slice.primary.title?.split(" ").slice(-2).join(" ")}
          </span>
        </h1>
      </Bounded>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div className="relative flex h-[50vh] flex-col items-center justify-center  overflow-hidden rounded-md antialiased md:h-[30rem]">
          <InfiniteMovingCards />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 max-lg:mt-10 md:gap-16">
          {companies.map((company) => (
            <React.Fragment key={company.id}>
              <div className="flex max-w-32 gap-2 md:max-w-60">
                <img
                  src={company.img}
                  alt={company.name}
                  className="w-5 md:w-10"
                />
                <img
                  src={company.nameImg}
                  alt={company.name}
                  width={company.id === 4 || company.id === 5 ? 100 : 150}
                  className="w-20 md:w-24"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
