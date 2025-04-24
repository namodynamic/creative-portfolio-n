import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

import type { JSX } from "react";

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock = ({ slice }: ImageBlockProps): JSX.Element => {
  return (
    // <PrismicNextImage field={slice.primary.image} imgixParams={{ w: 600 }} />
    <PrismicNextImage
      field={slice.primary.image}
      className="not-prose w-full h-full rounded-md  my-10 md:my-14 lg:my-16"
    />
  );
};

export default ImageBlock;
