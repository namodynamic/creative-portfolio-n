import type { Metadata } from "next";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCalendar,
  IconClock,
  IconFileText,
  IconHash,
  IconTag,
} from "@tabler/icons-react";
import Link from "next/link";
import { readingTime } from "reading-time-estimator";

import Bounded from "@/components/Bounded";
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
import { createClient } from "@/prismicio";
import { formatDate } from "@/utils/FormatDate";
import {
  extractFirstParagraphFromSlices,
  extractTextFromSlices,
} from "@/utils/extractSliceText";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

function slugifyTag(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatTagLabel(tag: string): string {
  return tag
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const tagSlug = slugifyTag(decodeURIComponent(tag));
  const client = createClient();

  const allPosts = await client.getAllByType("blog_post", {
    orderings: [
      { field: "my.blog_post.date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  const posts = allPosts.filter((post) =>
    post.tags.some((postTag) => slugifyTag(postTag) === tagSlug),
  );

  const matchedTag =
    posts
      .flatMap((post) => post.tags)
      .find((postTag) => slugifyTag(postTag) === tagSlug) ??
    formatTagLabel(tagSlug);

  const tagCounts = allPosts.reduce<
    Record<string, { label: string; count: number }>
  >((counts, post) => {
    post.tags.forEach((postTag) => {
      const slug = slugifyTag(postTag);

      if (!counts[slug]) {
        counts[slug] = { label: postTag, count: 0 };
      }

      counts[slug].count += 1;
    });

    return counts;
  }, {});

  const relatedTags = Object.entries(tagCounts)
    .filter(([slug]) => slug !== tagSlug)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 8);

  return (
    <main>
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
              <BreadcrumbPage>{matchedTag}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-6">
              <Button asChild variant="ghost" className="w-fit">
                <Link href="/blog">
                  <IconArrowLeft data-icon="inline-start" />
                  Back to all posts
                </Link>
              </Button>

              <div className="flex flex-col gap-5">
                <Badge variant="secondary" className="w-fit">
                  <IconHash data-icon="inline-start" />
                  Topic archive
                </Badge>

                <div className="flex flex-col gap-4">
                  <h1 className="font-heading text-foreground max-w-4xl text-4xl leading-tight font-semibold text-balance md:text-5xl lg:text-6xl">
                    {matchedTag}
                  </h1>
                  <p className="text-muted-foreground max-w-3xl text-base leading-8 md:text-lg">
                    {posts.length > 0
                      ? `A focused collection of ${posts.length} article${
                          posts.length === 1 ? "" : "s"
                        } tagged with ${matchedTag}.`
                      : `No articles are currently tagged with ${matchedTag}. Explore the full blog or browse another topic.`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <Card className="bg-opacity-80 ring-foreground/5 shadow-sm">
              <CardHeader>
                <CardTitle>Archive Summary</CardTitle>
                <CardDescription>
                  Quick context for this topic collection.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-xl">
                    <IconFileText className="size-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm">
                      Articles
                    </span>
                    <span className="font-medium">{posts.length}</span>
                  </div>
                </div>

                {relatedTags.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <span className="text-muted-foreground text-sm font-medium">
                      Explore more topics
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {relatedTags.map(([slug, topic]) => (
                        <Badge key={slug} asChild variant="outline">
                          <Link href={`/blog/tag/${slug}`}>
                            <IconTag data-icon="inline-start" />
                            {topic.label}
                          </Link>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => {
              const excerpt =
                post.data.excerpt ||
                extractFirstParagraphFromSlices(
                  post.data.slices,
                  "No description available.",
                );
              const textContent = extractTextFromSlices(post.data.slices);
              const readTime = readingTime(textContent);

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.uid}`}
                  className="group"
                >
                  <Card
                    size="sm"
                    className="bg-opacity-80 ring-foreground/5 h-full pt-0! shadow-sm transition-transform group-hover:-translate-y-1"
                  >
                    {isFilled.image(post.data.hover_image) && (
                      <div className="bg-muted relative aspect-16/10 overflow-hidden">
                        <PrismicNextImage
                          field={post.data.hover_image}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          fallbackAlt=""
                        />
                      </div>
                    )}

                    <CardHeader>
                      <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                        <span className="inline-flex items-center gap-1.5">
                          <IconCalendar className="size-4" />
                          <time>{formatDate(post.data.date)}</time>
                        </span>
                        <span aria-hidden="true">/</span>
                        <span className="inline-flex items-center gap-1.5">
                          <IconClock className="size-4" />
                          {readTime.text}
                        </span>
                      </div>

                      <CardTitle className="group-hover:text-primary line-clamp-2 text-xl transition-colors">
                        {post.data.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex grow flex-col gap-5">
                      <p className="text-muted-foreground line-clamp-3 text-sm leading-7">
                        {excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((postTag) => (
                          <Badge
                            key={postTag}
                            variant={
                              slugifyTag(postTag) === tagSlug
                                ? "secondary"
                                : "outline"
                            }
                          >
                            <IconTag data-icon="inline-start" />
                            {postTag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="outline">
                            +{post.tags.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <span className="text-primary mt-auto inline-flex items-center gap-1 text-sm font-medium">
                        Read article
                        <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <Card size="sm" className="bg-opacity-80 ring-foreground/5 shadow-sm">
            <CardContent className="mx-auto flex max-w-xl flex-col items-center gap-5 py-14 text-center">
              <div className="bg-primary/10 text-primary flex size-14 items-center justify-center rounded-2xl">
                <IconTag className="size-7" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-heading text-2xl font-semibold">
                  No posts found
                </h2>
                <p className="text-muted-foreground leading-7">
                  There are no posts with the tag {matchedTag}. Try another
                  topic or browse the full blog archive.
                </p>
              </div>
              <Button asChild>
                <Link href="/blog">
                  Browse all posts
                  <IconArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </Bounded>
    </main>
  );
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const label = formatTagLabel(decodeURIComponent(tag));

  return {
    title: `${label} Articles`,
    description: `Articles and notes tagged with ${label}.`,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const posts = await client.getAllByType("blog_post");
  const tagSlugs = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSlugs.add(slugifyTag(tag)));
  });

  return Array.from(tagSlugs).map((tag) => ({ tag }));
}
