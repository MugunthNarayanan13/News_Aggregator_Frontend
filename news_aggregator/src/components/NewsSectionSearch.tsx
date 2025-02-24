"use client";

import React from "react";
import NewsCardBig from "@/components/NewsCardBig";
import type { NewsCardBigProps } from "@/components/NewsCardBig";
import { X } from "lucide-react"; // Close icon

interface SearchResultsSectionProps {
  sectionTitle: string;
  news: NewsCardBigProps[];
  isOpen: boolean;
  onClose: () => void;
}

export function NewsSectionSearch({
  sectionTitle,
  news,
  isOpen,
  onClose,
}: SearchResultsSectionProps) {
  if (!isOpen) return null; // Do not render if modal is closed

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto custom-scrollbar"
      onClick={onClose} // Close when clicking outside
    >
      <div
        className="relative bg-foreground_light rounded-[30px] p-6 pb-8 w-full max-w-7xl mx-4 mt-10 shadow-lg max-h-screen overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        {/* Section Title */}
        <p className="text-2xl ml-5 mb-6">
          Search results for "{sectionTitle}"
        </p>

        {/* News Cards - Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10 mx-auto w-max">
          {news.map((n, index) => (
            <NewsCardBig
              key={index}
              title={n.title}
              desc={n.desc}
              pubDate={n.pubDate}
              pubDateTZ={n.pubDateTZ}
              pubName={n.pubName}
              pubLogo={n.pubLogo}
              imgUrl={n.imgUrl}
              sentiment={n.sentiment}
              link={n.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
