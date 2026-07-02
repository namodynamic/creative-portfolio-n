import * as prismic from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { IconArrowRight, IconFolderOpen, IconTag } from "@tabler/icons-react";
import Link from "next/link";
import { createClient } from "@/prismicio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RelatedProjectsProps = {
  tags: string[];
};

export default async function RelatedProjects({ tags }: RelatedProjectsProps) {
  const client = createClient();

  if (!tags.length) return null;

  const projects = await client.getByType("project", {
    predicates: [prismic.filter.any("document.tags", tags)],
    pageSize: 3,
  });

  if (!projects.results.length) {
    return (
      <Card className="ring-foreground/5">
        <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
          <div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl">
            <IconFolderOpen className="size-5" />
          </div>
          <CardTitle>No related projects yet</CardTitle>
          <CardDescription>
            More work connected to these topics will appear here.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-2xl flex-col gap-3">
          <Badge variant="secondary">
            <IconFolderOpen data-icon="inline-start" />
            Related work
          </Badge>
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-2xl font-semibold text-balance md:text-3xl">
              Explore more projects
            </h2>
            <p className="text-muted-foreground leading-7">
              A few more builds connected by stack, domain, or implementation
              patterns.
            </p>
          </div>
        </div>

        <Button size="sm" asChild variant="outline">
          <Link href="/projects">
            View all projects
            <IconArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {projects.results.map((project) => (
          <Card
            key={project.uid}
            className="group p-0 transition duration-300 hover:shadow-lg"
          >
            <Link href={`/projects/${project.uid}`} className="block h-full">
              <div className="bg-muted aspect-video overflow-hidden">
                <PrismicNextImage
                  field={project.data.hover_image}
                  fallbackAlt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <CardHeader className="py-3!">
                <CardTitle className="group-hover:text-primary line-clamp-2 transition-colors">
                  {project.data.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-wrap gap-2 pb-5">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary">
                    <IconTag data-icon="inline-start" />
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 3 && (
                  <Badge variant="outline">+{project.tags.length - 3}</Badge>
                )}
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
