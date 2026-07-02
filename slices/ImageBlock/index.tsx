import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

import type { JSX } from "react";

const widthClasses = {
  Contained: "mx-auto max-w-3xl",
  Wide: "mx-auto max-w-5xl",
  "Full Bleed": "w-full",
} satisfies Record<
  NonNullable<Content.ImageBlockSlice["primary"]["width"]>,
  string
>;

export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

const ImageBlock = ({ slice }: ImageBlockProps): JSX.Element => {
  const { image, caption, width } = slice.primary;
  const widthClass = widthClasses[width ?? "Contained"];

  if (!isFilled.image(image)) return <></>;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`not-prose my-10 md:my-14 lg:my-16 ${widthClass}`}
    >
      <figure>
        <div
          className={`bg-muted/20 overflow-hidden border shadow-sm ${
            width === "Full Bleed" ? "" : "rounded-xl"
          }`}
        >
          <PrismicNextImage
            field={image}
            className="h-full w-full object-cover"
            fallbackAlt=""
          />
        </div>

        {caption && (
          <figcaption className="text-muted-foreground mt-3 text-center text-sm">
            {caption}
          </figcaption>
        )}
      </figure>
    </section>
  );
};

export default ImageBlock;
