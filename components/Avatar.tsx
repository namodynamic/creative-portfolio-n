"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { cn } from "@/lib/utils";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

type AvatarProps = {
  image: ImageField;
  className?: string;
};
export default function Avatar({ image, className }: AvatarProps) {
  const component = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".avatar",
        {
          opacity: 0,
          scale: 1.4,
        },
        {
          scale: 1,
          opacity: 1,
          duration: prefersReducedMotion ? 0 : 1.3,
          ease: "power3.inOut",
        },
      );

      const handlePointerMove = (e: PointerEvent) => {
        if (!component.current) return; // no component, no animation!
        const componentRect = component.current.getBoundingClientRect();
        const componentCenterX = componentRect.left + componentRect.width / 2;

        const componentPercent = {
          x: (e.clientX - componentCenterX) / componentRect.width / 2,
        };

        const distFromCenterX = 1 - Math.abs(componentPercent.x);

        gsap
          .timeline({
            defaults: { duration: 0.5, overwrite: "auto", ease: "power3.out" },
          })
          .to(
            ".avatar",
            {
              rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
              duration: 0.5,
            },
            0,
          )
          .to(
            ".highlight",
            {
              opacity: distFromCenterX - 0.7,
              x: -10 + 20 * componentPercent.x,
              duration: 0.5,
            },
            0,
          );
      };

      if (!prefersReducedMotion) {
        window.addEventListener("pointermove", handlePointerMove, {
          passive: true,
        });
      }

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
      };
    }, component);
    return () => ctx.revert(); // cleanup!
  }, [prefersReducedMotion]);

  return (
    <div ref={component} className={cn("relative h-full w-full", className)}>
      <div
        className="avatar border-border/70 bg-card shadow-foreground/5 relative aspect-square overflow-hidden rounded-3xl border opacity-0 shadow-2xl will-change-transform"
        style={{ perspective: "500px", perspectiveOrigin: "150% 150%" }}
      >
        <PrismicNextImage
          field={image}
          className="avatar-image h-full w-full object-fill"
          imgixParams={{ q: 90 }}
        />
        <div className="highlight via-foreground/20 pointer-events-none absolute inset-0 hidden w-full scale-110 bg-linear-to-tr from-transparent to-transparent opacity-0 md:block" />
      </div>
    </div>
  );
}
