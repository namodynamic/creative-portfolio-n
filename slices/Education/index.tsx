"use client";

import Bounded from "@/components/Bounded";
import CertificationCard, {
  type CertificationCardItem,
} from "@/components/CertificationCard";
import SectionHeader from "@/components/SectionHeader";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import {
  IconAward,
  IconCalendar,
  IconCertificate,
  IconCircleCheck,
  IconMapPin,
  IconSchool,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "motion/react";

import type { JSX } from "react";

export type EducationProps = SliceComponentProps<Content.EducationSlice>;

const Education = ({ slice }: EducationProps): JSX.Element => {
  const certifications =
    (
      slice.primary as Content.EducationSlice["primary"] & {
        certifications?: CertificationCardItem[];
      }
    ).certifications?.filter(
      (item) => item.title || item.issuer || item.description,
    ) ?? [];

  return (
    <Bounded
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 md:py-24"
    >
      <SectionHeader
        eyebrow={slice.primary.eyebrow}
        title={slice.primary.heading}
        description={slice.primary.intro}
        icon={<IconSchool data-icon="inline-start" className="size-3.5" />}
      />

      <div className="mt-10 grid gap-5">
        {slice.items.map((item, index) => (
          <motion.div
            key={`${item.degree}-${item.institution}-${index}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
              delay: index * 0.08,
            }}
          >
            <Card
              size="sm"
              className="bg-opacity hover:bg-card transition-colors duration-500"
            >
              <CardHeader className="gap-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-4">
                    <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">
                      <IconSchool className="size-6" />
                    </div>

                    <div className="min-w-0 space-y-2">
                      <CardTitle>{item.degree}</CardTitle>
                      <CardDescription>{item.course_study}</CardDescription>
                    </div>
                  </div>

                  {item.badge && (
                    <Badge variant="secondary">
                      <IconAward data-icon="inline-start" />
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="text-muted-foreground flex flex-wrap gap-3 text-sm">
                  {item.institution && (
                    <span className="inline-flex items-center gap-1.5">
                      <IconMapPin className="size-4" />
                      {item.institution}
                    </span>
                  )}
                  {item.time_period && (
                    <span className="inline-flex items-center gap-1.5">
                      <IconCalendar className="size-4" />
                      {item.time_period}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {item.key_achievement && (
                    <h3 className="font-heading text-foreground">
                      {item.key_achievement}
                    </h3>
                  )}

                  <div className="text-muted-foreground space-y-3 text-sm leading-7 md:text-base">
                    <PrismicRichText
                      field={item.achievement_description}
                      components={{
                        paragraph: ({ children }) => <p>{children}</p>,
                        list: ({ children }) => (
                          <ul className="grid gap-3">{children}</ul>
                        ),
                        listItem: ({ children }) => (
                          <li className="bg-muted/50 flex gap-3 rounded-lg p-3">
                            <IconCircleCheck className="text-primary mt-2 size-4 shrink-0" />
                            <span>{children}</span>
                          </li>
                        ),
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {certifications.length > 0 && (
        <div className="mt-16 flex flex-col gap-8 md:mt-20">
          <div className="flex max-w-3xl flex-col gap-3">
            <h3 className="font-heading text-xl leading-tight font-semibold text-balance md:text-2xl">
              {slice.primary.subsection_heading}
            </h3>

            <p className="text-muted-foreground max-w-2xl text-base leading-7">
              {slice.primary.subsection_intro}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((item, index) => (
              <CertificationCard
                key={`${item.title}-${item.issuer}-${index}`}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </Bounded>
  );
};

export default Education;
