module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#0094B6',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
      },
      zIndex: {
        '-10': '-10',
        '1': '1',
      }
    },
    maxWidth: {
      '28': '7rem',
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
