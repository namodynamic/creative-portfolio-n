"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { PrismicNextLink } from "@prismicio/next";
import { asLink, Content } from "@prismicio/client";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export const FloatingNav = ({
  settings,
}: {
  settings: Content.SettingsDocument;
}) => {
  const { scrollYProgress } = useScroll();

  const pathname = usePathname();

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={clsx(
          "fixed inset-x-0  top-5  z-[5000]  mx-auto  flex max-w-fit items-center justify-center space-x-3 rounded-lg border border-black/[0.1] px-5 py-4 tracking-tight shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:hidden md:min-w-[70vw] lg:min-w-fit",
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        {settings.data.mobile_nav_item.map(({ link, label }, index) => (
          <React.Fragment key={label}>
            <PrismicNextLink
              className={clsx(
                "group relative items-center space-x-1 overflow-hidden rounded px-3 py-1  text-base font-bold text-neutral-400 hover:text-neutral-300",
              )}
              field={link}
              aria-current={
                pathname.includes(asLink(link) as string) ? "page" : undefined
              }
            >
              <span
                className={clsx(
                  "absolute inset-0 z-0 h-full translate-y-12 rounded bg-purple transition-transform duration-300 ease-in-out",
                  pathname === asLink(link)
                    ? "translate-y-6"
                    : "translate-y-18",
                )}
              />

              <span className="!cursor-pointer text-sm">{label}</span>
            </PrismicNextLink>
          </React.Fragment>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
