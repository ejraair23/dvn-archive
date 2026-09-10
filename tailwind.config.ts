import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#161320",
        paper: "#F6F1E9",
        plum: "#2C2438",
        plum2: "#3A3050",
        amber: "#E8A33D",
        amber2: "#F4C15C",
        moss: "#5C8A6B",
        blush: "#D98E8E",
        mist: "#9C93B5",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        soft: "0 12px 30px -12px rgba(22, 19, 32, 0.35)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-4px)" },
          "75%": { transform: "translateX(4px)" },
        },
        unlock: {
          "0%": { transform: "scale(0.92) rotate(-2deg)", opacity: "0" },
          "60%": { transform: "scale(1.03) rotate(1deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
      },
      animation: {
        rise: "rise 0.5s ease-out both",
        drift: "drift 4s ease-in-out infinite",
        shake: "shake 0.4s ease-in-out",
        unlock: "unlock 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
