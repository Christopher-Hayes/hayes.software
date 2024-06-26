const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.html', './src/**/*.md', './src/speedlify.js'],
  theme: {
    extend: {
      screens: {
        '2xs': '320px',
        xs: '460px',
        sm: '640px',
      },
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
          lightest: '#d4d5f3',
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
        fire: '#ea5a47',
        // error, warning, success
        alert: {
          error: '#ff0033',
          warning: '#ffcc00',
          success: '#00cc00',
        },
        speedlify: {
          light: {
            good: 'rgb(2, 100, 49)',
            ok: '#ffa400',
            bad: '#ff4e42',
          },
          dark: {
            good: 'rgb(68, 225, 144)',
            ok: '#ffa400',
            bad: 'rgb(255, 134, 134)',
          },
        },
      },
      fontFamily: {
        sans: ['Helvetica', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '2xs': '.625rem',
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
}
