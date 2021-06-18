// tailwind.config.js
const themeWrapper = require("@shaunoff-ui/components/config")

module.exports = themeWrapper({
  //mode: "jit",
  purge: [
    "{pages,app,node_modules}/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shaunoff-ui/components/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
})
