import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Press Start 2P", "cursive"],
    },
    extend: {
      fontFamily: {
        "press-start": ['"Press Start 2P"', "cursive"],
      },
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
  plugins: [require('flowbite/plugin')],
} satisfies Config;
