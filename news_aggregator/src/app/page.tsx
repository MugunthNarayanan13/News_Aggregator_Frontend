 
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
import { addKeyWordSearchURL, addLanguageWiseURL, baseURL } from "@/utils/urls";

export default function HomePage() {
  const [isBottomDivExpanded, setIsBottomDivExpanded] = useState(false);
  const [searchText, setSearchText] = useState<string>("");

  const onSearchSubmit = async () => {
    console.log("Hello ", searchText);
  };

  // Fetch news when component mounts or category changes
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsBottomDivExpanded(currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedCategory]);

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
