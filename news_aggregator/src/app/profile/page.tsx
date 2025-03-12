/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef } from "react";
import {
  UserCircle,
  LogOut,
  Trash2,
  Edit,
  Lock,
  ArrowLeft,
  Save,
  RefreshCw,
  Upload,
  Camera,
  BarChart,
  BookOpen,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const router = useRouter();

  // Pre-populated user data for UI testing
  const [user, setUser] = useState({
    _id: "user123",
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    avatar: "", // Will store the avatar URL
    locations: ["New York", "London", "Tokyo"],
    sources: ["CNN", "BBC", "The Guardian"],
    languages: ["English", "Spanish", "French"],
    EntertainmentArticlesRead: 47,
    SportsArticlesRead: 32,
    PoliticalArticlesRead: 65,
    BusinessArticlesRead: 28,
    TechnologyArticlesRead: 54,
    GlobalArticlesRead: 39,
  });

  const [isLoading, setIsLoading] = useState(false); // Set to false to skip loading screen
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [avatarUrl, setAvatarUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preference states - initialize with mock data
  const [locations, setLocations] = useState(user.locations);
  const [sources, setSources] = useState(user.sources);
  const [languages, setLanguages] = useState(user.languages);
  const [newLocation, setNewLocation] = useState("");
  const [newSource, setNewSource] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

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
      setAvatarUrl(`https://avatar.iran.liara.run/public/boy?username=[value]`);
    }
  }, [user?.name]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn == "0" || !loggedIn) router.replace("/");
  }, []);

  const handleAvatarUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server and get a URL back
      // For demo purposes, I've used a local URL
      const tempUrl = URL.createObjectURL(file);
      setAvatarUrl(tempUrl);
      setUser({ ...user, avatar: tempUrl });

      // Show success message
      alert("Avatar uploaded successfully!");
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Mock API response
      setTimeout(() => {
        setUser({ ...user, name: newName });
        setIsEditing(false);
        alert("Name updated successfully!");
      }, 500);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      // Mock API response
      setTimeout(() => {
        alert("Password updated successfully");
        setIsChangingPassword(false);
        setNewPassword("");
        setConfirmPassword("");
      }, 500);
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Error updating password");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Mock API response
      setTimeout(() => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("userId");
        }
        alert("Your account has been deleted.");
        router.push("/login");
      }, 500);
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Error deleting account");
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userId");
    }
    router.push("/login");
  };

  // Preference management functions
  const addPreference = async (type: string, value: string) => {
    if (!value.trim()) return;

    try {
      let updatedList = [];

      if (type === "locations") {
        updatedList = [...locations, value];
        setLocations(updatedList);
        setUser({ ...user, locations: updatedList });
      } else if (type === "sources") {
        updatedList = [...sources, value];
        setSources(updatedList);
        setUser({ ...user, sources: updatedList });
      } else if (type === "languages") {
        updatedList = [...languages, value];
        setLanguages(updatedList);
        setUser({ ...user, languages: updatedList });
      }

      // Clear input field
      if (type === "locations") setNewLocation("");
      else if (type === "sources") setNewSource("");
      else if (type === "languages") setNewLanguage("");
    } catch (error) {
      console.error(`Error adding ${type}:`, error);
    }
  };

  const removePreference = async (type: string, index: number) => {
    try {
      let updatedList = [];

      if (type === "locations") {
        updatedList = locations.filter((_, i) => i !== index);
        setLocations(updatedList);
        setUser({ ...user, locations: updatedList });
      } else if (type === "sources") {
        updatedList = sources.filter((_, i) => i !== index);
        setSources(updatedList);
        setUser({ ...user, sources: updatedList });
      } else if (type === "languages") {
        updatedList = languages.filter((_, i) => i !== index);
        setLanguages(updatedList);
        setUser({ ...user, languages: updatedList });
      }
    } catch (error) {
      console.error(`Error removing ${type}:`, error);
    }
  };

  const resetPreferences = async () => {
    try {
      setLocations([]);
      setSources([]);
      setLanguages([]);

      setUser({
        ...user,
        locations: [],
        sources: [],
        languages: [],
      });

      alert("Preferences reset successfully");
    } catch (error) {
      console.error("Error resetting preferences:", error);
    }
  };

  // Calculate percentage for reading stats
  const calculatePercentage = (count: number) => {
    return totalArticles > 0 ? Math.round((count / totalArticles) * 100) : 0;
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
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 pb-6 border-b border-gray-200 -mt-24">
        <div className="relative group">
          <div className="h-32 w-32 rounded-full overflow-hidden bg-white shadow-lg border-4 border-white">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={user.name}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserCircle size={128} className="text-gray-400" />
            )}
          </div>
          <button
            onClick={handleAvatarUpload}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Camera size={24} className="text-white" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="text-center md:text-left flex-1 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-600 mt-1">{user.email}</p>
          <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
            {languages.map((language, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-primary rounded-full text-sm font-medium"
              >
                {language}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Total Articles Read:{" "}
              <span className="font-bold text-primary">{totalArticles}</span>
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors duration-300 shadow-sm"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

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
          <UserCircle size={18} /> Profile
        </button>
        <button
          onClick={() => setActiveTab("preferences")}
          className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors duration-300 ${
            activeTab === "preferences"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <Settings size={18} /> Preferences
        </button>
        <button
          onClick={() => setActiveTab("stats")}
          className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors duration-300 ${
            activeTab === "stats"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <BarChart size={18} /> Reading Stats
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "profile" && (
          <div className="space-y-8">
            {/* Profile Information */}
            <div className="bg-background_light p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Profile Information
                </h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-primary hover:text-secondary transition-colors"
                  >
                    <Edit size={16} /> Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveChanges}
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors duration-300 flex items-center gap-2 shadow-sm hover:shadow"
                    >
                      <Save size={16} /> Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                    <span className="text-sm font-medium text-gray-500">
                      Name:
                    </span>
                    <span className="text-gray-800">{user.name}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                    <span className="text-sm font-medium text-gray-500">
                      Email:
                    </span>
                    <span className="text-gray-800">{user.email}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Password Change */}
            <div className="bg-background_light p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Security
              </h3>

              {isChangingPassword ? (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePasswordChange}
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors duration-300 flex items-center gap-2 shadow-sm hover:shadow"
                    >
                      <Lock size={16} /> Update Password
                    </button>
                    <button
                      onClick={() => {
                        setIsChangingPassword(false);
                        setNewPassword("");
                        setConfirmPassword("");
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md transition-all duration-300"
                >
                  <Lock size={18} /> Change Password
                </button>
              )}
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 p-6 rounded-lg border border-red-200 shadow-sm transition-all duration-300 hover:shadow-md">
              <h3 className="text-lg font-semibold text-red-700 mb-4">
                Danger Zone
              </h3>
              <button
                onClick={() => setIsDeleting(true)}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 rounded-md transition-all duration-300"
              >
                <Trash2 size={18} /> Delete Account
              </button>
              {isDeleting && (
                <div className="mt-4 p-4 bg-white border border-red-300 rounded-md shadow-sm">
                  <p className="text-red-600">
                    Are you sure you want to delete your account? This action
                    cannot be undone.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={handleDeleteAccount}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 shadow-sm"
                    >
                      Yes, Delete My Account
                    </button>
                    <button
                      onClick={() => setIsDeleting(false)}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Settings size={20} className="text-primary" /> Your Preferences
              </h3>
              <button
                onClick={resetPreferences}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300 shadow-sm hover:shadow"
              >
                <RefreshCw size={14} /> Reset All
              </button>
            </div>

            {/* Languages */}
            <div className="bg-background_light p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-purple-100 text-primary rounded-full">
                  L
                </span>
                Languages
              </h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {languages.length > 0 ? (
                  languages.map((language, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-purple-100 rounded-full overflow-hidden shadow-sm hover:shadow transition-shadow duration-300"
                    >
                      <span className="px-3 py-1 text-primary">{language}</span>
                      <button
                        onClick={() => removePreference("languages", index)}
                        className="p-1 bg-purple-200 text-primary hover:bg-purple-300 transition-colors duration-300"
                      >
                        &times;
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No languages selected</p>
                )}
              </div>
              <div className="flex mt-2">
                <input
                  type="text"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Add a language"
                  className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                />
                <button
                  onClick={() => addPreference("languages", newLanguage)}
                  className="px-3 bg-primary text-white rounded-r-md hover:bg-secondary transition-colors duration-300"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Locations */}
            <div className="bg-background_light p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-green-100 text-green-800 rounded-full">
                  L
                </span>
                Locations
              </h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {locations.length > 0 ? (
                  locations.map((location, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-green-100 rounded-full overflow-hidden shadow-sm hover:shadow transition-shadow duration-300"
                    >
                      <span className="px-3 py-1 text-green-800">
                        {location}
                      </span>
                      <button
                        onClick={() => removePreference("locations", index)}
                        className="p-1 bg-green-200 text-green-800 hover:bg-green-300 transition-colors duration-300"
                      >
                        &times;
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No locations selected</p>
                )}
              </div>
              <div className="flex mt-2">
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="Add a location"
                  className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                />
                <button
                  onClick={() => addPreference("locations", newLocation)}
                  className="px-3 bg-primary text-white rounded-r-md hover:bg-secondary transition-colors duration-300"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Sources */}
            <div className="bg-background_light p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-800 rounded-full">
                  S
                </span>
                News Sources
              </h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {sources.length > 0 ? (
                  sources.map((source, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-100 rounded-full overflow-hidden shadow-sm hover:shadow transition-shadow duration-300"
                    >
                      <span className="px-3 py-1 text-blue-800">{source}</span>
                      <button
                        onClick={() => removePreference("sources", index)}
                        className="p-1 bg-blue-200 text-blue-800 hover:bg-blue-300 transition-colors duration-300"
                      >
                        &times;
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No sources selected</p>
                )}
              </div>
              <div className="flex mt-2">
                <input
                  type="text"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  placeholder="Add a news source"
                  className="flex-1 p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                />
                <button
                  onClick={() => addPreference("sources", newSource)}
                  className="px-3 bg-primary text-white rounded-r-md hover:bg-secondary transition-colors duration-300"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <BarChart size={20} className="text-primary" /> Reading Statistics
            </h3>

            {/* Summary Card */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
              <div className="flex items-center gap-3">
                <BookOpen size={28} />
                <div>
                  <h4 className="font-medium mb-2">Reading Summary</h4>
                  <div className="text-3xl font-bold">{totalArticles}</div>
                  <div className="text-sm opacity-80">Total Articles Read</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Entertainment */}
              <div className="bg-background_light p-4 rounded-lg shadow-sm transition-transform duration-300 hover:scale-105">
                <h4 className="font-medium text-gray-700 mb-2">
                  Entertainment
                </h4>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {user.EntertainmentArticlesRead}
                  </span>
                  <span className="text-gray-500">articles</span>
                </div>
                <div className="mt-2 h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{
                      width: `${calculatePercentage(
                        user.EntertainmentArticlesRead
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">
                  {calculatePercentage(user.EntertainmentArticlesRead)}% of
                  total
                </div>
              </div>

              {/* Sports */}
              <div className="bg-background_light p-4 rounded-lg shadow-sm transition-transform duration-300 hover:scale-105">
                <h4 className="font-medium text-gray-700 mb-2">Sports</h4>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {user.SportsArticlesRead}
                  </span>
                  <span className="text-gray-500">articles</span>
                </div>
                <div className="mt-2 h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{
                      width: `${calculatePercentage(user.SportsArticlesRead)}%`,
                    }}
                  ></div>
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">
                  {calculatePercentage(user.SportsArticlesRead)}% of total
                </div>
              </div>

              {/* Politics */}
              <div className="bg-background_light p-4 rounded-lg shadow-sm transition-transform duration-300 hover:scale-105">
                <h4 className="font-medium text-gray-700 mb-2">Politics</h4>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {user.PoliticalArticlesRead}
                  </span>
                  <span className="text-gray-500">articles</span>
                </div>
                <div className="mt-2 h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{
                      width: `${calculatePercentage(
                        user.PoliticalArticlesRead
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">
                  {calculatePercentage(user.PoliticalArticlesRead)}% of total
                </div>
              </div>

              {/* Business */}
              <div className="bg-background_light p-4 rounded-lg shadow-sm transition-transform duration-300 hover:scale-105">
                <h4 className="font-medium text-gray-700 mb-2">Business</h4>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {user.BusinessArticlesRead}
                  </span>
                  <span className="text-gray-500">articles</span>
                </div>
                <div className="mt-2 h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{
                      width: `${calculatePercentage(
                        user.BusinessArticlesRead
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">
                  {calculatePercentage(user.BusinessArticlesRead)}% of total
                </div>
              </div>

              {/* Technology */}
              <div className="bg-background_light p-4 rounded-lg shadow-sm transition-transform duration-300 hover:scale-105">
                <h4 className="font-medium text-gray-700 mb-2">Technology</h4>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {user.TechnologyArticlesRead}
                  </span>
                  <span className="text-gray-500">articles</span>
                </div>
                <div className="mt-2 h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{
                      width: `${calculatePercentage(
                        user.TechnologyArticlesRead
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">
                  {calculatePercentage(user.TechnologyArticlesRead)}% of total
                </div>
              </div>

              {/* Global */}
              <div className="bg-background_light p-4 rounded-lg shadow-sm transition-transform duration-300 hover:scale-105">
                <h4 className="font-medium text-gray-700 mb-2">Global</h4>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {user.GlobalArticlesRead}
                  </span>
                  <span className="text-gray-500">articles</span>
                </div>
                <div className="mt-2 h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{
                      width: `${calculatePercentage(user.GlobalArticlesRead)}%`,
                    }}
                  ></div>
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">
                  {calculatePercentage(user.GlobalArticlesRead)}% of total
                </div>
              </div>
            </div>

            {/* Reading Progress */}
            <div className="bg-background_light p-6 rounded-lg shadow-md">
              <h4 className="font-medium text-gray-700 mb-4">
                Reading Progress
              </h4>
              <div className="text-sm text-gray-600 mb-2">
                You're in the top 25% of active readers this month!
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <div className="mt-4 text-center">
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors duration-300 shadow-sm hover:shadow flex items-center gap-2 mx-auto">
                  <BookOpen size={16} />{" "}
                  <Link href="/home">Find More Articles</Link>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
