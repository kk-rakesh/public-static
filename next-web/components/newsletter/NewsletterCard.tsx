"use client";

import Image from "next/image";
import { getAssetPath } from "@/lib/constants";

interface Newsletter {
  id: string;
  slug: string;
  title: string;
  date: string;
  month: number;
  year: number;
  thumbnail: string;
  pdfUrl: string;
  summary: string;
}

export default function NewsletterCard({ newsletter }: { newsletter: Newsletter }) {
  return (
    <article className="flex flex-col group">
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 group-hover:shadow-lg transition-shadow bg-gray-200">
        <Image
          src={getAssetPath(newsletter.thumbnail)}
          alt={newsletter.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold leading-tight mb-2 group-hover:text-brand-green transition-colors">
        {newsletter.title}
      </h2>

      {/* Date */}
      <p className="text-sm text-text-gray mb-3">{newsletter.date}</p>

      {/* Summary */}
      <p className="text-sm text-text-gray mb-4 line-clamp-2">{newsletter.summary}</p>

      {/* View PDF Button */}
      <a
        href={getAssetPath(newsletter.pdfUrl)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-green hover:underline"
      >
        View PDF
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
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </article>
  );
}
