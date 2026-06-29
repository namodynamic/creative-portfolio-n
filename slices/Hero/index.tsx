import type { JSX } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { Button } from "@/components/ui/button";
import { IconArrowDownRight } from "@tabler/icons-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  const introText =
    slice.primary.intro_text || "Available for Full-Time Roles & Freelance";
  const headline =
    slice.primary.text_generate ||
    "Transforming Concepts into Seamless User Experiences.";
  const introduction =
    slice.primary.introduction ||
    "Hi, I'm Nnamdi. I engineer high-performance, scalable web applications with elegant, production-ready codebases.";

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden"
    >
      <div className="relative mx-auto flex min-h-[calc(100dvh-24rem)] w-full max-w-6xl flex-col items-center justify-center text-center">
        <Badge variant="secondary" className="mb-5 uppercase">
          {introText}
        </Badge>

        <TextGenerateEffect
          words={headline}
          className="mx-auto max-w-5xl text-center text-3xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl"
        />

        <p className="text-muted-foreground mx-auto mt-1 max-w-3xl text-base leading-7 text-pretty sm:text-lg md:text-xl md:leading-8">
          {introduction}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="text-base">
            <Link href="/#featured-projects">
              View selected work
              <IconArrowDownRight data-icon="inline-end" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="text-base">
            <Link href="/contact">Start a conversation</Link>
          </Button>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
