"use client";

import { type FC } from "react";
import { isFilled, type Content } from "@prismicio/client";
import {
  IconArrowRight,
  IconBrandGithub,
  IconCalendar,
  IconCircleCheck,
  IconClock,
  IconExternalLink,
  IconFolderCode,
  IconTag,
  IconWorld,
} from "@tabler/icons-react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { extractFirstParagraphFromSlices } from "@/utils/extractSliceText";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FeaturedProjectProps = {
  item: Content.ProjectDocument;
  index: number;
};

const formatProjectYear = (date: Content.ProjectDocument["data"]["date"]) => {
  if (!date) return null;

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return null;

  return parsedDate.getFullYear();
};

const FeaturedProjectsCard: FC<FeaturedProjectProps> = ({ item, index }) => {
  const firstParagraph = extractFirstParagraphFromSlices(item.data.slices);
  const projectYear = formatProjectYear(item.data.date);
  const hasLiveLink = isFilled.link(item.data.view_live);
  const hasSourceCode = isFilled.link(item.data.source_code);
  const hasProjectImage = isFilled.image(item.data.hover_image);
  const visibleTechStack = item.data.tech_stack
    .filter((tech) => Boolean(tech.name))
    .slice(0, 4);
  const hiddenTechCount = Math.max(
    item.data.tech_stack.filter((tech) => Boolean(tech.name)).length -
      visibleTechStack.length,
    0,
  );

  return (
    <Card
      size="sm"
      className="group/project ring-foreground/5 h-full pt-0! shadow-sm transition-transform hover:-translate-y-1"
    >
      <div className="bg-muted relative aspect-16/10 overflow-hidden">
        <Link
          href={`/projects/${item.uid}`}
          className="focus-visible:ring-ring block h-full outline-none focus-visible:ring-3"
          aria-label={`View ${item.data.title || "project"} case study`}
        >
          {hasProjectImage ? (
            <PrismicNextImage
              field={item.data.hover_image}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/project:scale-105"
            />
          ) : (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-3 text-sm">
              <IconFolderCode />
              Project preview
            </div>
          )}
        </Link>
      </div>

      <CardHeader>
        <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
          <Badge variant={index === 0 ? "default" : "secondary"}>
            {index === 0 ? "Featured" : "Selected work"}
          </Badge>

          {item.data.current_status && (
            <Badge variant="outline">
              <IconCircleCheck data-icon="inline-start" />
              {item.data.current_status}
            </Badge>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <CardTitle className="group-hover/project:text-primary line-clamp-2 text-xl transition-colors">
            {item.data.title}
          </CardTitle>

          <CardDescription className="text-sm leading-6">
            <span className="line-clamp-3">
              {firstParagraph || item.data.key_achievement}
            </span>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex grow flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          {projectYear && (
            <Badge variant="outline">
              <IconCalendar data-icon="inline-start" />
              {projectYear}
            </Badge>
          )}

          {item.data.development_time && (
            <Badge variant="outline">
              <IconClock data-icon="inline-start" />
              {item.data.development_time}
            </Badge>
          )}

          {item.data.accessibility && (
            <Badge variant="outline">
              <IconWorld data-icon="inline-start" />
              {item.data.accessibility}
            </Badge>
          )}
        </div>

        {visibleTechStack.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {visibleTechStack.map((tech, techIndex) => (
              <Badge key={`${tech.name}-${techIndex}`} variant="secondary">
                {tech.color && (
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: tech.color }}
                  />
                )}
                {tech.name}
              </Badge>
            ))}

            {hiddenTechCount > 0 && (
              <Badge variant="outline">+{hiddenTechCount}</Badge>
            )}
          </div>
        ) : (
          item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 capitalize">
              {item.tags.slice(0, 3).map((tag, tagIndex) => (
                <Badge key={`${tag}-${tagIndex}`} variant="secondary">
                  <IconTag data-icon="inline-start" />
                  {tag}
                </Badge>
              ))}
            </div>
          )
        )}
      </CardContent>

      <CardFooter className="bg-card flex flex-wrap gap-2 border-t-0">
        <Button asChild size="sm">
          <Link href={`/projects/${item.uid}`}>
            View case study
            <IconArrowRight data-icon="inline-end" />
          </Link>
        </Button>

        {hasLiveLink && (
          <Button asChild size="sm" variant="outline">
            <PrismicNextLink
              field={item.data.view_live}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconExternalLink data-icon="inline-start" />
              Live
            </PrismicNextLink>
          </Button>
        )}

        {hasSourceCode && (
          <Button asChild size="sm" variant="ghost">
            <PrismicNextLink
              field={item.data.source_code}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandGithub data-icon="inline-start" />
              Source
            </PrismicNextLink>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FeaturedProjectsCard;
