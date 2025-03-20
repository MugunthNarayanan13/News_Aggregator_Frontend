/* eslint-disable @typescript-eslint/no-explicit-any */
import { newsData } from '../utils/newsData';

describe('newsData', () => {
  it('should contain an array of news items', () => {
    expect(Array.isArray(newsData)).toBe(true);
    expect(newsData.length).toBeGreaterThan(0);
  });

  it('should have objects with the correct structure', () => {
    newsData.forEach((item: any) => {
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('desc');
      expect(item).toHaveProperty('pubDate');
      expect(item).toHaveProperty('pubName');
      expect(item).toHaveProperty('pubLogo');
      expect(item).toHaveProperty('sentiment');
    });
  });

  it('should have valid sentiment values', () => {
    const validSentiments = ['Positive', 'Negative', 'Neutral'];
    
    newsData.forEach((item: { sentiment: any; }) => {
      expect(validSentiments).toContain(item.sentiment);
    });
  });

  it('should have valid date format', () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    newsData.forEach((item: { pubDate: string | number | Date; }) => {
      expect(item.pubDate).toMatch(dateRegex);
      const date = new Date(item.pubDate);
      expect(date).toBeInstanceOf(Date);
      expect(date.toString()).not.toBe('Invalid Date');
    });
  });
  
  it('should have non-empty required fields', () => {
    newsData.forEach((item: { title: string | any[]; desc: string | any[]; pubName: string | any[]; }) => {
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.desc.length).toBeGreaterThan(0);
      expect(item.pubName.length).toBeGreaterThan(0);
    });
  });

  it('should have valid URLs for publication logos', () => {
    const urlRegex = /^https?:\/\/.+\..+/;
    
    newsData.forEach((item: { pubLogo: any; }) => {
      expect(item.pubLogo).toMatch(urlRegex);
    });
  });
});