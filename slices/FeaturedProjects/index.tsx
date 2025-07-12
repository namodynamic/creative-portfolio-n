import { type FC } from "react";
import type { Content } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { createClient } from "@/prismicio";
import FeaturedProjectList from "./FeaturedProjectList";
import { LayoutGrid } from "lucide-react";

export type FeaturedProjectsProps =
  SliceComponentProps<Content.FeaturedProjectsSlice>;

const FeaturedProjects: FC<FeaturedProjectsProps> = async ({ slice }) => {
  const client = createClient();
  const projects = await client.getAllByType("project");
  const featuredProjects = projects.filter(
    (project) => project.data.is_featured === true,
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="featured-projects"
      className="overflow-hidden max-md:-my-20"
    >
      <div className="mb-6 inline-flex w-fit items-center gap-2 text-nowrap rounded-lg bg-slate-950  px-4 py-2 text-sm text-white-50 dark:bg-slate-900 md:text-base">
        <LayoutGrid className="h-5 w-5 text-white" />
        <p className="text-sm font-bold text-white">{slice.primary.heading}</p>
      </div>
      <div>
        <Heading as="h2" size="sm">
          {slice.primary.sub_heading}
        </Heading>

        <div className="prose prose-sm prose-invert col-start-1 mt-5 text-black sm:prose-lg dark:text-slate-300">
          <p>{slice.primary.intro_text}</p>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl">
        <FeaturedProjectList items={featuredProjects} contentType="Project" />
      </div>
    </Bounded>
  );
};

export default FeaturedProjects;
