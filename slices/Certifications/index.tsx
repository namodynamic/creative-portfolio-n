"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { PrismicNextLink } from "@prismicio/next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { asImageSrc, isFilled } from "@prismicio/client";

import type { JSX } from "react";

/**
 * Props for `Certifications`.
 */
export type CertificationsProps =
  SliceComponentProps<Content.CertificationsSlice>;

/**
 * Component for "Certifications" Slices.
 */
const Certifications = ({ slice, index }: CertificationsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-md:-mt-20"
    >
      <Heading as="h2" size="lg" className="max-md:text-3xl">
        {slice.primary.heading}
      </Heading>

      <div className="grid grid-cols-2 items-center justify-center gap-5 pt-12 max-sm:grid-cols-1 lg:grid-cols-3">
        {slice.items.map((item, index) => {
          const backgroundUrl = isFilled.image(item.background_image)
            ? asImageSrc(item.background_image, { w: 800, q: 80 })
            : undefined;

          const hoverUrl = isFilled.image(item.hover_image)
            ? asImageSrc(item.hover_image, { w: 800, q: 80 })
            : undefined;

          return (
            <div
              key={index}
              className={cn(
                "card group relative mx-auto flex w-full cursor-pointer flex-col justify-end overflow-hidden rounded-xl border border-neutral-800 p-4 shadow-xl sm:h-72",
                "hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50 hover:after:content-['']",
                "transition-all duration-500",
              )}
              style={{
                backgroundImage: backgroundUrl
                  ? `url(${backgroundUrl})`
                  : undefined,
                backgroundSize: "cover",
              }}
              onMouseEnter={(e) => {
                if (hoverUrl) {
                  (e.currentTarget as HTMLElement).style.backgroundImage =
                    `url(${hoverUrl})`;
                }
              }}
              onMouseLeave={(e) => {
                if (backgroundUrl) {
                  (e.currentTarget as HTMLElement).style.backgroundImage =
                    `url(${backgroundUrl})`;
                }
              }}
            >
              <div className="relative z-50 space-y-4 p-6">
                <div className="flex items-center justify-between transition-opacity duration-300 group-hover:opacity-0">
                  <h3 className="relative text-lg font-semibold leading-tight text-white">
                    {item.title}
                  </h3>
                  <Badge variant="secondary" className="px-2 py-1 text-xs">
                    {item.time_period}
                  </Badge>
                </div>
                <div className="line-clamp-3 text-sm text-slate-300 transition-opacity duration-300 group-hover:opacity-0">
                  <PrismicRichText field={item.description} />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground transition-opacity duration-300 group-hover:opacity-0">
                    Issued by {item.issuer}
                  </span>
                  <Button
                    size="sm"
                    asChild
                    className="bg-transparent text-gray-400 hover:border-gray-800 hover:bg-black/20 hover:text-white"
                  >
                    <PrismicNextLink
                      field={item.credential_url}
                      className="flex items-center justify-center gap-2"
                    >
                      View Credential
                      <ExternalLink className="inline h-4 w-4" />
                    </PrismicNextLink>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Bounded>
  );
};

export default Certifications;
