"use client";

import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MagicButton from "@/components/ui/MagicButton";
import Bounded from "@/components/Bounded";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Props for `Faq`.
 */
export type FaqProps = SliceComponentProps<Content.FaqSlice>;

/**
 * Component for "Faq" Slices.
 */
const Faq: FC<FaqProps> = ({ slice }) => {
  const [activeCategory, setActiveCategory] = useState("services");

  const categories = slice.primary.faq_categories.map((item) => ({
    id: item.category_id,
    label: item.category_label,
  }));

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      as="section"
    >
      <div className="mx-auto max-w-5xl py-8 md:py-16">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm uppercase tracking-wider text-indigo-500">
            {slice.primary.heading}
          </p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            {slice.primary.sub_heading}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            {slice.primary.intro}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id || "default")}
              className={`rounded-md px-6 py-3 text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-indigo-600 text-white"
                  : "bg-[#0a0e29]/50 text-gray-300 hover:bg-[#0a0e29] hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Content */}
        <div className="mb-16">
          {activeCategory === "services" && (
            <>
              <h2 className="mb-6 text-2xl font-bold text-indigo-500">
                Services & Expertise
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {slice.primary.services.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="rounded-lg border border-gray-800 bg-blue-850/50 px-6 shadow-lg backdrop-blur-sm"
                  >
                    <AccordionTrigger className="text-lg font-medium text-white">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-base prose-invert">
                      <PrismicRichText field={item.answer} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          )}
          {activeCategory === "process" && (
            <>
              <h2 className="mb-6 text-2xl font-bold text-indigo-500">
                Development Process
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {slice.primary.process?.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="rounded-lg border border-gray-800 bg-blue-850/50 px-6 shadow-lg backdrop-blur-sm"
                  >
                    <AccordionTrigger className="text-lg font-medium text-white">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-base prose-invert">
                      <PrismicRichText field={item.answer} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          )}
          {activeCategory === "pricing" && (
            <>
              <h2 className="mb-6 text-2xl font-bold text-indigo-500">
                Pricing & Payment
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {slice.primary.pricing?.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="rounded-lg border border-gray-800 bg-blue-850/50 px-6 shadow-lg backdrop-blur-sm"
                  >
                    <AccordionTrigger className="text-lg font-medium text-white">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-base prose-invert">
                      <PrismicRichText field={item.answer} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          )}
          {activeCategory === "support" && (
            <>
              <h2 className="mb-6 text-2xl font-bold text-indigo-500">
                Support & Maintenance
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {slice.primary.support?.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="rounded-lg border-[0.5px] border-gray-800 bg-blue-850/50 px-6 shadow-lg backdrop-blur-sm"
                  >
                    <AccordionTrigger className="text-lg font-medium text-white">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-base prose-invert">
                      <PrismicRichText field={item.answer} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          )}
        </div>

        {/* cta */}
        <div className="rounded-xl border-[0.5px] border-gray-800 bg-blue-850/70 p-8 text-center shadow-lg backdrop-blur-sm md:p-12">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Still Have Questions?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-300">
            If you couldn&apos;t find the answer you&apos;re looking for, feel
            free to reach out directly and I&apos;ll be happy to help.
          </p>

          <Link href="/contact">
            <MagicButton
              title="Contact Me"
              icon={
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              }
              position="right"
              otherClasses="group"
            />
          </Link>
        </div>
      </div>
    </Bounded>
  );
};

export default Faq;
