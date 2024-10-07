import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { PrismicNextLink } from "@prismicio/next";
import { FaExternalLinkAlt } from "react-icons/fa";

/**
 * Props for `Certifications`.
 */
export type CertificationsProps =
  SliceComponentProps<Content.CertificationsSlice>;

/**
 * Component for "Certifications" Slices.
 */
const Certifications = ({ slice }: CertificationsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading as="h2" size="lg" className="max-md:text-3xl">
        {slice.primary.heading}
      </Heading>

      {slice.items.map((item, index) => (
        <div
          key={index}
          className="ml-6 mt-8 border-b-2 border-black-200 md:ml-12 md:mt-16"
        >
          <Heading as="h3" size="sm" className="text-white-600 max-md:text-2xl">
            {item.title}
          </Heading>

          <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-white-500 max-md:text-lg">
            <span>{item.issuer}</span>
            <span className="text-3xl font-extralight max-md:text-xl">
              -
            </span>{" "}
            <span>{item.time_period}</span>{" "}
          </div>
          <PrismicNextLink
            field={item.credential_url}
            className="flex w-fit items-center justify-start rounded-xl  px-4 py-2 text-sm font-medium text-gray-500 transition-colors duration-300  hover:text-white"
          >
            Show Credential <FaExternalLinkAlt className=" ml-2 inline-flex" />
          </PrismicNextLink>
          <div className="prose prose-sm prose-slate prose-invert col-start-1 mb-5 text-white-500 sm:prose-lg">
            <PrismicRichText field={item.description} />
          </div>
        </div>
      ))}
    </Bounded>
  );
};

export default Certifications;
