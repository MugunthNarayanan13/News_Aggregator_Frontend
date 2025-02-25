/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { timeAgo } from "@/utils/dateFormatter";
import { ShareIcon } from "@heroicons/react/24/outline";
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
  link, // Get news link
}: NewsCardBigProps) {
  return (
    <div>
      <div className="flex flex-col font-roboto sm:w-[250px] md:w-[280px] lg:w-[320px] sm:h-[280px] md:h-[320px] lg:h-[360px] border-2 border-none bg-background_light rounded-[15px] mb-0">
        <div
          className="bg-secondary flex-1 m-2 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleNewsClick(link)}
        >
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

          {/* Share Button */}
          <button
            onClick={() => shareNews(link)}
            className="px-4 text-white hover:opacity-80 transition"
          >
            <ShareIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
