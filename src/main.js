// This import is only needed for running in dev mode
import.meta.env.DEV && import('./styles/main.css')

// On DOM content loaded - not used atm
// window.addEventListener('DOMContentLoaded', async () => {
//   // Using dynamic import with a default export
//   const run = (await import('../src/main-on-dom.js')).run
//   run()
// })

// Service Worker
async function createSW() {
  // Check that service workers are supported
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        immediate: true,
      })

      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      }

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
      })
    } catch (error) {
      console.error('Service worker registration failed: ', error)
    }
  }
}

createSW()

const runDeferredScripts = async () => {
  // Dynamic import after page load
  const run = (await import('../src/main-on-ready.js')).run
  run()
}

// On idle
window.addEventListener('load', () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(runDeferredScripts)
  } else {
    // Fallback for Safari 15.6
    setTimeout(runDeferredScripts, 1)
  }
})
