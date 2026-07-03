"use client";

import { useState, useMemo } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconFileText,
  IconFilter,
  IconLoader2,
  IconSearch,
} from "@tabler/icons-react";
import type { Content } from "@prismicio/client";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";
import { Card, CardContent } from "@/components/ui/card";

type BlogListProps = {
  items: Content.BlogPostDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
  categories: { value: string; label: string }[];
};

const ITEMS_PER_PAGE = 10;

function formatCategoryLabel(category: string): string {
  return category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function BlogList({
  items,
  viewMoreText,
  categories,
}: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search query to avoid excessive filtering
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const categoryOptions = useMemo(() => {
    const categoryMap = new Map<string, string>();

    categories.forEach((category) => {
      const value = category.value.toLowerCase();

      if (value) {
        categoryMap.set(value, category.label || formatCategoryLabel(value));
      }
    });

    items.forEach((item) => {
      const category = item.data.category?.toLowerCase();

      if (category && !categoryMap.has(category)) {
        categoryMap.set(category, formatCategoryLabel(category));
      }
    });

    return Array.from(categoryMap, ([value, label]) => ({ value, label }));
  }, [categories, items]);

  // Filter and sort logic with debounced search
  const filteredAndSortedItems = useMemo(() => {
    let filtered = [...items];

    // Search filter with debounced query
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.data.title?.toLowerCase().includes(query) ||
          item.data.excerpt?.toLowerCase().includes(query) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (item) => item.data.category?.toLowerCase() === selectedCategory,
      );
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.data.date || "").getTime();
      const dateB = new Date(b.data.date || "").getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [items, debouncedSearchQuery, selectedCategory, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredAndSortedItems.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    if (filterType === "category") {
      setSelectedCategory(value);
    } else if (filterType === "sort") {
      setSortOrder(value as "newest" | "oldest");
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col gap-4">
        <div className="relative">
          <IconSearch className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-10 pl-10"
          />
          {searchQuery !== debouncedSearchQuery && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              <IconLoader2 className="text-primary size-4 animate-spin" />
            </div>
          )}
        </div>

        {/* Category Tabs and Sort */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((category) => (
              <Button
                key={category.value}
                type="button"
                variant={
                  selectedCategory === category.value ? "default" : "outline"
                }
                size="sm"
                onClick={() => handleFilterChange("category", category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <IconFilter className="text-muted-foreground size-4" />
            <Select
              value={sortOrder}
              onValueChange={(value) => handleFilterChange("sort", value)}
            >
              <SelectTrigger className="bg-card/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="newest">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-muted-foreground text-sm">
          {filteredAndSortedItems.length === 0 ? (
            "No articles found"
          ) : (
            <>
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredAndSortedItems.length)} of{" "}
              {filteredAndSortedItems.length} article
              {filteredAndSortedItems.length !== 1 ? "s" : ""}
              {debouncedSearchQuery && ` for "${debouncedSearchQuery}"`}
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
            </>
          )}
        </div>
      </div>

      {/* Blog Posts */}
      <div className="mb-10 flex flex-col gap-6">
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <BlogCard
              key={item.id}
              item={item}
              index={index}
              viewMoreText={viewMoreText || "Read More"}
            />
          ))
        ) : (
          <Card size="sm" className="ring-foreground/5">
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <IconFileText className="text-muted-foreground size-12" />
              <h3 className="font-heading text-lg font-medium">
                No articles found
              </h3>
              <p className="text-muted-foreground">
                {debouncedSearchQuery || selectedCategory !== "all"
                  ? "Try adjusting your search or filters."
                  : "Check back soon for new content."}
              </p>
              {(debouncedSearchQuery || selectedCategory !== "all") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setCurrentPage(1);
                  }}
                  className="mt-2"
                >
                  Clear filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="mb-10 flex items-center justify-center gap-2 md:pt-10">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IconChevronLeft data-icon="inline-start" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const showPage =
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1);

              if (!showPage) {
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="text-muted-foreground px-2">
                      ...
                    </span>
                  );
                }
                return null;
              }

              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon-sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <IconChevronRight data-icon="inline-end" />
          </Button>
        </div>
      )}
    </div>
  );
}
