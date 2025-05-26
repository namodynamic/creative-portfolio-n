import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Testimonials from "@/components/Testimonial";
import { createClient } from "@/prismicio";
import CertificationCard from "@/components/CertificationCard";
import TitleHeader from "@/components/TitleHeader";


export type CertificationsProps =
  SliceComponentProps<Content.CertificationsSlice>;

const Certifications = async ({ slice, index }: CertificationsProps) => {
  const client = createClient();
  const page = await client.getSingle("homepage");
  const testimonialSlice = page.data.slices.find(
    (slice) => slice.slice_type === "testimonial",
  );
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-md:-mt-20"
    >
      <TitleHeader
        title={slice.primary.heading || ""}
        subtitle={slice.primary.sub_heading || ""}
      />

      <div className="grid grid-cols-1 gap-5 pt-12 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
        {slice.items.map((item, index) => (
          <CertificationCard key={index} item={item} index={index} />
        ))}
      </div>

      <div className="mt-16">
        <Testimonials slice={testimonialSlice as Content.TestimonialSlice} />
      </div>
    </Bounded>
  );
};

export default Certifications;
