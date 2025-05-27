"use client"

import type { Content } from "@prismicio/client"
import BlogCard from "@/components/BlogCard"

type BlogListSimpleProps = {
  items: Content.BlogPostDocument[]
  contentType: Content.ContentIndexSlice["primary"]["content_type"]
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"]
}

export default function BlogList({ items, viewMoreText }: BlogListSimpleProps) {
  const sortedItems = items.sort((a, b) => {
    const dateA = new Date(a.data.date || "").getTime()
    const dateB = new Date(b.data.date || "").getTime()
    return dateB - dateA
  })

  return (
    <div className="w-full max-w-4xl px-4 py-8 justify-center">
      <div className="space-y-6">
        {sortedItems.map((item, index) => (
          <BlogCard key={item.id} item={item} index={index} viewMoreText={viewMoreText || ""} />
        ))}
      </div>
    </div>
  )
}
