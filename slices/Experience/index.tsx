"use client";

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
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useRef, type JSX } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const experienceItems = slice.items.slice().reverse();

  useGSAP(
    () => {
      const timelineLine = gsap.utils.toArray<HTMLElement>(
        "[data-experience-line]",
      );
      const cards = gsap.utils.toArray<HTMLElement>("[data-experience-item]");
      const markers = gsap.utils.toArray<HTMLElement>(
        "[data-experience-marker]",
      );
      const animatedElements = [...timelineLine, ...cards, ...markers];

      if (animatedElements.length === 0) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(animatedElements, {
          autoAlpha: 1,
          clearProps: "transform",
        });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      timeline
        .fromTo(
          timelineLine,
          {
            scaleY: 0,
            transformOrigin: "top",
          },
          {
            scaleY: 1,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform",
          },
          "-=0.45",
        )
        .fromTo(
          markers,
          {
            autoAlpha: 0,
            scale: 0.86,
          },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.55,
            ease: "back.out(1.5)",
            stagger: 0.1,
            clearProps: "transform",
          },
          "-=0.55",
        )
        .fromTo(
          cards,
          {
            autoAlpha: 0,
            y: 28,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
            clearProps: "transform",
          },
          "-=0.45",
        );
    },
    { scope: sectionRef, dependencies: [experienceItems.length] },
  );

  return (
    <Bounded
      as="section"
      ref={sectionRef}
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
        <div
          data-experience-line
          className="bg-border absolute top-4 bottom-4 left-5 hidden w-px md:block"
        />

        {experienceItems.map((item, index) => (
          <article
            key={`${item.company}-${item.time_period}-${index}`}
            data-experience-item
            className="relative grid gap-4 md:grid-cols-[2.5rem_minmax(0,1fr)]"
          >
            <div
              data-experience-marker
              className="relative z-10 hidden md:flex"
            >
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
              className="bg-card/40 hover:bg-card ring-foreground/5 transition-colors duration-500"
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
