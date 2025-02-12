import NewsCardSmall from "@/components/NewsCardSmall";

export default function Home() {
  return (
    <div className="bg-foreground_light h-full">
      <NewsCardSmall
        title={"Trump says he could reach trade deal with China, calls talk with Xi 'friendly"}
        desc={"asdf asdf asdf ssdfasd fasdf dasf asdf asdfa dfafasf ad "}
        pubDate={"10-02-2005"}
        pubLogo={"https://asdf.com.asd"}
        pubName={"Times Of India"}
        sentiment={"positive"}
      />
    </div>
  );
}
