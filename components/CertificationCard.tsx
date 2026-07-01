"use client";

import type { ComponentType } from "react";

import type {
  ImageField,
  KeyTextField,
  LinkField,
  RichTextField,
  SelectField,
} from "@prismicio/client";
import { asText } from "@prismicio/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { cn } from "@/lib/utils";
import { isFilled } from "@prismicio/client";
import {
  IconAward,
  IconBrain,
  IconCertificate,
  IconCode,
  IconDatabase,
  IconDeviceDesktop,
  IconExternalLink,
  IconServer,
  IconSparkles,
  IconTrendingUp,
  IconUsers,
  IconWorld,
  type IconProps,
} from "@tabler/icons-react";
import { useInView, motion } from "motion/react";
import { useRef } from "react";

type CertificationIconName =
  | "certificate"
  | "database"
  | "zap"
  | "code"
  | "users"
  | "trending"
  | "globe"
  | "brain"
  | "computer"
  | "server"
  | "award";

export interface CertificationCardItem {
  title: KeyTextField;
  time_period: KeyTextField;
  credential_url: LinkField;
  issuer: KeyTextField;
  description: KeyTextField | RichTextField;
  background_image: ImageField<never>;
  hover_image: ImageField<never>;
  icon_name: SelectField<CertificationIconName, "filled">;
}

interface CertificationCardProps {
  item: CertificationCardItem;
  index: number;
}

const iconMap: Record<CertificationIconName, ComponentType<IconProps>> = {
  certificate: IconCertificate,
  award: IconAward,
  database: IconDatabase,
  zap: IconSparkles,
  code: IconCode,
  users: IconUsers,
  trending: IconTrendingUp,
  globe: IconWorld,
  brain: IconBrain,
  computer: IconDeviceDesktop,
  server: IconServer,
};

const CertificationCard = ({ item, index }: CertificationCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = iconMap[item.icon_name || "certificate"];
  const hasCredential = isFilled.link(item.credential_url);
  const description = Array.isArray(item.description)
    ? asText(item.description)
    : item.description || "";
  const hasBackground = isFilled.image(item.background_image);
  const hasHoverImage = isFilled.image(item.hover_image);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 12, scale: 0.98 }
      }
      transition={{
        type: "tween",
        ease: "easeOut",
        duration: 0.45,
        delay: index * 0.08,
      }}
      className="h-full"
    >
      <Card
        className={cn(
          "group/card bg-card relative isolate aspect-16/11 h-full min-h-72 w-full rounded-2xl shadow-md",
          "transition duration-300 hover:-translate-y-1 hover:shadow-xl",
        )}
      >
        <div className="absolute inset-0 -z-10">
          {hasBackground && (
            <PrismicNextImage
              field={item.background_image}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover/card:scale-105"
            />
          )}

          {hasHoverImage && (
            <PrismicNextImage
              field={item.hover_image}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover opacity-0 transition duration-500 group-hover/card:scale-105 group-hover/card:opacity-100"
            />
          )}

          <div className="bg-background/80 absolute inset-0" />
          <div className="from-background via-background/50 to-background/30 absolute inset-0 bg-linear-to-t" />
        </div>

        <div className="flex h-full flex-col">
          <CardHeader className="gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="border-border/70 bg-background/70 text-primary flex size-9 shrink-0 items-center justify-center rounded-xl border backdrop-blur">
                <Icon className="size-5" />
              </div>

              {item.time_period && (
                <Badge variant="secondary">{item.time_period}</Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="mt-auto flex flex-col gap-3">
            <CardTitle className="text-foreground line-clamp-2 text-base md:text-xl">
              {item.title}
            </CardTitle>

            {item.issuer && (
              <p className="text-muted-foreground text-sm font-medium">
                Issued by {item.issuer}
              </p>
            )}

            {description && (
              <p className="text-muted-foreground line-clamp-3 text-sm leading-7">
                {description}
              </p>
            )}
          </CardContent>

          {hasCredential && (
            <CardFooter className="border-t-0 bg-transparent">
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="bg-background/80 w-full backdrop-blur"
              >
                <PrismicNextLink field={item.credential_url}>
                  View credential
                  <IconExternalLink data-icon="inline-end" className="size-4" />
                </PrismicNextLink>
              </Button>
            </CardFooter>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default CertificationCard;
