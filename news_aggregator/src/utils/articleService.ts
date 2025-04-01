/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/articleService.js

import axios from "axios";
import { toast } from "react-toastify";

// Define a separate API client for articles that doesn't use sendData
const BASE_URL = "http://localhost:5000/NewsAgg/articles";

export const articleService = {
  // Fetch all saved articles for a user
  async getSavedArticles() {
    const userID = localStorage.getItem("userID");
    if (!userID) {
      throw new Error("User not logged in");
    }
    
    try {
      // Try without the userID in the path first
      const response = await axios.get(`${BASE_URL}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching saved articles:', error);
      toast.error(error.response?.data?.error || "Failed to load saved articles");
      throw error;
    }
  },
  
  // Save a new article
  async saveArticle(article: { title: any; link: any; url: any; }) {
    const userID = localStorage.getItem("userID");
    if (!userID) {
      throw new Error("User not logged in");
    }
    
    try {
      // Include userID in the request body instead of in the URL path
      const response = await axios.post(`${BASE_URL}`, {
        userID: userID,
        title: article.title,
        link: article.link || article.url
      });
      
      // After saving, store in localStorage for quick client-side checking
      const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '{}');
      savedArticles[article.link || article.url] = true;
      localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
      
      toast.success("Article saved successfully");
      return response.data;
    } catch (error: any) {
      console.error('Error saving article:', error);
      toast.error(error.response?.data?.error || "Failed to save article");
      throw error;
    }
  },
  
  // Delete a specific article
  async deleteArticle(id: any) {
    const userID = localStorage.getItem("userID");
    if (!userID) {
      throw new Error("User not logged in");
    }
    
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`, {
        data: { userID: userID }  // Include userID in the request body for DELETE
      });
      
      // Update localStorage after deleting
      const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '{}');
      delete savedArticles[id];
      localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
      
      return response.data;
    } catch (error: any) {
      console.error('Error deleting article:', error);
      toast.error(error.response?.data?.error || "Failed to delete article");
      throw error;
    }
  },
  
  // Clear all saved articles
  async clearAllArticles() {
    const userID = localStorage.getItem("userID");
    if (!userID) {
      throw new Error("User not logged in");
    }
    
    try {
      const response = await axios.delete(`${BASE_URL}`, {
        data: { userID: userID }  // Include userID in the request body for DELETE
      });
      
      // Clear the localStorage saved articles
      localStorage.setItem('savedArticles', JSON.stringify({}));
      
      return response.data;
    } catch (error: any) {
      console.error('Error clearing articles:', error);
      toast.error(error.response?.data?.error || "Failed to clear articles");
      throw error;
    }
  },
  
  // Check if article is bookmarked (client-side quick check)
  isArticleBookmarked: (articleLink: string): boolean => {
    try {
      const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '{}');
      return !!savedArticles[articleLink];
    } catch (error) {
      console.error('Error checking bookmark status:', error);
      return false;
    }
  },
  
  // Get all saved articles from server (for initialization)
  fetchSavedArticleLinks: async (): Promise<string[]> => {
    const userID = localStorage.getItem("userID");
    if (!userID) {
      throw new Error("User not logged in");
    }
    
    try {
      const response = await axios.get(`${BASE_URL}`);
      const articles = response.data;

      const savedArticles: { [key: string]: boolean } = {};

      articles.forEach((article: { link: string; }) => {
      savedArticles[article.link] = true;
    });
      localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
      
      return articles.map((article: string) => article.link);
    } catch (error) {
      console.error('Error fetching saved articles:', error);
      return [];
    }
  }
};