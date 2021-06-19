// tailwind.config.js
const themeWrapper = require("@shaunoff-ui/components/config")

module.exports = themeWrapper({
  mode: "jit",
  purge: ["{pages,app}/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
})

// module.exports = {
//   mode: "jit",
//   purge: [
//     "{pages,app}/**/*.{js,jsx,ts,tsx}",
//     "./node_modules/@shaunoff-ui/components/dist/index.js",
//   ],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// }
