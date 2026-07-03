import type { ComponentType, FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import {
  IconArrowRight,
  IconCheck,
  IconCode,
  IconDatabase,
  IconFileText,
  IconGlobe,
  IconLock,
  IconRocket,
  IconRotateClockwise,
  IconServer,
  IconTools,
  type IconProps,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

type IconKey = "code" | "server" | "database" | "rocket" | "file" | "globe";
type ProcessIconKey = "lock" | "code" | "refresh" | "rocket";

const serviceIcons = {
  code: IconCode,
  server: IconServer,
  database: IconDatabase,
  rocket: IconRocket,
  file: IconFileText,
  globe: IconGlobe,
} satisfies Record<IconKey, ComponentType<IconProps>>;

const processIcons = {
  lock: IconLock,
  code: IconCode,
  refresh: IconRotateClockwise,
  rocket: IconRocket,
} satisfies Record<ProcessIconKey, ComponentType<IconProps>>;

function getIcon(
  icons: Record<string, ComponentType<IconProps>>,
  key: string | null,
  fallback: ComponentType<IconProps>,
) {
  return icons[key ?? ""] ?? fallback;
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
}) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
      {eyebrow && (
        <Badge variant="secondary" className="uppercase">
          <IconTools data-icon="inline-start" />
          {eyebrow}
        </Badge>
      )}
      {title && (
        <h2 className="font-heading text-foreground text-3xl leading-tight font-semibold text-balance md:text-5xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-muted-foreground text-base leading-8 md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

function FeatureList({
  field,
}: {
  field:
    | Content.ServicesSliceDefaultPrimaryServicesItem["features"]
    | Content.ServicesSliceDefaultPrimaryPackagesItem["package_features"];
}) {
  return (
    <div className="text-muted-foreground text-sm">
      <PrismicRichText
        field={field}
        components={{
          list: ({ children }) => (
            <ul className="flex flex-col gap-3">{children}</ul>
          ),
          listItem: ({ children }) => (
            <li className="flex gap-3">
              <IconCheck className="text-primary mt-0.5 size-4 shrink-0" />
              <span>{children}</span>
            </li>
          ),
        }}
      />
    </div>
  );
}

const Services: FC<ServicesProps> = ({ slice }) => {
  return (
    <Bounded
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-8 sm:mt-10 md:mt-20"
    >
      <div className="flex flex-col gap-20">
        <SectionIntro
          eyebrow={slice.primary.heading}
          title={slice.primary.sub_heading}
          description={slice.primary.intro}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {slice.primary.services.map((service, index) => {
            const Icon = getIcon(serviceIcons, service.icons, IconCode);

            return (
              <Card
                key={index}
                size="sm"
                className="bg-opacity-80 ring-foreground/5 shadow-sm transition-transform hover:-translate-y-1"
              >
                <CardHeader className="gap-5">
                  <div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl">
                    <Icon className="size-5" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base leading-7">
                      {service.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <FeatureList field={service.features} />
                </CardContent>
                {isFilled.link(service.link_url) && (
                  <CardFooter className="bg-opacity-80 border-t-0">
                    <Button asChild variant="outline" className="w-full">
                      <PrismicNextLink field={service.link_url}>
                        {service.link_text || "Discuss this service"}
                        <IconArrowRight data-icon="inline-end" />
                      </PrismicNextLink>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            );
          })}
        </div>

        <div className="flex flex-col gap-10">
          <SectionIntro
            eyebrow={slice.primary.package_heading}
            title={slice.primary.package_sub_heading}
            description={slice.primary.package_intro}
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {slice.primary.packages.map((item, index) => {
              const Icon = getIcon(serviceIcons, item.icons, IconFileText);

              return (
                <Card
                  size="sm"
                  key={index}
                  className="bg-opacity-80 ring-foreground/5 shadow-sm transition-transform hover:-translate-y-1"
                >
                  <CardHeader className="gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-2xl">
                        <Icon className="size-5" />
                      </div>
                      {item.tag && (
                        <Badge variant="secondary">{item.tag}</Badge>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <CardDescription className="leading-7">
                        {item.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <FeatureList field={item.package_features} />
                  </CardContent>
                  {isFilled.link(item.link_url) && (
                    <CardFooter className="bg-opacity-80 border-t-0">
                      <Button asChild className="w-full">
                        <PrismicNextLink field={item.link_url}>
                          {item.link_text || "Get started"}
                          <IconArrowRight data-icon="inline-end" />
                        </PrismicNextLink>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              );
            })}
          </div>

          <p className="text-muted-foreground mx-auto flex max-w-2xl items-center justify-center gap-2 text-center text-sm leading-7">
            <IconCheck className="text-primary size-4 shrink-0" />
            Flexible payment plans available for all packages. Ask about the 50%
            upfront option.
          </p>
        </div>

        <Card className="bg-opacity-80 ring-foreground/5 shadow-sm">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-2xl md:text-3xl">
              {slice.primary.development_process}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              {slice.primary.dev_process.map((item, index) => {
                const Icon = getIcon(processIcons, item.icons, IconCode);

                return (
                  <div key={index} className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
                        <Icon className="size-5" />
                      </div>
                      <span className="text-muted-foreground text-sm font-medium">
                        Step {index + 1}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-heading text-lg font-semibold">
                        {item.process}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-7">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
          <SectionIntro
            eyebrow="FAQs"
            title="Frequently Asked Questions"
            description="Quick answers to common questions about my services and process."
          />

          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {slice.primary.services_faq.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card ring-foreground/10 rounded-xl px-5 shadow-sm ring-1"
              >
                <AccordionTrigger className="text-left text-base font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose prose-neutral dark:prose-invert prose-p:text-muted-foreground prose-p:leading-7 max-w-none">
                    <PrismicRichText field={item.answer} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Button size="sm" asChild variant="outline" className="mx-auto">
            <Link href="/faq">
              View all FAQs
              <IconArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        <Card className="bg-opacity-80 ring-foreground/5 shadow-sm">
          <CardContent className="mx-auto flex max-w-3xl flex-col items-center gap-6 p-8 text-center md:p-10">
            <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl">
              <IconRocket className="size-6" />
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl font-semibold text-balance md:text-3xl">
                Ready to Transform Your Ideas Into Reality?
              </h2>
              <p className="text-muted-foreground leading-7">
                Let&apos;s discuss your project requirements and how I can help
                you build a scalable, efficient solution tailored to your
                business needs.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="sm" asChild>
                <Link href="/contact">
                  Start a Conversation
                  <IconArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button size="sm" asChild variant="outline">
                <Link href="/projects">View My Projects</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Bounded>
  );
};

export default Services;
