"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { PrismicNextLink } from "@prismicio/next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

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
  const cardRef = useRef(null);


  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-md:-mt-20"
    >
      <Heading as="h2" size="lg" className="max-md:text-3xl">
        {slice.primary.heading}
      </Heading>

      <div className="gird-cols-1 grid items-center justify-center gap-5 pt-12 md:grid-cols-3">
        {slice.items.map((item, index) => (
          <motion.div
            key={index}
            className="rounded-2xl border border-slate-800 shadow-md transition-shadow duration-300 hover:shadow-lg"
            ref={cardRef}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            }}
          >
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold leading-tight text-white">
                  {item.title}
                </h3>
                <Badge variant="secondary" className="px-2 py-1 text-xs">
                  {item.time_period}
                </Badge>
              </div>
              <div className="line-clamp-3 text-sm text-slate-300">
                <PrismicRichText field={item.description} />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground">
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
                    Show Credential
                    <ExternalLink className="inline h-4 w-4" />
                  </PrismicNextLink>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Bounded>
  );
};

export default Certifications;
