import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import ContentList from "./ContentList";
import BlogList from "./BlogList";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import type { JSX } from "react";
import TechNewsCard from "@/components/TechNewsCard";

export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

const ContentIndex = async ({
  slice,
}: ContentIndexProps): Promise<JSX.Element> => {
  const client = createClient();
  const blogPosts = await client.getAllByType("blog_post");
  const projects = await client.getAllByType("project");
  const settings = await client.getSingle("settings");

  const blogCategories = [
    { value: "all", label: "All" },
    ...(settings.data.blog_categories ?? []).map((item) => ({
      value: item.value || "",
      label: item.label || "",
    })),
  ];

  const ContentType = slice.primary.content_type || "Blog";

  return (
    <Bounded
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="mb-8 md:my-10">
        {slice.primary.heading}
      </Heading>
      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-base mb-10 text-black-100/80 sm:prose-xl dark:text-slate-400">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}
      {ContentType === "Project" && (
        <>
          <ContentList
            items={projects}
            contentType="Project"
            fallbackItemImage={slice.primary.fallback_item_image}
            viewMoreText={slice.primary.view_more_text || "Read More"}
          />
        </>
      )}
      {ContentType === "Blog" && (
       <div className="relative z-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
         <div className="place-items-start lg:col-span-8 flex-1">
          <BlogList
            items={blogPosts}
            categories={blogCategories}
            contentType="Blog"
            viewMoreText={slice.primary.view_more_text || "Read More"}
          />
        </div>

        <aside className="lg:col-span-4">
            <TechNewsCard />
          </aside>
       </div>
      )}
    </Bounded>
  );
};

export default ContentIndex;
