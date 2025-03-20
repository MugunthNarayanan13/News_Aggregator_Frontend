import { articleService } from '../utils/articleService';
import axios from 'axios';
import { toast } from 'react-toastify';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    key: jest.fn((index: number) => Object.keys(store)[index] || null),
    length: 0,
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

// Mock console methods
global.console = {
  ...global.console,
  error: jest.fn()
};

describe('articleService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    // Setup userID in localStorage for most tests
    localStorageMock.setItem('userID', '123');
  });

  describe('getSavedArticles', () => {
    it('should fetch saved articles successfully', async () => {
      const mockArticles = [
        { id: '1', title: 'Article 1', link: 'http://example.com/1' },
        { id: '2', title: 'Article 2', link: 'http://example.com/2' }
      ];
      
      mockedAxios.get.mockResolvedValueOnce({ data: mockArticles });
      
      const result = await articleService.getSavedArticles();
      
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:5000/api/articles');
      expect(result).toEqual(mockArticles);
    });

    it('should throw error if user is not logged in', async () => {
      localStorageMock.removeItem('userID');
      
      await expect(articleService.getSavedArticles()).rejects.toThrow('User not logged in');
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('should handle API error', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce({ 
        response: { data: { error: errorMessage } } 
      });
      
      await expect(articleService.getSavedArticles()).rejects.toEqual({ 
        response: { data: { error: errorMessage } } 
      });
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('saveArticle', () => {
    it('should save article successfully', async () => {
      const mockArticle = { title: 'Test Article', link: 'http://example.com/test', url: undefined };
      const mockResponse = { success: true };
      
      mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });
      
      const result = await articleService.saveArticle(mockArticle);
      
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/articles', 
        {
          userID: '123',
          title: 'Test Article',
          link: 'http://example.com/test'
        }
      );
      
      // Check localStorage was updated
      const savedArticles = JSON.parse(localStorageMock.getItem('savedArticles') as string);
      expect(savedArticles['http://example.com/test']).toBe(true);
      
      expect(toast.success).toHaveBeenCalledWith('Article saved successfully');
      expect(result).toEqual(mockResponse);
    });

    it('should use url when link is not available', async () => {
      const mockArticle = { title: 'Test Article', link: undefined, url: 'http://example.com/test' };
      
      mockedAxios.post.mockResolvedValueOnce({ data: {} });
      
      await articleService.saveArticle(mockArticle);
      
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/articles', 
        {
          userID: '123',
          title: 'Test Article',
          link: 'http://example.com/test'
        }
      );
    });

    it('should throw error if user is not logged in', async () => {
      localStorageMock.removeItem('userID');
      const mockArticle = { title: 'Test Article', link: 'http://example.com/test', url: undefined };
      
      await expect(articleService.saveArticle(mockArticle)).rejects.toThrow('User not logged in');
      expect(mockedAxios.post).not.toHaveBeenCalled();
    });

    it('should handle API error', async () => {
      const mockArticle = { title: 'Test Article', link: 'http://example.com/test', url: undefined };
      const errorMessage = 'Server Error';
      
      mockedAxios.post.mockRejectedValueOnce({ 
        response: { data: { error: errorMessage } } 
      });
      
      await expect(articleService.saveArticle(mockArticle)).rejects.toEqual({ 
        response: { data: { error: errorMessage } } 
      });
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('deleteArticle', () => {
    it('should delete article successfully', async () => {
      const articleId = 'article123';
      const mockResponse = { success: true };
      
      // Setup localStorage with saved article
      localStorageMock.setItem('savedArticles', JSON.stringify({ [articleId]: true }));
      
      mockedAxios.delete.mockResolvedValueOnce({ data: mockResponse });
      
      const result = await articleService.deleteArticle(articleId);
      
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `http://localhost:5000/api/articles/${articleId}`, 
        { data: { userID: '123' } }
      );
      
      // Check localStorage was updated
      const savedArticles = JSON.parse(localStorageMock.getItem('savedArticles') as string);
      expect(savedArticles[articleId]).toBeUndefined();
      
      expect(result).toEqual(mockResponse);
    });

    it('should throw error if user is not logged in', async () => {
      localStorageMock.removeItem('userID');
      
      await expect(articleService.deleteArticle('123')).rejects.toThrow('User not logged in');
      expect(mockedAxios.delete).not.toHaveBeenCalled();
    });

    it('should handle API error', async () => {
      const errorMessage = 'Deletion Failed';
      
      mockedAxios.delete.mockRejectedValueOnce({ 
        response: { data: { error: errorMessage } } 
      });
      
      await expect(articleService.deleteArticle('123')).rejects.toEqual({ 
        response: { data: { error: errorMessage } } 
      });
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('clearAllArticles', () => {
    it('should clear all articles successfully', async () => {
      const mockResponse = { success: true };
      
      // Setup localStorage with saved articles
      localStorageMock.setItem('savedArticles', JSON.stringify({ 
        'article1': true, 
        'article2': true 
      }));
      
      mockedAxios.delete.mockResolvedValueOnce({ data: mockResponse });
      
      const result = await articleService.clearAllArticles();
      
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        'http://localhost:5000/api/articles', 
        { data: { userID: '123' } }
      );
      
      // Check localStorage was updated
      const savedArticles = JSON.parse(localStorageMock.getItem('savedArticles') as string);
      expect(savedArticles).toEqual({});
      
      expect(result).toEqual(mockResponse);
    });

    it('should throw error if user is not logged in', async () => {
      localStorageMock.removeItem('userID');
      
      await expect(articleService.clearAllArticles()).rejects.toThrow('User not logged in');
      expect(mockedAxios.delete).not.toHaveBeenCalled();
    });

    it('should handle API error', async () => {
      const errorMessage = 'Clear Failed';
      
      mockedAxios.delete.mockRejectedValueOnce({ 
        response: { data: { error: errorMessage } } 
      });
      
      await expect(articleService.clearAllArticles()).rejects.toEqual({ 
        response: { data: { error: errorMessage } } 
      });
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('isArticleBookmarked', () => {
    it('should return true for bookmarked article', () => {
      // Setup localStorage with saved article
      localStorageMock.setItem('savedArticles', JSON.stringify({ 
        'http://example.com/article': true 
      }));
      
      const result = articleService.isArticleBookmarked('http://example.com/article');
      
      expect(result).toBe(true);
    });

    it('should return false for non-bookmarked article', () => {
      // Setup localStorage with saved article
      localStorageMock.setItem('savedArticles', JSON.stringify({ 
        'http://example.com/other': true 
      }));
      
      const result = articleService.isArticleBookmarked('http://example.com/article');
      
      expect(result).toBe(false);
    });

    it('should return false if localStorage error occurs', () => {
      // Setup localStorage with invalid data
      localStorageMock.setItem('savedArticles', 'not-json');
      
      const result = articleService.isArticleBookmarked('http://example.com/article');
      
      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('fetchSavedArticleLinks', () => {
    it('should fetch articles and store in localStorage', async () => {
      const mockArticles = [
        { id: '1', title: 'Article 1', link: 'http://example.com/1' },
        { id: '2', title: 'Article 2', link: 'http://example.com/2' }
      ];
      
      mockedAxios.get.mockResolvedValueOnce({ data: mockArticles });
      
      const result = await articleService.fetchSavedArticleLinks();
      
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:5000/api/articles');
      
      // Check localStorage was updated correctly
      const savedArticles = JSON.parse(localStorageMock.getItem('savedArticles') as string);
      expect(savedArticles).toEqual({
        'http://example.com/1': true,
        'http://example.com/2': true
      });
      
      expect(result).toEqual(['http://example.com/1', 'http://example.com/2']);
    });

    it('should throw error if user is not logged in', async () => {
      localStorageMock.removeItem('userID');
      
      await expect(articleService.fetchSavedArticleLinks()).rejects.toThrow('User not logged in');
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('should return empty array on error', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));
      
      const result = await articleService.fetchSavedArticleLinks();
      
      expect(result).toEqual([]);
      expect(console.error).toHaveBeenCalled();
    });
  });
});