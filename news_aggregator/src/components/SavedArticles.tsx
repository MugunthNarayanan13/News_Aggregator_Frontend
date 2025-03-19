/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Trash2, RefreshCw, AlertCircle, BookOpen, Archive, List } from "lucide-react";
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await articleService.getSavedArticles();
      
      if (response && Array.isArray(response)) {
        // Transform backend data to match NewsCardBigProps format
        // Update the transformation to include source
        const transformedArticles = response.map((article: any) => ({
          id: article._id,
          title: article.title,
          link: article.link,
          timestamp: article.createdAt || new Date().toISOString(),
          source: article.source || "Unknown source" // Add this line
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
      <div className="flex justify-center items-center min-h-[300px] bg-background_light dark:bg-background_dark rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <RefreshCw size={24} className="animate-spin mb-4 text-primary" />
          <p className="text-gray-600 dark:text-gray-300 font-medium">Loading saved articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-background_dark rounded-xl shadow-md">
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <BookOpen size={24} className="text-primary" /> 
          <span>Your Saved Articles</span>
          {articles.length > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {articles.length}
            </span>
          )}
        </h3>
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 dark:bg-foreground_dark rounded-md p-1 flex">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              title="Grid view"
            >
              <Archive size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              title="List view"
            >
              <List size={16} />
            </button>
          </div>
          
          {articles.length > 0 && (
            <>
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-foreground_dark text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 shadow-sm hover:shadow"
                title="Refresh articles"
              >
                <RefreshCw size={16} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors duration-300 shadow-sm hover:shadow"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/30">
          <AlertCircle size={20} className="mr-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {articles.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-background_light dark:bg-foreground_dark rounded-lg shadow-inner">
          <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <BookOpen size={32} className="text-primary" />
          </div>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">No saved articles yet</p>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
            Articles you save will appear here for easy access
          </p>
          <Link href="/home">
            <button className="px-5 py-2.5 bg-primary hover:bg-secondary text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2 font-medium">
              <BookOpen size={18} />
              Browse Articles
            </button>
          </Link>
        </div>
      ) : (
        viewMode === 'grid' ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <div 
                key={article.id} 
                className="group relative bg-white dark:bg-foreground_dark rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-primary/20 dark:hover:border-primary/20"
              >
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-5"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                  <h3 className="text-lg font-bold line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {new Date(article.timestamp || "").toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteArticle(article.id || "");
                        }}
                        className="p-1.5 bg-red-50 dark:bg-red-900/20 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors duration-300"
                        aria-label="Delete article"
                      >
                        <Trash2 size={16} className="text-red-500 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div 
                key={article.id} 
                className="group flex justify-between items-center bg-white dark:bg-foreground_dark rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 border-l-4 border-primary border-t border-r border-b border-gray-100 dark:border-gray-800"
              >
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Saved on {new Date(article.timestamp || "").toLocaleDateString(undefined, {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </a>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteArticle(article.id || "");
                  }}
                  className="p-2 ml-4 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors duration-300"
                  aria-label="Delete article"
                >
                  <Trash2 size={18} className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400" />
                </button>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default SavedArticles;