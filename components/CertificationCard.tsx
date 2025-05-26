"use client";

import { PrismicRichText } from "@prismicio/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PrismicNextLink } from "@prismicio/next";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { asImageSrc, isFilled } from "@prismicio/client";
import { LiaCertificateSolid } from "react-icons/lia";

interface CertificationCardProps {
  item: any;
  index: number;
}

const CertificationCard = ({ item, index }: CertificationCardProps) => {
  const backgroundUrl = isFilled.image(item.background_image)
    ? asImageSrc(item.background_image, { w: 800, q: 80 })
    : undefined;

  const hoverUrl = isFilled.image(item.hover_image)
    ? asImageSrc(item.hover_image, { w: 800, q: 80 })
    : undefined;

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverUrl && window.innerWidth >= 768) {
      e.currentTarget.style.backgroundImage = `url(${hoverUrl})`;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (backgroundUrl && window.innerWidth >= 768) {
      e.currentTarget.style.backgroundImage = `url(${backgroundUrl})`;
    }
  };

  return (
    <div
      key={index}
      className={cn(
        "card group relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-neutral-800 shadow-md shadow-white/20 transition-all duration-500",
        "hover:after:absolute hover:after:inset-0 hover:after:rounded-2xl hover:after:transition-all hover:after:duration-500 hover:after:content-[''] md:hover:after:bg-black/60",
      )}
      style={{
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
        backgroundSize: "cover",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 z-0 bg-black/60  transition duration-500 md:group-hover:bg-black/10" />

      <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white">
        <div className="flex items-center justify-between transition-opacity duration-500 md:group-hover:opacity-0">
          <LiaCertificateSolid className="h-8 w-8 text-white-50" />
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
};

export default CertificationCard;
