"use client";

import React, { useState, useEffect } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import type { NewsCardSmallProps } from "@/components/NewsCardSmall";
import type { NewsCardBigProps } from "@/components/NewsCardBig";
import NewsCardSmall from "@/components/NewsCardSmall";
import NewsCardBig from "@/components/NewsCardBig";
import { fetchNews } from "@/utils/fetchModule";

interface NewsSectionProps {
  sectionTitle: string;
  categoryUrl: string;
}

interface NewsState {
  bigNews: NewsCardBigProps | null;
  smallNews: NewsCardSmallProps[];
  loading: boolean;
  error: string | null;
}

const INITIAL_NEWS_STATE: NewsState = {
  bigNews: null,
  smallNews: [],
  loading: true,
  error: null,
};

export function NewsSection({ sectionTitle, categoryUrl }: NewsSectionProps) {
  const [newsState, setNewsState] = useState<NewsState>(INITIAL_NEWS_STATE);
  const [pageIndex, setPageIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Function to update items per page based on screen width
  const updateItemsPerPage = () => {
    if (window.innerWidth < 640) {
      setItemsPerPage(2); // Mobile (small screens)
    } else if (window.innerWidth < 1024) {
      setItemsPerPage(4); // Tablet (medium screens)
    }
    else setItemsPerPage(6);
  };

  useEffect(() => {
    updateItemsPerPage();
    const handleResize = () => {
      updateItemsPerPage();
      setPageIndex(0);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getNews = async () => {
      setNewsState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const newsData = await fetchNews(categoryUrl);
        
        if (!newsData) {
          throw new Error("Failed to fetch news data");
        }

        const [bigNews, smallNews] = newsData;
        setNewsState({
          bigNews,
          smallNews,
          loading: false,
          error: null,
        });
        
        setPageIndex(0);
      } catch (error) {
        setNewsState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : "An error occurred while fetching news",
        }));
      }
    };

    getNews();
  }, [categoryUrl]);

  const totalPages = Math.ceil(newsState.smallNews.length / itemsPerPage);
  const currentNews = newsState.smallNews.slice(
    pageIndex * itemsPerPage,
    (pageIndex + 1) * itemsPerPage
  );

  return (
    <div className="flex flex-col font-roboto bg-foreground_light rounded-[30px] p-4 pb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-light">{sectionTitle}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setPageIndex(prev => Math.max(prev - 1, 0))}
            disabled={pageIndex === 0}
            className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPageIndex(prev => Math.min(prev + 1, totalPages - 1))}
            disabled={pageIndex === totalPages - 1}
            className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {newsState.loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : newsState.error ? (
        <div className="text-red-600 p-4">{newsState.error}</div>
      ) : (
        <div className="flex flex-col space-y-4">
          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Big News Card */}
            {newsState.bigNews && (
              <div className="md:col-span-1">
                <NewsCardBig {...newsState.bigNews} />
              </div>
            )}
            
            {/* Small News Cards */}
            <div className="md:col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentNews.map((news, index) => (
                <div key={`${news.pubDate}-${index}`} className="h-full">
                  <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
                    <NewsCardSmall
                      {...news}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}