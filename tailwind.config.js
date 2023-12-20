/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
    },
    colors: {
      primary: "#A312C8",
      secondary: "#F4E7F8",
      tertiary: "#CCB4D2",
      black: "#131313",
      grey: "#A9A0AB",
      white: "#FFFFFF"
    },
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
    }
  },
  plugins: [],
};

