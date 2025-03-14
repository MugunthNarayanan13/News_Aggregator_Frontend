/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import Image from "next/image";
import { UserCircle, Camera, LogOut, Edit, Save } from "lucide-react";
import { sendData } from "@/utils/sendData";

interface ProfileSectionProps {
  user: {
    name: string;
    email: string;
    languages: string[];
  };
  avatarUrl: string;
  handleLogout: () => void;
  totalArticles: number;
}

interface InfoSectionProps {
  user: {
    name: string;
    email: string;
  };
  userID: any;
  setUser: (user: any) => void;
}

const ProfileSection = ({ user, avatarUrl, handleLogout, totalArticles }: ProfileSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      // You would need to add a setAvatarUrl function to the props to update the avatar URL
      
      // Show success message
      alert("Avatar uploaded successfully!");
    }
  };

  return (
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
          {user.languages.map((language, index) => (
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
  );
};

// Info sub-component
ProfileSection.Info = function InfoSection({ user, userID, setUser }: InfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);

  const handleSaveChanges = async () => {
    try {
      const { data, status } = await sendData(`/${userID}/name`, "PUT", {
        name: newName,
      });
      if (status == 200) setUser({ ...user, name: newName });
      setNewName("");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  return (
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
  );
};

export default ProfileSection;