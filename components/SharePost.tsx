"use client";

import { KeyTextField } from "@prismicio/client";
import { BookmarkPlus } from "lucide-react";
import { FaSquareFacebook, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.success("Post saved for later!", {
        position: "bottom-right",
        theme: "dark",
      });
    } else {
      toast("Post already saved!", {
        position: "bottom-right",
        theme: "dark",
      });
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t-[0.5px] border-zinc-400 p-6 dark:border-slate-800 md:p-8">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">Share:</span>
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#1a1f3d] p-2 transition-colors hover:bg-black/60 dark:hover:bg-[#252a4d]"
        >
          <FaXTwitter className="h-4 w-4 text-white" />
        </a>
        <a
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#1a1f3d] p-2 transition-colors hover:bg-black/60 dark:hover:bg-[#252a4d]"
        >
          <FaSquareFacebook className="h-4 w-4 text-white" />
        </a>
        <a
          href={linkedInShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#1a1f3d] p-2 transition-colors hover:bg-black/60 dark:hover:bg-[#252a4d]"
        >
          <FaLinkedin className="h-4 w-4 text-white" />
        </a>
      </div>
      <button
        onClick={handleSaveForLater}
        className="inline-flex items-center rounded-lg bg-[#1a1f3d] px-4 py-2 text-sm text-white transition-colors hover:bg-[#252a4d]"
      >
        <BookmarkPlus className="mr-2 h-4 w-4" />
        Save for later
      </button>
    </div>
  );
}
