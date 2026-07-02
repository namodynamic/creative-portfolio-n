import Image from "next/image";
import Link from "next/link";

import { createClient } from "@/prismicio";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IconArrowRight, IconUserCircle } from "@tabler/icons-react";

export default async function AuthorCard({
  className = "",
}: {
  className?: string;
}) {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const authorName = settings.data.name || "Nnamdi Ekechi";

  return (
    <Card
      size="sm"
      className={cn("bg-opacity-80 ring-foreground/5 shadow-sm", className)}
    >
      <CardHeader className="gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="bg-muted relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border">
          {settings.data.blog_author_img.url ? (
            <Image
              src={settings.data.blog_author_img.url}
              alt={authorName}
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : (
            <IconUserCircle className="text-muted-foreground size-7" />
          )}
        </div>

        <div className="flex flex-col gap-1">
          <CardTitle>{authorName}</CardTitle>
          {settings.data.role && (
            <CardDescription>{settings.data.role}</CardDescription>
          )}
        </div>
      </CardHeader>

      {(settings.data.author_bio || settings.data.role) && (
        <CardContent className="flex flex-col items-start gap-4">
          {settings.data.author_bio && (
            <p className="text-muted-foreground text-sm leading-7">
              {settings.data.author_bio}
            </p>
          )}

          <Button size="sm" asChild variant="outline">
            <Link href="/contact">
              Let&apos;s work together
              <IconArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
