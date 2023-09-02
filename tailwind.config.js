/** @type {import('tailwindcss').Config} */
// module.exports = {
  export default { 
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}