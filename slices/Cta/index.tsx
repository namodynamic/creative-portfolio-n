import Bounded from "@/components/Bounded";
import MagicButton from "@/components/ui/MagicButton";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { JSX } from "react";

/**
 * Props for `Cta`.
 */
export type CtaProps = SliceComponentProps<Content.CtaSlice>;

/**
 * Component for "Cta" Slices.
 */
const Cta = ({ slice }: CtaProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:py-28"
    >
      <div className="flex flex-col items-center">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:max-w-[60vw] lg:text-5xl">
          {slice.primary.heading?.split(" ").slice(0, 3).join(" ")}{" "}
          <span className="text-purple-500">
            {slice.primary.heading?.split(" ").slice(3, 4).join(" ")}{" "}
          </span>
          {slice.primary.heading?.split(" ").slice(4).join(" ")}
        </h1>
        <p className="mb-6 mt-3 max-w-[90%] text-center text-sm text-gray-800 dark:text-white-200 sm:mb-8 sm:mt-5 sm:max-w-3xl sm:text-base md:text-lg lg:mb-10 lg:mt-6">
          {slice.primary.sub_heading}
        </p>
        <Link href="/contact">
          <MagicButton
            title="Contact Me"
            icon={
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:ml-2 sm:h-4 sm:w-4" />
            }
            position="right"
            otherClasses="group "
            isBeam
          />
        </Link>
      </div>
    </Bounded>
  );
};

export default Cta;
