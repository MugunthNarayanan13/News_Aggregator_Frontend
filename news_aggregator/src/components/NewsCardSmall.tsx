interface NewsCardSmallProps {
  title: string;
  desc: string;
  pubDate: string;
  pubName: string;
  pubLogo: string;
  sentiment: string;
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
}: NewsCardSmallProps) {
  return (
    <>
      <div className="flex flex-col font-roboto sm:w-[300px] lg:w-[400px] sm:h-[150px] lg:h-[200px] border-2 border-black bg-background_light rounded-t-md mb-0">
        <div className="flex flex-row justify-between px-4 mt-1">
          <div className="font-light text-xl">{truncateText(title, 60)}</div>
          <div className="mt-2">
            {sentiment == "positive" ? (
              <div className="bg-green-400 rounded-full h-4 w-4"></div>
            ) : sentiment == "negative" ? (
              <div className="bg-red-400 rounded-full h-4 w-4"></div>
            ) : (
              <div className="bg-blue-400 rounded-full h-4 w-4"></div>
            )}
          </div>
        </div>
        <div className="px-4 py-2 mt-3 font-normal">{truncateText(desc, 100)}</div>
      </div>
      <div className="flex flex-row mt-0 sm:w-[300px] lg:w-[400px] sm:h-[35px] lg:h-12 border-2 border-t-0 border-black bg-secondary rounded-b-md">
        <div className="sm:w-[35px] lg:w-12 scale-75 bg-black rounded-full"></div>
        <div className="flex-1 text-center text-lg mt-2 pr-4  ">{pubName}</div>
      </div>
    </>
  );
}
