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


const getCachedData = (key: string): any | null => {
  // Cache expiration time in milliseconds (e.g., 30 minutes)
  const CACHE_EXPIRATION_TIME = 30 * 60 * 1000;

    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const parsed = JSON.parse(cached);
    const now = new Date().getTime();
    console.log(now, parsed.timestamp, now-parsed.timestamp)
    // Check if cache is expired
    if (now - parsed.timestamp > CACHE_EXPIRATION_TIME) {
        localStorage.removeItem(key);
        return null;
    }

    return parsed.data;
};

const setCachedData = (key: string, data: any): void => {
    const cacheObject = {
        timestamp: new Date().getTime(),
        data,
    };
    localStorage.setItem(key, JSON.stringify(cacheObject));
};


const fetchNews = async (url: string): Promise<[NewsCardBigProps, NewsCardSmallProps[]] | null> => {
    const cacheKey = `news_${url}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
        console.log("Returning cached data for URL:", url);
        return cachedData;
    }

    try {
        console.log("Fetching news from URL:", url);

        let allNewsData: NewsArticle[] = [];
        let nextPage: string | null = null;
        let currentUrl = url;

        for (let i = 0; i < 2; i++) {
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
                notInterestedHandler: ()=>{}
            }));

        const result = [selectedBigNews, remainingSmallNews];

        // Cache the data
        if(result.length > 0) setCachedData(cacheKey, result);

        return [selectedBigNews, remainingSmallNews];
    } catch (error: any) {
        console.log("Error fetching news:", error);
        return null;
    }
};

/**
 * Fetch only big news with caching support
 */
const fetchNewsOnlyBig = async (url: string): Promise<NewsCardBigProps[] | null> => {
    const cacheKey = `news_big_${url}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
        console.log("Returning cached data for URL:", url);
        return cachedData;
    }

    try {
        console.log("Fetching news from URL:", url);

        let allNewsData: NewsArticle[] = [];
        let nextPage: string | null = null;
        let currentUrl = url;

        for (let i = 0; i < 2; i++) {
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

        const bigCardNews: NewsCardBigProps[] = allNewsData.map((news) => ({
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

        // Cache the data
        if (bigCardNews.length > 0) {
          setCachedData(cacheKey, bigCardNews);
        }

        return bigCardNews;
    } catch (error: any) {
        console.log("Error fetching news:", error);
        return null;
    }
};

export { fetchNews, fetchNewsOnlyBig, getCachedData, setCachedData };
