import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
const fs = require('fs')
const { resolve } = require('path')
import { createHtmlPlugin } from 'vite-plugin-html'

const getPosts = () => {
  if (fs.existsSync('_site')) {
    const pages = {
      404: resolve(__dirname, '_site', '404.html'),
      main: resolve(__dirname, '_site', 'index.html'),
      toolbox: resolve(__dirname, '_site', 'toolbox', 'index.html'),
      // For some reason blog index.html not being generated further down
      blog: resolve(__dirname, '_site', 'blog', 'index.html'),
    }
    // Blog posts
    const posts = fs
      .readdirSync(resolve(__dirname, '_site', 'blog'))
      .map((post) => {
        return {
          [post.replace('.html', '')]:
            post === 'index.html'
              ? resolve(__dirname, '_site', 'blog', 'index.html')
              : resolve(__dirname, '_site', 'blog', post, 'index.html'),
        }
      })
    // Projects
    const projects = fs
      .readdirSync(resolve(__dirname, '_site', 'projects'))
      .map((post) => {
        return {
          [post.replace('.html', '')]:
            post === 'index.html'
              ? resolve(__dirname, '_site', 'projects', 'index.html')
              : resolve(__dirname, '_site', 'projects', post, 'index.html'),
        }
      })
    return {
      ...pages,
      ...Object.assign({}, ...posts),
      ...Object.assign({}, ...projects),
    }
  } else {
    return {}
  }
}

const posts = getPosts()

export default defineConfig({
  root: '_site',
  build: {
    outDir: '../dist',
    minify: 'esbuild',
    rollupOptions: {
      input: posts,
    },
    emptyOutDir: true,
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      // Enable service worker for offline caching and faster repeat visits
      workbox: {
        // Precache important assets for instant loading
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,webp,svg}'],
      },
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'hayes.software',
        short_name: 'hayes.software',
        description: 'hayes.software - A dev blog by Chris Hayes',
        scope: '/',
        start_url: '/',
        display: 'standalone',
        theme_color: '#340099',
        background_color: '#fff',
        icons: [
          {
            src: 'pwa-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'pwa-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'pwa-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'pwa-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'pwa-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable_icon.png',
            sizes: '1024x1024',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
    createHtmlPlugin({
      minify: true, // Enables HTML minification
    }),
  ],
})
