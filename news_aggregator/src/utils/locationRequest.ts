// This is a utility function that makes a request to the location API to get the user's location based on their IP address.

const getLocationData = (): Promise<{ country: string; region: string; city: string; country_code: string } | null> => {
    return new Promise((resolve, reject) => {
        if (typeof window !== "undefined" && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                async (position) => {
                    console.log("Position:", position);
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log("Latitude:", latitude, "Longitude:", longitude);
                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );
                        const data = await response.json();
                        console.log("Location data:", data);

                        if (data.address && data.address.country && data.address.state && data.address.city && data.address.country_code) {
                            const locationData = {
                                country: data.address.country,
                                region: data.address.state,
                                city: data.address.city,
                                country_code: data.address.country_code,
                            };

                            // Store country, region, city, and country_code in localStorage
                            if (typeof localStorage !== "undefined") {
                                localStorage.setItem("userCountry", data.address.country);
                                localStorage.setItem("userRegion", data.address.state);
                                localStorage.setItem("userCity", data.address.city);
                                localStorage.setItem("userCountryCode", data.address.country_code);
                                console.log("Location data stored in localStorage", locationData);
                            }

                            resolve(locationData);
                        } else {
                            resolve(null);
                        }
                    } catch (error) {
                        console.error("Error fetching location data:", error);
                        reject(error);
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    reject(error);
                }
            );
        } else {
            reject(new Error("Geolocation is not available in this browser"));
        }
    });
};

export default getLocationData;
