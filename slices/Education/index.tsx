import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Experience`.
 */
export type EducationProps = SliceComponentProps<Content.EducationSlice>;

/**
 * Component for "Experience" Slices.
 */
const Education = ({ slice }: EducationProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading as="h2" size="lg" className="max-md:text-3xl">
        {slice.primary.heading}
      </Heading>

      {slice.items.map((item, index) => (
        <div key={index} className="ml-6 mt-8 border-b md:ml-12 md:mt-16">
          <Heading as="h3" size="sm" className="max-md:text-2xl">
            {item.title}
          </Heading>

          <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400 max-md:text-lg">
            <span>{item.time_period}</span>{" "}
            <span className="text-3xl font-extralight max-md:text-xl">/</span>{" "}
            <span>{item.institution}</span>
          </div>
          <div className="prose prose-sm prose-slate prose-invert col-start-1 mb-5 sm:prose-lg">
            <PrismicRichText field={item.description} />
          </div>
        </div>
      ))}
    </Bounded>
  );
};

export default Education;
