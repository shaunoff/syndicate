// tailwind.config.js
const themeWrapper = require("@shaunoff-ui/components/config")

module.exports = themeWrapper({
  // mode: "jit",
  purge: {
    content: ["./app/**/*.{js,ts,jsx,tsx}"],
    mode: "all",
    //preserveHtmlElements: false,
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
})
