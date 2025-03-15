/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { timeAgo } from "@/utils/dateFormatter";
import { ShareIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";

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
}

const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";
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
}: NewsCardBigProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent redirection
    setDropdownOpen((prev) => !prev);
  };

  const handleDropdownAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent redirection
    alert(`${action} clicked`);
    setDropdownOpen(false);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert("Saved for later! 🔖");
  };

  return (
    <div>
      <div
        className="relative flex flex-col font-roboto sm:w-[250px] md:w-[280px] lg:w-[320px] sm:h-[280px] md:h-[320px] lg:h-[360px] border-2 border-none bg-background_light rounded-[15px] mb-0 cursor-pointer"
        onClick={() => handleNewsClick(link)}
      >
        {/* Image Container with Dropdown */}
        <div className="relative bg-secondary flex-1 m-2 rounded-lg overflow-hidden">
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

          {/* Dropdown Button */}
          <div className="absolute top-2 right-2 z-10" ref={dropdownRef}>
            <button
              className="bg-white text-black px-2 py-1 rounded-full shadow-md text-lg font-bold"
              onClick={handleDropdownToggle}
            >
              ⋮
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-20 text-sm">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={(e) => handleDropdownAction("Subscribe", e)}
                >
                  Subscribe to Source
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-row justify-between px-3 mt-1 gap-1">
          <div className="font-light text-sm md:text-base lg:text-lg">
            {truncateText(title, 65)}
          </div>
        </div>

        {/* Description */}
        <div className="px-3 py-1 mt-2 font-normal text-xs md:text-sm">
          {truncateText(desc, 130)}
        </div>

        {/* Time Ago */}
        <div className="px-3 py-1 mt-1 mb-1 font-light text-xs md:text-sm">
          <p>{timeAgo(pubDate, pubDateTZ)}</p>
        </div>

        {/* Footer Bar */}
        <div className="flex flex-row items-center border-none border-black bg-secondary py-3 rounded-b-[15px] sm:h-[25px] md:h-[30px] lg:h-[35px]">
          <img
            src={pubLogo || "https://via.placeholder.com/20"}
            alt={pubName}
            className="w-[15px] h-[15px] md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px] rounded-full object-cover ml-3"
          />
          <div className="flex-1 text-white text-xs md:text-sm lg:text-base ml-3">
            {pubName}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={handleBookmark}
            className="px-2 text-white hover:opacity-80 transition"
            title="Save for Later"
          >
            <BookmarkIcon className="w-5 h-5" />
          </button>

          {/* Share Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              shareNews(link);
            }}
            className="px-2 text-white hover:opacity-80 transition"
            title="Share"
          >
            <ShareIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
