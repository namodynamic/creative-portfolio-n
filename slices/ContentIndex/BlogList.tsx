"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
import type { Content } from "@prismicio/client";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";

type BlogListProps = {
  items: Content.BlogPostDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
  categories: { value: string; label: string }[];
};

const ITEMS_PER_PAGE = 10;

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

  // Filter and sort logic with debounced search
  const filteredAndSortedItems = useMemo(() => {
    let filtered = items;

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

    filtered.sort((a, b) => {
      const dateA = new Date(a.data.date || "").getTime();
      const dateB = new Date(b.data.date || "").getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
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
    <div className="w-full max-w-4xl">
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="border-gray-200 bg-white/80 pl-10 dark:border-gray-800 dark:bg-blue-850/80"
          />
          {searchQuery !== debouncedSearchQuery && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-purple-600"></div>
            </div>
          )}
        </div>

        {/* Category Tabs and Sort */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleFilterChange("category", category.value)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.value
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-black/50 text-gray-300 hover:text-white dark:bg-[#0a0e29]/80 dark:hover:bg-[#0a0e29]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select
              value={sortOrder}
              onValueChange={(value) => handleFilterChange("sort", value)}
            >
              <SelectTrigger className="w-[140px] border-[0.5px] border-gray-500 bg-white/80 dark:bg-blue-850/80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-[0.5px] border-gray-500 bg-white dark:bg-black-100">
                <SelectItem value="newest">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
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
      <div className="mb-10 space-y-6">
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
          <div className="py-12 text-center">
            <div className="mb-4 text-gray-400 dark:text-gray-500">
              <FileText className="mx-auto h-12 w-12" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              No articles found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {debouncedSearchQuery || selectedCategory !== "all"
                ? "Try adjusting your search or filters"
                : "Check back soon for new content!"}
            </p>
            {(debouncedSearchQuery || selectedCategory !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setCurrentPage(1);
                }}
                className="mt-4"
              >
                Clear filters
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex items-center justify-center gap-2 pt-10">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
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
                    <span
                      key={page}
                      className="px-2 text-black dark:text-gray-400"
                    >
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
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className={`h-8 w-8 p-0 ${
                    currentPage === page
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : ""
                  }`}
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
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
