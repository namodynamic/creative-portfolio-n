"use client";

import { PrismicRichText } from "@prismicio/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PrismicNextLink } from "@prismicio/next";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { asImageSrc, isFilled } from "@prismicio/client";
import { LiaCertificateSolid } from "react-icons/lia";
import { FaAward } from "react-icons/fa";
import {
  Database,
  Zap,
  CodeXml,
  Users,
  TrendingUp,
  Globe,
  BrainCircuit,
  Computer,
  Server,
} from "lucide-react";
import { useInView, motion } from "motion/react";
import { useRef } from "react";

interface CertificationCardProps {
  item: any;
  index: number;
  icon: React.ReactNode;
}

const iconMap: Record<string, React.ReactNode> = {
  certificate: <LiaCertificateSolid className="h-6 w-6 text-white-50" />,
  award: <FaAward className="h-6 w-6 text-white-50" />,
  database: <Database className="h-6 w-6 text-white-50" />,
  zap: <Zap className="h-6 w-6 text-white-50" />,
  code: <CodeXml className="h-6 w-6 text-white-50" />,
  users: <Users className="h-6 w-6 text-white-50" />,
  trending: <TrendingUp className="h-6 w-6 text-white-50" />,
  globe: <Globe className="h-6 w-6 text-white-50" />,
  brain: <BrainCircuit className="h-6 w-6 text-white-50" />,
  computer: <Computer className="h-6 w-6 text-white-50" />,
  server: <Server className="h-6 w-6 text-white-50" />,
};

const CertificationCard = ({ item, index, icon }: CertificationCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 0, scale: 0.95 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.25,
        ease: "easeOut",
        stiffness: 100,
        damping: 10,
      }}
      key={index}
      className={cn(
        "card group relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-neutral-800 shadow-md shadow-white/20 transition-all duration-500",
        "hover:after:absolute hover:after:inset-0 hover:after:rounded-2xl hover:after:transition-all hover:after:duration-500 hover:after:content-[''] md:hover:after:bg-black-100/60",
      )}
      style={{
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
        backgroundSize: "cover",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 z-0 bg-black-100/50  transition duration-500 md:group-hover:bg-black/10" />

      <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white">
        <div className="flex items-center justify-between transition-opacity duration-500 md:group-hover:opacity-0">
          <div className="rounded-lg bg-white/10 p-2">
            <div className="text-white dark:text-slate-900">
              {iconMap[
                (item.icon_name || "certificate")
                  .toString()
                  .trim()
                  .toLowerCase()
              ] || iconMap["certificate"]}
            </div>
          </div>
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
    </motion.div>
  );
};

export default CertificationCard;
