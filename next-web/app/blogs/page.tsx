"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import blogsData from "@/data/blogs.json";
import { getAssetPath } from "@/lib/constants";

interface Blog {
  id: string;
  slug: string;
  title: string;
  thumbnail: string;
  thumbnailTitle: string;
  thumbnailCategory: string;
  tags: string[];
  date: string;
  readTime: string;
  author: string;
  category: string;
  subcategory: string;
}

const BLOGS_PER_ROW = 3;

export default function BlogsPage() {
  const blogs: Blog[] = blogsData;
  const [visibleRows, setVisibleRows] = useState(1);

  const visibleBlogs = blogs.slice(0, visibleRows * BLOGS_PER_ROW);
  const hasMore = visibleBlogs.length < blogs.length;

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f0] text-black">
      <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
        <Header />

        <main className="py-4 lg:py-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">All Blogs</h1>
          <div className="border-b border-gray-300 mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleShowMore}
                className="px-8 py-3 border-2 border-brand-green text-brand-green font-medium rounded-full hover:bg-brand-green hover:text-white transition-colors cursor-pointer"
              >
                Show More
              </button>
            </div>
          )}
        </main>
      </div>

      <div className="mt-auto w-full max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
        <Footer />
      </div>
    </div>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group">
      <article className="flex flex-col">
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 group-hover:shadow-lg transition-shadow">
          <Image
            src={getAssetPath(blog.thumbnail)}
            alt={blog.thumbnailTitle}
            fill
            className="object-cover"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="text-[10px] font-bold tracking-wider text-brand-green bg-brand-green/10 px-2 py-0.5 rounded uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold leading-tight mb-2 group-hover:text-brand-green transition-colors">
          {blog.title}
        </h2>

        {/* Date and Read Time */}
        <p className="text-sm text-text-gray">
          {blog.date}, {blog.readTime}
        </p>
      </article>
    </Link>
  );
}
