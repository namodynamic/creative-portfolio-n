import * as prismic from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import {
  IconArrowRight,
  IconBriefcase,
  IconFolder,
  IconTag,
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

type FeaturedProjectsProps = {
  tags: string[];
};

export default async function FeaturedProjects({
  tags,
}: FeaturedProjectsProps) {
  const client = createClient();

  if (!tags.length) return null;

  // Fetch projects that share at least one tag
  const projects = await client.getByType("project", {
    predicates: [prismic.filter.any("document.tags", tags)],
    pageSize: 2,
  });

  if (!projects.results.length) {
    return (
      <Card size="sm" className="bg-opacity-80 ring-foreground/5 shadow-sm">
        <CardHeader>
          <CardTitle>Featured Projects</CardTitle>
          <CardDescription>
            Related project work will appear here when available.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card size="sm" className="bg-opacity-80 ring-foreground/5 shadow-sm">
      <CardHeader>
        <CardTitle>Featured Projects</CardTitle>
        <CardDescription>
          Client-style builds that connect with this post.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {projects.results.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.uid}`}
            className="group flex flex-col gap-3"
          >
            <div className="bg-muted relative aspect-video overflow-hidden rounded-lg border">
              {isFilled.image(project.data.hover_image) ? (
                <Image
                  src={project.data.hover_image.url}
                  alt={project.data.title || "Project"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              ) : (
                <div className="text-muted-foreground flex size-full items-center justify-center">
                  <IconBriefcase className="size-6" />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-heading text-foreground group-hover:text-primary leading-snug font-medium transition-colors">
                  {project.data.title}
                </h4>
                <IconArrowRight className="text-muted-foreground group-hover:text-primary mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline">
                    <IconTag data-icon="inline-start" />
                    {tag}
                  </Badge>
                ))}
                {project.tags.length === 0 && (
                  <Badge variant="outline">
                    <IconFolder data-icon="inline-start" />
                    Project
                  </Badge>
                )}
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
