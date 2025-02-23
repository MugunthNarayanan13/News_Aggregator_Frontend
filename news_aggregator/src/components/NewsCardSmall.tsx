/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { timeAgo } from "@/utils/dateFormatter";

export interface NewsCardSmallProps {
  title: string;
  desc: string;
  pubDate: string;
  pubName: string;
  pubLogo: string;
  sentiment: string;
  pubDateTZ: string;
  className?: string;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
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
}: NewsCardSmallProps) {
  return (
    <div className={className}>
      <div className="flex flex-col font-roboto bg-background_light rounded-[10px] h-[160px] w-full justify-between">
        {/* Content section with auto height */}
        <div className="flex flex-col p-3">
          <div className="line-clamp-3 font-normal text-xs md:text-sm lg:text-base mb-2">
            {truncateText(title, 100)}
          </div>
          <div className="font-light text-xs md:text-sm">
            {timeAgo(pubDate, pubDateTZ)}
          </div>
        </div>

        {/* Footer section aligned to bottom */}
        <div className="flex flex-row items-center border-none border-black bg-secondary py-3 rounded-b-[15px] sm:h-[25px] md:h-[30px] lg:h-[35px]">
          <img
            src={pubLogo || "https://i.bytvi.com/domain_icons/straitstimes.png"}
            alt={pubName}
            className="w-[15px] h-[15px] md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px] rounded-full object-cover ml-3"
          />
          <div className="flex-1 text-white text-xs md:text-sm lg:text-base ml-3">
            {pubName}
          </div>
        </div>
      </div>
    </div>
  );
}