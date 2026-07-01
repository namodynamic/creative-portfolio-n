"use client";

import { type FC } from "react";
import type { Content } from "@prismicio/client";
import {
  IconArrowRight,
  IconBrandGithub,
  IconExternalLink,
  IconEye,
  IconTag,
} from "@tabler/icons-react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { extractFirstParagraphFromSlices } from "@/utils/extractSliceText";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FeaturedProjectProps = {
  item: Content.ProjectDocument;
  index: number;
};

const FeaturedProjectsCard: FC<FeaturedProjectProps> = ({ item, index }) => {
  const isEven = index % 2 === 0;

  const firstParagraph = extractFirstParagraphFromSlices(item.data.slices);

  return (
    <div
      className={cn(
        "grid grid-cols-1 items-center gap-6 md:gap-10 lg:grid-cols-2 lg:gap-14",
      )}
    >
      <div className={`relative ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        <Card className="group overflow-hidden p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg md:p-3">
          <CardContent className="relative p-0">
            <div
              className={cn(
                "absolute inset-0 rounded-xl opacity-20 blur-2xl transition duration-300 group-hover:opacity-30",
                item.data.color,
              )}
            />
            <div className="bg-muted relative aspect-5/3 overflow-hidden rounded-xl">
              <PrismicNextImage
                field={item.data.hover_image}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="bg-background/0 backdrop-blur-0 group-hover:bg-background/40 absolute inset-0 flex items-center justify-center rounded-xl opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:backdrop-blur-sm">
              <div className="flex flex-wrap justify-center gap-2">
                <Button asChild size="sm">
                  <PrismicNextLink
                    field={item.data.view_live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconEye data-icon="inline-start" />
                    Live
                  </PrismicNextLink>
                </Button>

                <Button asChild size="sm" variant="secondary">
                  <PrismicNextLink
                    field={item.data.source_code}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconBrandGithub data-icon="inline-start" />
                    Code
                  </PrismicNextLink>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div
        className={cn(
          "flex flex-col gap-4",
          isEven ? "lg:order-2" : "lg:order-1",
        )}
      >
        <h3 className="text-foreground text-2xl leading-tight font-semibold tracking-tight text-balance md:text-3xl">
          {item.data.title}
        </h3>

        <div className="text-muted-foreground text-base leading-7 md:text-lg">
          <p className="line-clamp-3">{firstParagraph}</p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1 capitalize">
          {item.tags && item.tags.length > 0 && (
            <>
              {item.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                <Badge key={tagIndex} variant="secondary" className="gap-1">
                  <IconTag data-icon="inline-start" />
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 3 && (
                <Badge variant="outline">+{item.tags.length - 3}</Badge>
              )}
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button size="sm" asChild>
            <Link href={`/projects/${item.uid}`}>
              View Project
              <IconArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button size="sm" asChild variant="outline">
            <PrismicNextLink field={item.data.view_live}>
              <IconExternalLink data-icon="inline-start" />
              Live demo
            </PrismicNextLink>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectsCard;
