/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sendData } from "@/utils/sendData";
import PreferencesSection from "@/components/PreferencesSection";
import ReadStats from "@/components/ReadStats";
import SecuritySection from "@/components/SecuritySection";
import DangerZone from "@/components/DangerZone";
import { BarChartIcon, SettingsIcon, UserCircleIcon, BellIcon, CreditCardIcon, BookmarkIcon } from "lucide-react";
import ProfileSection from "@/components/ProfileSection";
import { isValidLanguage } from "@/utils/isoConverterLang";
import { convertCountryToISO } from "@/utils/isoConverterLoc";
import SubscriptionsSection from "@/components/SubscriptionsSection";
import FeedbackSection from "@/components/FeebackSection";
import SavedArticles from "@/components/SavedArticles";

interface UserData {
  name: string;
  email: string;
  password: string;
  avatar: string;
  locations: string[];
  sources: string[];
  languages: string[];
  EntertainmentArticlesRead: number;
  SportsArticlesRead: number;
  PoliticalArticlesRead: number;
  BusinessArticlesRead: number;
  TechnologyArticlesRead: number;
  GlobalArticlesRead: number;
  GlobalRanking: number;
  subscriptionPlan?: string;
  _id: string;
}

export default function UserProfile() {
  const router = useRouter();

  // Pre-populated user data for UI testing
  const [user, setUser] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    avatar: "",
    locations: [],
    sources: [],
    languages: [],
    EntertainmentArticlesRead: 0,
    SportsArticlesRead: 0,
    PoliticalArticlesRead: 0,
    BusinessArticlesRead: 0,
    TechnologyArticlesRead: 0,
    GlobalArticlesRead: 0,
    subscriptionPlan: "free",
    GlobalRanking: 0,
    _id: "",
  });
  const [userID, setUserID] = useState<String>();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [avatarUrl, setAvatarUrl] = useState("");

  // Calculate total articles read
  const totalArticles =
    user.EntertainmentArticlesRead +
    user.SportsArticlesRead +
    user.PoliticalArticlesRead +
    user.BusinessArticlesRead +
    user.TechnologyArticlesRead +
    user.GlobalArticlesRead;

  // Instead of using external avatar service, use placeholder API which is allowed
  useEffect(() => {
    if (user?.name) {
      const encodedUsername = encodeURIComponent(user.name.trim());
      setAvatarUrl(`https://avatar.iran.liara.run/public`);
    }
  }, [user?.name]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn == "0" || !loggedIn) router.replace("/");
    const fetchUserDetails = async () => {
      let data: UserData | null = null;
      try {
        const response = await sendData(
          `/${localStorage.getItem("email")}`,
          "GET"
        );
        data = response.data;

        // Update localStorage with the latest user data
        localStorage.setItem("user", JSON.stringify(data));

        console.log("Fetched user data from backend:", data);
      } catch (error) {
        console.error("Error fetching user data from backend:", error);

        // If backend fails, fallback to localStorage
        const dataString = localStorage.getItem("user");
        if (dataString) {
          try {
            data = JSON.parse(dataString) as UserData;
            console.log("Using fallback user data from localStorage:", data);
          } catch (parseError) {
            console.error(
              "Error parsing fallback localStorage data:",
              parseError
            );
          }
        }
      }
      if (data) {
        console.log("Profile data: ", data);

        setUser({
          name: data.name || "",
          password: data.password || "",
          email: data.email || "",
          locations: data.locations || [],
          sources: data.sources || [],
          languages: data.languages || [],
          EntertainmentArticlesRead: data.EntertainmentArticlesRead || 0,
          SportsArticlesRead: data.SportsArticlesRead || 0,
          PoliticalArticlesRead: data.PoliticalArticlesRead || 0,
          BusinessArticlesRead: data.BusinessArticlesRead || 0,
          TechnologyArticlesRead: data.TechnologyArticlesRead || 0,
          GlobalArticlesRead: data.GlobalArticlesRead || 0,
          avatar: data.avatar ?? "", // Handle null avatars
          subscriptionPlan: data.subscriptionPlan || "free",
          _id: data._id || "",
          GlobalRanking: data.GlobalRanking || 0,
        });

        setUserID(data._id || "");
        localStorage.setItem("userID", data._id || "");
      } else {
        console.error("Data is null or undefined");
      }
    };
    fetchUserDetails();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("userID");
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      {/* Background Header */}
      <div className="relative -mx-6 -mt-6 h-48 bg-gradient-to-r from-primary to-secondary rounded-t-lg">
        <div className="absolute inset-0 bg-opacity-10 bg-black"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Profile Header */}
      <ProfileSection
        user={user}
        avatarUrl={avatarUrl}
        handleLogout={handleLogout}
        totalArticles={totalArticles}
      />

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto border-b border-gray-200 mt-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors duration-300 ${
            activeTab === "profile"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <UserCircleIcon size={18} /> Profile
        </button>
        <button
          onClick={() => setActiveTab("preferences")}
          className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors duration-300 ${
            activeTab === "preferences"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <SettingsIcon size={18} /> Preferences
        </button>
        <button
          onClick={() => setActiveTab("stats")}
          className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors duration-300 ${
            activeTab === "stats"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <BarChartIcon size={18} /> Reading Stats
        </button>
        <button
          onClick={() => setActiveTab("saved-articles")}
          className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors duration-300 ${
            activeTab === "saved-articles"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <BookmarkIcon size={18} /> Saved Articles
        </button>
        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors duration-300 ${
            activeTab === "subscriptions"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <CreditCardIcon size={18} /> Subscriptions
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "profile" && (
          <div className="space-y-8">
            {/* Profile Information */}
            <ProfileSection.Info
              user={user}
              userID={userID}
              setUser={setUser}
            />

            {/* Security Section */}
            <SecuritySection user={user} userID={userID} setUser={setUser} />

            <FeedbackSection />

            {/* Danger Zone */}
            <DangerZone userID={userID} username={user.name} />
          </div>
        )}

        {activeTab === "preferences" && (
          <PreferencesSection
            user={user}
            setUser={setUser}
            validationFunctions={{
              validateLanguage: isValidLanguage,
              validateLocation: (loc: string) =>
                convertCountryToISO(loc) !== "Invalid location",
            }}
          />
        )}

        {activeTab === "stats" && (
          <ReadStats
            user={user}
            totalArticles={totalArticles}
            globalRanking={user.GlobalRanking}
          />
        )}
        {activeTab === "saved-articles" && (
          <SavedArticles />
        )}

        {activeTab === "subscriptions" && (
          <SubscriptionsSection user={user} setUser={setUser} />
        )}
      </div>
    </div>
  );
}
