import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'custom-sun': "url('https://img.freepik.com/premium-vector/sky-clouds-design-with-flat-cartoon-poster-flyers-postcards-web-banners_771576-58.jpg?semt=ais_hybrid')", 
      },
    },
  },
  plugins: [],
} satisfies Config;