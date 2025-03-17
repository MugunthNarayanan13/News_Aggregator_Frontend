/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { MessageCircle, SendHorizonal, Star, X } from "lucide-react";
import { toast } from "react-toastify";
import { sendData } from "@/utils/sendData";

export default function FeedbackSection() {
  const [isGivingFeedback, setIsGivingFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [rating, setRating] = useState<number>(0);

  const handleFeedbackSubmit = async () => {
    if (!rating) {
      toast.warn("Please select a rating before submitting.");
      return;
    }

    try {
      const feedbackPayload = {
        feedbackType,
        feedbackMessage,
        rating,
      };

      const res = await sendData(`/${localStorage.getItem("userID")}/feedback`, "PUT", feedbackPayload);
      console.log("Feedback Submitted:", feedbackPayload, res);

      // Reset form
      setIsGivingFeedback(false);
      setFeedbackType("");
      setFeedbackMessage("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Something went wrong while submitting feedback.");
    }
  };

  return (
    <div className="bg-background_light p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Feedback</h3>

      {isGivingFeedback ? (
        <div className="space-y-4">
          {/* Feedback Type Dropdown */}
          <div>
            <label
              htmlFor="feedbackType"
              className="block text-sm font-medium text-gray-700"
            >
              Feedback Type (Optional)
            </label>
            <select
              id="feedbackType"
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
            >
              <option value="">Select Type</option>
              <option value="Bug Report">🐞 Bug Report</option>
              <option value="Feature Request">💡 Feature Request</option>
              <option value="Usability Issue">😕 Usability Issue</option>
              <option value="Performance Issue">📈 Performance Issue</option>
              <option value="Other">🔎 Other Comments</option>
            </select>
          </div>

          {/* Feedback Message Textarea */}
          <div>
            <label
              htmlFor="feedbackMessage"
              className="block text-sm font-medium text-gray-700"
            >
              Message (Optional)
            </label>
            <textarea
              id="feedbackMessage"
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              placeholder="Describe your issue, suggestion, or comment..."
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              rows={4}
            />
          </div>

          {/* Rating (Stars) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer transition-all ${star <= rating ? "text-yellow-500 fill-yellow-400" : "text-gray-400"
                    }`}
                  size={24}
                />
              ))}
            </div>
          </div>

          {/* Submit / Cancel Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleFeedbackSubmit}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors duration-300 flex items-center gap-2 shadow-sm hover:shadow"
            >
              <SendHorizonal size={16} /> Submit Feedback
            </button>
            <button
              onClick={() => {
                setIsGivingFeedback(false);
                setFeedbackType("");
                setFeedbackMessage("");
                setRating(0);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsGivingFeedback(true)}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md transition-all duration-300"
        >
          <MessageCircle size={18} /> Provide Feedback
        </button>
      )}
    </div>
  );
}
