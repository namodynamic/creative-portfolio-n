import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";
import {
  IconBook2,
  IconCalendar,
  IconChevronLeft,
  IconClock,
  IconFolder,
  IconSparkles,
  IconTag,
} from "@tabler/icons-react";
import Link from "next/link";

import AuthorCard from "@/components/AuthorCard";
import Bounded from "@/components/Bounded";
import FeaturedProjects from "@/components/FeaturedProjectCard";
import RelatedPosts from "@/components/RelatedPost";
import SharePost from "@/components/SharePost";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { formatDate } from "@/utils/FormatDate";
import { extractTextFromSlices } from "@/utils/extractSliceText";
import { readingTime } from "reading-time-estimator";

type Params = { uid: string };

export default async function BlogPostPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  const allTags = await client.getAllByType("blog_post", { fetch: ["tags"] });

  const tagCounts: Record<string, number> = {};
  allTags.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  // filter tags that occur more than once
  const popularTags = Object.keys(tagCounts).filter(
    (tag) => tagCounts[tag] > 1,
  );

  const formattedDate = formatDate(page.data.date);
  const textContent = extractTextFromSlices(page.data.slices);
  const readTime = readingTime(textContent);

  return (
    <main>
      <article>
        <Bounded className="relative mt-5 sm:mt-10">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{page.data.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex flex-col gap-6">
                <Button asChild variant="ghost" className="w-fit">
                  <Link href="/blog">
                    <IconChevronLeft data-icon="inline-start" />
                    Back to all posts
                  </Link>
                </Button>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center gap-2">
                    {page.data.category && (
                      <Badge variant="secondary">
                        <IconFolder data-icon="inline-start" />
                        {page.data.category}
                      </Badge>
                    )}
                    <Badge variant="outline">
                      <IconCalendar data-icon="inline-start" />
                      {formattedDate}
                    </Badge>
                    <Badge variant="outline">
                      <IconClock data-icon="inline-start" />
                      {readTime.text}
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h1 className="font-heading text-foreground max-w-4xl text-4xl leading-tight font-semibold text-balance md:text-5xl lg:text-6xl">
                      {page.data.title}
                    </h1>

                    {(page.data.excerpt || page.data.meta_description) && (
                      <p className="text-muted-foreground max-w-3xl text-base leading-8 md:text-lg">
                        {page.data.excerpt || page.data.meta_description}
                      </p>
                    )}
                  </div>

                  {page.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {page.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          <IconTag data-icon="inline-start" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <Card
                size="sm"
                className="bg-opacity-80 ring-foreground/5 shadow-sm backdrop-blur"
              >
                <CardHeader>
                  <CardTitle>Article Brief</CardTitle>
                  <CardDescription>
                    A quick snapshot before diving into the full post.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-xl">
                      <IconBook2 className="size-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-sm">
                        Reading time
                      </span>
                      <span className="font-medium">{readTime.text}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-xl">
                      <IconSparkles className="size-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-sm">
                        Focus
                      </span>
                      <span className="font-medium">
                        {page.data.category || "Engineering notes"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>

          {isFilled.image(page.data.hover_image) && (
            <div className="bg-muted mb-10 overflow-hidden rounded-2xl border shadow-sm md:mb-14">
              <PrismicNextImage
                field={page.data.hover_image}
                className="aspect-video w-full object-cover"
                fallbackAlt=""
                priority
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Card className="bg-opacity-80 ring-foreground/5 shadow-sm backdrop-blur">
                <CardContent className="px-4 py-6 md:px-8 md:py-8">
                  <div className="mx-auto max-w-3xl overflow-x-auto">
                    <SliceZone
                      slices={page.data.slices}
                      components={components}
                    />
                  </div>
                </CardContent>

                <SharePost
                  title={page.data.title}
                  url={`https://nnamdiekechi.com/blog/${page.uid}`}
                />
              </Card>

              <AuthorCard className="mt-8" />

              <RelatedPosts tag={page.tags[0] || ""} currentUid={page.uid} />
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-24 flex flex-col gap-6">
                <Card
                  size="sm"
                  className="bg-opacity-80 ring-foreground/5 shadow-sm"
                >
                  <CardHeader>
                    <CardTitle>Popular Topics</CardTitle>
                    <CardDescription>
                      Browse related writing by recurring tags.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {popularTags.length > 0 ? (
                      popularTags.map((tag) => (
                        <Badge key={tag} asChild variant="secondary">
                          <Link
                            href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            <IconTag data-icon="inline-start" />
                            {tag}
                          </Link>
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        More topic groups will appear as the blog grows.
                      </p>
                    )}
                  </CardContent>
                </Card>

                <FeaturedProjects tags={page.tags} />
              </div>
            </aside>
          </div>
        </Bounded>
      </article>
    </main>
  );
}

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const params = await props.params;
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

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
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
