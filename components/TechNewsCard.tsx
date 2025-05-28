"use client";

import { useEffect, useState } from "react";
import { ExternalLink, TrendingUp, Clock, Users, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function TechNewsCard() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<
    | "technology"
    | "webdev"
    | "programming"
    | "javascript"
    | "typescript"
    | "Python"
    | "django"
    | "ArtificialInteligence"
  >("technology");

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

  const getTimeAgo = (timestamp: number) => {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return "< 1h ago";
  };

  const getImageUrl = (post: RedditPost): string => {
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
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const fetchRedditPosts = async (subreddit: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://www.reddit.com/r/${subreddit}/hot.json?limit=5&t=day`,
        {
          headers: {
            "User-Agent": "TechNewsSidebar/1.0",
          },
        },
      );

      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();

      const posts: NewsItem[] = data.data.children
        .map((child: any) => {
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
        .filter((post: NewsItem) => post.title.length > 10) // Filter out very short titles
        .slice(0, 5);

      setNews(posts);
    } catch (err) {
      console.error("Error fetching Reddit posts:", err);
      setError("Unable to load tech news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const source = sources.find((s) => s.key === selectedSource);
    if (source) {
      fetchRedditPosts(source.subreddit);
    }
  }, [selectedSource]);

  const handleRefresh = () => {
    const source = sources.find((s) => s.key === selectedSource);
    if (source) {
      fetchRedditPosts(source.subreddit);
    }
  };

  return (
    <Card className="sticky top-24 w-full space-y-8 border-[0.5px] border-zinc-300 bg-white/20 shadow-sm dark:bg-blue-850/50 backdrop-blur-sm dark:border-gray-800">
      <CardHeader className="pb-3">
        <div className="mb-2 flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            Tech News & Articles
          </CardTitle>
          <button
            onClick={handleRefresh}
            className="rounded-md p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            disabled={loading}
          >
            <ArrowUp className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Source Tabs */}
        <div className="mt-2 flex flex-wrap gap-1">
          {sources.map((source) => (
            <button
              key={source.key}
              onClick={() => setSelectedSource(source.key)}
              className={`rounded-md px-2 py-1 text-xs transition-colors ${
                selectedSource === source.key
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {source.label}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-12 w-12 rounded" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="py-8 text-center">
            <p className="mb-2 text-sm text-red-500 dark:text-red-400">
              {error}
            </p>
            <button
              onClick={handleRefresh}
              className="text-xs text-blue-600 hover:underline dark:text-blue-400"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <article key={item.id} className="group">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block space-y-2 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div className="flex gap-3">
                    {item.thumbnail && (
                      <div className="flex-shrink-0">
                        <img
                          src={item.thumbnail || "/placeholder.svg"}
                          alt=""
                          className="h-12 w-12 rounded bg-gray-100 object-cover dark:bg-gray-700"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-medium text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                        {item.title}
                      </h3>
                      {item.excerpt && (
                        <p className="mt-1 line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <ArrowUp className="h-3 w-3" />
                        {item.score}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {item.comments}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{item.timeAgo}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </div>
                </a>
              </article>
            ))}

            <div className="border-t border-gray-200 pt-2 dark:border-gray-700">
              <a
                href={`https://reddit.com/r/${sources.find((s) => s.key === selectedSource)?.subreddit}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 text-xs text-purple-600 hover:underline dark:text-purple-400"
              >
                View more on Reddit
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
