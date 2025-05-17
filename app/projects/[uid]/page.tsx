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
  CheckCircle,
  Loader,
  CodeXml,
  Calendar1,
  CircleGauge,
  GitGraph,
  Lock,
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
      bgColor: "bg-emerald-900/50 ",
      textColor: "text-emerald-500",
    },
    {
      date: page.data.development_time,
      status: "Duration",
      icon: <Clock className="h-4 w-4" />,
      bgColor: "bg-blue-900/50 ",
      textColor: "text-blue-500",
    },
    {
      date: page.data.current_status,
      status: "Status",
      icon: <CircleGauge className="h-4 w-4" />,
      bgColor: "bg-indigo-900/50 ",
      textColor: "text-purple",
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
              className="text-slate-400 transition-colors hover:text-slate-300"
            >
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <Link
              href="/projects"
              className="text-slate-400 transition-colors hover:text-slate-300"
            >
              Projects
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-indigo-500">{page.data.title}</span>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Main content - 2/3 width on desktop */}
          <div className="lg:col-span-2">
            <div className="mb-8 overflow-hidden rounded-xl border-[0.5px] border-slate-800 bg-blue-850/50 p-6 shadow-xl backdrop-blur-sm md:p-8">
              {page.data.accessibility === "Open Source Project" && (
                <Badge
                  variant="outline"
                  className="mb-4 border-indigo-800 bg-indigo-950/30 text-indigo-500"
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
              <Heading as="h1" size="sm" className="mb-6 text-white">
                {page.data.title}
              </Heading>

              <div className="prose prose-base prose-invert mb-10 max-w-none">
                <SliceZone slices={page.data.slices} components={components} />
              </div>

              {/* Role & Contribution */}
              <div className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-900/50 text-purple">
                    <GitGraph className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    My Role & Contribution
                  </h2>
                </div>
                <div className="leading-relaxed text-slate-300">
                  <PrismicRichText field={page.data.role_contribution} />
                </div>
              </div>

              {/* Challenges & Solutions */}
              <div className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-900/50 text-purple">
                    <Loader className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Technical Challenges & Solutions
                  </h2>
                </div>
                <ul className="space-y-2">
                  {page.data.challenges?.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-slate-300"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-500/80" />
                      <span>{item.challenges || ""}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-900/50 text-purple">
                    <GoStack className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Key Features</h2>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {page.data.key_features?.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-500/80" />
                      <span className="text-slate-300">
                        {item.features || ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Details */}
              <div className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-900/50 text-purple">
                    <CodeXml className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Technical Details
                  </h2>
                </div>

                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-medium text-indigo-500">
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
                  <h3 className="mb-3 text-lg font-medium text-indigo-500">
                    Key Results & Impact
                  </h3>
                  <PrismicRichText
                    field={page.data.key_results}
                    components={{
                      listItem: ({ children }) => (
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-500/80" />
                          <span className="text-slate-300">{children}</span>
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
              <div className="mb-6 rounded-lg border-[0.5px] border-slate-800 bg-blue-850/50 p-6">
                <h3 className="mb-4 text-lg font-medium text-white">
                  Project Links
                </h3>
                <div className="space-y-3">
                  <PrismicNextLink
                    field={page.data.view_live}
                    className="flex w-full items-center justify-between rounded-md bg-gradient-to-r from-indigo-600 to-purple px-4 py-2 text-white transition-colors hover:from-indigo-700 hover:to-purple"
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
              <div className="mb-6 rounded-lg border-[0.5px] border-slate-800 bg-blue-850/50 p-6">
                <h3 className="mb-4 text-lg font-medium text-white">
                  Project Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-1 text-sm font-medium text-slate-400">
                      Completed In
                    </h4>
                    <p className="font-medium text-white">
                      {page.data.date
                        ? new Date(page.data.date).getFullYear()
                        : ""}
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-1 text-sm font-medium text-slate-400">
                      Development Time
                    </h4>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-indigo-500" />
                      <p className="font-medium text-white">
                        {page.data.development_time || ""}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-1 text-sm font-medium text-slate-400">
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
                          <p className="font-medium text-white">
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
                    <h4 className="mb-1 text-sm font-medium text-slate-400">
                      Key Achievement
                    </h4>
                    <p className="font-medium text-white">
                      {page.data.key_achievement || ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* Development Timeline */}
              <div className="mb-6 rounded-lg border-[0.5px] border-slate-800 bg-blue-850/50 p-6">
                <h3 className="mb-4 text-lg font-medium text-white">
                  Development Timeline
                </h3>
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <div key={index} className="relative pb-6 pl-6 last:pb-0">
                      {index < timeline.length - 1 && (
                        <div className="absolute left-[11px] top-8 h-full w-[1px] bg-indigo-900/50"></div>
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
                        <p className="font-medium text-white">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="rounded-lg border-[0.5px] border-slate-800 bg-blue-850/50 p-6">
                <h3 className="mb-4 text-lg font-medium text-white">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {page.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag}`}
                      className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300 transition-colors hover:bg-slate-700"
                    >
                      #{tag}
                    </Link>
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
        className="mb-20 rounded-xl border-[0.5px] border-slate-800/50 bg-blue-850/50"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Ready to Build Your Own Project?
          </h2>
          <p className="mb-8 text-slate-300">
            Let&apos;s discuss how I can help you bring your vision to life with
            custom development solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple text-white hover:from-indigo-700 hover:to-purple">
                Start a Conversation
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
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
