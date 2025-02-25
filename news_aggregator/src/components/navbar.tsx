/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import { Search, Mic, Settings, HelpCircle, UserCircle } from "lucide-react";
import MultiSelectDropdownPublishers from "./publisherDropDown";
import { useState } from "react";
import SpeechToText from "@/components/voice";

interface NavBarProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  excludeText: string;
  setExcludeText: React.Dispatch<React.SetStateAction<string>>;
  onSearchSubmit: () => void;
  onPubSelect: (publishers: string | null) => void;
  onCategorySelect: (
    category:
      | "local"
      | "world"
      | "politics"
      | "technology"
      | "business"
      | "sports"
      | "entertainment"
  ) => void;
  setTimeframe: React.Dispatch<React.SetStateAction<string>>;
  timeframe: string;
}

export default function NavBar({
  searchText,
  setSearchText,
  excludeText,
  setExcludeText,
  onSearchSubmit,
  onCategorySelect,
  onPubSelect,
  setTimeframe,
  timeframe,
}: NavBarProps) {
  const handleTimeframeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTimeframe(event.target.value);
    console.log("Selected timeframe:", event.target.value);
  };

  return (
    <>
      <div className="bg-background px-6 pb-3 flex justify-between items-center mx-auto mt-2 rounded-3xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[30px] text-black mb-3">News </span>
            <span className="text-[30px] font-bold text-black mb-3">Daily</span>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-6 -ml-10">
          <div className="hidden sm:flex mx-auto items-center gap-2 bg-white rounded-[20px] px-4 py-2 w-[90%] sm:w-[35rem] justify-between border-2 border-foreground_light">
            <Search size={18} className="text-black" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search for topics, locations"
              className="ml-2 w-full bg-transparent text-black placeholder-gray-600 border-none outline-none focus:ring-0"
            />
            <input
              type="text"
              value={excludeText}
              onChange={(e) => setExcludeText(e.target.value)}
              placeholder="Exclude keywords"
              className="ml-2 w-1/4 bg-gray-200 text-black placeholder-gray-600 border-none outline-none focus:ring-2 focus:ring-gray-400 rounded-md px-2 py-1"
            />
            {searchText.length > 0 ? (
              <button
                onClick={onSearchSubmit}
                className="px-3 py-1 text-white text-sm rounded-lg bg-secondary"
              >
                Search
              </button>
            ) : (
              ""
            )}
            <SpeechToText setSearchText={setSearchText} />
          </div>
        </div>

        <div className="flex items-center gap-6 ml-auto">
          <button>
            <HelpCircle size={22} className="text-black hover:text-black" />
          </button>
          <button>
            <Settings size={22} className="text-black hover:text-black" />
          </button>
          <button>
            <UserCircle size={22} className="text-black hover:text-black" />
          </button>
        </div>
      </div>

      <div className="bg-foreground_light py-3 rounded-2xl w-fit px-5 mx-auto mt-2 flex flex-col gap-2">
        <div className="container mx-auto flex justify-center gap-6 text-sm">
          <button
            onClick={() => onCategorySelect("world")}
            className="text-black hover:text-black"
          >
            World
          </button>
          <button
            onClick={() => onCategorySelect("politics")}
            className="text-black hover:text-black"
          >
            Politics
          </button>
          <button
            onClick={() => onCategorySelect("technology")}
            className="text-black hover:text-black"
          >
            Technology
          </button>
          <button
            onClick={() => onCategorySelect("business")}
            className="text-black hover:text-black"
          >
            Business
          </button>
          <button
            onClick={() => onCategorySelect("sports")}
            className="text-black hover:text-black"
          >
            Sports
          </button>
          <button
            onClick={() => onCategorySelect("entertainment")}
            className="text-black hover:text-black"
          >
            Entertainment
          </button>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <MultiSelectDropdownPublishers onSelect={onPubSelect} />
          <select
            value={timeframe}
            onChange={handleTimeframeChange}
            className="bg-white text-black px-3 py-2 rounded-md border border-gray-300 focus:outline-none"
          >
            <option value="">Select Timeframe</option>
            <optgroup label="Hours">
              <option value="1">Last 1 Hour</option>
              <option value="6">Last 6 Hours</option>
              <option value="24">Last 24 Hours</option>
            </optgroup>
            <optgroup label="Minutes">
              <option value="15m">Last 15 Minutes</option>
              <option value="45m">Last 45 Minutes</option>
              <option value="90m">Last 90 Minutes</option>
            </optgroup>
          </select>
        </div>
      </div>
    </>
  );
}
