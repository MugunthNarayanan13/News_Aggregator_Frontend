/**
 * Converts country names to ISO 3166-1 alpha-2 codes for News API
 */

// Map of country names to their ISO 3166-1 alpha-2 codes
const countryCodeMap: Record<string, string> = {
    "afghanistan": "af",
    "albania": "al",
    "algeria": "dz",
    "argentina": "ar",
    "australia": "au",
    "austria": "at",
    "belgium": "be",
    "brazil": "br",
    "bulgaria": "bg",
    "canada": "ca",
    "china": "cn",
    "colombia": "co",
    "cuba": "cu",
    "czech republic": "cz",
    "egypt": "eg",
    "france": "fr",
    "germany": "de",
    "greece": "gr",
    "hong kong": "hk",
    "hungary": "hu",
    "india": "in",
    "indonesia": "id",
    "ireland": "ie",
    "israel": "il",
    "italy": "it",
    "japan": "jp",
    "latvia": "lv",
    "lithuania": "lt",
    "malaysia": "my",
    "mexico": "mx",
    "morocco": "ma",
    "netherlands": "nl",
    "new zealand": "nz",
    "nigeria": "ng",
    "norway": "no",
    "philippines": "ph",
    "poland": "pl",
    "portugal": "pt",
    "romania": "ro",
    "russia": "ru",
    "saudi arabia": "sa",
    "serbia": "rs",
    "singapore": "sg",
    "slovakia": "sk",
    "slovenia": "si",
    "south africa": "za",
    "south korea": "kr",
    "sweden": "se",
    "switzerland": "ch",
    "taiwan": "tw",
    "thailand": "th",
    "turkey": "tr",
    "ukraine": "ua",
    "united arab emirates": "ae",
    "united kingdom": "gb",
    "uk": "gb",
    "united states": "us",
    "usa": "us",
    "venezuela": "ve"
  };
  
/**
 * Checks if the input is a valid country name
 * @param input The user input
 * @returns Boolean indicating if it's a valid country
 */
const isValidCountry = (input: string): boolean => {
  // Check if the input exists in the country code map
  return Object.keys(countryCodeMap).includes(input);
};

/**
 * Converts a country name to its ISO 3166-1 alpha-2 code
 * @param countryName The name of the country
 * @returns The ISO code, or "Invalid location" if not found
 */
export const convertCountryToISO = (countryName: string): string => {

  if (!countryName) {
    return "Invalid location";
  }

  const normalizedName = countryName.trim().toLowerCase();

  // Reject input if it contains non-country related words
  if (!isValidCountry(normalizedName)) {
    return "Invalid location";
  }

  return countryCodeMap[normalizedName];
};

export default convertCountryToISO;