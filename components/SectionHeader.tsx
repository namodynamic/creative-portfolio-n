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
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  icon,
  align = "left",
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

      <Heading as="h2" size="sm" className="text-balance">
        {title}
      </Heading>

      {description && (
        <p className="text-muted-foreground max-w-2xl text-base leading-7 text-pretty md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
