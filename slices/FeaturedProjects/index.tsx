import { type FC } from "react";
import type { Content } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { createClient } from "@/prismicio";
import FeaturedProjectList from "./FeaturedProjectList";
import SectionHeader from "@/components/SectionHeader";
import { IconLayoutGrid } from "@tabler/icons-react";

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
    >
      <SectionHeader
        eyebrow={slice.primary.heading}
        title={slice.primary.sub_heading}
        description={slice.primary.intro_text}
        icon={<IconLayoutGrid data-icon="inline-start" />}
      />

      <div className="pt-12 md:pt-16">
        <FeaturedProjectList item={featuredProjects} />
      </div>
    </Bounded>
  );
};

export default FeaturedProjects;
