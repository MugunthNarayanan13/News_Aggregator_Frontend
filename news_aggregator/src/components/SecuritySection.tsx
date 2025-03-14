/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Lock } from "lucide-react";
import { sendData } from "@/utils/sendData";
import { toast } from "react-toastify";

interface SecuritySectionProps {
  user: any;
  setUser: (user: any) => void;
  userID: any;
}

export default function SecuritySection({ user, setUser, userID }: SecuritySectionProps) {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.warn("Passwords don't match");
      return;
    }
    try {
      const { data, status } = await sendData(`/${userID}/password`, "PUT", {
        password: newPassword,
      });
      if (status == 200) setUser({ ...user, password: newPassword });
      setIsChangingPassword(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Error updating password");
    }
  };

  return (
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
  );
}