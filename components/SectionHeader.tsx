"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  align?: "left" | "center";
  titleSize?: "sm" | "xs";
  descriptionSize?: "default" | "sm";
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  icon,
  align = "left",
  titleSize = "sm",
  descriptionSize = "default",
  className,
}: SectionHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(
        "[data-section-header-item]",
      );

      if (items.length === 0) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(items, { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      gsap.fromTo(
        items,
        {
          autoAlpha: 0,
          y: 20,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          clearProps: "transform",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );
    },
    { scope: headerRef },
  );

  return (
    <div
      ref={headerRef}
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Badge variant="secondary" data-section-header-item>
          {icon}
          <span className="uppercase">{eyebrow}</span>
        </Badge>
      )}

      <div data-section-header-item>
        <Heading as="h2" size={titleSize} className="text-balance">
          {title}
        </Heading>
      </div>

      {description && (
        <p
          data-section-header-item
          className={cn(
            "text-muted-foreground max-w-2xl text-pretty",
            descriptionSize === "default" && "text-base leading-7 md:text-lg",
            descriptionSize === "sm" && "text-sm leading-6 md:text-base",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
