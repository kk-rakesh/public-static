"use client";

import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NewsletterCard from "@/components/newsletter/NewsletterCard";
import newslettersData from "@/data/newsletters.json";

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

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function NewslettersPage() {
  const newsletters: Newsletter[] = newslettersData;
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Get unique years from newsletters data
  const availableYears = useMemo(() => {
    const years = [...new Set(newsletters.map((n) => n.year))];
    return years.sort((a, b) => b - a); // Most recent first
  }, [newsletters]);

  // Get available months for selected year
  const availableMonths = useMemo(() => {
    if (!selectedYear) return [];
    const months = newsletters
      .filter((n) => n.year === selectedYear)
      .map((n) => n.month);
    return [...new Set(months)].sort((a, b) => a - b);
  }, [newsletters, selectedYear]);

  // Filter newsletters based on selection
  const filteredNewsletters = useMemo(() => {
    if (!selectedYear || !selectedMonth) return [];
    return newsletters
      .filter((n) => n.year === selectedYear && n.month === selectedMonth)
      .sort((a, b) => {
        // Sort by date within the month
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
  }, [newsletters, selectedYear, selectedMonth]);

  const handleYearChange = (year: number | null) => {
    setSelectedYear(year);
    setSelectedMonth(null); // Reset month when year changes
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f0] text-black">
      <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
        <Header />

        <main className="py-4 lg:py-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Newsletters</h1>
          <div className="border-b border-gray-300 mb-8"></div>

          {/* Year Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => handleYearChange(year)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  selectedYear === year
                    ? "bg-brand-green text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Month Pills - appear when year is selected */}
          {selectedYear && (
            <div className="flex flex-wrap gap-2 mb-8">
              {availableMonths.map((month) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    selectedMonth === month
                      ? "bg-brand-green text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {MONTHS[month - 1]}
                </button>
              ))}
            </div>
          )}

          {/* Content */}
          {!selectedYear || !selectedMonth ? (
            <p className="text-text-gray">
              Please select a year and month to view newsletters.
            </p>
          ) : filteredNewsletters.length === 0 ? (
            <p className="text-text-gray">
              No newsletters available for {MONTHS[selectedMonth - 1]} {selectedYear}.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNewsletters.map((newsletter) => (
                <NewsletterCard key={newsletter.id} newsletter={newsletter} />
              ))}
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
