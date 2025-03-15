// language-utils.ts

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

/**
 * Check if a string is a valid language
 */
export function isValidLanguage(language: string | null | undefined): boolean {
  if (!language || typeof language !== "string") return false;
  const normalizedLang = language.toLowerCase().trim();
  return normalizedLang in languageToISO;
}

/**
 * Converts a language name to its ISO 639-1 code
 * Returns undefined if language is invalid or null
 */
export function convertToISO(language: string | null | undefined): string | undefined {
  if (!language || typeof language !== "string") return undefined;
  const normalizedLang = language.toLowerCase().trim();
  return isValidLanguage(normalizedLang) ? languageToISO[normalizedLang] : undefined;
}

/**
 * Converts an array of language names to ISO codes
 * Skips invalid/null values
 */
export function convertLanguagesToISO(languages: (string | null | undefined)[]): string[] {
  return languages
    .map(lang => convertToISO(lang))
    .filter((code): code is string => Boolean(code));
}
