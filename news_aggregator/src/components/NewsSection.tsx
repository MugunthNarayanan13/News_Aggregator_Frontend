"use client";

import React, { useState, useEffect } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import NewsCardSmall from "@/components/NewsCardSmall";
import type { NewsCardSmallProps } from "@/components/NewsCardSmall";
import NewsCardBig from "@/components/NewsCardBig";

interface NewsSectionProps {
  sectionTitle: string;
  news: NewsCardSmallProps[];
}

export function NewsSection({ sectionTitle, news }: NewsSectionProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Function to update items per page based on screen width
  const updateItemsPerPage = () => {
    if (window.innerWidth < 640) {
      setItemsPerPage(2); // Mobile (small screens)
    } else if (window.innerWidth < 1024) {
      setItemsPerPage(4); // Tablet (medium screens)
    } else {
      setItemsPerPage(6); // Desktop (large screens)
    }
  };

  // Run once on mount and on window resize
  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Calculate number of pages
  const totalPages = Math.ceil(news.length / itemsPerPage);

  // Get the current set of news items
  const currentNews = news.slice(
    pageIndex * itemsPerPage,
    (pageIndex + 1) * itemsPerPage
  );

  return (
    <div
      className="flex flex-col font-roboto bg-foreground_light rounded-[30px] p-4 pb-8"
      id="newsSectionWrapper"
    >
      <div className="text-2xl font-light ml-3 mb-2">{sectionTitle}</div>

      <div className="relative flex flex-row gap-6 items-center">
        <div className="" id="bigCardWrapper">
          <NewsCardBig
            title="Financial Markets Volatile"
            sentiment="positive"
            pubDate="asdf/asdf/adsf"
            pubLogo="adsfa "
            pubName="Times Of India"
            desc="Scientists have discovered a new, highly efficient solar panel technology that could revolutionize the industry."
            imgUrl="sdfasdh asdfh asdf"
          />
        </div>
        {/* News Cards */}
        <div
          className="flex flex-row gap-10 ml-4 flex-wrap"
          id="smallCardWrapper"
        >
          {currentNews.map((n, index) => (
            <NewsCardSmall
              key={index}
              title={n.title}
              sentiment={n.sentiment}
              desc={n.desc}
              pubDate={n.pubDate}
              pubLogo={n.pubLogo}
              pubName={n.pubName}
            />
          ))}
        </div>

        <div className="absolute flex flex-row z-50 right-0 -top-10">
          {/* Left Arrow */}
          <button
            onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
            disabled={pageIndex === 0}
            className={`p-2 rounded-full ${
              pageIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() =>
              setPageIndex((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={pageIndex === totalPages - 1}
            className={`p-2 rounded-full ${
              pageIndex === totalPages - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
