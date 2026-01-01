import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '380px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        teal: {
          deep: "#1a5c5c",
          dark: "#143c37",
          medium: "#225555",
        },
        gold: {
          DEFAULT: "#c9a227",
          rich: "#d4af37",
          light: "#e0cfa0",
        },
        cream: "#f8f5f0",
        ivory: "#faf8f3",
        charcoal: "#3a3a3a",
      },
      fontFamily: {
        sans: ["Heebo", "system-ui", "sans-serif"],
        serif: ["David Libre", "Times New Roman", "serif"],
      },
      boxShadow: {
        'elegant': '0 4px 24px rgba(26, 92, 92, 0.08), 0 1px 2px rgba(201, 162, 39, 0.1)',
        'gold-glow': '0 0 20px rgba(201, 162, 39, 0.3)',
        'teal-deep': '0 8px 32px rgba(20, 60, 55, 0.25)',
      },
      borderRadius: {
        'oval': '50% / 40%',
      },
    },
  },
  plugins: [],
};
export default config;
