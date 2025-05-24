import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Link from "next/link";
import {
  ExternalLink,
  Clock,
  Loader,
  CodeXml,
  Calendar1,
  CircleGauge,
  GitGraph,
  Lock,
  CheckCheck,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { PrismicRichText } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { PrismicNextLink } from "@prismicio/next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GoStack } from "react-icons/go";
import RelatedProjects from "@/components/RelatedProjects";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("project", uid).catch(() => notFound());

  const timeline = [
    {
      date: page.data.started_data,
      status: "Started",
      icon: <Calendar1 className="h-4 w-4" />,
      bgColor: "dark:bg-emerald-900/50 bg-emerald-900 ",
      textColor: "text-emerald-500",
    },
    {
      date: page.data.development_time,
      status: "Duration",
      icon: <Clock className="h-4 w-4" />,
      bgColor: "dark:bg-blue-900/50 bg-blue-900 ",
      textColor: "text-blue-500",
    },
    {
      date: page.data.current_status,
      status: "Status",
      icon: <CircleGauge className="h-4 w-4" />,
      bgColor: "bg-violet-900/50 ",
      textColor: "text-purple-500",
    },
  ];

  return (
    <Bounded className="relative z-20 py-6 md:py-10">
      {/* Breadcrumb */}
      <div>
        <div className="py-16">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="transition-colors hover:text-black/50 dark:text-slate-400 dark:hover:text-slate-300"
            >
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <Link
              href="/projects"
              className="transition-colors hover:text-black/50 dark:text-slate-400 dark:hover:text-slate-300"
            >
              Projects
            </Link>
            <span className="text-slate-600">/</span>
            <span className="dark:text-purple-500">{page.data.title}</span>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Main content - 2/3 width on desktop */}
          <div className="lg:col-span-2">
            <div className="mb-8 overflow-hidden rounded-xl border-[0.5px] border-zinc-400 bg-white/20 p-6 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-blue-850/50 md:p-8">
              {page.data.accessibility === "Open Source Project" && (
                <Badge
                  variant="outline"
                  className="mb-4 border-purple-500 bg-purple-500 text-white dark:bg-purple-950/30 dark:text-purple-500"
                >
                  {page.data.accessibility}
                </Badge>
              )}
              {page.data.accessibility === "Private Project" && (
                <Badge
                  variant="outline"
                  className="mb-4 border-slate-700 bg-slate-800 text-slate-400"
                >
                  <Lock className="mr-2 h-3 w-3" /> {page.data.accessibility}
                </Badge>
              )}
              <Heading as="h1" size="sm" className="mb-6 dark:text-white">
                {page.data.title}
              </Heading>

              <div className="prose prose-base mb-10 max-w-none dark:prose-invert">
                <SliceZone slices={page.data.slices} components={components} />
              </div>

              {/* Role & Contribution */}
              <div className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/50 text-black-100 dark:bg-violet-900/50 dark:text-purple-500">
                    <GitGraph className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-black/80 dark:text-white">
                    My Role & Contribution
                  </h2>
                </div>
                <div className="leading-relaxed dark:text-slate-300">
                  <PrismicRichText field={page.data.role_contribution} />
                </div>
              </div>

              {/* Challenges & Solutions */}
              <div className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/50 text-black-100 dark:bg-violet-900/50 dark:text-purple-500">
                    <Loader className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-black/80 dark:text-white">
                    Technical Challenges & Solutions
                  </h2>
                </div>
                <ul className="space-y-2">
                  {page.data.challenges?.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 dark:text-slate-300"
                    >
                      <CheckCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-black/80 dark:text-white/50" />
                      <span>{item.challenges || ""}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/50 text-black-100 dark:bg-violet-900/50 dark:text-purple-500">
                    <GoStack className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-black/80 dark:text-white">
                    Key Features
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {page.data.key_features?.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-black/80 dark:text-white/50" />
                      <span className="dark:text-slate-300">
                        {item.features || ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Details */}
              <div className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/50 text-black-100 dark:bg-violet-900/50 dark:text-purple-500">
                    <CodeXml className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-black/80 dark:text-white">
                    Technical Details
                  </h2>
                </div>

                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-medium text-black/90 dark:text-white/90">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {page.data.tech_stack.map((tech, index) => (
                      <span
                        key={index}
                        className="rounded-full px-3 py-1 text-xs font-medium text-white "
                        style={{ backgroundColor: tech.color || "" }}
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-medium text-black/90 dark:text-white/90">
                    Key Results & Impact
                  </h3>
                  <PrismicRichText
                    field={page.data.key_results}
                    components={{
                      listItem: ({ children }) => (
                        <li className="flex items-start">
                          <CheckCheck className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-black/80 dark:text-white/50" />
                          <span className="dark:text-slate-300">
                            {children}
                          </span>
                        </li>
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width on desktop */}
          <div className="lg:col-span-1">
            <div className="sticky top-10">
              {/* Project links */}
              <div className="mb-6 rounded-lg border-[0.5px] border-zinc-400 bg-white/20 p-6 dark:border-slate-800 dark:bg-blue-850/50">
                <h3 className="mb-4 text-lg font-medium text-black-100 dark:text-white">
                  Project Links
                </h3>
                <div className="space-y-3">
                  <PrismicNextLink
                    field={page.data.view_live}
                    className="flex w-full items-center justify-between rounded-md bg-gradient-to-r from-purple-500 to-purple-800 px-4 py-2 text-white transition-colors hover:from-purple-700 hover:to-purple-600"
                  >
                    <span className="font-medium">View Live Demo</span>
                    <ExternalLink className="h-4 w-4" />
                  </PrismicNextLink>

                  <PrismicNextLink
                    field={page.data.source_code}
                    className="flex w-full items-center justify-between rounded-md bg-slate-800 px-4 py-2 text-white transition-colors hover:bg-slate-700"
                  >
                    <span className="font-medium">View Source Code</span>
                    <FaGithub className="h-4 w-4" />
                  </PrismicNextLink>
                </div>
              </div>

              {/* Project details */}
              <div className="mb-6 rounded-lg border-[0.5px] border-zinc-400 bg-white/20 p-6 dark:border-slate-800 dark:bg-blue-850/50">
                <h3 className="mb-4 text-lg font-medium text-black-100 dark:text-white">
                  Project Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-1 text-sm font-medium text-black-100/50 dark:text-slate-400">
                      Completed In
                    </h4>
                    <p className="font-medium dark:text-white">
                      {page.data.date
                        ? new Date(page.data.date).getFullYear()
                        : ""}
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-1 text-sm font-medium text-black-100/50 dark:text-slate-400">
                      Development Time
                    </h4>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-black/80 dark:text-purple-500" />
                      <p className="font-medium dark:text-white">
                        {page.data.development_time || ""}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-1 text-sm font-medium text-black-100/50 dark:text-slate-400">
                      Current Status
                    </h4>
                    <div className="flex items-center gap-2">
                      {page.data.current_status?.trim() ===
                        "Active Development" && (
                        <>
                          <span className="relative flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500/80" />
                          </span>
                          <p className="font-medium dark:text-white">
                            {page.data.current_status}
                          </p>
                        </>
                      )}

                      {page.data.current_status?.trim() === "Completed" && (
                        <>
                          <span className="relative flex h-3 w-3">
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                          </span>
                          <p className="font-medium text-emerald-500">
                            {page.data.current_status}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-1 text-sm font-medium text-black-100/50 dark:text-slate-400">
                      Key Achievement
                    </h4>
                    <p className="font-medium dark:text-white">
                      {page.data.key_achievement || ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* Development Timeline */}
              <div className="mb-6 rounded-lg border-[0.5px] border-zinc-400 bg-white/20 p-6 dark:border-slate-800 dark:bg-blue-850/50">
                <h3 className="mb-4 text-lg font-medium text-black-100 dark:text-white">
                  Development Timeline
                </h3>
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <div key={index} className="relative pb-6 pl-6 last:pb-0">
                      {index < timeline.length - 1 && (
                        <div className="absolute left-[11px] top-8 h-full w-[1px] bg-violet-900/50"></div>
                      )}
                      <div
                        className={`absolute -left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full ${item.bgColor} ${item.textColor}`}
                      >
                        {item.icon}
                      </div>
                      <div className="ml-4">
                        <h4 className={`text-sm font-medium ${item.textColor}`}>
                          {item.status}
                        </h4>
                        <p className="font-medium dark:text-white">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="rounded-lg border-[0.5px] border-zinc-400 bg-white/20 p-6 dark:border-slate-800 dark:bg-blue-850/50">
                <h3 className="mb-4 text-lg font-medium text-black-100 dark:text-white">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {page.tags.map((tag) => (
                    <div
                      key={tag}
                      className="rounded-full bg-purple-500 px-3 py-1 text-xs font-medium text-white transition-colors duration-300 hover:text-violet-200"
                    >
                      #{tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cta */}
      <Bounded
        as="section"
        className="mb-20 rounded-xl border-[0.5px] border-zinc-400 bg-white/20 dark:border-slate-800/50 dark:bg-blue-850/50"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-black-100 dark:text-white md:text-3xl">
            Ready to Build Your Own Project?
          </h2>
          <p className="mb-8 dark:text-slate-300">
            Let&apos;s discuss how I can help you bring your vision to life with
            custom development solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-600">
                Start a Conversation
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant="outline"
                className="border-slate-700 dark:border-slate-300 hover:bg-slate-800 hover:text-white dark:text-slate-300"
              >
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </Bounded>

      <div className="my-16">
        <RelatedProjects tags={page.tags} />
      </div>
    </Bounded>
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
