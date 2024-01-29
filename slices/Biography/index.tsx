import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { Content } from "@prismicio/client";
import Avatar from "@/components/Avatar";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { MdArrowOutward } from "react-icons/md";
import clsx from "clsx";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: BiographyProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
        <Heading size="xl" className="col-start-1">
          {slice.primary.heading}
        </Heading>

        <div className="prose prose-xl prose-slate prose-invert col-start-1">
          <PrismicRichText field={slice.primary.description} />
        </div>

        <PrismicNextLink
          field={slice.primary.button_link}
          className={clsx(
            "group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 px-4  py-2 font-bold text-slate-800 transition-transform ease-out  hover:scale-105",
          )}
          aria-label="Resume"
        >
          <span
            className={clsx(
              "absolute inset-0 z-0 h-full translate-y-9 bg-yellow-300 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
            )}
          />
          <span className="relative flex items-center justify-center gap-2">
            {slice.primary.button_text}{" "}
            <MdArrowOutward className="inline-block" />
          </span>
        </PrismicNextLink>

        <Avatar
          image={slice.primary.avatar}
          className="row-start-1 max-w-sm md:col-start-2 md:row-end-3"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-40 mix-blend-soft-light"></div>
    </Bounded>
  );
};

export default Biography;
