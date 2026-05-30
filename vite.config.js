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
      contact: resolve(__dirname, '_site', 'contact', 'index.html'),
      blogArchives: resolve(__dirname, '_site', 'blog-archives', 'index.html'),
      // toolbox: resolve(__dirname, '_site', 'toolbox', 'index.html'),
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

export default defineConfig(({ command }) => ({
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
        description: 'The personal blog of Chris Hayes.',
        scope: '/',
        start_url: '/',
        display: 'standalone',
        theme_color: '#fbcd5c',
        background_color: '#fdfacb',
        icons: [
          {
            src: 'favicon-16x16.webp',
            sizes: '16x16',
            type: 'image/webp',
          },
          {
            src: 'favicon-32x32.webp',
            sizes: '32x32',
            type: 'image/webp',
          },
          {
            src: 'android-chrome-192x192.webp',
            sizes: '192x192',
            type: 'image/webp',
          },
          {
            src: 'favicon-512x512.webp',
            sizes: '512x512',
            type: 'image/webp',
          },
          {
            src: 'maskable_icon.webp',
            sizes: '1024x1024',
            type: 'image/webp',
            purpose: 'maskable',
          },
        ],
      },
    }),
    ...(command === 'build' ? [createHtmlPlugin({ minify: true })] : []),
  ],
}))
