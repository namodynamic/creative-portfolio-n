"use client";

import React, { type JSX } from "react";
import Bounded from "@/components/Bounded";
import SectionHeader from "@/components/SectionHeader";
import { CanvasRevealEffect } from "@/components/ui/CanvasRevealEffect";
import { cn } from "@/lib/utils";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconChecks,
  IconCode,
  IconPlus,
  IconRocket,
  IconTimeline,
} from "@tabler/icons-react";

export type ApproachProps = SliceComponentProps<Content.ApproachSlice>;

const Approach = ({ slice }: ApproachProps): JSX.Element => {
  const phases = [
    {
      title: slice.primary.phase_1_title,
      description: slice.primary.phase_1_desc,
      label: "Phase 01",
      color: "bg-emerald-950",
      icon: <IconChecks data-icon="inline-start" />,
      canvasProps: {},
    },
    {
      title: slice.primary.phase_2_title,
      description: slice.primary.phase_2_desc,
      label: "Phase 02",
      color: "bg-rose-950",
      icon: <IconCode data-icon="inline-start" />,
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
      description: slice.primary.phase_3_desc,
      label: "Phase 03",
      color: "bg-sky-950",
      icon: <IconRocket data-icon="inline-start" />,
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
      <SectionHeader
        eyebrow={slice.primary.heading}
        title={slice.primary.sub_heading}
        description={slice.primary.intro}
        icon={<IconTimeline data-icon="inline-start" />}
        className="mb-10 md:mb-14"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {phases.map((phase, index) => (
          <ApproachCard
            key={phase.label}
            title={phase.title ?? ""}
            description={phase.description ?? ""}
            icon={phase.icon}
            label={phase.label}
          >
            <CanvasRevealEffect
              animationSpeed={index === 0 ? 5.1 : 3}
              containerClassName={cn(phase.color, "overflow-hidden rounded-xl")}
              {...phase.canvasProps}
            />
          </ApproachCard>
        ))}
      </div>
    </Bounded>
  );
};

export default Approach;

function ApproachCard({
  title,
  icon,
  label,
  children,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
  description: string;
}) {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const isRevealed = hovered || focused;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false);
        }
      }}
      className={cn(
        "group/canvas-card border-border/70 bg-card bg-dot-zinc-400 relative flex min-h-80 w-full items-center justify-center rounded-xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg md:min-h-96 lg:min-h-128",
        "dark:bg-dot-zinc-700",
      )}
    >
      <CornerIcon className="-top-2.5 -left-2" />
      <CornerIcon className="-bottom-2 -left-2.5" />
      <CornerIcon className="-top-2.5 -right-2" />
      <CornerIcon className="-right-2.5 -bottom-2" />

      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 h-full w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 flex w-full max-w-sm flex-col items-center px-2 text-center">
        <div
          className={cn(
            "absolute top-1/2 left-1/2 mx-auto flex min-w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center transition duration-300 sm:min-w-40",
            isRevealed && "-translate-y-18 opacity-0",
          )}
        >
          <PhaseBadge icon={icon} label={label} />
        </div>

        <div
          className={cn(
            "opacity-0 transition duration-300",
            isRevealed && "-translate-y-2 opacity-100",
          )}
        >
          <h3 className="text-foreground text-2xl leading-tight font-semibold text-balance md:text-white">
            {title}
          </h3>
          <p className="text-muted-foreground mt-4 text-sm leading-7 text-pretty md:text-slate-200">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function PhaseBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div>
      <button
        type="button"
        className="relative inline-flex overflow-hidden rounded-full p-px"
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="bg-dark relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-5 py-2 text-sm font-bold text-white backdrop-blur-3xl">
          {icon}
          {label}
        </span>
      </button>
    </div>
  );
}

function CornerIcon({ className }: { className?: string }) {
  return (
    <IconPlus
      aria-hidden="true"
      className={cn(
        "text-muted-foreground absolute size-5 opacity-40",
        className,
      )}
    />
  );
}
