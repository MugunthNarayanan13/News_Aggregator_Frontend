"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import Main from "@/components/Main";
import { UserIcon } from "@heroicons/react/24/solid";
import NavBar from "@/components/navbar";
import NewsCardSmall from "@/components/NewsCardSmall";
import type { NewsCardSmallProps } from "@/components/NewsCardSmall";
import NewsCardBig from "@/components/NewsCardBig";

interface NewsSectionProps {
  sectionTitle: string;
  news: NewsCardSmallProps[];
}

export function NewsSection({ sectionTitle, news }: NewsSectionProps) {
  return (
    <div className="flex flex-col font-roboto" id="newsSectionWrapper">
      <div className="text-xl font-light">{sectionTitle}</div>
      <div className="flex flex-row gap-4" id="newsSection">
        <div className="" id="bigCardWrapper">
          <NewsCardBig
            title="Hadf ads; a"
            sentiment="positive"
            pubDate="asdf/asdf/adsf"
            pubLogo="adsfa "
            pubName="Times Of India"
            desc="sadfj; df ;alsj jksadjfhuhal lhiu ashdf jasdlfhiaewf ;j auwhfioauh fnjlsdjahfiuawef jdsnfiouhewouhfljasf"
            imgUrl="sdfasdh asdfh asdf"
          />
        </div>
        <div className="flex flex-row gap-4 flex-wrap" id="smallCardWrapper">
          {news.map((n, index) => (
            <NewsCardSmall
              key={index}
              title={n.title}
              sentiment={n.sentiment}
              desc={n.desc}
              pubDate={n.pubDate}
              pubLogo={n.pubLogo}
              pubName={n.pubName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [isBottomDivExpanded, setIsBottomDivExpanded] = useState(false);

  const news: NewsCardSmallProps[] = [
    {
      title: "Tech Giant Releases New AI Model",
      desc: "A major tech company has launched its latest AI model, setting new benchmarks in the industry.",
      pubDate: "2025-02-12",
      pubName: "Tech Times",
      pubLogo: "https://example.com/tech-times-logo.png",
      sentiment: "Positive",
    },
    {
      title: "Stock Market Sees Major Dip",
      desc: "Markets faced a sharp decline today amid concerns over global economic instability.",
      pubDate: "2025-02-12",
      pubName: "Finance Daily",
      pubLogo: "https://example.com/finance-daily-logo.png",
      sentiment: "Neutral",
    },
    {
      title: "Breakthrough in Renewable Energy",
      desc: "Scientists have discovered a new, highly efficient solar panel technology that could revolutionize the industry.",
      pubDate: "2025-02-11",
      pubName: "Green Future",
      pubLogo: "https://example.com/green-future-logo.png",
      sentiment: "Positive",
    },
    {
      title: "New Cybersecurity Threat Detected",
      desc: "A sophisticated cyber attack has been identified, targeting major financial institutions worldwide.",
      pubDate: "2025-02-10",
      pubName: "CyberSec Today",
      pubLogo: "https://example.com/cybersec-today-logo.png",
      sentiment: "Negative",
    },
    {
      title: "Sports Team Wins Championship",
      desc: "After a thrilling final, the underdogs secured a historic victory in the national championship.",
      pubDate: "2025-02-09",
      pubName: "Sports Weekly",
      pubLogo: "https://example.com/sports-weekly-logo.png",
      sentiment: "Positive",
    },
  ];

  useEffect(() => {
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

      <div className="flex justify-between mx-4 h-2/3 bg-foreground_light dark:bg-foreground_dark text-black dark:text-white rounded-3xl">
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
      </div>

      {/* Bottom Div */}
      <div className="flex flex-col mx-4 mt-4 p-6 bg-foreground_light dark:bg-foreground_dark text-black dark:text-white rounded-3xl">
        <div className="flex flex-row gap-6">
          <div>Location</div>
          <div>Filter 2</div>
          <div>Filter 3</div>
          <div>Filter 4</div>
          <div>Filter 5</div>
          <div>Filter 6</div>
        </div>
        <div className="flex flex-col">
          <NewsSection sectionTitle="Latest" news={news} />
        </div>
      </div>
    </Main>
  );
}
