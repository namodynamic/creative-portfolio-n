import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import Bounded from "@/components/Bounded";

/**
 * Props for `FeatureGrid`.
 */
export type FeatureGridProps = SliceComponentProps<Content.FeatureGridSlice>;

/**
 * Component for "FeatureGrid" Slices.
 */
const FeatureGrid: FC<FeatureGridProps> = ({ slice }) => {

  return (
    <Bounded
    as="section"
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
    className="max-md:-my-20 mt-20"
    >
      <BentoGrid className="w-full">
      {slice.primary.items.map((item, i) => (
        <BentoGridItem
          key={i}
          id={item.gridId ?? 0}
          title={item.title}
          description={item.description}
          img={item.img?.url || ""}
          spareImg={item.spareImg?.url || ""}
          className={item.className || ""}
          imgClassName={item.imgClassName || ""}
          titleClassName={item.titleClassName || ""}
          leftLists={slice.primary.left_tech_list.map((item) => item.technology)}
          rightLists={slice.primary.right_tech_list.map((item) => item.technology)}
          copyEmail={slice.primary.copy_email}
        />
      ))}
    </BentoGrid>
    </Bounded>
  );
};

export default FeatureGrid;
