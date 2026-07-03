"use client";

import type { FC } from "react";
import { useMemo, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import {
  IconArrowRight,
  IconHelpCircle,
  IconHelpHexagon,
  IconMessages,
} from "@tabler/icons-react";
import Link from "next/link";

import Bounded from "@/components/Bounded";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type FaqProps = SliceComponentProps<Content.FaqSlice>;

type CategoryId = "services" | "process" | "pricing" | "support";
type FaqCategory = {
  id: CategoryId;
  label: string;
};

const categoryTitles = {
  services: "Services & Expertise",
  process: "Development Process",
  pricing: "Pricing & Payment",
  support: "Support & Maintenance",
} satisfies Record<CategoryId, string>;

function isCategoryId(value: string | null | undefined): value is CategoryId {
  return (
    value === "services" ||
    value === "process" ||
    value === "pricing" ||
    value === "support"
  );
}

function FaqAnswer({
  field,
}: {
  field:
    | Content.FaqSliceDefaultPrimaryServicesItem["answer"]
    | Content.FaqSliceDefaultPrimaryProcessItem["answer"]
    | Content.FaqSliceDefaultPrimaryPricingItem["answer"]
    | Content.FaqSliceDefaultPrimarySupportItem["answer"];
}) {
  return (
    <div className="prose prose-neutral dark:prose-invert prose-p:text-muted-foreground prose-p:leading-7 prose-li:text-muted-foreground max-w-none">
      <PrismicRichText field={field} />
    </div>
  );
}

const Faq: FC<FaqProps> = ({ slice }) => {
  const categories = useMemo<FaqCategory[]>(
    () =>
      slice.primary.faq_categories.reduce<FaqCategory[]>((items, item) => {
        const categoryId = item.category_id;

        if (!isCategoryId(categoryId)) return items;

        items.push({
          id: categoryId,
          label: item.category_label || categoryTitles[categoryId],
        });

        return items;
      }, []),
    [slice.primary.faq_categories],
  );

  const [activeCategory, setActiveCategory] = useState<CategoryId>(
    categories[0]?.id ?? "services",
  );

  const activeItems =
    {
      services: slice.primary.services,
      process: slice.primary.process,
      pricing: slice.primary.pricing,
      support: slice.primary.support,
    }[activeCategory] ?? [];

  const activeTitle = categoryTitles[activeCategory];

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      as="section"
      className="mt-8 sm:mt-10 md:mt-20"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          {slice.primary.heading && (
            <Badge variant="secondary" className="w-fit">
              <IconHelpHexagon data-icon="inline-start" />
              {slice.primary.heading}
            </Badge>
          )}

          <h1 className="font-heading text-foreground text-3xl leading-tight font-semibold text-balance md:text-5xl">
            {slice.primary.sub_heading}
          </h1>

          {slice.primary.intro && (
            <p className="text-muted-foreground text-base leading-8 md:text-lg">
              {slice.primary.intro}
            </p>
          )}
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                type="button"
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        )}

        <Card className="bg-opacity-80 ring-foreground/5 shadow-sm">
          <CardContent className="flex flex-col gap-6 p-5 md:p-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
                  <IconHelpCircle className="size-5" />
                </div>
                <div className="flex flex-col">
                  <h2 className="font-heading text-2xl font-semibold">
                    {activeTitle}
                  </h2>
                </div>
              </div>
            </div>

            <Accordion
              type="single"
              collapsible
              className="flex flex-col gap-3"
            >
              {activeItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`${activeCategory}-${index}`}
                  className="bg-background/60 ring-foreground/10 rounded-xl px-5 shadow-sm ring-1"
                >
                  <AccordionTrigger className="text-left text-base font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <FaqAnswer field={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="bg-opacity-80 ring-foreground/5 shadow-sm">
          <CardContent className="mx-auto flex max-w-3xl flex-col items-center gap-6 p-8 text-center md:p-10">
            <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl">
              <IconMessages className="size-6" />
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl font-semibold text-balance md:text-3xl">
                Still Have Questions?
              </h2>
              <p className="text-muted-foreground leading-7">
                If you couldn&apos;t find the answer you&apos;re looking for,
                reach out directly and I&apos;ll be happy to help.
              </p>
            </div>
            <Button asChild>
              <Link href="/contact">
                Contact Me
                <IconArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Bounded>
  );
};

export default Faq;
