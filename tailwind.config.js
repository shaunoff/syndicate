// tailwind.config.js
//const themeWrapper = require("@shaunoff-ui/components/config")

module.exports = {
  //mode: "jit",
  purge: ["{pages,app}/**/*.{js,ts,jsx,tsx}", "node_modules/@shaunoff-ui/components/dist/index.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
