import { type FC,} from "react";
import type { Content } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { ArrowRight } from "lucide-react";
import { PrismicNextLink } from "@prismicio/next";
import MagicButton from "@/components/ui/MagicButton";
import { createClient } from "@/prismicio";
import FeaturedProjectList from "./FeaturedProjectList";


export type FeaturedProjectsProps =
  SliceComponentProps<Content.FeaturedProjectsSlice>;

const FeaturedProjects: FC<FeaturedProjectsProps> = async ({ slice }) => {
 const client = createClient();
  const projects = await client.getAllByType("project");
  const featuredProjects = projects.filter(
  (project) => project.data.is_featured === true
);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="featured-projects"
      className="overflow-hidden max-md:-my-20"
    >
      <div
      >
        <Heading as="h2" size="lg" className="max-md:text-5xl">
          {slice.primary.heading}
        </Heading>

        <div className="prose prose-sm prose-invert col-start-1 mt-5 text-black sm:prose-lg dark:text-slate-300">
          <p>{slice.primary.intro_text}</p>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl">
        <FeaturedProjectList items={featuredProjects} contentType="Project" />

        <div className="mt-16 md:mt-32 flex justify-center">
          <PrismicNextLink field={slice.primary.view_all_projects}>
            <MagicButton
              title="View All Projects"
              icon={
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              }
              position="right"
              otherClasses="group"
            />
          </PrismicNextLink>
        </div>
      </div>
    </Bounded>
  );
};

export default FeaturedProjects;
