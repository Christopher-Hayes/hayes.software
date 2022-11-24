const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.html', './src/**/*.md'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        bg: {
          light: '#eae0d5',
          DEFAULT: '#22333b',
          dark: '#0a0908',
        },
        fg: {
          DEFAULT: '#c6ac8f',
          dark: '#5e503f',
        },
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
