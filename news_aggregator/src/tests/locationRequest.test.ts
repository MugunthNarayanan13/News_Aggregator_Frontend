import getLocationData from '../utils/locationRequest';

// Mock fetch
global.fetch = jest.fn();

// Mock navigator.geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};

Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
  configurable: true,
});

// Mock localStorage
const localStorageMock = (function() {
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

// Mock console methods to avoid cluttering test output
global.console = {
  ...global.console,
  log: jest.fn(),
  error: jest.fn(),
};

describe('getLocationData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  it('should fetch and return location data successfully', async () => {
    // Mock geolocation position
    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    };

    // Mock successful response from API
    const mockApiResponse = {
      address: {
        country: 'United States',
        state: 'New York',
        city: 'New York City',
        country_code: 'us'
      }
    };

    // Setup mocks
    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success(mockPosition);
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockApiResponse)
    });

    // Call the function
    const result = await getLocationData();

    // Verify fetch was called with correct URL
    expect(global.fetch).toHaveBeenCalledWith(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=40.7128&lon=-74.006`
      );

    // Check result
    expect(result).toEqual({
      country: 'United States',
      region: 'New York',
      city: 'New York City',
      country_code: 'us'
    });

    // Check localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith('userCountry', 'United States');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('userRegion', 'New York');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('userCity', 'New York City');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('userCountryCode', 'us');
  });

  it('should return null when API response is missing required fields', async () => {
    // Mock geolocation position
    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    };

    // Mock incomplete API response
    const mockApiResponse = {
      address: {
        country: 'United States',
        // Missing state, city, and country_code
      }
    };

    // Setup mocks
    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success(mockPosition);
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockApiResponse)
    });

    // Call the function
    const result = await getLocationData();

    // Check result
    expect(result).toBeNull();
    
    // localStorage should not be called
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  it('should reject when fetch throws an error', async () => {
    // Mock geolocation position
    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    };

    // Setup mocks
    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success(mockPosition);
    });

    const mockError = new Error('Network error');
    (global.fetch as jest.Mock).mockRejectedValue(mockError);

    // Call the function and expect rejection
    await expect(getLocationData()).rejects.toThrow('Network error');
    
    // Check console.error was called
    expect(console.error).toHaveBeenCalledWith('Error fetching location data:', mockError);
  });

  it('should reject when geolocation permission is denied', async () => {
    // Mock geolocation error
    const mockError = {
      code: 1,
      message: 'User denied geolocation'
    };

    // Setup mocks
    mockGeolocation.getCurrentPosition.mockImplementation((success, error) => {
      error(mockError);
    });

    // Call the function and expect rejection
    await expect(getLocationData()).rejects.toEqual(mockError);
    
    // Check console.error was called
    expect(console.error).toHaveBeenCalledWith('Geolocation error:', mockError);
  });

  it('should reject when geolocation is not available', async () => {
    // Mock geolocation unavailable
    Object.defineProperty(global.navigator, 'geolocation', {
      value: undefined,
      configurable: true,
    });

    // Call the function and expect rejection
    await expect(getLocationData()).rejects.toThrow('Geolocation is not available in this browser');

    // Restore geolocation for other tests
    Object.defineProperty(global.navigator, 'geolocation', {
      value: mockGeolocation,
      configurable: true,
    });
  });
});