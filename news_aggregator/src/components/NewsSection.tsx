/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import NewsCardSmall from "@/components/NewsCardSmall";
import type { NewsCardSmallProps } from "@/components/NewsCardSmall";
import NewsCardBig, { NewsCardBigProps } from "@/components/NewsCardBig";
import { fetchNews } from "@/utils/fetchModule"; // Import the fetchNews function

interface NewsSectionProps {
  sectionTitle: string;
  categoryUrl: string; // URL to fetch news from
}

export function NewsSection({ sectionTitle, categoryUrl }: NewsSectionProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [bigNews, setBigNews] = useState<NewsCardBigProps | null>(null);
  const [news, setNews] = useState<NewsCardSmallProps[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Fetch news on component mount or when categoryUrl changes
  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      const newsData = await fetchNews(categoryUrl);
      if (newsData) {
        setBigNews(newsData[0]);
        setNews(newsData[1]);
      }
      setLoading(false);
    };

    getNews();
  }, [categoryUrl]);

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
          {loading ? (
            <p>Loading...</p>
          ) : (
            <NewsCardBig
              title={bigNews ? bigNews.title : "Title of News"}
              sentiment={bigNews ? bigNews.sentiment : "positive"}
              pubDate={bigNews ? bigNews.pubDate : "2025-02-10"}
              pubLogo={bigNews ? bigNews.pubLogo : "https://www.image.co.in"}
              pubName={bigNews ? bigNews.pubName : "Publisher Name"}
              desc={
                bigNews
                  ? bigNews.desc
                  : "Description of the news will be present here for display"
              }
              imgUrl={bigNews ? bigNews.imgUrl : "imageUrl"}
              pubDateTZ={bigNews ? bigNews.pubDateTZ : "UTC"}
            />
          )}
        </div>
        {/* News Cards */}
        <div
          className="flex flex-row gap-10 ml-4 flex-wrap"
          id="smallCardWrapper"
        >
          {loading ? (
            <p>Loading news...</p>
          ) : (
            currentNews.map((n, index) => (
              <NewsCardSmall
                key={index}
                title={n.title}
                sentiment={n.sentiment}
                desc={n.desc}
                pubDate={n.pubDate}
                pubLogo={n.pubLogo}
                pubName={n.pubName}
                pubDateTZ={n.pubDateTZ}
              />
            ))
          )}
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
