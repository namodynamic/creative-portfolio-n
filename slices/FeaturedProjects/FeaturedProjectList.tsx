import FeaturedProjectsCard from "@/components/FeaturedProjectsCard";
import type { Content } from "@prismicio/client";
import { IconArrowRight, IconFolderOpen } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type FeaturedProjectListProps = {
  item: Content.ProjectDocument[];
};

export default function FeaturedProjectList({
  item,
}: FeaturedProjectListProps) {
  const sortedItems = [...item].sort((a, b) => {
    const dateA = new Date(a.data.date || "").getTime();
    const dateB = new Date(b.data.date || "").getTime();
    return dateB - dateA;
  });

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
    <section aria-label="Featured project case studies">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sortedItems.map((item, index) => (
          <FeaturedProjectsCard key={item.id} item={item} index={index} />
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
