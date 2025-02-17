/* eslint-disable @typescript-eslint/no-unused-vars */
export interface NewsCardBigProps {
  title: string;
  desc: string;
  pubDate: string;
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
  pubName,
  pubLogo,
  sentiment,
  imgUrl,
}: NewsCardBigProps) {
  return (
    <div>
      <div className="flex flex-col font-roboto sm:w-[250px] md:w-[280px] lg:w-[320px] sm:h-[280px] md:h-[320px] lg:h-[360px] border-2 border-black bg-background_light rounded-t-md mb-0">
        <div className="bg-black sm:h-[160px] md:h-[180px] lg:h-[200px] m-2 rounded-lg"></div>
        <div className="flex flex-row justify-between px-3 mt-1 gap-1">
          <div className="font-light text-sm md:text-base lg:text-lg">
            {truncateText(title, 50)}
          </div>
          <div className="mt-1">
            {sentiment.toLowerCase() === "positive" ? (
              <div className="bg-green-400 rounded-full h-3 w-3 md:h-4 md:w-4"></div>
            ) : sentiment.toLowerCase() === "negative" ? (
              <div className="bg-red-400 rounded-full h-3 w-3 md:h-4 md:w-4"></div>
            ) : (
              <div className="bg-blue-400 rounded-full h-3 w-3 md:h-4 md:w-4"></div>
            )}
          </div>
        </div>
        <div className="px-3 py-1 mt-2 font-normal text-xs md:text-sm lg:text-base">
          {truncateText(desc, 150)}
        </div>
      </div>
      <div className="flex flex-row border-2 border-t-0 border-black bg-secondary rounded-b-md sm:h-[25px] md:h-[30px] lg:h-[35px]">
        <div className="w-[25px] md:w-[30px] lg:w-[35px] scale-75 bg-black rounded-full"></div>
        <div className="flex-1 text-center text-xs md:text-sm lg:text-base">
          {pubName}
        </div>
      </div>
    </div>
  );
}
