import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Link from "next/link";
import { IconArrowRight, IconMail } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";

import type { JSX } from "react";
import { Card, CardContent } from "@/components/ui/card";

export type CtaProps = SliceComponentProps<Content.CtaSlice>;

const Cta = ({ slice }: CtaProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Card className="bg-opacity-80 rounded-2xl py-12 md:py-16">
        <CardContent className="flex flex-col items-center">
          <SectionHeader
            eyebrow="Available for select projects"
            title={slice.primary.heading}
            description={slice.primary.sub_heading}
            icon={<IconMail data-icon="inline-start" />}
            align="center"
            className="mb-8"
          />

          <Button asChild size="lg">
            <Link href="/contact">
              Start a conversation
              <IconArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </Bounded>
  );
};

export default Cta;
