import type { Content } from "@prismicio/client";
import { IconTags } from "@tabler/icons-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BlogTopicsCardProps = {
  posts: Content.BlogPostDocument[];
};

function slugifyTag(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogTopicsCard({ posts }: BlogTopicsCardProps) {
  const topics = Array.from(
    posts.reduce((tagMap, post) => {
      post.tags.forEach((tag) => {
        const slug = slugifyTag(tag);

        if (!slug) return;

        const existingTag = tagMap.get(slug);

        if (existingTag) {
          existingTag.count += 1;
        } else {
          tagMap.set(slug, { label: tag, count: 1 });
        }
      });

      return tagMap;
    }, new Map<string, { label: string; count: number }>()),
    ([slug, topic]) => ({ slug, ...topic }),
  )
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, 12);

  if (topics.length === 0) return null;

  return (
    <Card size="sm" className="ring-foreground/5 bg-opacity-80 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <IconTags className="text-primary size-4" />
          <CardTitle>Browse by Topic</CardTitle>
        </div>
        <CardDescription>
          Explore focused articles by technology, workflow, or theme.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <Badge key={topic.slug} asChild variant="outline">
            <Link href={`/blog/tag/${topic.slug}`}>
              {topic.label}
              <span className="text-muted-foreground">{topic.count}</span>
            </Link>
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
