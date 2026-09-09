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

// Eleventy renders these straight into _site/ root, but Vite only copies
// files it finds through its HTML entry graph or its public dir (_site/public
// here, since root is _site - see the passthrough-copied favicons/robots.txt
// for that path). A plain <link rel="alternate" href="/feed.xml"> doesn't
// make Vite treat feed.xml as an asset to copy, so these two would
// otherwise get silently dropped from the production build.
function vitePluginForRootXmlFiles() {
  const files = ['sitemap.xml', 'feed.xml']

  return {
    name: 'vite-plugin-root-xml-files',
    closeBundle() {
      for (const file of files) {
        const src = resolve(__dirname, '_site', file)
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, resolve(__dirname, 'dist', file))
        }
      }
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
    vitePluginForRootXmlFiles(),
    VitePWA({
      registerType: 'autoUpdate',
      // We manually register the service worker on delay in main-on-ready.js
      injectRegister: false,
      // Enable service worker for offline caching and faster repeat visits
      workbox: {
        // Precache only the app shell (js/css/fonts/small icons) for
        // instant loading - html purposefully omitted - caching issues.
        // Images and video used to be globbed in here too, which meant
        // every visitor downloaded the whole site's media in the
        // background on their first visit (blog/project images included,
        // despite those being kept out of the rest of the site on purpose).
        // Actual images are handled by the runtimeCaching rule below
        // instead: cached the first time a visitor actually views one.
        globPatterns: [
          '**/*.{js,css,ico,svg,webp,mp3,ttf,woff,woff2}',
        ],
        // The favicon/app-icon .webp files live at the root (not under
        // images/ or assets/), so this only excludes the blog/project
        // photos and the homepage's decorative illustration SVGs - the
        // actual PWA icons still get precached via the extension match
        // above. Some blog images (e.g. the gif-cursor post) get hashed
        // into assets/ by Vite's own asset pipeline rather than staying
        // under images/, so that's excluded by name too.
        globIgnores: ['**/images/**', '**/videos/**', 'assets/*.webp'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'video',
            handler: 'CacheFirst',
            options: {
              cacheName: 'videos',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
        // Without this, an activated SW only takes over on the next
        // uncontrolled navigation (e.g. a hard refresh) - already-open tabs
        // keep being served by the old worker on a normal reload.
        clientsClaim: true,
      },
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        // Relative so it resolves against whatever origin actually serves
        // the manifest - avoids an apex-vs-www origin mismatch (the site is
        // served from www.hayes.software; hayes.software just redirects).
        id: '/',
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
            // Was 'favicon-512x512.webp', which doesn't exist - this is the
            // real 512x512 icon file, matching the pattern above.
            src: 'android-chrome-512x512.webp',
            sizes: '512x512',
            type: 'image/webp',
          },
          // A maskable icon needs real safe-zone padding (the logo currently
          // touches all four edges of its canvas), which is a design call,
          // not a mechanical fix - so this entry is dropped rather than
          // pointed at a file that doesn't exist. Add one back with
          // purpose: 'maskable' if a padded variant gets designed.
        ],
      },
    }),
    ...(command === 'build' ? [createHtmlPlugin({ minify: true })] : []),
  ],
}))
