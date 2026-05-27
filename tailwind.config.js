const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.md',
    './src/speedlify.js',
    './.eleventy.js',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      screens: {
        '2xs': '320px',
        xs: '460px',
        sm: '640px',
      },
      colors: {
        /*

    --bg: #1f1a16;
    --bg-raised: #27211d;

    --fg: #fdfacb;
    --fg-highlight: #fbcd5c;
    --fg-muted: #b78447;

    --primary: #fbcd5c;
    --primary-muted: #b78447;
        */

        // background
        bg: {
          DEFAULT: 'var(--bg)',
          raised: 'var(--bg-raised)',
        },
        // text
        fg: {
          DEFAULT: 'var(--fg)',
          highlight: 'var(--fg-highlight)',
          muted: 'var(--fg-muted)',
        },
        // primary color accent
        primary: {
          DEFAULT: 'var(--primary)',
          highlight: 'var(--primary-highlight)',
          muted: 'var(--primary-muted)',
        },
        // Colors for Speedlify performance scores
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
        sans: ['Luciole', ...defaultTheme.fontFamily.sans],
        serif: ['Rakkas', ...defaultTheme.fontFamily.serif],
        luciole: ['Luciole', ...defaultTheme.fontFamily.sans],
        rakkas: ['Rakkas', ...defaultTheme.fontFamily.serif],
        display: ['Rakkas', ...defaultTheme.fontFamily.serif],
        body: ['Luciole', ...defaultTheme.fontFamily.sans],
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
