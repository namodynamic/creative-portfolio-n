import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Content, isFilled } from "@prismicio/client";
import Avatar from "@/components/Avatar";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";

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
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="sm:mt-10"
    >
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_30rem]">
        <Heading size="xl" className="leading-none text-balance lg:col-start-1">
          {slice.primary.heading}
        </Heading>

        <Avatar
          image={slice.primary.avatar}
          className="z-20 mx-auto w-full max-w-sm rotate-2 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-12"
        />

        <div className="prose prose-neutral dark:prose-invert prose-p:text-muted-foreground prose-p:text-lg prose-p:leading-8 prose-strong:text-foreground max-w-3xl lg:col-start-1 xl:max-w-208">
          <PrismicRichText field={slice.primary.bio_body} />
        </div>

        {isFilled.link(slice.primary.button_link) &&
          slice.primary.button_text && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-fit lg:col-start-1"
            >
              <PrismicNextLink field={slice.primary.button_link}>
                {slice.primary.button_text}
                <IconArrowRight data-icon="inline-end" className="size-4" />
              </PrismicNextLink>
            </Button>
          )}
      </div>
    </Bounded>
  );
};

export default Biography;
