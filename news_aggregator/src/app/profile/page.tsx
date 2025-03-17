/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sendData } from "@/utils/sendData";
import PreferencesSection from "@/components/PreferencesSection";
import ReadStats from "@/components/ReadStats";
import SecuritySection from "@/components/SecuritySection";
import DangerZone from "@/components/DangerZone";
import { BarChartIcon, SettingsIcon, UserCircleIcon, BellIcon, CreditCardIcon } from "lucide-react";
import ProfileSection from "@/components/ProfileSection";
import { isValidLanguage } from "@/utils/isoConverterLang";
import { convertCountryToISO } from "@/utils/isoConverterLoc";
import SubscriptionsSection from "@/components/SubscriptionsSection";


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
  subscriptionPlan?: string;
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
  });
  const [userID, setUserID] = useState();
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
      const { data } = await sendData(
        `/${localStorage.getItem("email")}`,
        "GET"
      );
      console.log("Profile data: ", data);
      setUser({
        name: data.name,
        password: data.password,
        email: data.email,
        locations: data.locations,
        sources: data.sources,
        languages: data.languages,
        EntertainmentArticlesRead: data.EntertainmentArticlesRead,
        SportsArticlesRead: data.SportsArticlesRead,
        PoliticalArticlesRead: data.PoliticalArticlesRead,
        BusinessArticlesRead: data.BusinessArticlesRead,
        TechnologyArticlesRead: data.TechnologyArticlesRead,
        GlobalArticlesRead: data.GlobalArticlesRead,
        avatar: data.avatar != null ? data.avatar : "",
        subscriptionPlan: data.subscriptionPlan || "free",
      });
      setUserID(data._id);
      localStorage.setItem("userID", data._id);
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
            <SecuritySection 
              user={user} 
              userID={userID} 
              setUser={setUser} 
            />

            {/* Danger Zone */}
            <DangerZone userID={userID} />
          </div>
        )}

      {activeTab === "preferences" && (
        <PreferencesSection 
          user={user} 
          setUser={setUser}
          validationFunctions={{
            validateLanguage: isValidLanguage,
            validateLocation: (loc: string) => convertCountryToISO(loc) !== "Invalid location"
          }}
        />
      )}

        {activeTab === "stats" && (
          <ReadStats user={user} totalArticles={totalArticles} />
        )}

  {activeTab === "subscriptions" && (
          <SubscriptionsSection user={user} setUser={setUser} />
        )}
      </div>
    </div>
  );
}