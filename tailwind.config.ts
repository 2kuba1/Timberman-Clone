import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        menu: {
          yellow: "#FBB201",
          gold: "#DBAF38",
          copper: "#b87333",
          silver: "#B8B7B1",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
