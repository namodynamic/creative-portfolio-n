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
      className="overflow-hidden px-4 py-16 max-md:-my-20 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-10 lg:py-28"
    >
      <div className="mb-4 inline-flex w-fit items-center gap-2 text-nowrap rounded-lg bg-slate-950 px-3 py-1.5 text-white-50 dark:bg-slate-900 sm:mb-6 sm:gap-2.5 sm:px-4 sm:py-2 md:gap-3">
        <LayoutGrid className="h-4 w-4 text-white sm:h-5 sm:w-5" />
        <p className="text-xs font-bold text-white sm:text-sm md:text-base">
          {slice.primary.heading}
        </p>
      </div>
      <div className="px-2 sm:px-0">
        <Heading as="h2" size="sm">
          {slice.primary.sub_heading}
        </Heading>

        <div className="prose prose-sm prose-invert col-start-1 mt-3 text-black sm:prose-base md:prose-lg dark:text-slate-300 sm:mt-4 md:mt-5">
          <p className="text-sm leading-relaxed sm:text-base md:text-lg">
            {slice.primary.intro_text}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl pt-10 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-28">
        <FeaturedProjectList item={featuredProjects} contentType="Project" />
      </div>
    </Bounded>
  );
};

export default FeaturedProjects;
