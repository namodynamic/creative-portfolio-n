"use client";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useTheme } from "@/components/ThemeProvider";
import { Briefcase } from "lucide-react";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import type { JSX } from "react";

export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

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
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-md:-mt-20"
    >
      <div className="mb-6 inline-flex w-fit items-center gap-2 text-nowrap rounded-full bg-slate-950  px-4 py-2 text-sm text-white-50 dark:bg-slate-900 md:text-base">
        <Briefcase className="h-5 w-5 text-white-50" />
        <p className="text-sm font-medium text-white-50 dark:text-slate-300">
          {slice.primary.sub_heading}
        </p>
      </div>
      <Heading as="h2" size="md" className="max-md:text-5xl">
        {slice.primary.heading}
      </Heading>

      <div className="prose prose-base prose-invert col-start-1 mt-5 text-black-100 lg:prose-xl  dark:text-slate-300">
        <p>{slice.primary.intro}</p>
      </div>

      <div className="mt-8 flex place-items-start sm:mt-16">
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
                  background:
                    theme === "dark" || theme === "system"
                      ? "rgba(17,25,40,0.125)"
                      : "rgba(240,245,255,0.125)",
                  color:
                    theme === "dark" || theme === "system"
                      ? "#ffffff"
                      : "#000000",
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
                  <h3 className="text-[24px] font-bold text-black-100 dark:text-white ">
                    {item.title}
                  </h3>
                  <p
                    className="text-base font-semibold text-black/80 dark:text-slate-300"
                    style={{ margin: 0 }}
                  >
                    {item.company}
                  </p>
                </div>
                <div className="prose prose-base prose-invert text-black lg:prose-lg dark:text-slate-400">
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
