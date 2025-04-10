/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@heroui/button";
import Main from "@/components/Main";
import NavBar from "@/components/navbar";
import { NewsSection } from "@/components/NewsSection";
import { fetchNews, fetchNewsOnlyBig } from "@/utils/fetchModule";
import SpeechToText from "@/components/voice";
import { articleService } from "@/utils/articleService";
import {
  addCategoryWiseURL,
  addLanguageWiseURL,
  addKeyWordSearchURL,
  addPublisherWiseURL,
  baseURL,
  addTimeframeURL,
  addExcludeKeyWordURL,
  addRegionWiseURL,
} from "@/utils/urls";
import { NewsSectionSearch } from "@/components/NewsSectionSearch";
import { NewsCardBigProps } from "@/components/NewsCardBig";
import getLocationData from "@/utils/locationRequest";
import { sendData } from "@/utils/sendData";

export default function HomePage() {
  const [isBottomDivExpanded, setIsBottomDivExpanded] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isPubModalOpen, setIsPubModalOpen] = useState(false);
  const [publisher, setpublisher] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<NewsCardBigProps[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [timeframe, setTimeframe] = useState<string>("");
  const [excludeText, setExcludeText] = useState<string>("");
  const [userPref, setUserPref] = useState(
    JSON.parse(localStorage.getItem("user") || "")
  );

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
  const [localNewsUrl, setLocalNewsUrl] = useState(() =>
    // userPref != "" && userPref.locations.length != 0
    //   ? addRegionWiseURL(
    //       addLanguageWiseURL(
    //         baseURL,
    //         userPref != "" ? userPref.languages : ["en", "hi"]
    //       ),
    //       userPref.locations
    //     )
    //   : addLanguageWiseURL(
    //       baseURL,
    //       userPref != "" ? userPref.languages : ["en", "hi"]
    //     )
    addLanguageWiseURL(
      baseURL,
      userPref != "" && userPref != null ? userPref.languages : ["en", "hi"]
    )
  );
  const [worldNewsUrl, setWorldNewsUrl] = useState(() =>
    userPref != "" && userPref != null && userPref.sources.length != 0
      ? addPublisherWiseURL(
          addLanguageWiseURL(
            addCategoryWiseURL(baseURL, ["world"]),
            userPref != "" && userPref != null && userPref.languages.length != 0 ? userPref.languages : ["en", "hi"]
          ),
          userPref.sources
        )
      : addLanguageWiseURL(
          addCategoryWiseURL(baseURL, ["world"]),
          userPref != "" && userPref != null && userPref.languages.length != 0 ? userPref.languages : ["en", "hi"]
        )
  );
  const [politicsNewsUrl, setPoliticsNewsUrl] = useState(() =>
    addLanguageWiseURL(
      addCategoryWiseURL(baseURL, ["politics"]),
      userPref != "" && userPref != null && userPref.languages.length != 0 ? userPref.languages : ["en", "hi"]
    )
  );
  const [technologyNewsUrl, setTechnologyNewsUrl] = useState(() =>
    addLanguageWiseURL(
      addCategoryWiseURL(baseURL, ["technology"]),
      userPref != "" && userPref != null && userPref.languages.length != 0 ? userPref.languages : ["en", "hi"]
    )
  );
  const [businessNewsUrl, setBusinessNewsUrl] = useState(() =>
    addLanguageWiseURL(
      addCategoryWiseURL(baseURL, ["business"]),
      userPref != "" && userPref != null && userPref.languages.length != 0 ? userPref.languages : ["en", "hi"]
    )
  );
  const [sportsNewsUrl, setSportsNewsUrl] = useState(() =>
    addLanguageWiseURL(
      addCategoryWiseURL(baseURL, ["sports"]),
      userPref != "" && userPref != null && userPref.languages.length != 0 ? userPref.languages : ["en", "hi"]
    )
  );
  const [entertainmentNewsUrl, setEntertainmentNewsUrl] = useState(() =>
    addLanguageWiseURL(
      addCategoryWiseURL(baseURL, ["entertainment"]),
      userPref != "" && userPref != null && userPref.languages.length != 0 ? userPref.languages : ["en", "hi"]
    )
  );

  // Function to scroll to the selected section
  const scrollToSection = (section: keyof typeof sectionRefs) => {
    sectionRefs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [location, setLocation] = useState<{
    country: string;
    region: string;
  } | null>(null);

  const onSearchSubmit = async () => {
    setIsSearchModalOpen(true);

    const newsData = await fetchNewsOnlyBig(
      addExcludeKeyWordURL(
        addKeyWordSearchURL(
          addLanguageWiseURL(
            baseURL,
            userPref != "" ? userPref.languages : ["en", "hi"]
          ),
          searchText
        ),
        excludeText
      )
    );
    if (!newsData) {
      console.log("No news data for search result");
    } else {
      setSearchResult(newsData);
    }
  };

  const onPubSelect = async (publishers: string | null) => {
    setpublisher(publishers);
    console.log(publishers);
    if (publishers != null) {
      setIsPubModalOpen(true);
      const newsData = await fetchNewsOnlyBig(
        addPublisherWiseURL(
          addLanguageWiseURL(
            baseURL,
            userPref != "" ? userPref.languages : ["en", "hi"]
          ),
          [publishers]
        )
      );
      if (!newsData) {
        console.log("No news data for publisher search result");
      } else {
        setSearchResult(newsData);
      }
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

    const fetchLocation = async () => {
      try {
        const locationData = await getLocationData();
        if (locationData) {
          setLocation(locationData);
        }
      } catch (err) {
        console.log(
          "Unable to fetch location. You may have denied the location permission."
        );
      }
    };

    fetchLocation();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log("timeframe", timeframe);
    if (timeframe != "") {
      setLocalNewsUrl(addTimeframeURL(localNewsUrl, timeframe));
      setWorldNewsUrl(addTimeframeURL(worldNewsUrl, timeframe));
    } else {
      setLocalNewsUrl(addLanguageWiseURL(baseURL, ["en", "hi"]));
      setWorldNewsUrl(
        addLanguageWiseURL(addCategoryWiseURL(baseURL, ["world"]), ["en", "hi"])
      );
    }
  }, [timeframe]);

  useEffect(() => {
    // Initialize saved articles cache when the app/page loads
    const initSavedArticles = async () => {
      try {
        await articleService.fetchSavedArticleLinks();
      } catch (error) {
        console.error('Error initializing saved articles:', error);
      }
    };
    
    initSavedArticles();
  }, []);

  return (
    <Main>
      <div></div>
      {/* Modal for displaying search results */}
      <NewsSectionSearch
        sectionTitle={searchText}
        news={searchResult}
        isOpen={isSearchModalOpen}
        onClose={() => {
          setIsSearchModalOpen(false);
          setSearchText("");
          setSearchResult([]);
        }}
      />
      {/* Modal for displaying publisher filter results */}
      <NewsSectionSearch
        sectionTitle={"Publisher"}
        news={searchResult}
        isOpen={isPubModalOpen}
        onClose={() => {
          setIsPubModalOpen(false);
          setpublisher(null);
          setSearchResult([]);
        }}
      />
      <NavBar
        searchText={searchText}
        excludeText={excludeText}
        setExcludeText={setExcludeText}
        setSearchText={setSearchText}
        onSearchSubmit={onSearchSubmit}
        setTimeframe={setTimeframe}
        timeframe={timeframe}
        onPubSelect={onPubSelect}
        onCategorySelect={scrollToSection} // Pass scrolling function to NavBar
      />

      <div className="flex flex-col mx-4 mt-4 p-6 gap-6 dark:bg-foreground_dark text-black dark:text-black rounded-3xl">
        <div ref={sectionRefs.local}>
          <NewsSection sectionTitle="Local News" categoryUrl={localNewsUrl} />
        </div>

        <div ref={sectionRefs.world}>
          <NewsSection sectionTitle="World News" categoryUrl={worldNewsUrl} />
        </div>

        <div ref={sectionRefs.politics}>
          <NewsSection
            sectionTitle="Politics News"
            categoryUrl={politicsNewsUrl}
          />
        </div>

        <div ref={sectionRefs.technology}>
          <NewsSection
            sectionTitle="Technology News"
            categoryUrl={technologyNewsUrl}
          />
        </div>

        <div ref={sectionRefs.business}>
          <NewsSection
            sectionTitle="Business News"
            categoryUrl={businessNewsUrl}
          />
        </div>

        <div ref={sectionRefs.sports}>
          <NewsSection sectionTitle="Sports News" categoryUrl={sportsNewsUrl} />
        </div>

        <div ref={sectionRefs.entertainment}>
          <NewsSection
            sectionTitle="Entertainment News"
            categoryUrl={entertainmentNewsUrl}
          />
        </div>
      </div>
    </Main>
  );
}
