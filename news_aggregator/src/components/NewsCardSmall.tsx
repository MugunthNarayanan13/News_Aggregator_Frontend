import { timeAgo } from "@/utils/dateFormatter";

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface NewsCardSmallProps {
  title: string;
  desc: string;
  pubDate: string;
  pubName: string;
  pubLogo: string;
  sentiment: string;
  pubDateTZ: string;
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
}: NewsCardSmallProps) {
  return (
    <div>
      <div className="flex flex-col font-roboto sm:w-[250px] md:w-[280px] lg:w-[320px] sm:h-[120px] md:h-[140px] lg:h-[160px] border-none border-black bg-background_light rounded-[10px] mb-0">
        <div className="flex flex-1 flex-col justify-between px-3 mt-1 gap-1">
          <div className="px-3 py-1 mt-2 font-normal text-xs md:text-sm lg:text-base">
            {truncateText(title, 100)}
          </div>
          <div className="px-3 py-1 mt-1 mb-1 font-light text-xs md:text-sm">
            <p>{timeAgo(pubDate, pubDateTZ)}</p>
          </div>
        </div>

        <div className="flex flex-row items-center border-none border-black bg-secondary rounded-b-[10px] sm:h-[20px] md:h-[25px] lg:h-[30px]">
          <img
            src={pubLogo}
            alt={pubName}
            className="w-[15px] h-[20px] md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px] rounded-full object-cover ml-3"
          />
          <div className="flex-1 text-white text-xs md:text-sm lg:text-base ml-3">
            {pubName}
          </div>
        </div>
      </div>
    </div>
  );
}
