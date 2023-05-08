/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/flowbite-react/**/*.js"],
  theme: {
    fontFamily: {
      'sans': ["Montserrat", "sans-serif"]
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
}

