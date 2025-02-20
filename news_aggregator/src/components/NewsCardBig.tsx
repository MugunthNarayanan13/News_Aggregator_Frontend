import { timeAgo } from "@/dataHandlers/dateFormatter";

/* eslint-disable @typescript-eslint/no-unused-vars */
export interface NewsCardBigProps {
  title: string;
  desc: string;
  pubDate: string;
  pubDateTZ: string;
  pubName: string;
  pubLogo: string;
  imgUrl: string;
  sentiment: string;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
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
}: NewsCardBigProps) {
  return (
    <div>
      <div className="flex flex-col font-roboto sm:w-[250px] md:w-[280px] lg:w-[320px] sm:h-[280px] md:h-[320px] lg:h-[360px] border-2 border-none bg-background_light rounded-[15px] mb-0">
        <div className="bg-secondary flex-1 m-2 rounded-lg overflow-hidden">
          <img
            src={imgUrl}
            className="w-full h-full object-cover"
            alt="News Image"
          />
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
            src={"https://i.bytvi.com/domain_icons/straitstimes.png"}
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
