import {heroui} from '@heroui/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background_light: "#eef5fc",
        foreground_light: "#e9edf8",
        background_dark: "#030a11",
        foreground_dark: "#080c18",
        primary: "#8963ba",
        secondary: "#9f80c6",
      },
    },
  },
  darkMode: "class",
 plugins: [heroui()],
} satisfies Config;
