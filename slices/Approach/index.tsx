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
  const phases = [
    {
      title: slice.primary.phase_1_title,
      desc: slice.primary.phase_1_desc,
      color: "bg-emerald-900",
      order: "Phase 01",
      canvasProps: {},
    },
    {
      title: slice.primary.phase_2_title,
      desc: slice.primary.phase_2_desc,
      color: "bg-pink-900",
      order: "Phase 02",
      canvasProps: {
        colors: [
          [255, 166, 158],
          [221, 255, 247],
        ],
        dotSize: 2,
      },
    },
    {
      title: slice.primary.phase_3_title,
      desc: slice.primary.phase_3_desc,
      color: "bg-sky-600",
      order: "Phase 03",
      canvasProps: {
        colors: [[125, 211, 252]],
      },
    },
  ];

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-6 inline-flex w-fit items-center gap-2 text-nowrap rounded-lg bg-slate-950  px-4 py-2 text-sm text-white-50 dark:bg-slate-900 md:text-base"
      >
        <Workflow className="h-5 w-5 text-white" />
        <p className="text-sm font-bold text-white">{slice.primary.heading}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Heading as="h2" size="sm">
          {slice.primary.sub_heading}
        </Heading>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="prose prose-base prose-invert col-start-1 mt-5 text-black-100 lg:prose-xl  dark:text-slate-300"
      >
        <p>{slice.primary.intro}</p>
      </motion.div>

      <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 lg:flex-row">
        {phases.map((phase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 + index * 0.2 }}
            viewport={{ once: true }}
          >
            <Card
              title={phase.title ?? ""}
              icon={<AceternityIcon order={phase.order} />}
              des={phase.desc ?? ""}
            >
              <CanvasRevealEffect
                animationSpeed={index === 0 ? 5.1 : 3}
                containerClassName={`${phase.color} rounded-xl overflow-hidden`}
                {...phase.canvasProps}
              />
            </Card>
          </motion.div>
        ))}
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
