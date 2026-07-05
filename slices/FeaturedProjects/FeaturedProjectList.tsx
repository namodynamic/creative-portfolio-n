"use client";

import FeaturedProjectsCard from "@/components/FeaturedProjectsCard";
import type { Content } from "@prismicio/client";
import { IconArrowRight, IconFolderOpen } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FeaturedProjectListProps = {
  item: Content.ProjectDocument[];
};

function getSafeProjectTime(date: Content.ProjectDocument["data"]["date"]) {
  if (!date) return 0;

  const time = new Date(date).getTime();

  return Number.isNaN(time) ? 0 : time;
}

export default function FeaturedProjectList({
  item,
}: FeaturedProjectListProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const sortedItems = [...item].sort((a, b) => {
    return getSafeProjectTime(b.data.date) - getSafeProjectTime(a.data.date);
  });

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-featured-project-card]",
      );

      if (cards.length === 0) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(cards, { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      gsap.fromTo(
        cards,
        {
          autoAlpha: 0,
          y: 28,
          scale: 0.98,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          clearProps: "transform",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [sortedItems.length] },
  );

  if (sortedItems.length === 0) {
    return (
      <Card size="sm">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-xl">
            <IconFolderOpen />
          </div>
          <div className="flex max-w-md flex-col gap-2">
            <h3 className="text-foreground text-lg font-medium">
              No featured projects yet
            </h3>
            <p className="text-muted-foreground text-sm leading-6">
              Mark a project as featured in Prismic to show it in this section.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/projects">
              Browse all projects
              <IconArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <section ref={sectionRef} aria-label="Featured project case studies">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sortedItems.map((item, index) => (
          <div key={item.id} data-featured-project-card>
            <FeaturedProjectsCard item={item} index={index} />
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center md:mt-12">
        <Button asChild variant="outline">
          <Link href="/projects">
            Explore all projects
            <IconArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
