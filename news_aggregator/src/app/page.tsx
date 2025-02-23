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
import { newsData } from "@/utils/newsData";
import { fetchNews } from "@/utils/fetchModule";
import { NewsCardBigProps } from "@/components/NewsCardBig";
import { NewsCardSmallProps } from "@/components/NewsCardSmall";
import { addKeyWordSearchURL, addLanguageWiseURL, baseURL } from "@/utils/urls";

export default function HomePage() {
  const [isBottomDivExpanded, setIsBottomDivExpanded] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [bigNews, setBigNews] = useState<NewsCardBigProps | null>(null);
  const [smallNews, setSmallNews] = useState<NewsCardSmallProps[]>([]);

  const onSearchSubmit = async () => {
    console.log("Hello ", searchText);
    const newsData = await fetchNews(
      addKeyWordSearchURL(addLanguageWiseURL(baseURL, ["en", "hi"]), searchText)
    );
    if (!newsData) {
      console.error("No news data available.");
      return;
    }

    const [bigNews, smallNews] = newsData;
    setBigNews(bigNews);
    setSmallNews(smallNews);
  };

  const fetch = async () => {
    const newsData = await fetchNews(addLanguageWiseURL(baseURL, ["en", "hi"]));

    if (!newsData) {
      console.error("No news data available.");
      return;
    }

    const [bigNews, smallNews] = newsData;
    setBigNews(bigNews);
    setSmallNews(smallNews);
  };

  useEffect(() => {
    fetch();
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
  }, []);

  return (
    <Main>
      <NavBar
        searchText={searchText}
        setSearchText={setSearchText}
        onSearchSubmit={onSearchSubmit}
      />
      <div className="flex flex-col mx-4 mt-4 p-6 gap-6 dark:bg-foreground_dark text-black dark:text-white rounded-3xl">
        <NewsSection
          sectionTitle="Latest News"
          news={smallNews}
          bigNews={bigNews}
        />
        <NewsSection
          sectionTitle="Global News"
          news={smallNews}
          bigNews={bigNews}
        />
      </div>
    </Main>
  );
}
