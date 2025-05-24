"use client";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useTheme } from "@/components/ThemeProvider";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import type { JSX } from "react";

// const LinearGradient =
//   "linear-gradient(0deg, rgba(145, 40, 207, 0) 0%, #004384 30%, #00AEFF 57.51%, #20BBD9 96.91%)";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {

  const { theme } = useTheme();
  
  const dynamicLinearGradient = slice.items
    .map(
      (item, index) =>
        `${item.icon_bg || "#1d1d2f"} ${25 + (index / slice.items.length) * 75}%`,
    )
    .join(", ");

  const linearGradient = `linear-gradient(0deg, rgba(145, 40, 207, 0) 0%, ${dynamicLinearGradient})`;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-md:-mt-20"
    >
      <Heading as="h2" size="lg" className="max-md:text-5xl">
        {slice.primary.heading}
      </Heading>

      <div className="prose prose-base prose-invert col-start-1 mt-5 dark:text-slate-500 text-black-100  lg:prose-lg">
        <p>{slice.primary.intro}</p>
      </div>

      <div className="mt-8 flex sm:mt-16">
        <VerticalTimeline layout="1-column-left" lineColor={linearGradient}>
          {slice.items
            .slice()
            .reverse()
            .map((item, index) => (
              <VerticalTimelineElement
                key={index}
                date={item.time_period ? item.time_period : ""}
                icon={
                  <div className="flex h-full w-full items-center justify-center ">
                    <PrismicNextImage
                      field={item.icon}
                      className="h-[100%] w-[100%] rounded-full object-contain"
                    />
                  </div>
                }
                iconStyle={{
                  background: item.icon_bg ? item.icon_bg : "#1d1d2f",
                  color: "#708090",
                  border: `4px solid ${item.icon_bg}`,
                  borderStyle: "solid",
                  boxShadow: "none",
                }}
                contentStyle={{
                  background: theme === "dark" ? "rgba(17,25, 40, 0.125)" : "rgba(240,245,255,0.125)",
                  color: theme === "dark" ? "#ffffff" : "#000000",
                  border: "0.2px solid rgba(255, 255, 255, 0.11)",
                  borderRadius: "12px",
                  borderStyle: "solid",
                  boxShadow: `${item.icon_bg} 0px 0.3px 0.3px 0px`,
                }}
                contentArrowStyle={{
                  borderRight: `10px solid  ${item.icon_bg}`,
                }}
                className="vertical-timeline-element--work"
              >
                <div>
                  <h3 className="text-[24px] font-bold dark:text-white text-black-100 ">
                    {item.title}
                  </h3>
                  <p
                    className="text-base font-semibold dark:text-slate-400 text-black/80"
                    style={{ margin: 0 }}
                  >
                    {item.company}
                  </p>
                </div>
                <div className="prose prose-base prose-invert text-black dark:text-slate-500 lg:prose-lg">
                  <PrismicRichText field={item.description} />
                </div>
              </VerticalTimelineElement>
            ))}
        </VerticalTimeline>
      </div>
    </Bounded>
  );
};

export default Experience;
