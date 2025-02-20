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
import { newsData } from "@/dataHandlers/newsData";
import { fetchNews } from "@/dataHandlers/fetchModule";
import { NewsCardBigProps } from "@/components/NewsCardBig";
import { NewsCardSmallProps } from "@/components/NewsCardSmall";

export default function HomePage() {
  const [isBottomDivExpanded, setIsBottomDivExpanded] = useState(false);
  const [bigNews, setBigNews] = useState<NewsCardBigProps | null>(null);
  const [smallNews, setSmallNews] = useState<NewsCardSmallProps[]>([]);

  const fetch = async () => {
    const newsData = await fetchNews(
      "https://newsdata.io/api/1/latest?apikey=pub_701324d31104b2907bf1c3fa43124c7440418&language=en"
    );

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
      <NavBar />

      {/* <div className="flex justify-between mx-4 h-2/3 bg-foreground_light dark:bg-foreground_dark text-black dark:text-white rounded-3xl">
        <div className="flex flex-col justify-evenly items-start w-1/2 sm:ml-4 md:ml-6 ml-2">
          <div className="w-full p-4">
            <h2 className="text-left font-bold">News Aggregator</h2>
            <p className="text-left">
              Welcome to your one-stop news hub! 🌍
              <br />
              Stay updated with the latest headlines, breaking news, and
              in-depth stories from all around the world. With our
              easy-to-navigate interface, you can access the most relevant news
              based on your interests. From politics and technology to
              entertainment and sports, we've got it all covered.
              <br />
              Feel free to explore, personalize your feed, and dive into the
              stories that matter to you. Let’s keep you informed, every step of
              the way!
            </p>
          </div>
          <div className="flex w-full gap-8 p-4">
            <Button color="primary">Read News</Button>
            <Button color="secondary">Explore More -{">"}</Button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-end p-4 w-1/2 sm:mr-4 md:mr-6 mr-2">
          <div className="flex flex-col items-center w-1/2">
            <div className="flex items-center">
              <span className="text-primary text-6xl">1048576</span>
              <UserIcon className="text-primary h-12 w-12 ml-2" />
            </div>
            <h2 className="text-center">Users Registered</h2>
          </div>
        </div>
      </div> */}

      {/* Bottom Div */}
      <div className="flex flex-col mx-4 mt-4 p-6 gap-6 dark:bg-foreground_dark text-black dark:text-white rounded-3xl">
        <NewsSection sectionTitle="Latest News" news={smallNews} bigNews={bigNews} />
        <NewsSection sectionTitle="Global News" news={newsData} bigNews={bigNews} />
      </div>
    </Main>
  );
}
