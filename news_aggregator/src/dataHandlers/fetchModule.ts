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
    const response = await axios.get(url);
    const newsData: NewsArticle[] = response.data.results;

    if (newsData.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * newsData.length);
    const bigNewsItem = newsData[randomIndex];

    const selectedBigNews: NewsCardBigProps = {
      title: bigNewsItem.title,
      desc: bigNewsItem.description,
      pubDate: bigNewsItem.pubDate,
      pubName: bigNewsItem.source_name,
      pubLogo: bigNewsItem.source_icon,
      imgUrl: bigNewsItem.image_url || "",
      sentiment: bigNewsItem.sentiment,
      pubDateTZ: bigNewsItem.pubDateTZ,
    };

    const remainingSmallNews: NewsCardSmallProps[] = newsData
      .filter((_, index) => index !== randomIndex)
      .map((news) => ({
        title: news.title,
        desc: news.description,
        pubDate: news.pubDate,
        pubName: news.source_name,
        pubLogo: news.source_icon,
        sentiment: news.sentiment,
        pubDateTZ: news.pubDateTZ,
      }));

    return [selectedBigNews, remainingSmallNews];
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
};



export {fetchNews};