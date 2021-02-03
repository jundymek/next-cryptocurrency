module.exports = {
  purge: [],
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    transform: ['responsive', 'group-hover'],
    transformOrigin: ['responsive', 'group-hover'],
    transitionDelay: ['responsive', 'group-hover'],
    transitionDuration: ['responsive', 'group-hover'],
    transitionProperty: ['responsive', 'group-hover'],
    transitionTimingFunction: ['responsive', 'group-hover'],
    translate: ['responsive', 'hover', 'focus', 'group-hover'],
    extend: {},
  },
  plugins: [],
};
