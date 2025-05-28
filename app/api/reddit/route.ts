import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

async function getRedditAccessToken() {
  const clientId = process.env.REDDIT_CLIENT_ID!;
  const clientSecret = process.env.REDDIT_SECRET!;
  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Failed to get Reddit token:", errorText);
    throw new Error("Failed to get Reddit access token");
  }

  const data = await res.json();
  return data.access_token;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subreddit = searchParams.get("subreddit") || "technology";

  try {
    const token = await getRedditAccessToken();

    const redditRes = await fetch(`https://oauth.reddit.com/r/${subreddit}/hot?limit=5`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "TechNewsSidebar/1.0 (by /u/namodynamic)",
      },
      next: { revalidate: 600 },
    });

    if (!redditRes.ok) {
      const errorText = await redditRes.text();
      console.error("Reddit API error:", redditRes.status, errorText);
      return NextResponse.json(
        {
          error: "Failed to fetch from Reddit",
          status: redditRes.status,
          redditError: errorText,
        },
        { status: 500 },
      );
    }

    const data = await redditRes.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    });
  } catch (error) {
    console.error("Reddit fetch error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
