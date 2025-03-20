/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { articleService } from "@/utils/articleService";
import { timeAgo } from "@/utils/dateFormatter";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { ShareIcon, BookmarkIcon as OutlineBookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";
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
  isBookmarked?: boolean;
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
  isBookmarked: initialBookmarked = false,
  notInterestedHandler,
}: NewsCardSmallProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  // Initialize bookmark state from localStorage/service
    useEffect(() => {
      const checkBookmarkStatus = () => {
        const isBookmarked = articleService.isArticleBookmarked(link);
        setIsBookmarked(isBookmarked);
      };
      
      checkBookmarkStatus();
    }, [link]);

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

  const handleBookmark = async (e: React.MouseEvent) => {
      e.stopPropagation();
      
      try {
        setIsSaving(true);
        await articleService.saveArticle({
          title, link,
          url: undefined
        });
        setIsBookmarked(true);
        toast.success("Article saved successfully");
      } catch (error) {
        console.error("Error saving article:", error);
        toast.error("Failed to save article");
      } finally {
        setIsSaving(false);
      }
    };

  return (
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
                  Not Interested
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

          <button
            onClick={handleBookmark}
            className="px-2 text-white hover:opacity-80 transition"
            title="Save for Later"
            disabled={isSaving}
          >
            {isBookmarked ? (
              <SolidBookmarkIcon className="w-5 h-5 text-white" />
            ) : (
              <OutlineBookmarkIcon className="w-5 h-5" />
            )}
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
  );
}
