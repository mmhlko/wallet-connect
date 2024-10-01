import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors';
const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        background: "var(--background)",
        foreground: "var(--foreground)",
        'dark-main': '#212121',
        'light-translucent': 'rgba(255, 255, 255, 0.05)',
        'purple-base': '#7000FF',
        'purple-dark': '#131139',
        'yellow-base': '#FFE70C',
        'pink-light': '#B9B8DD',
        'red-toxic': '#FF195E',
        'orange-base': '#d85901',
        'orange-hover': '#e65414',
      },
    },
  },
  plugins: [],
};
export default config;