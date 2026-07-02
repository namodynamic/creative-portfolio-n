"use client";

import { KeyTextField } from "@prismicio/client";
import {
  IconBookmarkPlus,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandX,
  IconShare3,
} from "@tabler/icons-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

export default function SharePost({
  title,
  url,
}: {
  title: KeyTextField;
  url: string;
}) {
  // Social media share
  const twitterShareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
    title || "",
  )}&url=${encodeURIComponent(url)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url,
  )}`;
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    url,
  )}&title=${encodeURIComponent(title || "")}`;

  // Save for later functionality
  const handleSaveForLater = () => {
    const savedPosts = JSON.parse(localStorage.getItem("savedPosts") || "[]");

    const isAlreadySaved = savedPosts.some(
      (post: { url: string }) => post.url === url,
    );

    if (!isAlreadySaved) {
      savedPosts.push({ title, url });
      localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
      toast.success("Post saved for later.");
    } else {
      toast.info("Post already saved.");
    }
  };

  return (
    <CardFooter className="flex flex-wrap justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-muted-foreground inline-flex items-center gap-1.5 text-sm font-medium">
          <IconShare3 className="size-4" />
          Share
        </span>
        <Button
          asChild
          variant="outline"
          size="icon-sm"
          aria-label="Share on X"
        >
          <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
            <IconBrandX />
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          size="icon-sm"
          aria-label="Share on Facebook"
        >
          <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
            <IconBrandFacebook />
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          size="icon-sm"
          aria-label="Share on LinkedIn"
        >
          <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer">
            <IconBrandLinkedin />
          </a>
        </Button>
      </div>

      <Button type="button" variant="secondary" onClick={handleSaveForLater}>
        <IconBookmarkPlus data-icon="inline-start" />
        Save for later
      </Button>
    </CardFooter>
  );
}
