// Tried writing tests, but getting errors... have to fix it...

import getLocationData from "../utils/locationRequest";

// Mock the localStorage
global.localStorage = {
    setItem: jest.fn(),
    getItem: jest.fn(),
    clear: jest.fn(),
    length: 0,
    key: jest.fn(),
    removeItem: jest.fn(),
};

// Mocking Geolocation
const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
    clearWatch: jest.fn(),
};

jest.spyOn(global.navigator, 'geolocation', 'get').mockReturnValue(mockGeolocation);

// Mocking the Fetch API
global.fetch = jest.fn();

describe("getLocationData", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should successfully fetch and return location data", async () => {
        const mockLocation = {
            address: {
                country: "Country",
                state: "Region",
                city: "City",
                country_code: "US",
            },
        };

        // Mocking the fetch response
        (global.fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockLocation),
        });

        // Mocking the geolocation API
        mockGeolocation.getCurrentPosition.mockImplementationOnce((successCallback) =>
            successCallback({
                coords: {
                    latitude: 10,
                    longitude: 20,
                },
            })
        );

        // Call the function
        const result = await getLocationData();

        expect(result).toEqual({
            country: "Country",
            region: "Region",
            city: "City",
            country_code: "US",
        });

        // Check if the location is saved in localStorage
        expect(localStorage.setItem).toHaveBeenCalledWith("userCountry", "Country");
        expect(localStorage.setItem).toHaveBeenCalledWith("userRegion", "Region");
        expect(localStorage.setItem).toHaveBeenCalledWith("userCity", "City");
        expect(localStorage.setItem).toHaveBeenCalledWith("userCountryCode", "US");
    });

    it("should handle geolocation error", async () => {
        const mockError = new Error("Geolocation error");

        // Mocking the geolocation error
        mockGeolocation.getCurrentPosition.mockImplementationOnce((successCallback, errorCallback) =>
            errorCallback(mockError)
        );

        await expect(getLocationData()).rejects.toThrowError("Geolocation error");

        // Verify that no localStorage is updated in case of error
        expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it("should handle fetch API error", async () => {
        const mockGeolocationData = {
            coords: { latitude: 10, longitude: 20 },
        };

        // Mocking the geolocation success
        mockGeolocation.getCurrentPosition.mockImplementationOnce((successCallback) =>
            successCallback(mockGeolocationData)
        );

        // Mocking fetch to simulate an error response
        (global.fetch as jest.Mock).mockRejectedValue(new Error("Fetch error"));

        await expect(getLocationData()).rejects.toThrowError("Fetch error");

        // Verify that no localStorage is updated in case of fetch error
        expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it("should return null if location data is incomplete", async () => {
        const mockIncompleteLocation = {
            address: {
                country: "Country",
                state: "Region",
                // Missing city or country_code
            },
        };

        // Mocking the fetch response
        (global.fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockIncompleteLocation),
        });

        // Mocking the geolocation API
        mockGeolocation.getCurrentPosition.mockImplementationOnce((successCallback) =>
            successCallback({
                coords: {
                    latitude: 10,
                    longitude: 20,
                },
            })
        );

        // Call the function
        const result = await getLocationData();

        expect(result).toBeNull();
    });
});
