"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface BlogSection {
  id: string;
  title: string;
  content: string;
}

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
  introduction: string;
  sections: BlogSection[];
}

export default function BlogContent({ blog }: { blog: Blog }) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = blog.sections.map((section) =>
        document.getElementById(section.id)
      );

      const scrollPosition = window.scrollY + 150;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(blog.sections[i].id);
          return;
        }
      }

      if (sectionElements[0] && scrollPosition < sectionElements[0].offsetTop) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog.sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  return (
    <main className="py-8 lg:py-16">
      <div className="flex gap-8 lg:gap-16">
        {/* Table of Contents - Sticky Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-8">
            <h3 className="font-bold text-lg mb-4">Table of contents</h3>
            <div className="border-l-2 border-gray-200">
              <nav className="flex flex-col">
                {blog.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left pl-4 py-2 text-sm transition-colors border-l-2 -ml-[2px] cursor-pointer ${
                      activeSection === section.id
                        ? "border-brand-green text-brand-green font-medium"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <article className="flex-1 max-w-3xl">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-brand-green transition-colors mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Blogs
          </Link>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">{blog.title}</h1>

          {/* Thumbnail */}
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 mb-6">
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 leading-tight max-w-md">
                {blog.thumbnailTitle}
              </h2>
              <span className="text-sm font-semibold tracking-wider text-gray-600 bg-white/50 px-3 py-1 rounded-full w-fit">
                {blog.thumbnailCategory}
              </span>
            </div>
          </div>

          {/* Date and Read Time */}
          <p className="text-sm text-text-gray mb-8">
            {blog.date}, {blog.readTime}
          </p>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            {blog.introduction.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Sections */}
          {blog.sections.map((section) => (
            <section key={section.id} id={section.id} className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6">
                {section.title}
              </h2>
              <div className="prose prose-lg max-w-none">
                {section.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
