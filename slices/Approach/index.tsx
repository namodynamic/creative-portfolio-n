"use client";

import React, { type JSX } from "react";
import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/CanvasRevealEffect";
import Heading from "@/components/Heading";
import { Workflow } from "lucide-react";

export type ApproachProps = SliceComponentProps<Content.ApproachSlice>;

const Approach = ({ slice }: ApproachProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="mb-6 inline-flex w-fit items-center gap-2 text-nowrap rounded-lg bg-slate-950  px-4 py-2 text-sm text-white-50 dark:bg-slate-900 md:text-base">
        <Workflow className="h-5 w-5 text-white" />
        <p className="text-sm font-bold text-white">{slice.primary.heading}</p>
      </div>
      <Heading as="h2" size="sm">
        {slice.primary.sub_heading}
      </Heading>
      <div className="prose prose-base prose-invert col-start-1 mt-5 text-black-100 lg:prose-xl  dark:text-slate-300">
        <p>{slice.primary.intro}</p>
      </div>
      <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 lg:flex-row">
        <Card
          title={slice.primary.phase_1_title ?? ""}
          icon={<AceternityIcon order="Phase 01" />}
          des={slice.primary.phase_1_desc ?? ""}
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900 rounded-xl overflow-hidden"
          />
        </Card>
        <Card
          title={slice.primary.phase_2_title ?? ""}
          icon={<AceternityIcon order="Phase 02" />}
          des={slice.primary.phase_2_desc ?? ""}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-pink-900 rounded-xl overflow-hidden"
            colors={[
              [255, 166, 158],
              [221, 255, 247],
            ]}
            dotSize={2}
          />
        </Card>
        <Card
          title={slice.primary.phase_3_title ?? ""}
          icon={<AceternityIcon order="Phase 03" />}
          des={slice.primary.phase_3_desc ?? ""}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600 rounded-xl overflow-hidden"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>
    </Bounded>
  );
};

export default Approach;

const Card = ({
  title,
  icon,
  children,
  des,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  des: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/canvas-card relative mx-auto flex w-full
       max-w-sm  items-center justify-center rounded-xl border border-white-200 p-4 bg-dot-white-500 dark:border-white/[0.2] lg:h-[35rem] "
    >
      <Icon className="absolute -left-2 -top-2.5 h-6 w-6 text-black opacity-30 dark:text-white" />
      <Icon className="absolute -bottom-2 -left-2.5 h-6 w-6 text-black opacity-30 dark:text-white" />
      <Icon className="absolute -right-2 -top-2.5 h-6 w-6 text-black opacity-30 dark:text-white" />
      <Icon className="absolute -bottom-2 -right-2.5 h-6 w-6 text-black opacity-30 dark:text-white" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 h-full w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-10">
        <div
          className="absolute left-[50%] top-[50%] mx-auto flex min-w-40 translate-x-[-50%] 
        translate-y-[-50%] items-center justify-center text-center transition duration-200 group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0"
        >
          {icon}
        </div>
        <h2
          className="relative z-10 mt-4 text-center text-3xl
         font-bold text-white opacity-0  transition duration-200 
         group-hover/canvas-card:-translate-y-2 group-hover/canvas-card:text-white group-hover/canvas-card:opacity-100"
        >
          {title}
        </h2>
        <p
          className="relative z-10 mt-4
         text-center text-sm opacity-0 transition duration-200
         group-hover/canvas-card:-translate-y-2 group-hover/canvas-card:text-white group-hover/canvas-card:opacity-100"
          style={{ color: "#E4ECFF" }}
        >
          {des}
        </p>
      </div>
    </div>
  );
};
const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div>
      <button className="relative inline-flex overflow-hidden rounded-full p-[1px] ">
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
         bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        />
        <span
          className="relative inline-flex h-full w-full cursor-pointer items-center 
        justify-center rounded-full bg-black-100 px-5 py-2 text-sm font-bold text-white backdrop-blur-3xl"
        >
          {order}
        </span>
      </button>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
