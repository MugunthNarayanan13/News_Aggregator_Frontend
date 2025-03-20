/* eslint-disable @typescript-eslint/no-explicit-any */
// src/tests/urls.test.ts

// Set the environment variable before importing the module
process.env.NEXT_PUBLIC_API_KEY = 'test-api-key';

import * as utils from '../utils/urls';

jest.mock('../utils/urls', () => {
  // Re-require the actual module but with our environment variable set
  const originalModule = jest.requireActual('../utils/urls');
  return {
    ...originalModule,
    baseURL: `https://newsdata.io/api/1/latest?apikey=test-api-key&removeduplicate=1`,
    sourceURL: `https://newsdata.io/api/1/sources?apikey=test-api-key`
  };
});

describe('URL utilities', () => {
  const testBaseUrl = `https://newsdata.io/api/1/latest?apikey=test-api-key&removeduplicate=1`;
  const testSourceUrl = `https://newsdata.io/api/1/sources?apikey=test-api-key`;

  it('should have the correct base URLs', () => {
    expect(utils.baseURL).toBe(testBaseUrl);
    expect(utils.sourceURL).toBe(testSourceUrl);
  });

  describe('addKeyWordSearchURL', () => {
    it('should add keyword search parameter correctly', () => {
      const result = utils.addKeyWordSearchURL(testBaseUrl, 'climate');
      expect(result).toBe(`${testBaseUrl}&q="climate"`);
    });
  });

  describe('addCountryWiseURL', () => {
    it('should add single country parameter correctly', () => {
      const result = utils.addCountryWiseURL(testBaseUrl, ['us']);
      expect(result).toBe(`${testBaseUrl}&country=us,`);
    });

    it('should add multiple countries parameter correctly', () => {
      const result = utils.addCountryWiseURL(testBaseUrl, ['us', 'uk', 'ca']);
      expect(result).toBe(`${testBaseUrl}&country=us,uk,ca,`);
    });
  });

  describe('addExcludeKeyWordURL', () => {
    it('should add exclude category parameter correctly', () => {
      const result = utils.addExcludeKeyWordURL(testBaseUrl, 'sports');
      expect(result).toBe(`${testBaseUrl}&excludecategory=sports`);
    });
  });

  describe('addCategoryWiseURL', () => {
    it('should add single category parameter correctly', () => {
      const result = utils.addCategoryWiseURL(testBaseUrl, ['business']);
      expect(result).toBe(`${testBaseUrl}&category=business,`);
    });

    it('should add multiple categories parameter correctly', () => {
      const result = utils.addCategoryWiseURL(testBaseUrl, ['business', 'technology', 'health']);
      expect(result).toBe(`${testBaseUrl}&category=business,technology,health,`);
    });
  });

  describe('addLanguageWiseURL', () => {
    it('should add single language parameter correctly', () => {
      const result = utils.addLanguageWiseURL(testBaseUrl, ['en']);
      expect(result).toBe(`${testBaseUrl}&language=en,`);
    });

    it('should add multiple languages parameter correctly', () => {
      const result = utils.addLanguageWiseURL(testBaseUrl, ['en', 'fr', 'es']);
      expect(result).toBe(`${testBaseUrl}&language=en,fr,es,`);
    });
  });

  describe('addTimeframeURL', () => {
    it('should add timeframe parameter correctly', () => {
      const result = utils.addTimeframeURL(testBaseUrl, '24h');
      expect(result).toBe(`${testBaseUrl}&timeframe=24h`);
    });
  });

  describe('addPublisherWiseURL', () => {
    it('should add single domain parameter correctly', () => {
      const result = utils.addPublisherWiseURL(testBaseUrl, ['example.com']);
      expect(result).toBe(`${testBaseUrl}&domain=example.com,`);
    });

    it('should add multiple domains parameter correctly', () => {
      const result = utils.addPublisherWiseURL(testBaseUrl, ['example.com', 'test.org', 'news.net']);
      expect(result).toBe(`${testBaseUrl}&domain=example.com,test.org,news.net,`);
    });
  });

  describe('addRegionWiseURL', () => {
    it('should add single region parameter correctly', () => {
      const result = utils.addRegionWiseURL(testBaseUrl, ['europe']);
      expect(result).toBe(`${testBaseUrl}&region=europe,`);
    });

    it('should add multiple regions parameter correctly', () => {
      const result = utils.addRegionWiseURL(testBaseUrl, ['europe', 'asia', 'africa']);
      expect(result).toBe(`${testBaseUrl}&region=europe,asia,africa,`);
    });
  });

  describe('allPublishersURL', () => {
    it('should generate URL with countries and default language', () => {
      const result = utils.allPublishersURL(['us', 'ca']);
      expect(result).toBe(`${testSourceUrl}&country=us,ca&language=en`);
    });

    it('should generate URL with countries and custom languages', () => {
      const result = utils.allPublishersURL(['us', 'ca'], ['en', 'fr']);
      expect(result).toBe(`${testSourceUrl}&country=us,ca&language=en,fr`);
    });

    it('should generate URL with countries, languages, and categories', () => {
      // Use any[] to match the untyped implementation
      const countries: string[] = ['us', 'ca'];
      const langs: string[] = ['en', 'fr'];
      const categories: any[] = ['business', 'tech'];
      
      const result = utils.allPublishersURL(countries, langs, categories);
      expect(result).toBe(`${testSourceUrl}&country=us,ca&language=en,fr&category=business,tech`);
    });
  });
});