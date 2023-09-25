import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
    screens: {
      sm: { max: "26.25rem" }, // 420px
      md: { min: "26.3125rem" }, // 421px
    },
    fontFamily: {
      Pretendard: ["Pretendard"],
    },
    fontSize: {
      xxs: "0.625rem",
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      md: "1.125rem",
      lg: "1.25rem",
      xl: "1.5rem",
      xxl: "1.625rem",
      xxxl: "2rem",
      xxxxl: "2.5rem",
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    colors: {
      white: "#ffffff",
      black: "#000000",
      point: "#4B2EFD",
      yellow: "#FFCD12",
      blue: "#4443F6",
      red: "#FF2323",
      light_black: "#1C1919",
      green: "#62EB5E",
      purple: "#6D2BFE",
      gray_1: "#F3F3F9",
      gray_2: "#D7D7D7",
      gray_3: "#636262",
      gray_4: "#242429",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
} satisfies Config;
