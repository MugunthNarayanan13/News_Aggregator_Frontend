/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import Main from "@/components/Main";
import {
  UserIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";
import NavBar from "@/components/navbar";
import { NewsSection } from "@/components/NewsSection";
import { fetchNews } from "@/utils/fetchModule";
import { NewsCardBigProps } from "@/components/NewsCardBig";
import { NewsCardSmallProps } from "@/components/NewsCardSmall";
import { languageWiseURL } from "@/utils/urls";

export default function HomePage() {
  const [isBottomDivExpanded, setIsBottomDivExpanded] = useState(false);
  const [bigNews, setBigNews] = useState<NewsCardBigProps | null>(null);
  const [smallNews, setSmallNews] = useState<NewsCardSmallProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Fetch news based on selected category
  const fetch = async (category: string) => {
    let url = languageWiseURL(["en", "hi"]);

    if (category !== "all") {
      url += `&category=${category}`;
    }

    const newsData = await fetchNews(url);

    if (!newsData) {
      console.error("No news data available.");
      return;
    }

    const [bigNews, smallNews] = newsData;
    setBigNews(bigNews);
    setSmallNews(smallNews);
  };

  // Fetch news when component mounts or category changes
  useEffect(() => {
    fetch(selectedCategory);

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setIsBottomDivExpanded(true);
      } else {
        setIsBottomDivExpanded(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedCategory]);

  return (
    <Main>
      <NavBar />

      {/* Category Filter Buttons */}
      <div className="flex gap-4 justify-center mt-4">
        {["all", "technology", "sports", "health", "entertainment"].map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "primary" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      {/* News Sections */}
      <div className="flex flex-col mx-4 mt-4 p-6 gap-6 dark:bg-foreground_dark text-black dark:text-white rounded-3xl">
        <NewsSection sectionTitle="Latest News" news={smallNews} bigNews={bigNews} />
        <NewsSection sectionTitle="Global News" news={smallNews} bigNews={bigNews} />
      </div>
    </Main>
  );
}
