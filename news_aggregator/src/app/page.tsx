 
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
import { NewsSectionSearch } from "@/components/NewsSectionSearch";

export default function HomePage() {
  const [isBottomDivExpanded, setIsBottomDivExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>("");

  const onSearchSubmit = async () => {
    console.log("Hello ", searchText);
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
        sectionTitle="AI Developments"
        news={[
          {
            title: "AI Breakthrough in Natural Language Processing",
            sentiment: "positive",
            desc: "Researchers unveil a new model that outperforms previous benchmarks in understanding human language.",
            pubDate: "2025-02-23T10:00:00Z",
            pubLogo: "https://example.com/logos/techcrunch.png",
            pubName: "TechCrunch",
            pubDateTZ: "UTC",
            imgUrl: "https://example.com/images/ai-nlp.jpg",
          },
          {
            title: "Concerns Rise Over AI Ethics",
            sentiment: "negative",
            desc: "A recent report highlights potential biases in AI systems, sparking debate among experts.",
            pubDate: "2025-02-22T15:30:00Z",
            pubLogo: "https://example.com/logos/bbc.png",
            pubName: "BBC News",
            pubDateTZ: "UTC",
            imgUrl: "https://example.com/images/ai-ethics.jpg",
          },
          {
            title: "xAI Announces New AI Research Initiative",
            sentiment: "neutral",
            desc: "The company plans to explore AI applications in space exploration over the next year.",
            pubDate: "2025-02-21T09:15:00Z",
            pubLogo: "https://example.com/logos/xai.png",
            pubName: "xAI Blog",
            pubDateTZ: "UTC",
            imgUrl: "https://example.com/images/xai-research.jpg",
          },
          {
            title: "AI Breakthrough in Natural Language Processing",
            sentiment: "positive",
            desc: "Researchers unveil a new model that outperforms previous benchmarks in understanding human language.",
            pubDate: "2025-02-23T10:00:00Z",
            pubLogo: "https://example.com/logos/techcrunch.png",
            pubName: "TechCrunch",
            pubDateTZ: "UTC",
            imgUrl: "https://example.com/images/ai-nlp.jpg",
          },
          {
            title: "Concerns Rise Over AI Ethics",
            sentiment: "negative",
            desc: "A recent report highlights potential biases in AI systems, sparking debate among experts.",
            pubDate: "2025-02-22T15:30:00Z",
            pubLogo: "https://example.com/logos/bbc.png",
            pubName: "BBC News",
            pubDateTZ: "UTC",
            imgUrl: "https://example.com/images/ai-ethics.jpg",
          },
          {
            title: "xAI Announces New AI Research Initiative",
            sentiment: "neutral",
            desc: "The company plans to explore AI applications in space exploration over the next year.",
            pubDate: "2025-02-21T09:15:00Z",
            pubLogo: "https://example.com/logos/xai.png",
            pubName: "xAI Blog",
            pubDateTZ: "UTC",
            imgUrl: "https://example.com/images/xai-research.jpg",
          },
          {
            title: "AI Breakthrough in Natural Language Processing",
            sentiment: "positive",
            desc: "Researchers unveil a new model that outperforms previous benchmarks in understanding human language.",
            pubDate: "2025-02-23T10:00:00Z",
            pubLogo: "https://example.com/logos/techcrunch.png",
            pubName: "TechCrunch",
            pubDateTZ: "UTC",
            imgUrl: "https://example.com/images/ai-nlp.jpg",
          },
          {
            title: "Concerns Rise Over AI Ethics",
            sentiment: "negative",
            desc: "A recent report highlights potential biases in AI systems, sparking debate among experts.",
            pubDate: "2025-02-22T15:30:00Z",
            pubLogo: "https://example.com/logos/bbc.png",
            pubName: "BBC News",
            pubDateTZ: "UTC",
            imgUrl: "https://example.com/images/ai-ethics.jpg",
          },
          {
            title: "xAI Announces New AI Research Initiative",
            sentiment: "neutral",
            desc: "The company plans to explore AI applications in space exploration over the next year.",
            pubDate: "2025-02-21T09:15:00Z",
            pubLogo: "https://example.com/logos/xai.png",
            pubName: "xAI Blog",
            pubDateTZ: "UTC",
            imgUrl: "https://example.com/images/xai-research.jpg",
          },
        ]}
        isOpen={true}
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
