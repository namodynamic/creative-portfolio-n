"use client";

import { useCallback, useEffect, useState } from "react";
import {
  IconArrowUp,
  IconExternalLink,
  IconLoader2,
  IconMessageCircle,
  IconRefresh,
  IconTrendingUp,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface RedditPost {
  id: string;
  title: string;
  url: string;
  permalink: string;
  thumbnail: string;
  preview?: {
    images: Array<{
      source: {
        url: string;
        width: number;
        height: number;
      };
    }>;
  };
  ups: number;
  num_comments: number;
  created_utc: number;
  subreddit: string;
  author: string;
  selftext: string;
  is_video: boolean;
}

interface NewsItem {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  score: number;
  comments: number;
  timeAgo: string;
  source: string;
  excerpt: string;
}

type SourceKey =
  | "technology"
  | "webdev"
  | "programming"
  | "javascript"
  | "typescript"
  | "Python"
  | "django"
  | "ArtificialInteligence";

type RedditChild = {
  data: RedditPost;
};

const sources = [
  { key: "technology", label: "Technology", subreddit: "technology" },
  { key: "webdev", label: "WebDev", subreddit: "webdev" },
  { key: "programming", label: "Programming", subreddit: "programming" },
  { key: "javascript", label: "JS", subreddit: "javascript" },
  { key: "typescript", label: "TS", subreddit: "typescript" },
  { key: "Python", label: "Python", subreddit: "Python" },
  { key: "django", label: "Django", subreddit: "django" },
  {
    key: "ArtificialInteligence",
    label: "AI",
    subreddit: "ArtificialInteligence",
  },
] as const;

export default function TechNewsCard() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<SourceKey>("technology");

  const getTimeAgo = useCallback((timestamp: number) => {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return "< 1h ago";
  }, []);

  const getImageUrl = useCallback((post: RedditPost): string => {
    // Try to get high quality image from preview
    if (post.preview?.images?.[0]?.source?.url) {
      return post.preview.images[0].source.url.replace(/&amp;/g, "&");
    }

    // Fallback to thumbnail if it's a valid image
    if (
      post.thumbnail &&
      post.thumbnail.startsWith("http") &&
      post.thumbnail !== "self" &&
      post.thumbnail !== "default"
    ) {
      return post.thumbnail;
    }

    return "";
  }, []);

  const truncateText = useCallback((text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  }, []);

  const fetchRedditPosts = useCallback(
    async (subreddit: string, signal?: AbortSignal) => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/reddit?subreddit=${subreddit}`, {
          signal,
        });

        if (!res.ok) throw new Error(`Reddit error: ${res.status}`);

        const data = await res.json();

        const posts: NewsItem[] = data.data.children
          .map((child: RedditChild) => {
            const post: RedditPost = child.data;
            return {
              id: post.id,
              title: post.title,
              url: post.url.startsWith("/r/")
                ? `https://reddit.com${post.url}`
                : post.url,
              thumbnail: getImageUrl(post),
              score: post.ups,
              comments: post.num_comments,
              timeAgo: getTimeAgo(post.created_utc),
              source: `r/${post.subreddit}`,
              excerpt: post.selftext ? truncateText(post.selftext, 100) : "",
            };
          })
          .filter((post: NewsItem) => post.title.length > 10)
          .slice(0, 5);

        setNews(posts);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError("Unable to load tech news");
      } finally {
        setLoading(false);
      }
    },
    [getImageUrl, getTimeAgo, truncateText],
  );

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      const source = sources.find((s) => s.key === selectedSource);
      if (source) {
        fetchRedditPosts(source.subreddit, controller.signal);
      }
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [fetchRedditPosts, selectedSource]);

  const handleRefresh = () => {
    const source = sources.find((s) => s.key === selectedSource);
    if (source) {
      fetchRedditPosts(source.subreddit);
    }
  };

  const selectedSubreddit = sources.find(
    (source) => source.key === selectedSource,
  )?.subreddit;

  return (
    <Card className="bg-card/80 sticky top-24 w-full backdrop-blur">
      <CardHeader className="gap-4">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <IconTrendingUp className="text-primary size-5" />
            Tech News & Articles
          </CardTitle>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={handleRefresh}
            disabled={loading}
            aria-label="Refresh tech news"
          >
            {loading ? (
              <IconLoader2 className="size-4 animate-spin" />
            ) : (
              <IconRefresh className="size-4" />
            )}
          </Button>
        </div>

        {/* Source Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {sources.map((source) => (
            <Button
              key={source.key}
              type="button"
              variant={selectedSource === source.key ? "default" : "outline"}
              size="xs"
              onClick={() => setSelectedSource(source.key)}
            >
              {source.label}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="size-12 rounded-md" />
                  <div className="flex flex-1 flex-col gap-1">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-destructive text-sm">{error}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRefresh}
            >
              Try again
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {news.map((item) => (
              <article key={item.id} className="group">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-muted/50 block rounded-lg p-2 transition-colors"
                >
                  <div className="flex gap-3">
                    {item.thumbnail && (
                      <div className="shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.thumbnail || "/placeholder.svg"}
                          alt=""
                          className="bg-muted size-12 rounded-md object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-foreground group-hover:text-primary line-clamp-2 text-sm font-medium transition-colors">
                        {item.title}
                      </h3>
                      {item.excerpt && (
                        <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-muted-foreground mt-2 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <IconArrowUp className="size-3" />
                        {item.score}
                      </span>
                      <span className="flex items-center gap-1">
                        <IconMessageCircle className="size-3" />
                        {item.comments}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>{item.timeAgo}</span>
                      <IconExternalLink className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </div>
                </a>
              </article>
            ))}

            <Separator />

            <div>
              <a
                href={`https://reddit.com/r/${selectedSubreddit}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary flex items-center justify-center gap-1 text-xs font-medium hover:underline"
              >
                View more on Reddit
                <IconExternalLink className="size-3" />
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
