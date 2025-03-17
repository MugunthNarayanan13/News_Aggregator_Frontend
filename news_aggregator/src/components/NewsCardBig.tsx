/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { timeAgo } from "@/utils/dateFormatter";
import { ShareIcon } from "@heroicons/react/24/outline";
import { BellIcon, BellSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export interface NewsCardBigProps {
  title: string;
  desc: string;
  pubDate: string;
  pubDateTZ: string;
  pubName: string;
  pubLogo: string;
  imgUrl: string;
  sentiment: string;
  link: string;
  isSubscribed?: boolean;
  onToggleSubscription?: (pubName: string, subscribed: boolean) => void;
}

const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const shareNews = async (url: string, e: React.MouseEvent) => {
  e.stopPropagation(); // Prevent card click
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Check out this news article",
        url: url,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  } else {
    await navigator.clipboard.writeText(url);
    alert("News link copied to clipboard! 📋");
  }
};

const handleNewsClick = (link: string) => {
  if (link) {
    window.location.href = link;
  }
};

export default function NewsCardBig({
  title,
  desc,
  pubDate,
  pubDateTZ,
  pubName,
  pubLogo,
  sentiment,
  imgUrl,
  link,
  isSubscribed = false,
  onToggleSubscription,
}: NewsCardBigProps) {
  // Local state for subscription status (will be overridden by props if provided)
  const [subscribed, setSubscribed] = useState(isSubscribed);

  const handleSubscribeToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    const newSubscriptionStatus = !subscribed;
    setSubscribed(newSubscriptionStatus);
    
    // Call parent handler if provided
    if (onToggleSubscription) {
      onToggleSubscription(pubName, newSubscriptionStatus);
    }
  };

  return (
    <div>
      <div
        className="flex flex-col font-roboto sm:w-[250px] md:w-[280px] lg:w-[320px] sm:h-[280px] md:h-[320px] lg:h-[360px] border-2 border-none bg-background_light rounded-[15px] mb-0 cursor-pointer"
        onClick={() => handleNewsClick(link)}
      >
        <div className="bg-secondary flex-1 m-2 rounded-lg overflow-hidden">
          {imgUrl ? (
            <img
              src={imgUrl}
              className="w-full h-full object-cover"
              alt="News Image"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm text-gray-500">No Image Available</span>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-between px-3 mt-1 gap-1">
          <div className="font-light text-sm md:text-base lg:text-lg">
            {truncateText(title, 65)}
          </div>
        </div>
        <div className="px-3 py-1 mt-2 font-normal text-xs md:text-sm">
          {truncateText(desc, 130)}
        </div>
        <div className="px-3 py-1 mt-1 mb-1 font-light text-xs md:text-sm">
          <p>{timeAgo(pubDate, pubDateTZ)}</p>
        </div>
        <div className="flex flex-row items-center border-none border-black bg-secondary py-3 rounded-b-[15px] sm:h-[25px] md:h-[30px] lg:h-[35px]">
          <img
            src={pubLogo || "https://via.placeholder.com/20"} // Default logo if missing
            alt={pubName}
            className="w-[15px] h-[15px] md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px] rounded-full object-cover ml-3"
          />
          <div className="flex-1 text-white text-xs md:text-sm lg:text-base ml-3">
            {pubName}
          </div>

          {/* Subscribe Bell Button */}
          <button
            onClick={handleSubscribeToggle}
            className="px-2 text-white hover:opacity-80 transition"
            title={subscribed ? "Unsubscribe" : "Subscribe"}
          >
            {subscribed ? (
              <BellIcon className="w-5 h-5 text-yellow-300" />
            ) : (
              <BellSlashIcon className="w-5 h-5" />
            )}
          </button>

          {/* Share Button */}
          <button
            onClick={(e) => shareNews(link, e)}
            className="px-4 text-white hover:opacity-80 transition"
          >
            <ShareIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}