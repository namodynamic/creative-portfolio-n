import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import Bounded from "@/components/Bounded";
import SectionHeader from "@/components/SectionHeader";

export type FeatureGridProps = SliceComponentProps<Content.FeatureGridSlice>;

const FeatureGrid: FC<FeatureGridProps> = ({ slice }) => {
  return (
    <Bounded
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="pt-0!"
    >
      <SectionHeader
        title="Full-stack execution for products that need to feel fast, clear, and trustworthy."
        description="A focused blend of frontend craft, backend thinking, accessibility, performance, and product judgment."
        align="center"
        titleSize="xs"
        descriptionSize="sm"
        className="mb-8 max-w-2xl md:mb-10"
      />

      <BentoGrid>
        {slice.primary.items.map((item, i) => (
          <BentoGridItem
            key={i}
            id={item.gridId ?? 0}
            title={item.title}
            description={item.description}
            img={item.img?.url || ""}
            spareImg={item.spareImg?.url || ""}
            leftLists={slice.primary.left_tech_list.map(
              (item) => item.technology,
            )}
            rightLists={slice.primary.right_tech_list.map(
              (item) => item.technology,
            )}
            copyEmail={slice.primary.copy_email}
          />
        ))}
      </BentoGrid>
    </Bounded>
  );
};

export default FeatureGrid;
