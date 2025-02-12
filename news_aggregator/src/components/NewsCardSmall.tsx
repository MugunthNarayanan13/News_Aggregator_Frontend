interface NewsCardSmallProps {
  title: String;
  desc: String;
  pubDate: String;
  pubName: String;
  pubLogo: String;
  sentiment: String;
}

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
        <div className="flex flex-row justify-between px-4">
          <div className="font-light text-2xl">{title}</div>
          <div>{sentiment}</div>
        </div>
      </div>
      <div className="flex flex-row mt-0 sm:w-[300px] lg:w-[400px] sm:h-[35px] lg:h-12 border-2 border-t-0 border-black bg-secondary rounded-b-md">
        <div className="sm:w-[35px] lg:w-12 scale-90 bg-black rounded-full"></div>
        <div className="flex-1 text-center text-xl mt-2">{pubName}</div>
      </div>
    </>
  );
}
