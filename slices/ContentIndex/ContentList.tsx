"use client";

import React, { useRef, useState, useEffect } from "react";
import { asImageSrc, isFilled } from "@prismicio/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Content } from "@prismicio/client";
import Link from "next/link";
import { formatDate } from "@/utils/FormatDate";
import { Tag, ArrowRight } from "lucide-react";
import { PrismicNextImage } from "@prismicio/next";

gsap.registerPlugin(ScrollTrigger);

type ContentListProps = {
  items: Content.ProjectDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
};

export default function ContentList({
  items,
  contentType,
  fallbackItemImage,
  viewMoreText = "Read More",
}: ContentListProps) {
  const component = useRef(null);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

  const date = formatDate(items[0].data.date);

  // Sort the items by date in descending order
  const sortedItems = items.sort((a, b) => {
    const dateA = new Date(a.data.date || "").getTime();
    const dateB = new Date(b.data.date || "").getTime();
    return dateB - dateA;
  });

  const revealRef = useRef(null);
  const [currentItem, setCurrentItem] = useState<null | number>(null);
  const [hovering, setHovering] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const urlPrefix = contentType === "Blog" ? "/blog" : "/projects";

  useEffect(() => {
    // Animate list-items in with a stagger
    let ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: "elastic.out(1,0.3)",
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100px",
              end: "bottom center",
              toggleActions: "play none none none",
            },
          },
        );
      });

      return () => ctx.revert(); // cleanup!
    }, component);
  }, []);

  useEffect(() => {
    // Mouse move event listener
    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };
      // Calculate speed and direction
      const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

      let ctx = gsap.context(() => {
        // Animate the image holder
        if (currentItem !== null) {
          const maxY = window.scrollY + window.innerHeight - 350;
          const maxX = window.innerWidth - 250;

          gsap.to(revealRef.current, {
            x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
            y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
            rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1), // Apply rotation based on speed and direction
            ease: "back.out(2)",
            duration: 1.3,
          });
          gsap.to(revealRef.current, {
            opacity: hovering ? 0.4 : 0,
            visibility: "visible",
            ease: "power3.out",
            duration: 0.4,
          });
        }
        lastMousePos.current = mousePos;
        return () => ctx.revert(); // cleanup!
      }, component);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hovering, currentItem]);

  const onMouseEnter = (index: number) => {
    setCurrentItem(index);
    if (!hovering) setHovering(true);
  };

  const onMouseLeave = () => {
    setHovering(false);
    setCurrentItem(null);
  };

  const contentImages = items.map((item) => {
    const image = isFilled.image(item.data.hover_image)
      ? item.data.hover_image
      : fallbackItemImage;
    return asImageSrc(image, {
      fit: "scale",
      w: 220,
      h: 220,
      exp: -5,
    });
  });

  // Preload images
  useEffect(() => {
    contentImages.forEach((url) => {
      if (!url) return;
      const img = document.createElement("img");
      img.src = url;
    });
  }, [contentImages]);

  return (
    <section>
      <ul ref={component} onMouseLeave={onMouseLeave}>
        {sortedItems.map((item, index) => {
          const firstParagraph =
            item.data.slices
              .find((slice) => {
                return (
                  slice.slice_type === "text_block" &&
                  Array.isArray((slice as any).primary?.text) &&
                  (slice as any).primary.text.some(
                    (block: any) => block.type === "paragraph",
                  )
                );
              })
              ?.primary?.text.find((block: any) => block.type === "paragraph")
              ?.text || "";

          return (
            <li
              key={index}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              onMouseEnter={() => onMouseEnter(index)}
              className="list-item opacity-0"
            >
              <Link
                href={`${urlPrefix}/${item.uid}`}
                className="flex flex-col items-start justify-between gap-5 border-t border-slate-400 py-8 dark:border-t-slate-700 dark:text-slate-200  sm:flex-row sm:py-12 "
                aria-label={item.data.title || ""}
              >
                <div className="mb-4 space-y-4 sm:mb-0">
                  <div className="flex items-baseline gap-4">
                    <h3 className="text-xl font-bold uppercase sm:text-2xl">
                      {item.data.title}
                    </h3>
                    <span className="text-sm text-gray-400">
                      ({sortedItems.length - index})
                    </span>
                  </div>
                  <p className="line-clamp-3 max-w-full dark:text-slate-400 lg:max-w-[50vw]">
                    {firstParagraph || ""}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2 capitalize">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white dark:bg-slate-800/70 dark:text-slate-100"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2 sm:gap-5">
                  <div className="hidden h-32 w-48 rounded-lg bg-gray-900 md:block">
                    <PrismicNextImage
                      field={item.data.hover_image}
                      width={200}
                      height={130}
                      fallbackAlt=""
                      className="h-full w-full rounded-lg object-fill"
                    />
                  </div>
                  <span className="inline-flex items-center gap-1">
                    {viewMoreText} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}

        {/* Hover element */}
        <div
          className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-48 w-48 rounded-2xl bg-cover bg-center opacity-0 transition-[background] duration-300"
          style={{
            backgroundImage:
              currentItem !== null ? `url(${contentImages[currentItem]})` : "",
          }}
          ref={revealRef}
        ></div>
      </ul>
    </section>
  );
}
