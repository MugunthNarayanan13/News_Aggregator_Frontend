// Utility function to convert language names to ISO 639-1 two-letter codes
// This is needed for News API which requires ISO language codes

export const languageToISO: Record<string, string> = {
    // Widely spoken world languages
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

  
  /**
   * Converts a language name to its ISO 639-1 two-letter code
   * @param language - The full language name (e.g., "english")
   * @returns The ISO 639-1 code (e.g., "en") or the original string if not found
   */
  export function convertToISO(language: string): string {
    const normalizedLang = language.toLowerCase().trim();
    return languageToISO[normalizedLang] || normalizedLang;
  }
  
  /**
   * Converts an array of language names to their ISO 639-1 two-letter codes
   * @param languages - Array of language names
   * @returns Array of ISO 639-1 codes
   */
  export function convertLanguagesToISO(languages: string[]): string[] {
    return languages.map(lang => convertToISO(lang));
  }