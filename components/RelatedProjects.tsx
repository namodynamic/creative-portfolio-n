import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import MagicButton from "@/components/ui/MagicButton";

type RelatedProjectsProps = {
  tags: string[];
};

export default async function RelatedProjects({ tags }: RelatedProjectsProps) {
  const client = createClient();

  if (!tags.length) return null;

  // Fetch projects that share at least one tag
  const projects = await client.getByType("project", {
    predicates: [prismic.filter.any("document.tags", tags)],
    pageSize: 3,
  });

  if (!projects.results.length)
    return (
      <div className="rounded-xl border-[0.5px] border-slate-800 bg-blue-850/50 p-6 shadow-xl backdrop-blur-sm">
        <h3 className="mb-4 text-lg font-bold text-white">Featured Projects</h3>
        <p className="text-xs text-muted-foreground">No related projects.</p>
      </div>
    );

  return (
    <section>
      <div className="mb-10">
        <h2 className="mb-8 text-2xl font-bold text-white">
          Explore More Projects
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {projects.results.map((project) => (
            <Link
              key={project.uid}
              href={`/projects/${project.uid}`}
              className="group block overflow-hidden rounded-lg border-[0.5px] border-slate-800 bg-blue-850/50 transition-all hover:border-slate-700 hover:bg-slate-900/50"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={project.data.hover_image?.url || "/placeholder.svg"}
                  alt={project.data.title || ""}
                  width={400}
                  height={225}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-indigo-500">
                  {project.data.title}
                </h3>
                <div className="mt-2 flex gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-slate-700 bg-slate-800/50 text-xs text-slate-300"
                    >
                      #{tag}
                    </Badge>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-xs text-slate-500">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link href="/projects">
            <MagicButton
              title="View all projects"
              position="right"
              otherClasses="group"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
