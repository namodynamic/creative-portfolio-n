import type { Metadata } from "next";
import type { ComponentType, ReactNode } from "react";
import { notFound } from "next/navigation";
import { asImageSrc, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import {
  IconBrandGithub,
  IconBriefcase,
  IconCalendar,
  IconChecks,
  IconCircleCheck,
  IconClock,
  IconCode,
  IconExternalLink,
  IconGauge,
  IconGitBranch,
  IconLock,
  IconRocket,
  IconStack2,
  IconTag,
  type IconProps,
} from "@tabler/icons-react";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import RelatedProjects from "@/components/RelatedProjects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Params = { uid: string };

type DetailSectionProps = {
  title: string;
  icon: ComponentType<IconProps>;
  children: ReactNode;
};

function DetailSection({ title, icon: Icon, children }: DetailSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-xl">
          <Icon className="size-5" />
        </div>
        <h2 className="font-heading text-foreground text-xl font-semibold">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function StatusIndicator({ status }: { status: string | null }) {
  const isCompleted = status?.trim() === "Completed";
  const isActive = status?.trim() === "Active Development";

  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative flex size-3">
        {isActive && (
          <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
        )}
        <span className="bg-primary relative inline-flex size-3 rounded-full" />
      </span>
      <span className="font-medium">
        {status || (isCompleted ? "Completed" : "In progress")}
      </span>
    </span>
  );
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("project", uid).catch(() => notFound());

  const timeline = [
    {
      date: page.data.started_data,
      status: "Started",
      icon: IconCalendar,
    },
    {
      date: page.data.development_time,
      status: "Duration",
      icon: IconClock,
    },
    {
      date: page.data.current_status,
      status: "Status",
      icon: IconGauge,
    },
  ];

  const isPrivate = page.data.accessibility === "Private Project";

  return (
    <main>
      <Bounded className="relative mt-5 sm:mt-10">
        <Breadcrumb className="mb-10">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/projects">Projects</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{page.data.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Card className="bg-opacity-80 ring-foreground/5 shadow-sm backdrop-blur">
              <CardHeader className="gap-6 p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  {page.data.accessibility && (
                    <Badge variant={isPrivate ? "outline" : "secondary"}>
                      {isPrivate && <IconLock data-icon="inline-start" />}
                      {page.data.accessibility}
                    </Badge>
                  )}

                  {page.data.current_status && (
                    <Badge variant="outline">{page.data.current_status}</Badge>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <Heading as="h1" size="sm" className="text-balance">
                    {page.data.title}
                  </Heading>

                  {page.data.meta_description && (
                    <CardDescription className="max-w-3xl text-base leading-7 md:text-lg">
                      {page.data.meta_description}
                    </CardDescription>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex flex-col gap-12 p-6 pt-0 md:p-8 md:pt-0">
                <div>
                  <SliceZone
                    slices={page.data.slices}
                    components={components}
                  />
                </div>

                <DetailSection
                  title="My Role & Contribution"
                  icon={IconGitBranch}
                >
                  <div className="prose prose-neutral dark:prose-invert prose-p:text-muted-foreground prose-p:leading-8 max-w-none">
                    <PrismicRichText field={page.data.role_contribution} />
                  </div>
                </DetailSection>

                <DetailSection
                  title="Technical Challenges & Solutions"
                  icon={IconChecks}
                >
                  <ul className="text-muted-foreground grid gap-3">
                    {page.data.challenges?.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <IconCircleCheck className="text-primary mt-1 size-3.5 shrink-0" />
                        <span>{item.challenges || ""}</span>
                      </li>
                    ))}
                  </ul>
                </DetailSection>

                <DetailSection title="Key Features" icon={IconStack2}>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {page.data.key_features?.map((item, index) => (
                      <div
                        key={index}
                        className="text-muted-foreground flex gap-3"
                      >
                        <IconCircleCheck className="text-primary mt-1 size-3.5 shrink-0" />
                        <span>{item.features || ""}</span>
                      </div>
                    ))}
                  </div>
                </DetailSection>

                <DetailSection title="Technical Details" icon={IconCode}>
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                      <h3 className="font-heading text-foreground text-base font-medium">
                        Technology Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {page.data.tech_stack.map((tech, index) => (
                          <Badge key={index} variant="outline">
                            {tech.color && (
                              <span
                                className="size-2 rounded-full"
                                style={{ backgroundColor: tech.color }}
                              />
                            )}
                            {tech.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <h3 className="font-heading text-foreground text-base font-medium">
                        Key Results & Impact
                      </h3>
                      <div className="prose prose-neutral dark:prose-invert prose-li:text-muted-foreground max-w-none">
                        <PrismicRichText
                          field={page.data.key_results}
                          components={{
                            listItem: ({ children }) => (
                              <li className="flex gap-3">
                                <IconCircleCheck className="text-primary mt-1 size-3.5 shrink-0" />
                                <span>{children}</span>
                              </li>
                            ),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </DetailSection>
              </CardContent>
            </Card>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 flex flex-col gap-6">
              <Card
                size="sm"
                className="bg-opacity-80 ring-foreground/5 shadow-sm"
              >
                <CardHeader>
                  <CardTitle>Project Links</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  {isFilled.link(page.data.view_live) && (
                    <Button asChild className="w-full justify-between">
                      <PrismicNextLink field={page.data.view_live}>
                        View Live Demo
                        <IconExternalLink data-icon="inline-end" />
                      </PrismicNextLink>
                    </Button>
                  )}

                  {isFilled.link(page.data.source_code) && (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <PrismicNextLink field={page.data.source_code}>
                        View Source Code
                        <IconBrandGithub data-icon="inline-end" />
                      </PrismicNextLink>
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card
                size="sm"
                className="bg-opacity-80 ring-foreground/5 shadow-sm"
              >
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground text-sm font-medium">
                      Development Time
                    </span>
                    <span className="inline-flex items-center gap-2 font-medium">
                      <IconClock className="text-primary size-4" />
                      {page.data.development_time || ""}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground text-sm font-medium">
                      Current Status
                    </span>
                    <StatusIndicator status={page.data.current_status} />
                  </div>

                  <Separator />

                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground text-sm font-medium">
                      Key Achievement
                    </span>
                    <span className="font-medium">
                      {page.data.key_achievement || ""}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card
                size="sm"
                className="bg-opacity-80 ring-foreground/5 shadow-sm"
              >
                <CardHeader>
                  <CardTitle>Development Timeline</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  {timeline.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div key={index} className="relative flex gap-4">
                        {index < timeline.length - 1 && (
                          <div className="bg-border absolute top-9 left-4 h-full w-px" />
                        )}
                        <div className="bg-primary/10 text-primary relative flex size-8 shrink-0 items-center justify-center rounded-full">
                          <Icon className="size-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground text-sm font-medium">
                            {item.status}
                          </span>
                          <span className="font-medium">{item.date}</span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {page.tags.length > 0 && (
                <Card
                  size="sm"
                  className="bg-opacity-80 ring-foreground/5 shadow-sm"
                >
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {page.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        <IconTag data-icon="inline-start" />
                        {tag}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </aside>
        </div>

        <Card className="bg-opacity-80 ring-foreground/5 mb-20 shadow-sm backdrop-blur">
          <CardContent className="mx-auto flex max-w-3xl flex-col items-center gap-6 p-8 text-center md:p-10">
            <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl">
              <IconRocket className="size-6" />
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-heading text-2xl font-semibold text-balance md:text-3xl">
                Ready to Build Your Own Project?
              </h2>
              <p className="text-muted-foreground leading-7">
                Let&apos;s discuss how I can help you bring your vision to life
                with thoughtful product engineering.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href="/contact">
                  Start a Conversation
                  <IconBriefcase data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <RelatedProjects tags={page.tags} />
      </Bounded>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("project", uid).catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("project");

  return pages.map((page) => ({ uid: page.uid }));
}
