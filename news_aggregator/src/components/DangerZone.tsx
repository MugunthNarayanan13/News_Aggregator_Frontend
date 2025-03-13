/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { sendData } from "@/utils/sendData";

interface DangerZoneSectionProps {
  userID: any;
}

export default function DangerZoneSection({ userID }: DangerZoneSectionProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteAccount = async () => {
    try {
      const response = await sendData(`/${userID}`, "DELETE");
      if (response.status === 200) {
        localStorage.clear();
        alert("Your account has been deleted.");
        router.push("/");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Error deleting account");
    }
  };

  return (
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
  );
}