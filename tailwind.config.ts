import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui({
      themes: ["lofi", "corporate", "cupcake", "light", "dark"],
    }),
  ],
};

export default config;

