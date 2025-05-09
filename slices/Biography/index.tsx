import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Content } from "@prismicio/client";
import Avatar from "@/components/Avatar";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

import type { JSX } from "react";

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
      <div className="my-10 grid gap-x-8 gap-y-6 md:my-20 md:grid-cols-[2fr,1fr]">
        <Heading size="xl" className="col-start-1">
          {slice.primary.heading}
        </Heading>

        <div className="prose prose-base text-slate-400 lg:prose-lg prose-invert col-start-1">
          <PrismicRichText field={slice.primary.description} />
        </div>

        <Avatar
          image={slice.primary.avatar}
          className="z-20 row-start-1 max-w-sm md:col-start-2 md:row-end-3"
        />
      </div>
    </Bounded>
  );
};

export default Biography;
