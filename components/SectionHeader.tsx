import type { ReactNode } from "react";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Badge variant="secondary">
          {icon}
          <span className="uppercase">{eyebrow}</span>
        </Badge>
      )}

      <Heading as="h2" size={titleSize} className="text-balance">
        {title}
      </Heading>

      {description && (
        <p
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
