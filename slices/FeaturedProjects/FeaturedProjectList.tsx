"use client";

import FeaturedProjectsCard from "@/components/FeaturedProjectsCard";
import type { Content } from "@prismicio/client";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type FeaturedProjectListProps = {
  item: Content.ProjectDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
};

export default function FeaturedProjectList({
  item,
}: FeaturedProjectListProps) {
  const sortedItems = [...item].sort((a, b) => {
    const dateA = new Date(a.data.date || "").getTime();
    const dateB = new Date(b.data.date || "").getTime();
    return dateB - dateA;
  });

  return (
    <section>
      <div className="flex flex-col gap-14 md:gap-20 lg:gap-24">
        {sortedItems.map((item, index) => (
          <FeaturedProjectsCard key={item.id} item={item} index={index} />
        ))}
      </div>

      <div className="mt-14 flex justify-center md:mt-20">
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
