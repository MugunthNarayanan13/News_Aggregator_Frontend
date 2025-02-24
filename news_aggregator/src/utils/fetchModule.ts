/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NewsCardBigProps } from "@/components/NewsCardBig";
import type { NewsCardSmallProps } from "@/components/NewsCardSmall";
import axios from "axios";

interface NewsArticle {
    ai_org?: string;
    ai_region?: string;
    ai_tag?: string;
    article_id: string;
    category: string[];
    content?: string;
    country: string[];
    creator?: string | null;
    description: string;
    duplicate: boolean;
    image_url?: string;
    keywords: string[];
    language: string;
    link: string;
    pubDate: string;
    pubDateTZ: string;
    sentiment: string;
    sentiment_stats?: string;
    source_icon: string;
    source_id: string;
    source_name: string;
    source_priority: number;
    source_url: string;
    title: string;
    video_url?: string | null;
}

const fetchNews = async (url: string): Promise<[NewsCardBigProps, NewsCardSmallProps[]] | null> => {
  try {
    console.log("Fetching news from URL:", url); 

    let allNewsData: NewsArticle[] = [];
    let nextPage: string | null = null;
    let currentUrl = url;

    for (let i = 0; i < 3; i++) {
      console.log("API Request Attempt:", i + 1, "URL:", currentUrl); 

      const response = await axios.get(currentUrl);
      
      console.log("API Response Data:", response.data); 

      const newsData: NewsArticle[] = response.data.results;

      if (!newsData || newsData.length === 0) {
        console.log("No news data received.");
        break;
      }

            allNewsData = [...allNewsData, ...newsData];

            nextPage = response.data.nextPage;
            if (!nextPage) break;

            currentUrl = `${url}&page=${nextPage}`;
        }

    if (allNewsData.length === 0) {
      console.log("No valid news data available.");
      return null;
    }

        const randomIndex = Math.floor(Math.random() * allNewsData.length);
        const bigNewsItem = allNewsData[randomIndex];

    const selectedBigNews: NewsCardBigProps = {
      title: bigNewsItem.title,
      desc: bigNewsItem.description,
      pubDate: bigNewsItem.pubDate,
      pubName: bigNewsItem.source_name,
      pubLogo: bigNewsItem.source_icon,
      imgUrl: bigNewsItem.image_url || "",
      sentiment: bigNewsItem.sentiment,
      pubDateTZ: bigNewsItem.pubDateTZ,
      link: bigNewsItem.link,
    };

    const remainingSmallNews: NewsCardSmallProps[] = allNewsData
      .filter((_, index) => index !== randomIndex)
      .map((news) => ({
        title: news.title,
        desc: news.description,
        pubDate: news.pubDate,
        pubName: news.source_name,
        pubLogo: news.source_icon,
        sentiment: news.sentiment,
        pubDateTZ: news.pubDateTZ,
        link: news.link,
      }));

    return [selectedBigNews, remainingSmallNews];
  } catch (error: any) {
    console.log("Error fetching news:", error);
    return null;
  }
};

const fetchNewsOnlyBig = async (url: string): Promise<NewsCardBigProps[] | null> => {
  try {
    console.log("Fetching news from URL:", url); 

    let allNewsData: NewsArticle[] = [];
    let nextPage: string | null = null;
    let currentUrl = url;

    for (let i = 0; i < 3; i++) {
      console.log("API Request Attempt:", i + 1, "URL:", currentUrl); 

      const response = await axios.get(currentUrl);
      
      console.log("API Response Data:", response.data); 

      const newsData: NewsArticle[] = response.data.results;

      if (!newsData || newsData.length === 0) {
        console.log("No news data received.");
        break;
      }

      allNewsData = [...allNewsData, ...newsData];

      nextPage = response.data.nextPage;
      if (!nextPage) break;

      currentUrl = `${url}&page=${nextPage}`;
    }

    if (allNewsData.length === 0) {
      console.log("No valid news data available.");
      return null;
    }

    const bigCardNews: NewsCardBigProps[] = allNewsData
      .map((news) => ({
        title: news.title,
        desc: news.description,
        pubDate: news.pubDate,
        pubName: news.source_name,
        pubLogo: news.source_icon,
        imgUrl: news.image_url || "",
        sentiment: news.sentiment,
        pubDateTZ: news.pubDateTZ,
        link: news.link,
      }));

    return bigCardNews;
  } catch (error: any) {
    console.log("Error fetching news:", error);
    return null;
  }
};

export { fetchNews, fetchNewsOnlyBig };