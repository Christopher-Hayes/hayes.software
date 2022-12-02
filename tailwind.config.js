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
      /* Palette grabbed from coolors.co: https://coolors.co/palette/3d5a80-98c1d9-e0fbfc-ee6c4d-293241
      colors: {
        // Main background colors
        bg: {
          light: '#98c1d9',
          DEFAULT: '#3d5a80',
          dark: '#293241',
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
          dark: '#bf2303',
          fg: 'white',
        },
        // Midnight blue accent
        secondary: {
          bg: '#293241',
          DEFAULT: '#293241',
          fg: '#e0fbfc',
        },
      },
      */
      // Palette v3

      colors: {
        // Mignight blues - background
        bg: {
          light: '#271d58',
          DEFAULT: '#100c24',
          dark: '#080612',
        },
        // Icey blues - text
        fg: {
          light: '#e7f8ff',
          DEFAULT: '#81dbff',
          dark: '#17b0ed',
        },
        // Purples - also for buttons, ctas
        primary: {
          fg: 'white',
          light: '#af86ff',
          bg: '#340099',
          DEFAULT: '#340099',
          dark: '#1d0240',
        },
        // More saturated blues - buttons, nav, ctas
        secondary: {
          bg: '#111240',
          DEFAULT: '#181a38',
          fg: '#95e1ff',
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.bg.dark'),
            '--tw-prose-headings': theme('colors.primary.DEFAULT'),
            '--tw-prose-lead': theme('colors.bg.dark'),
            '--tw-prose-links': theme('colors.primary.dark'),
            '--tw-prose-bold': theme('black'),
            '--tw-prose-counters': theme('colors.secondary.DEFAULT'),
            '--tw-prose-bullets': theme('colors.secondary.DEFAULT'),
            '--tw-prose-hr': theme('colors.secondary.dark'),
            '--tw-prose-quotes': theme('colors.bg.dark'),
            '--tw-prose-quote-borders': theme('colors.bg.dark'),
            '--tw-prose-captions': theme('colors.bg.dark'),
            '--tw-prose-code': theme('colors.primary.DEFAULT'),
            '--tw-prose-pre-code': theme('colors.fg.light'),
            '--tw-prose-pre-bg': theme('colors.bg.light'),
            '--tw-prose-th-borders': theme('colors.bg.dark'),
            '--tw-prose-td-borders': theme('colors.bg.dark'),
            '--tw-prose-invert-body': theme('colors.fg.light'),
            '--tw-prose-invert-headings': theme('colors.fg.DEFAULT'),
            '--tw-prose-invert-lead': theme('colors.fg.light'),
            '--tw-prose-invert-links': theme('white'),
            '--tw-prose-invert-bold': theme('white'),
            '--tw-prose-invert-counters': theme('colors.fg.dark'),
            '--tw-prose-invert-bullets': theme('colors.fg.dark'),
            '--tw-prose-invert-hr': theme('colors.secondary.DEFAULT'),
            '--tw-prose-invert-quotes': theme('colors.fg.dark'),
            '--tw-prose-invert-quote-borders': theme('colors.fg.DEFAULT'),
            '--tw-prose-invert-captions': theme('colors.fg.DEFAULT'),
            '--tw-prose-invert-code': theme('colors.primary.light'),
            '--tw-prose-invert-pre-code': theme('colors.primary.light'),
            '--tw-prose-invert-pre-bg': theme('colors.secondary.DEFAULT'),
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
