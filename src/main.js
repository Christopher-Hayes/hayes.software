// This import is only needed for running in dev mode
import.meta.env.DEV && import('./styles/main.css')

window.loadAlpine = async () => {
  window.Alpine = (await import('alpinejs')).default
  const modulePromises = []

  // Collapse is only used in on mobile
  if (window.innerWidth < 768) {
    modulePromises.push(async () => {
      const collapse = (await import('@alpinejs/collapse')).default
      window.Alpine.plugin(collapse)
    })
  }

  // Load focus alpine plugin
  modulePromises.push(async () => {
    const focusTrap = (await import('@alpinejs/focus')).default
    window.Alpine.plugin(focusTrap)
  })

  // Load plugins before starting Alpine
  await Promise.all(modulePromises.map((modulePromise) => modulePromise()))

  // Start AlpineJS
  window.Alpine.start()

  // Adds capability to load HTML pages when hovering over a link
  window.htmlPreload = async function (url) {
    // Check if the URL is already loaded in session storage
    if (!sessionStorage.getItem(url)) {
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
      const html = await resp.text()

      // Load all images in the page as well
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      const images = doc.querySelectorAll('img')
      images.forEach((image) => {
        const src = image.getAttribute('src')
        if (src) {
          const img = new Image()
          img.src = src
        }
      })

      // Add to session storage
      sessionStorage.setItem(url, html)
    }
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  window.loadAlpine()

  // Using dynamic import with a default export
  const run = (await import('../src/main-on-dom.js')).run
  run()
})
