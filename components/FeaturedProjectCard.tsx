import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

  if (!projects.results.length)
    return (
      <div className="rounded-xl border-[0.5px] border-zinc-400 bg-white/20 p-6 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-blue-850/50">
        <h3 className="mb-4 text-lg font-bold dark:text-white">
          Featured Projects
        </h3>
        <p className="text-xs text-muted-foreground">
          No featured projects found for this post.
        </p>
      </div>
    );

  return (
    <div className="rounded-xl border-[0.5px] border-zinc-400 bg-white/20 p-6 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-blue-850/50">
      <h3 className="mb-4 text-lg font-bold text-black-50 dark:text-white">
        Featured Projects
      </h3>
      <div className="space-y-4">
        {projects.results.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.uid}`}
            className="group block"
          >
            <div className="relative mb-2 h-32 w-full overflow-hidden rounded-lg">
              <Image
                src={project.data.hover_image.url || ""}
                alt={project.data.title || "Project"}
                fill
                className="transition-transform object-fill group-hover:scale-105"
              />
            </div>
            <h4 className="font-medium text-black-50 transition-colors group-hover:text-black/50 dark:text-white dark:group-hover:text-purple-400">
              {project.data.title}
            </h4>
            <p className="flex flex-wrap gap-2 text-sm text-black/50 dark:text-gray-400">
              {project.tags.map((tag, index) => (
                <span key={index} className="text-sm inline-flex items-center gap-1 font-bold">
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
