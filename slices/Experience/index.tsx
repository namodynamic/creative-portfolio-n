"use client";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading as="h2" size="lg" className="max-md:text-5xl">
        {slice.primary.heading}
      </Heading>

      <div className="prose prose-sm prose-invert col-start-1 mt-5 text-slate-500  sm:prose-lg">
        <p>{slice.primary.intro}</p>
      </div>

      <div className="mt-8 flex sm:mt-16">
        <VerticalTimeline layout="1-column-left">
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
                      className="h-[80%] w-[80%] rounded-full object-contain"
                    />
                  </div>
                }
                iconStyle={{
                  background: item.icon_bg ? item.icon_bg : "#1d1836",
                }}
                contentStyle={{
                  background: "rgba(17,25, 40, 0.125)",
                  color: "#fff",
                  border: "0.5px solid rgba(255, 255, 255, 0.11)",
                  borderRadius: "16px",
                  borderStyle: "solid",
                  boxShadow: "none",
                }}
                contentArrowStyle={{
                  borderRight: "10px solid  rgba(255, 255, 255, 0.40)",
                }}
                visible={true}
                className="vertical-timeline-element--work"
              >
                <div>
                  <h3 className="text-[24px] font-bold text-white ">
                    {item.title}
                  </h3>
                  <p
                    className="text-[16px] font-semibold text-slate-400"
                    style={{ margin: 0 }}
                  >
                    {item.company}
                  </p>
                </div>
                <div className="prose prose-sm prose-slate prose-invert col-start-1 text-white-500 sm:prose-lg">
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
