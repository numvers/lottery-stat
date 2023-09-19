import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: { max: "420px" },
      md: { min: "421px", max: "1023px" },
    },
    fontFamily: {
      Pretendard: ["Pretendard"],
    },
    fontSize: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "20px",
      xl: "24px",
      xxl: "32px",
      xxxl: "40px",
    },
    colors: {
      white: "#ffffff",
      black: "#000000",
      point: "#4B2EFD",
      yellow: "#FFCD12",
      blue: "#4443F6",
      red: "#FF2323",
      lightblack: "#1C1919",
      green: "#1DDA18",
      gray_1: "#F3F3F9",
      gray_2: "#D7D7D7",
      gray_3: "#636262",
      gray_4: "#242429",
    },
  },
  plugins: [],
} satisfies Config;
