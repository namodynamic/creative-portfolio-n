import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import ContentList from "./ContentList";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import type { JSX } from "react";
/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({
  slice,
}: ContentIndexProps): Promise<JSX.Element> => {
  const client = createClient();
  const blogPosts = await client.getAllByType("blog_post");
  const projects = await client.getAllByType("project");

  const ContentType = slice.primary.content_type || "Blog";

  const items = ContentType === "Blog" ? blogPosts : projects;

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
        <div className="prose sm:prose-xl prose-base text-black-100/80 dark:text-slate-400 mb-10">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}
      <ContentList
        items={items}
        contentType={ContentType}
        viewMoreText={slice.primary.view_more_text}
        fallbackItemImage={slice.primary.fallback_item_image}
      />
    </Bounded>
  );
};

export default ContentIndex;
