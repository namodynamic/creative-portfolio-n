"use client";

import ProjectCard from "@/components/ProjectCard";
import type { Content } from "@prismicio/client";

type FeaturedProjectListProps = {
  items: Content.ProjectDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
};

export default function FeaturedProjectList({
  items,
}: FeaturedProjectListProps) {
  const sortedItems = items.sort((a, b) => {
    const dateA = new Date(a.data.date || "").getTime();
    const dateB = new Date(b.data.date || "").getTime();
    return dateB - dateA;
  });

  return (
    <section className="grid grid-cols-1 gap-16">
      {sortedItems.map((item, index) => (
        <ProjectCard
          key={item.id}
          items={items}
          index={index}
        />
      ))}
    </section>
  );
}
