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
      "num-yellow": "#FFCD12",
      "num-blue": "#4443F6",
      "num-red": "#FF2323",
      "num-black": "#1C1919",
      "num-green": "#1DDA18",
    },
  },
  plugins: [],
} satisfies Config;
