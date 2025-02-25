/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@heroui/react";
import Main from "@/components/Main";
import NavBar from "@/components/navbar";
import { NewsSection } from "@/components/NewsSection";
import { fetchNews, fetchNewsOnlyBig } from "@/utils/fetchModule";
import { addCategoryWiseURL, addKeyWordSearchURL, addLanguageWiseURL, baseURL } from "@/utils/urls";
import { NewsSectionSearch } from "@/components/NewsSectionSearch";

export default function HomePage() {
  const [isBottomDivExpanded, setIsBottomDivExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [searchText, setSearchText] = useState<string>("");

  // Refs for each section
  const sectionRefs = {
    local: useRef<HTMLDivElement>(null),
    world: useRef<HTMLDivElement>(null),
    politics: useRef<HTMLDivElement>(null),
    technology: useRef<HTMLDivElement>(null),
    business: useRef<HTMLDivElement>(null),
    sports: useRef<HTMLDivElement>(null),
    entertainment: useRef<HTMLDivElement>(null),
  };

  // State for each category URL
  const [localNewsUrl, setLocalNewsUrl] = useState(() => addLanguageWiseURL(baseURL, ["en", "hi"]));
  const [worldNewsUrl, setWorldNewsUrl] = useState(() => addLanguageWiseURL(addCategoryWiseURL(baseURL, ["world"]), ["en", "hi"]));
  const [politicsNewsUrl, setPoliticsNewsUrl] = useState(() => addLanguageWiseURL(addCategoryWiseURL(baseURL, ["politics"]), ["en", "hi"]));
  const [technologyNewsUrl, setTechnologyNewsUrl] = useState(() => addLanguageWiseURL(addCategoryWiseURL(baseURL, ["technology"]), ["en", "hi"]));
  const [businessNewsUrl, setBusinessNewsUrl] = useState(() => addLanguageWiseURL(addCategoryWiseURL(baseURL, ["business"]), ["en", "hi"]));
  const [sportsNewsUrl, setSportsNewsUrl] = useState(() => addLanguageWiseURL(addCategoryWiseURL(baseURL, ["sports"]), ["en", "hi"]));
  const [entertainmentNewsUrl, setEntertainmentNewsUrl] = useState(() => addLanguageWiseURL(addCategoryWiseURL(baseURL, ["entertainment"]), ["en", "hi"]));

  // Function to scroll to the selected section
  const scrollToSection = (section: keyof typeof sectionRefs) => {
    sectionRefs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

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
        onCategorySelect={scrollToSection} // Pass scrolling function to NavBar
      />

      <div className="flex flex-col mx-4 mt-4 p-6 gap-6 dark:bg-foreground_dark text-black dark:text-white rounded-3xl">
        <div ref={sectionRefs.local}>
          <NewsSection sectionTitle="Local News" categoryUrl={localNewsUrl} />
        </div>

        <div ref={sectionRefs.world}>
          <NewsSection sectionTitle="World News" categoryUrl={worldNewsUrl} />
        </div>

        <div ref={sectionRefs.politics}>
          <NewsSection sectionTitle="Politics News" categoryUrl={politicsNewsUrl} />
        </div>

        <div ref={sectionRefs.technology}>
          <NewsSection sectionTitle="Technology News" categoryUrl={technologyNewsUrl} />
        </div>

        <div ref={sectionRefs.business}>
          <NewsSection sectionTitle="Business News" categoryUrl={businessNewsUrl} />
        </div>

        <div ref={sectionRefs.sports}>
          <NewsSection sectionTitle="Sports News" categoryUrl={sportsNewsUrl} />
        </div>

        <div ref={sectionRefs.entertainment}>
          <NewsSection sectionTitle="Entertainment News" categoryUrl={entertainmentNewsUrl} />
        </div>
      </div>
    </Main>
  );
}