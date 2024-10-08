import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
const fs = require('fs')
const { resolve } = require('path')
import { createHtmlPlugin } from 'vite-plugin-html'
import sass from 'sass'

// A vite plugin for utterances' scss theme
function vitePluginForUtterances() {
  return {
    name: 'vite-plugin-sass',
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.scss')) {
        server.ws.send({
          type: 'full-reload',
        })
      }
    },
    transform(src, id) {
      if (id.endsWith('.scss')) {
        const result = sass.renderSync({
          file: resolve(
            __dirname,
            'src/styles/utterances/stylesheets/themes/icy-dark',
            'index.scss',
          ),
          includePaths: [resolve(__dirname, 'node_modules')],
          outFile: resolve(
            __dirname,
            'src',
            'public',
            'stylesheets',
            'themes',
            'icy-dark',
            'utterances.css',
          ),
        })
        return {
          code: result.css.toString(),
          map: result.map?.toString(),
        }
      }
    },
    buildEnd() {
      sass.renderSync({
        file: resolve(
          __dirname,
          'src/styles/utterances/stylesheets/themes/icy-dark',
          'index.scss',
        ),
        includePaths: [resolve(__dirname, 'node_modules')],
        outFile: resolve(
          __dirname,
          'src',
          'public',
          'stylesheets',
          'themes',
          'icy-dark',
          'utterances.css',
        ),
      })
    },
  }
}

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
    vitePluginForUtterances(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      // Enable service worker for offline caching and faster repeat visits
      workbox: {
        // Precache important assets for instant loading
        // html purposefully omitted - caching issues
        globPatterns: [
          '**/*.{js,css,ico,png,jpg,jpeg,webp,webm,svg,mp3,ttf,woff,woff2}',
        ],
        maximumFileSizeToCacheInBytes: 25097152,
      },
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        id: 'https://hayes.software/',
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
