import * as Prismic from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import {
  IconArrowRight,
  IconCalendar,
  IconSparkles,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/prismicio";
import { formatDate } from "@/utils/FormatDate";
import { extractFirstParagraphFromSlices } from "@/utils/extractSliceText";

type RelatedPostsProps = {
  tag: string;
  currentUid?: string;
};

export default async function RelatedPosts({
  tag,
  currentUid,
}: RelatedPostsProps) {
  const client = createClient();

  if (!tag) return null;

  const relatedPosts = await client.getByType("blog_post", {
    predicates: [Prismic.filter.at("document.tags", [tag])],
    orderings: [
      { field: "document.first_publication_date", direction: "desc" },
    ],
    pageSize: 4,
  });

  const posts = relatedPosts.results
    .filter((post) => post.uid !== currentUid)
    .slice(0, 3);

  if (!posts.length) return null;

  return (
    <section className="mt-12 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Badge variant="secondary">
          <IconSparkles data-icon="inline-start" />
          Keep reading
        </Badge>
        <h2 className="font-heading text-foreground text-2xl font-semibold text-balance md:text-3xl">
          Related Posts
        </h2>
        <p className="text-muted-foreground max-w-2xl text-sm leading-7">
          More notes and guides connected to this topic.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((post) => {
          const formattedDate = formatDate(post.data.date);
          const firstParagraph = extractFirstParagraphFromSlices(
            post.data.slices,
          );

          return (
            <Link key={post.id} href={`/blog/${post.uid}`} className="group">
              <Card
                size="sm"
                className="bg-opacity-80 ring-foreground/5 h-full pt-0! shadow-sm transition-transform group-hover:-translate-y-1"
              >
                {isFilled.image(post.data.hover_image) && (
                  <div className="bg-muted relative aspect-16/10 overflow-hidden">
                    <Image
                      src={post.data.hover_image.url}
                      alt={post.data.title || "Blog post"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardDescription className="inline-flex items-center gap-1.5">
                    <IconCalendar className="size-3.5" />
                    {formattedDate}
                  </CardDescription>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {post.data.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-muted-foreground line-clamp-3 text-sm leading-7">
                    {post.data.excerpt || firstParagraph}
                  </p>
                  <span className="text-primary inline-flex items-center gap-1 text-sm font-medium">
                    Read post
                    <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
