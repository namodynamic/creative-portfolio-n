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
    >
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          {slice.primary.heading?.split(" ").slice(0, 3).join(" ")}{" "}
          <span className="text-violet-500">
            {slice.primary.heading?.split(" ").slice(3, 4).join(" ")}{" "}
          </span>
          {slice.primary.heading?.split(" ").slice(4).join(" ")}
        </h1>
        <p className="mb-8 mt-5 text-center text-white-200 md:mt-10">
          {slice.primary.sub_heading}
        </p>
        <Link href="/contact">
          <MagicButton
            title="Contact Me"
            icon={
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            }
            position="right"
            otherClasses="group"
            isBeam
          />
        </Link>
      </div>
    </Bounded>
  );
};

export default Cta;
