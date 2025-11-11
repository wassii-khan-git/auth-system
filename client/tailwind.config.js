import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default {
  /** @type {import('tailwindcss').Config} */
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
};
