// Utility function to convert language names to ISO 639-1 two-letter codes

export const languageToISO: Record<string, string> = {
  "english": "en",
  "spanish": "es",
  "french": "fr",
  "german": "de",
  "italian": "it",
  "portuguese": "pt",
  "russian": "ru",
  "japanese": "ja",
  "korean": "ko",
  "chinese": "zh",
  "arabic": "ar",
  "dutch": "nl",
  "hindi": "hi",
  "swedish": "sv",
  "norwegian": "no",
  "danish": "da",
  "finnish": "fi",
  "polish": "pl",
  "turkish": "tr",
  "czech": "cs",
  "greek": "el",
  "hebrew": "he",
  "thai": "th",
  "vietnamese": "vi",
  "indonesian": "id",
  "malay": "ms",
  "romanian": "ro",
  "hungarian": "hu",
  "bulgarian": "bg",
  "ukrainian": "uk",
  "persian": "fa",
  "bengali": "bn",
  "tamil": "ta",
  "telugu": "te",
  "marathi": "mr",
  "punjabi": "pa",
  "gujarati": "gu",
  "malayalam": "ml",
  "kannada": "kn",
  "odia": "or",
  "assamese": "as",
  "sinhala": "si",
  "nepali": "ne",
  "burmese": "my",
  "khmer": "km",
  "lao": "lo",
  "swahili": "sw",
  "filipino": "fil",
  "serbian": "sr",
  "croatian": "hr",
  "slovak": "sk",
  "slovenian": "sl",
  "estonian": "et",
  "latvian": "lv",
  "lithuanian": "lt",
  "icelandic": "is",
  "mongolian": "mn",
  "pashto": "ps",
  "urdu": "ur",
  "kazakh": "kk",
  "uzbek": "uz",
  "tajik": "tg",
  "georgian": "ka",
  "armenian": "hy",
  "azerbaijani": "az",
  "basque": "eu",
  "catalan": "ca",
  "galician": "gl",
  "haitian creole": "ht",
  "yiddish": "yi",
  "maori": "mi",
  "samoan": "sm",
  "tongan": "to",
  "hawaiian": "haw"
};

export function isValidLanguage(language: string | null | undefined): boolean {
  if (!language || typeof language !== "string") return false;
  const normalizedLang = language.toLowerCase().trim();
  return normalizedLang in languageToISO;
}
  
  /**
   * Converts a language name to its ISO 639-1 two-letter code
   * @param language - The full language name (e.g., "english")
   * @returns The ISO 639-1 code (e.g., "en") or the original string if not found
   */
  export function convertToISO(language: string | null | undefined): string | undefined {
    if (!language || typeof language !== "string") return undefined;
    const normalizedLang = language.toLowerCase().trim();
    return isValidLanguage(normalizedLang) ? languageToISO[normalizedLang] : undefined;
  }
  
  /**
   * Converts an array of language names to their ISO 639-1 two-letter codes
   * @param languages - Array of language names
   * @returns Array of ISO 639-1 codes
   */
  export function convertLanguagesToISO(languages: (string | null | undefined)[]): string[] {
    return languages
      .map(lang => convertToISO(lang))
      .filter((code): code is string => Boolean(code));
  }