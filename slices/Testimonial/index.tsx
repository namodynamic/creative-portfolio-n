"use client";

import type { JSX, ReactNode } from "react";
import { useMemo } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import AutoScroll from "embla-carousel-auto-scroll";
import type { MotionProps } from "motion/react";
import { motion } from "motion/react";
import { IconMessageCircle } from "@tabler/icons-react";
import Bounded from "@/components/Bounded";
import SectionHeader from "@/components/SectionHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export type TestimonialProps = SliceComponentProps<Content.TestimonialSlice>;

type MotionWrapProps = {
  children: ReactNode;
  className?: string;
} & MotionProps;

function getInitials(name: string | null | undefined) {
  if (!name) {
    return "AN";
  }

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.at(0))
    .join("")
    .toUpperCase();
}

function MotionWrap({ children, className, ...props }: MotionWrapProps) {
  return (
    <motion.div className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}

function TestimonialCard({
  item,
}: {
  item: Content.TestimonialSlice["items"][number];
}) {
  return (
    <Card
      size="sm"
      className="bg-card/40 ring-foreground/5 hover:bg-card h-52 rounded-xl p-0 shadow-sm transition-colors md:h-56"
    >
      <CardHeader className="flex flex-row items-center gap-3 p-4 pb-2">
        <Avatar className="size-11 rounded-lg">
          <AvatarImage
            src={item.avatar.url ?? undefined}
            alt={item.avatar.alt ?? item.name ?? "Anonymous"}
            className="rounded-lg"
          />
          <AvatarFallback className="rounded-lg">
            {getInitials(item.name)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <CardTitle className="truncate text-base font-semibold md:text-lg">
            {item.name || "Anonymous"}
          </CardTitle>
          {item.occupation && (
            <CardDescription className="truncate text-sm">
              {item.occupation}
            </CardDescription>
          )}
        </div>
      </CardHeader>

      <CardContent className="overflow-hidden p-4 pt-2">
        <div className="text-card-foreground text-sm leading-7 [&_p]:m-0 [&_p]:line-clamp-4">
          <PrismicRichText field={item.feedback} />
        </div>
      </CardContent>
    </Card>
  );
}

function TestimonialCarouselRow({
  items,
  direction = "forward",
  className,
}: {
  items: Content.TestimonialSlice["items"];
  direction?: "forward" | "backward";
  className?: string;
}) {
  const repeatedItems = useMemo(() => {
    if (!items.length) {
      return [];
    }

    const repeatCount = Math.max(2, Math.ceil(8 / items.length));
    return Array.from({ length: repeatCount }, () => items).flat();
  }, [items]);
  const autoScroll = useMemo(
    () =>
      AutoScroll({
        direction,
        playOnInit: true,
        speed: 0.65,
        startDelay: 250,
        stopOnFocusIn: true,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [direction],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn("w-full", className)}
    >
      <Carousel
        plugins={[autoScroll]}
        opts={{
          align: "start",
          dragFree: true,
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {repeatedItems.map((item, index) => (
            <CarouselItem
              key={`${direction}-${item.name || "testimonial"}-${index}`}
              className="basis-[84%] sm:basis-80 md:basis-96 lg:basis-md"
            >
              <div className="h-full p-1">
                <TestimonialCard item={item} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </motion.div>
  );
}

function CompanyPill({
  item,
}: {
  item: Content.TestimonialSlice["primary"]["companies"][number];
}) {
  return (
    <div className="border-border/60 bg-card flex max-w-48 items-center rounded-full border px-3 py-2">
      <div className="flex min-w-0 items-center justify-center gap-2">
        <PrismicNextImage
          field={item.company_logo}
          className="size-5 shrink-0 object-contain md:size-6"
          fallbackAlt=""
        />

        <h3 className="text-foreground truncate text-sm font-medium">
          {item.company_name}
        </h3>
      </div>
    </div>
  );
}

const Testimonial = ({ slice }: TestimonialProps): JSX.Element => {
  const [firstRow, secondRow] = useMemo(() => {
    const middle = Math.ceil(slice.items.length / 2);
    return [slice.items.slice(0, middle), slice.items.slice(middle)];
  }, [slice.items]);

  return (
    <Bounded
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden py-16 md:py-24 lg:py-28"
    >
      <MotionWrap
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col gap-10 md:gap-14"
      >
        <SectionHeader
          eyebrow="Client feedback"
          title={slice.primary.title}
          description="A few signals from teams and clients who trusted me to turn product ideas into reliable shipped software."
          icon={<IconMessageCircle data-icon="inline-start" />}
          align="center"
        />

        <div className="relative flex flex-col items-center justify-center gap-4 overflow-hidden">
          <TestimonialCarouselRow items={firstRow} />

          {secondRow.length > 0 && (
            <TestimonialCarouselRow
              items={secondRow}
              direction="backward"
              className="hidden md:block"
            />
          )}

          <div className="from-background pointer-events-none absolute inset-y-0 left-0 hidden w-1/5 bg-linear-to-r md:block" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 hidden w-1/5 bg-linear-to-l md:block" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8"
        >
          {slice.primary.companies.map((item, index) => (
            <CompanyPill key={index} item={item} />
          ))}
        </motion.div>
      </MotionWrap>
    </Bounded>
  );
};

export default Testimonial;
