const defaultTheme = require('tailwindcss/defaultTheme')

const proseColors = {
  color: 'var(--fg)',
  strong: {
    color: 'inherit',
  },
  code: {
    color: 'var(--fg-highlight)',
  },
}

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
      typography: {
        DEFAULT: {
          css: {
            ...proseColors,
          },
        },
        lg: {
          css: {
            ...proseColors,
          },
        },
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}
