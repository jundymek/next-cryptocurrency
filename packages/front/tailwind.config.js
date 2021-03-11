module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        caveat: ['caveat', 'sans-serif'],
        raleway: ['raleway', 'sans-serif'],
      },
    },
  },
  variants: {
    transform: ['responsive', 'group-hover'],
    transformOrigin: ['responsive', 'group-hover'],
    transitionDelay: ['responsive', 'group-hover'],
    transitionDuration: ['responsive', 'group-hover'],
    transitionProperty: ['responsive', 'group-hover'],
    transitionTimingFunction: ['responsive', 'group-hover'],
    translate: ['responsive', 'hover', 'focus', 'group-hover'],
    scale: ['responsive', 'hover', 'focus', 'group-hover'],
    opacity: ['group-hover'],
    backgroundColor: ['group-focus', 'hover'],
    extend: {},
  },
  plugins: [],
};
