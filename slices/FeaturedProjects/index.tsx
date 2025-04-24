import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Heading";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicNextImage } from "@prismicio/next";
import MagicButton from "@/components/ui/MagicButton";


/**
 * Props for `FeaturedProjects`.
 */
export type FeaturedProjectsProps =
  SliceComponentProps<Content.FeaturedProjectsSlice>;

/**
 * Component for "FeaturedProjects" Slices.
 */
const FeaturedProjects: FC<FeaturedProjectsProps> = ({ slice }) => {
  // const isEven = slice.items.indexOf(slice.id) % 2 === 0;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="featured-projects"
    >
      <Heading as="h2" size="lg" className="max-md:text-5xl">
        {slice.primary.heading}
      </Heading>

      <div className="prose prose-sm prose-invert col-start-1 mt-5 text-slate-500  sm:prose-lg">
        <p>{slice.primary.intro_text}</p>
      </div>

      <div className="mx-auto mt-8 max-w-7xl  ">
        <div className="grid grid-cols-1 gap-12">
          {slice.items.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`grid grid-cols-1 items-center gap-8 rounded-xl lg:grid-cols-2 ${isEven ? "" : "lg:flex-row-reverse"}`}
              >
                <div
                  className={`relative overflow-hidden rounded-xl border
               border-b-0 border-slate-800 shadow-lg ${isEven ? "lg:order-1" : "lg:order-2"}`}
                >
                  <PrismicNextImage field={item.featured_project_image} />
                </div>

                <div
                  className={`space-y-4 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                >
                  <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {item.title}
                  </h2>
                  <div className="text-slate-300">
                    <PrismicRichText
                      field={item.description}
                      components={{
                        paragraph: ({ children }) => (
                          <p className="line-clamp-3">{children}</p>
                        ),
                      }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 capitalize">
                    {item.tags?.split(",").map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>

                  <Button asChild className="mt-4 text-white" variant={"outline"}>
                    <PrismicNextLink field={item.project_slug}>
                      View Project
                    </PrismicNextLink>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
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
