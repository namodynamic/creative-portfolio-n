"use client";

import { motion } from "framer-motion";

interface TitleHeaderProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  intro?: string;
}

const TitleHeader = ({ title, subtitle, icon, intro }: TitleHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{
        duration: 0.6,
        type: "tween",
        ease: "easeOut",
      }}
      className="mb-16 text-center"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          show: { opacity: 1, scale: 1 },
        }}
        className="text-primary-foreground mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm md:text-base dark:bg-slate-900"
      >
        {icon}
        <p className="text-primary-foreground text-sm font-medium dark:text-slate-300">
          {subtitle}
        </p>
      </motion.div>

      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
        className="text-foreground dark:from-foreground mb-4 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-4xl font-bold md:text-5xl dark:via-slate-200 dark:to-white dark:text-transparent"
      >
        {title}
      </motion.h2>

      {intro && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0 },
          }}
          className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400"
        >
          {intro}
        </motion.p>
      )}
    </motion.div>
  );
};

export default TitleHeader;
