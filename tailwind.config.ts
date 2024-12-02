import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(180deg, #DDDEF3 0%, #ECE7ED 100%)",
      },
      fontFamily: {
        leeSeoyun: ["LeeSeoyun", "sans-serif"],
        pretendard: ["Pretendard-Regular", "sans-serif"],
      },
      animation: {
        "falling-snow": "falling 10s linear infinite",
      },
      keyframes: {
        falling: {
          "0%": {
            transform: "translateY(-100px) rotate(0deg)",
          },
          "100%": {
            transform: "translateY(100vh) rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
