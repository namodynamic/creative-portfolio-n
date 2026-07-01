import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import CertificationCard from "@/components/CertificationCard";
import SectionHeader from "@/components/SectionHeader";
import { IconCertificate } from "@tabler/icons-react";

export type CertificationsProps =
  SliceComponentProps<Content.CertificationsSlice>;

const Certifications = ({ slice }: CertificationsProps) => {
  return (
    <Bounded
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 md:py-24"
    >
      <SectionHeader
        eyebrow={slice.primary.sub_heading}
        title={slice.primary.heading}
        description={slice.primary.intro}
        icon={<IconCertificate data-icon="inline-start" className="size-3.5" />}
      />

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {slice.items.map((item, index) => (
          <CertificationCard
            key={`${item.title}-${index}`}
            item={item}
            index={index}
          />
        ))}
      </div>
    </Bounded>
  );
};

export default Certifications;
