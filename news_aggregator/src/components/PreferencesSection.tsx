/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Settings, RefreshCw } from "lucide-react";

interface PreferencesSectionProps {
  user: {
    locations: string[];
    sources: string[];
    languages: string[];
  };
  setUser: (user: any) => void;
}

export default function PreferencesSection({ user, setUser }: PreferencesSectionProps) {
  // Preference states
  const [locations, setLocations] = useState(user.locations);
  const [sources, setSources] = useState(user.sources);
  const [languages, setLanguages] = useState(user.languages);
  const [newLocation, setNewLocation] = useState("");
  const [newSource, setNewSource] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  // Update local state when user prop changes
  useEffect(() => {
    setLocations(user.locations);
    setSources(user.sources);
    setLanguages(user.languages);
  }, [user]);

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

  return (
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
  );
}