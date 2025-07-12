'use client';

import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import TitleHeader from "@/components/TitleHeader";
import { GraduationCap, BookOpen, Calendar, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

import type { JSX } from "react";

const listItemStyles = [
  {
    bg: "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
    border: "border-purple-100 dark:border-purple-800",
    dot: "bg-purple-500",
    text: "text-slate-700 dark:text-slate-300",
  },
  {
    bg: "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
    border: "border-emerald-100 dark:border-emerald-800",
    dot: "bg-emerald-500",
    text: "text-slate-700 dark:text-slate-300",
  },
  {
    bg: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
    border: "border-blue-100 dark:border-blue-800",
    dot: "bg-blue-500",
    text: "text-slate-700 dark:text-slate-300",
  },
];

export type EducationProps = SliceComponentProps<Content.EducationSlice>;

const Education = ({ slice }: EducationProps): JSX.Element => {
  const renderStyledList = (field: any) => {
    const items =
      field?.filter((block: any) => block.type === "list-item") || [];
    return (
      <ul className="space-y-3">
        {items.map((block: any, idx: number) => {
          const style = listItemStyles[idx % listItemStyles.length];
          return (
            <li
              key={idx}
              className={`flex items-start gap-3 rounded-lg p-4 ${style.bg} ${style.border}`}
            >
              <div
                className={`h-2 w-2 ${style.dot} mt-2 flex-shrink-0 rounded-full`}
              ></div>
              <p className={`${style.text} text-sm`}>{block.text}</p>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Bounded
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-10"
    >
      <div className="mx-auto max-w-6xl">
        <TitleHeader
          title={slice.primary.heading || ""}
          subtitle={slice.primary.sub_heading || ""}
          icon={<BookOpen className="h-5 w-5 text-white-50" />}
          intro={slice.primary.intro || ""}
        />

        {slice.items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: index * 0.15,
            }}
          >
            <Card className="mb-12 overflow-hidden border-0 bg-gradient-to-br from-white/20 to-white-50 shadow-xl dark:from-blue-850/50 dark:to-blue-850/80">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col gap-8 md:flex-row">
                  <div className="flex-1">
                    <div className="mb-6 flex items-start gap-4">
                      <div className="rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 p-3 shadow-lg">
                        <GraduationCap className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-2xl font-bold text-black-100 dark:text-white-50 md:text-3xl">
                          {item.degree}
                        </h3>
                        <p className="mb-3 text-xl font-semibold text-purple-600 dark:text-purple-400">
                          {item.course_study}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{item.institution}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{item.time_period}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <Badge className="rounded-2xl border-0 bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-semibold text-white">
                        <Star className="mr-2 h-4 w-4" />
                        {item.badge}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white-50">
                        {item.key_achievement}
                      </h4>
                      {renderStyledList(item.achievement_description)}
                    </div>
                  </div>

                  <div className="flex items-center justify-center md:w-80">
                    <div className="relative">
                      <div className="absolute -left-4 -top-4 h-48 w-48 rounded-full bg-gradient-to-br from-purple-400 via-violet-500 to-indigo-600 opacity-20"></div>
                      <div className="relative z-10 flex h-40 w-40 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-2xl">
                        <GraduationCap className="h-20 w-20 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Bounded>
  );
};

export default Education;
