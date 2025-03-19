/* eslint-disable react/no-unescaped-entities */
import { BarChart, BookOpen } from "lucide-react";
import Link from "next/link";

interface ReadingStatsSectionProps {
  user: {
    EntertainmentArticlesRead: number;
    SportsArticlesRead: number;
    PoliticalArticlesRead: number;
    BusinessArticlesRead: number;
    TechnologyArticlesRead: number;
    GlobalArticlesRead: number;
  };
  totalArticles: number;
  globalRanking: number;
}

export default function ReadingStatsSection({
  user,
  totalArticles,
  globalRanking,
}: ReadingStatsSectionProps) {
  // Calculate percentage for reading stats
  const calculatePercentage = (count: number) => {
    return totalArticles > 0 ? Math.round((count / totalArticles) * 100) : 0;
  };

  return (
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
          You're in the top {globalRanking}% of active readers this month!
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${globalRanking}%` }}
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
  );
}