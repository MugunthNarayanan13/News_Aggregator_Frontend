/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { timeAgo } from "@/utils/dateFormatter";
import { ShareIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import { createChatSession } from "./ChatSummarizer";

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
  notInterestedHandler: (linkUrl: string) => void;
  onSummarize: (text: string) => void;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const shareNews = async (url: string) => {
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
  notInterestedHandler,
  onSummarize,
}: NewsCardSmallProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  async function Summarize(link: string) {
    const chatSession = await createChatSession();
    const result = await chatSession.sendMessage(link);
    if (result && result.response && result.response.text()) {
        onSummarize(result.response.text());
    } else {
        console.error("Summary text not found in GenerateContentResult");
        onSummarize("Summary not available");
    }
}

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked((prev) => !prev);
    alert(`News ${!isBookmarked ? "saved" : "removed"} from bookmarks.`);
  };

  return (
    <>
      <div className={className}>
        <div
          className="flex flex-col font-roboto bg-background_light rounded-[15px] h-[175px] w-full justify-between cursor-pointer"
          onClick={() => handleNewsClick(link)}
        >
          {/* Top Section: Title + Dropdown */}
          <div className="flex flex-row justify-between items-start px-3 pt-3">
            <div className="text-xs md:text-sm lg:text-base font-normal line-clamp-3 w-[85%]">
              {truncateText(title, 100)}
            </div>
            {/* Dropdown Three Dots */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-black px-2 text-lg font-bold rounded-full"
                onClick={handleDropdownToggle}
              >
                ⋮
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-20 text-sm dark:text-black">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      notInterestedHandler(link);
                      setDropdownOpen(false);
                    }}
                  >
                    Not Intrested
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      Summarize(link);
                      setDropdownOpen(false);
                    }}
                  >
                    Summarise
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Subscribe to Source clicked");
                      setDropdownOpen(false);
                    }}
                  >
                    Subscribe to Source
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Date Section */}
          <div className="px-3 mt-1 text-xs md:text-sm font-light dark:text-black">
            {timeAgo(pubDate, pubDateTZ)}
          </div>
          {/* Footer */}
          <div className="flex flex-row items-center border-none border-black bg-secondary py-3 rounded-b-[10px] sm:h-[25px] md:h-[30px] lg:h-[35px] mt-auto">
            <img
              src={pubLogo}
              alt={pubName}
              className="w-[15px] h-[15px] md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px] rounded-full object-cover ml-3"
            />
            <div className="flex-1 text-white text-xs md:text-sm lg:text-base ml-3">
              {pubName}
            </div>
            {/* Bookmark Icon */}
            <button
              onClick={handleBookmark}
              className="text-white hover:opacity-80 transition px-2"
            >
              <BookmarkIcon
                className={`w-5 h-5 ${
                  isBookmarked ? "fill-white stroke-white" : "stroke-white"
                }`}
              />
            </button>
            {/* Share Icon */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                shareNews(link);
              }}
              className="text-white hover:opacity-80 transition px-2"
            >
              <ShareIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
