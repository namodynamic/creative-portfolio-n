import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import Bounded from "@/components/Bounded";

import Link from "next/link";
import {
  Code,
  Database,
  Server,
  Rocket,
  FileText,
  Globe,
  CheckCircle,
  ArrowRight,
  Lock,
  RefreshCw,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PrismicNextLink } from "@prismicio/next";

const serviceIcons: { [key: string]: React.ReactNode } = {
  code: <Code className="h-6 w-6 text-indigo-500" />,
  server: <Server className="h-6 w-6 text-indigo-500" />,
  database: <Database className="h-6 w-6 text-indigo-500" />,
  rocket: <Rocket className="h-6 w-6 text-indigo-500" />,
};

const processIcons: { [key: string]: React.ReactNode } = {
  lock: <Lock className="h-6 w-6 text-indigo-500" />,
  code: <Code className="h-6 w-6 text-indigo-500" />,
  refresh: <RefreshCw className="h-6 w-6 text-indigo-500" />,
  rocket: <Rocket className="h-6 w-6 text-indigo-500" />,
};

const packageIcons: { [key: string]: React.ReactNode } = {
  file: <FileText className="h-8 w-8 text-indigo-500" />,
  globe: <Globe className="h-8 w-8 text-indigo-500" />,
  rocket: <Rocket className="h-8 w-8 text-indigo-500" />,
};

/**
 * Props for `Services`.
 */
export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

/**
 * Component for "Services" Slices.
 */
const Services: FC<ServicesProps> = ({ slice }) => {
  return (
    <Bounded
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-2 text-sm uppercase tracking-wider text-indigo-500">
            {slice.primary.heading}
          </p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            {slice.primary.sub_heading}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            {slice.primary.intro}
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {slice.primary.services.map((service, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-800 bg-blue-850/50 p-6 shadow-lg backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center">
                <div className="mr-3 rounded-md bg-indigo-500/10 p-2">
                  {serviceIcons[service.icons as string]}
                </div>
                <h2 className="text-xl font-bold text-white">
                  {service.title}
                </h2>
              </div>
              <p className="mb-4 text-gray-300">{service.description}</p>
              <div className="mb-6 space-y-2">
                <div className="flex items-start">
                  <PrismicRichText
                    field={service.features}
                    components={{
                      listItem: ({ children }) => (
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-500" />
                          <span className="text-gray-300 text-sm">{children}</span>
                        </li>
                      ),
                    }}
                  />
                </div>
              </div>
              <PrismicNextLink
                field={service.link_url}
                className="inline-flex items-center font-medium text-indigo-500 hover:text-indigo-400"
              >
                {service.link_text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </PrismicNextLink>
            </div>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm uppercase tracking-wider text-indigo-500">
              {slice.primary.package_heading}
            </p>
            <h2 className="mb-4 text-3xl font-bold text-white">
              {slice.primary.package_sub_heading}
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-300">
              {slice.primary.package_intro}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {slice.primary.packages.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-gray-800 bg-blue-850/50 p-6 shadow-lg backdrop-blur-sm"
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/10 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="mb-6 flex justify-center">
                    <div className="transform rounded-full bg-emerald-500/10 p-3 transition-transform group-hover:scale-110">
                      {packageIcons[item.icons as string]}
                    </div>
                  </div>
                  <h3 className="mb-3 text-center text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mb-6 text-center h-14 text-gray-300">
                    {item.description}
                  </p>
                  <div className="mb-8 justify-items-center space-y-3">
                    <PrismicRichText
                      field={item.package_features}
                      components={{
                        listItem: ({ children }) => (
                          <li className="flex items-start">
                            <CheckCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-500" />
                            <span className="text-sm text-gray-300">
                              {children}
                            </span>
                          </li>
                        ),
                      }}
                    />
                  </div>
                  <div className="mb-6 text-center">
                    <span className="inline-block rounded-full bg-indigo-500/20 px-4 py-1 text-sm font-medium text-indigo-400">
                      {item.tag}
                    </span>
                  </div>

                  <div className="text-center">
                    <PrismicNextLink
                      field={item.link_url}
                      className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple px-6 py-3 font-medium text-white shadow-lg transition-all hover:bg-indigo-700 hover:from-indigo-700 hover:to-purple2"
                    >
                      {item.link_text}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </PrismicNextLink>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:flex items-center justify-center space-x-1 text-center">
            <CheckCircle className="h-4 w-4 mr-1 inline-block text-indigo-500" />
            <p className="text-xs leading-relaxed text-gray-400">
              Flexible payment plans available for all packages. Ask about our
              50% upfront option.
            </p>
          </div>
        </div>
      </div>

      {/* Development Process */}
      <div className="bg-blue-850/50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-white">
            {slice.primary.development_process}
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {slice.primary.dev_process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-indigo-500/10 p-3">
                    {processIcons[item.icons as string]}
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  {item.process}
                </h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className=" mt-16 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm uppercase tracking-wider text-indigo-500">
              FAQ
            </p>
            <h2 className="mb-4 text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-300">
              Quick answers to common questions about my services and process
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {slice.primary.services_faq.map((item, index) => (
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
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center text-indigo-500 hover:text-indigo-400"
            >
              View all FAQs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* CTA  */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-lg border-[0.5px] border-gray-800 bg-blue-850/70 p-6 text-center shadow-lg backdrop-blur-sm sm:p-12">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to Transform Your Ideas Into Reality?
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-300">
            Let&apos;s discuss your project requirements and how I can help you
            build a scalable, efficient solution tailored to your business
            needs.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-md bg-gradient-to-r from-indigo-600 to-purple px-6 py-3 font-medium text-white shadow-lg transition-all hover:bg-emerald-700 hover:from-indigo-700 hover:to-purple2"
            >
              Start a Conversation
            </Link>
            <Link
              href="/projects"
              className="rounded-md border border-gray-700 bg-transparent px-6 py-3 font-medium text-white shadow-lg transition-all hover:bg-blue-850 hover:text-gray-300"
            >
              View My Projects
            </Link>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Services;
