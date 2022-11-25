const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.html', './src/**/*.md'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      /* v1 palette - black/blue bg, light brown fg
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
      },*/
      // Palette grabbed from coolors.co: https://coolors.co/palette/3d5a80-98c1d9-e0fbfc-ee6c4d-293241
      colors: {
        // Main background colors
        bg: {
          light: '#98c1d9',
          DEFAULT: '#3d5a80',
          // dark: '#',
        },
        // Main forground text content colors
        fg: {
          DEFAULT: '#e0fbfc',
          dark: '#98c1d9',
        },
        // Accents - ie for buttons / ctas
        // Ornage accent
        primary: {
          bg: '#ee6c4d',
          DEFAULT: '#ee6c4d',
          fg: 'white',
        },
        // Midnight blue accent
        secondary: {
          bg: '#293241',
          DEFAULT: '#293241',
          fg: '#e0fbfc',
        },
      },
      /*
      OLD:
   '--tw-prose-body': theme('colors.pink[800]'),
            '--tw-prose-headings': theme('colors.pink[900]'),
            '--tw-prose-lead': theme('colors.pink[700]'),
            '--tw-prose-links': theme('colors.pink[900]'),
            '--tw-prose-bold': theme('colors.pink[900]'),
            '--tw-prose-counters': theme('colors.pink[600]'),
            '--tw-prose-bullets': theme('colors.pink[400]'),
            '--tw-prose-hr': theme('colors.pink[300]'),
            '--tw-prose-quotes': theme('colors.pink[900]'),
            '--tw-prose-quote-borders': theme('colors.pink[300]'),
            '--tw-prose-captions': theme('colors.pink[700]'),
            '--tw-prose-code': theme('colors.pink[900]'),
            '--tw-prose-pre-code': theme('colors.pink[100]'),
            '--tw-prose-pre-bg': theme('colors.pink[900]'),
            '--tw-prose-th-borders': theme('colors.pink[300]'),
            '--tw-prose-td-borders': theme('colors.pink[200]'),
            '--tw-prose-invert-body': theme('colors.pink[200]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.pink[300]'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.pink[400]'),
            '--tw-prose-invert-bullets': theme('colors.pink[600]'),
            '--tw-prose-invert-hr': theme('colors.pink[700]'),
            '--tw-prose-invert-quotes': theme('colors.pink[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.pink[700]'),
            '--tw-prose-invert-captions': theme('colors.pink[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.pink[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.pink[600]'),
            '--tw-prose-invert-td-borders': theme('colors.pink[700]'),
      */
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.fg.DEFAULT'),
            '--tw-prose-headings': theme('colors.fg.DEFAULT'),
            '--tw-prose-lead': theme('colors.fg.DEFAULT'),
            '--tw-prose-links': theme('white'),
            '--tw-prose-bold': theme('white'),
            '--tw-prose-counters': theme('colors.secondary.DEFAULT'),
            '--tw-prose-bullets': theme('colors.secondary.DEFAULT'),
            '--tw-prose-hr': theme('colors.secondary.DEFAULT'),
            '--tw-prose-quotes': theme('colors.fg.DEFAULT'),
            '--tw-prose-quote-borders': theme('colors.fg.DEFAULT'),
            '--tw-prose-captions': theme('colors.fg.DEFAULT'),
            '--tw-prose-code': theme('colors.fg.DEFAULT'),
            '--tw-prose-pre-code': theme('colors.fg.DEFAULT'),
            '--tw-prose-pre-bg': theme('colors.fg.DEFAULT'),
            '--tw-prose-th-borders': theme('colors.fg.DEFAULT'),
            '--tw-prose-td-borders': theme('colors.fg.DEFAULT'),
            '--tw-prose-invert-body': theme('colors.fg.DEFAULT'),
            '--tw-prose-invert-headings': theme('colors.fg.DEFAULT'),
            '--tw-prose-invert-lead': theme('colors.fg.DEFAULT'),
            '--tw-prose-invert-links': theme('white'),
            '--tw-prose-invert-bold': theme('white'),
            '--tw-prose-invert-counters': theme('colors.secondary.DEFAULT'),
            '--tw-prose-invert-bullets': theme('colors.secondary.DEFAULT'),
            '--tw-prose-invert-hr': theme('colors.secondary.DEFAULT'),
            '--tw-prose-invert-quotes': theme('colors.fg.DEFAULT'),
            '--tw-prose-invert-quote-borders': theme('colors.fg.DEFAULT'),
            '--tw-prose-invert-captions': theme('colors.fg.DEFAULT'),
            '--tw-prose-invert-code': theme('colors.fg.DEFAULT'),
            '--tw-prose-invert-pre-code': theme('colors.fg.DEFAULT'),
            '--tw-prose-invert-pre-bg': theme('colors.fg.DEFAULT'),
            '--tw-prose-invert-th-borders': theme('colors.fg.DEFAULT'),
            '--tw-prose-invert-td-borders': theme('colors.fg.DEFAULT'),
          },
        },
      }),
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
