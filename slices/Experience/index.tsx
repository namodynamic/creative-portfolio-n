import Bounded from "@/components/Bounded";
import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import {
  IconBriefcase,
  IconCalendar,
  IconCircleCheck,
} from "@tabler/icons-react";

import type { JSX } from "react";

export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  return (
    <Bounded
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="pt-0"
    >
      <SectionHeader
        eyebrow={slice.primary.sub_heading}
        title={slice.primary.heading}
        description={slice.primary.intro}
        icon={<IconBriefcase data-icon="inline-start" className="size-3.5" />}
      />

      <div className="relative mt-12 grid gap-5 lg:mt-14">
        <div className="bg-border absolute top-4 bottom-4 left-5 hidden w-px md:block" />

        {slice.items
          .slice()
          .reverse()
          .map((item, index) => (
            <article
              key={`${item.company}-${item.time_period}-${index}`}
              className="relative grid gap-4 md:grid-cols-[2.5rem_minmax(0,1fr)]"
            >
              <div className="relative z-10 hidden md:flex">
                <div
                  className="bg-card ring-background flex size-10 items-center justify-center rounded-full ring-4"
                  style={{
                    borderColor: item.icon_bg || undefined,
                    borderWidth: item.icon_bg ? 1 : undefined,
                  }}
                >
                  {isFilled.image(item.icon) ? (
                    <PrismicNextImage
                      field={item.icon}
                      className="size-7 rounded-full object-contain"
                    />
                  ) : (
                    <IconBriefcase className="text-muted-foreground size-5" />
                  )}
                </div>
              </div>

              <Card
                size="sm"
                className="bg-opacity-80 hover:bg-card transition-colors duration-500"
              >
                <CardHeader className="gap-3">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 space-y-1">
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.company}</CardDescription>
                    </div>

                    {item.time_period && (
                      <Badge variant="outline">
                        <IconCalendar data-icon="inline-start" />
                        {item.time_period}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="text-muted-foreground space-y-3 text-sm leading-7 md:text-base">
                    <PrismicRichText
                      field={item.description}
                      components={{
                        paragraph: ({ children }) => <p>{children}</p>,
                        list: ({ children }) => (
                          <ul className="grid gap-3">{children}</ul>
                        ),
                        listItem: ({ children }) => (
                          <li className="flex gap-3">
                            <IconCircleCheck className="mt-2 size-3 shrink-0" />
                            <span>{children}</span>
                          </li>
                        ),
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}
      </div>
    </Bounded>
  );
};

export default Experience;
