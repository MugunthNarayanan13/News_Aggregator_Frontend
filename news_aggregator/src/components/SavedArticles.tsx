/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Trash2, RefreshCw, AlertCircle, BookOpen } from "lucide-react";
import { NewsCardBigProps } from "./NewsCardBig";
import { articleService } from "@/utils/articleService";
import { toast } from "react-toastify";
import Link from "next/link";

export interface SavedArticlesProps {
  articles?: NewsCardBigProps[];
}

const SavedArticles = ({ articles: initialArticles }: SavedArticlesProps) => {
  const [articles, setArticles] = useState<NewsCardBigProps[]>(initialArticles || []);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await articleService.getSavedArticles();
      
      if (response && Array.isArray(response)) {
        // Transform backend data to match NewsCardBigProps format
        const transformedArticles = response.map((article: any) => ({
          id: article._id,
          title: article.title,
          link: article.link,
          timestamp: article.createdAt || new Date().toISOString(),
        }));
        
        setArticles(transformedArticles);
      } else {
        setArticles([]);
      }
    } catch (err: any) {
      console.error('Error fetching saved articles:', err);
      toast.error('Failed to load saved articles');
      setError(err.message || 'Failed to load saved articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDeleteArticle = async (id: string) => {
    try {
      await articleService.deleteArticle(id);
      setArticles(articles.filter(article => article.id !== id));
      toast.success("Article removed successfully");
    } catch (err) {
      console.error('Error deleting article:', err);
      toast.error('Failed to delete article');
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to delete all saved articles?')) {
      try {
        await articleService.clearAllArticles();
        setArticles([]);
        toast.success("All articles cleared successfully");
      } catch (err) {
        console.error('Error clearing articles:', err);
        toast.error('Failed to clear articles');
      }
    }
  };

  const handleRefresh = () => {
    fetchArticles();
  };

  if (loading && articles.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <RefreshCw size={20} className="animate-spin mr-2 text-primary" />
        <p>Loading saved articles...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <BookOpen size={20} className="text-primary" /> Your Saved Articles
        </h3>
        <div className="flex gap-2">
          {articles.length > 0 && (
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300 shadow-sm hover:shadow"
              title="Refresh articles"
            >
              <RefreshCw size={14} />
            </button>
          )}
          {articles.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300 shadow-sm hover:shadow"
            >
              <Trash2 size={14} /> Clear All
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center p-4 bg-red-100 text-red-800 rounded-md">
          <AlertCircle size={20} className="mr-2" />
          {error}
        </div>
      )}

      {articles.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center p-10 bg-background_light dark:bg-foreground_dark rounded-lg shadow-sm">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">No saved articles yet</p>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Articles you save will appear here</p>
          <Link href="/home">
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors duration-300 shadow-sm hover:shadow flex items-center gap-2">
              <BookOpen size={16} />
              Find Articles
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div key={article.id} className="relative bg-white dark:bg-foreground_dark rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <a 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-4"
              >
                <h3 className="text-lg font-bold line-clamp-2 mb-2 hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Saved on {new Date(article.timestamp || "").toLocaleDateString()}
                </p>
              </a>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteArticle(article.id || "");
                }}
                className="absolute top-2 right-2 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-300"
                aria-label="Delete article"
              >
                <Trash2 size={16} className="text-gray-500 hover:text-red-600 dark:hover:text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedArticles;