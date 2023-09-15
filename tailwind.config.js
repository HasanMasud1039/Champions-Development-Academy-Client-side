/** @type {import('tailwindcss').Config} */
// module.exports = {
  export default { 
  content: ["./index.html",
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}