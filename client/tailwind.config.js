/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
 
export default withMT({
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'laptop': '1024px',
      'desktop': '1440px'
    }
  },
  plugins: [],
});