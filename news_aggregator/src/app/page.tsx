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
import { fetchNews, fetchNewsOnlyBig } from "@/utils/fetchModule";
import { addKeyWordSearchURL, addLanguageWiseURL, baseURL } from "@/utils/urls";
import { NewsSectionSearch } from "@/components/NewsSectionSearch";

export default function HomePage() {
  const [isBottomDivExpanded, setIsBottomDivExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [searchText, setSearchText] = useState<string>("");

  const onSearchSubmit = async () => {
    console.log("Hello ", searchText);
    setIsModalOpen(true);

    const newsData = await fetchNewsOnlyBig(
      addKeyWordSearchURL(addLanguageWiseURL(baseURL, ["en", "hi"]), searchText)
    );
    if (!newsData) {
      console.log("No news data for search result");
    } else {
      setSearchResult(newsData);
    }
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsBottomDivExpanded(currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Main>
      <div></div>
      <NewsSectionSearch
        sectionTitle={searchText}
        news={searchResult}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <NavBar
        searchText={searchText}
        setSearchText={setSearchText}
        onSearchSubmit={onSearchSubmit}
      />

      <div className="flex flex-col mx-4 mt-4 p-6 gap-6 dark:bg-foreground_dark text-black dark:text-white rounded-3xl">
        <NewsSection
          sectionTitle="Latest News"
          categoryUrl={addLanguageWiseURL(baseURL, ["en", "hi"])}
        />
        <NewsSection
          sectionTitle="Global News"
          categoryUrl={addLanguageWiseURL(baseURL, ["en"])}
        />
      </div>
    </Main>
  );
}
