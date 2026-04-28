import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy:       "#17243f",
        "navy-2":   "#1f3152",
        ink:        "#0c1529",
        gold:       "#c79a3a",
        "gold-2":   "#e3c07a",
        cream:      "#f6f2ea",
        paper:      "#fbf8f3",
        charcoal:   "#2a2e37",
        muted:      "#5d6372",
        green:      "#1f6b4a",
        "green-bg": "#e6f0ea",
        "off-white": "#fbf8f3",
        "cta-green": "#1f6b4a",
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
export default config;
