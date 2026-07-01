"use client";

import { KeyTextField } from "@prismicio/client";
import {
  IconBookmarkPlus,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

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
    <div className="flex flex-wrap items-center justify-between gap-4 border-t-[0.5px] border-zinc-400 p-6 md:p-8 dark:border-slate-800">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">Share:</span>
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#1a1f3d] p-2 transition-colors hover:bg-black/60 dark:hover:bg-[#252a4d]"
        >
          <IconBrandX className="size-4 text-white" />
        </a>
        <a
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#1a1f3d] p-2 transition-colors hover:bg-black/60 dark:hover:bg-[#252a4d]"
        >
          <IconBrandFacebook className="size-4 text-white" />
        </a>
        <a
          href={linkedInShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#1a1f3d] p-2 transition-colors hover:bg-black/60 dark:hover:bg-[#252a4d]"
        >
          <IconBrandLinkedin className="size-4 text-white" />
        </a>
      </div>
      <Button type="button" onClick={handleSaveForLater}>
        <IconBookmarkPlus data-icon="inline-start" />
        Save for later
      </Button>
    </div>
  );
}
