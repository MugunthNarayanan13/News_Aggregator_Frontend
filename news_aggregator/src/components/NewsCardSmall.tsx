/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { timeAgo } from "@/utils/dateFormatter";
import { ShareIcon } from "@heroicons/react/24/outline";
import { BellIcon, BellSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export interface NewsCardSmallProps {
  title: string;
  desc: string;
  pubDate: string;
  pubName: string;
  pubLogo: string;
  sentiment: string;
  pubDateTZ: string;
  className?: string;
  link: string;
  isSubscribed?: boolean;
  onToggleSubscription?: (pubName: string, subscribed: boolean) => void;
}

const truncateText = (text: string, maxLength: number) => {
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

export default function NewsCardSmall({
  title,
  desc,
  pubDate,
  pubName,
  pubLogo,
  sentiment,
  pubDateTZ,
  className = "",
  link,
  isSubscribed = false,
  onToggleSubscription,
}: NewsCardSmallProps) {
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
    <div className={className}>
      <div className="flex flex-col font-roboto bg-background_light rounded-[15px] h-[175px] w-full justify-between cursor-pointer">
        <div
          className="flex flex-col p-3"
          onClick={() => handleNewsClick(link)}
        >
          <div className="line-clamp-3 font-normal text-xs md:text-sm lg:text-base mb-2">
            {truncateText(title, 100)}
          </div>
          <div className="font-light text-xs md:text-sm">
            {timeAgo(pubDate, pubDateTZ)}
          </div>
        </div>

        {/* Footer section aligned to bottom */}
        <div className="flex flex-row items-center border-none border-black bg-secondary py-3 rounded-b-[10px] sm:h-[25px] md:h-[30px] lg:h-[35px]">
          <img
            src={pubLogo}
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