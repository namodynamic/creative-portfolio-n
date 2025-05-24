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
import { LiaCertificateSolid } from "react-icons/lia";

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

      <div className="grid grid-cols-1 gap-5 md:mt-10 pt-12 md:grid-cols-2 lg:grid-cols-3">
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
                "card group relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-neutral-800 shadow-md shadow-white/20 transition-all duration-500",
                "hover:after:absolute hover:after:inset-0 hover:after:rounded-2xl hover:after:transition-all hover:after:duration-500 hover:after:content-[''] md:hover:after:bg-black/60",
              )}
              style={{
                backgroundImage: backgroundUrl
                  ? `url(${backgroundUrl})`
                  : undefined,
                backgroundSize: "cover",
              }}
              onMouseEnter={(e) => {
                if (hoverUrl && window.innerWidth >= 768) {
                  (e.currentTarget as HTMLElement).style.backgroundImage =
                    `url(${hoverUrl})`;
                }
              }}
              onMouseLeave={(e) => {
                if (backgroundUrl && window.innerWidth >= 768) {
                  (e.currentTarget as HTMLElement).style.backgroundImage =
                    `url(${backgroundUrl})`;
                }
              }}
            >
              <div className="absolute inset-0 z-0 bg-black/60  transition duration-500 md:group-hover:bg-black/10" />

              <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white">
                <div className="flex items-center justify-between transition-opacity duration-500 md:group-hover:opacity-0">
                  <LiaCertificateSolid className="h-8 w-8 text-amber-300" />
                  <Badge
                    variant="secondary"
                    className="bg-black/40 px-2 py-1 text-xs text-slate-400 backdrop-blur hover:bg-black/50"
                  >
                    {item.time_period}
                  </Badge>
                </div>

                <div className="mt-6 space-y-2 text-slate-300 transition-opacity duration-500 md:group-hover:opacity-0">
                  <h3 className="text-xl font-semibold leading-tight tracking-wide">
                    {item.title}
                  </h3>
                  <div className="line-clamp-3 text-sm text-slate-300 opacity-80">
                    <PrismicRichText field={item.description} />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="opacity-70 transition-opacity duration-500 md:group-hover:opacity-0">
                    Issued by {item.issuer}
                  </span>
                  <Button
                    size="sm"
                    asChild
                    variant="ghost"
                    className="text-slate-300 hover:bg-black/20 hover:text-white"
                  >
                    <PrismicNextLink
                      field={item.credential_url}
                      className="flex items-center gap-2"
                    >
                      View Credential
                      <ExternalLink className="h-4 w-4" />
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
