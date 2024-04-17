// This import is only needed for running in dev mode
import.meta.env.DEV && import('./styles/main.css')

// On DOM content loaded - not used atm
// window.addEventListener('DOMContentLoaded', async () => {
//   // Using dynamic import with a default export
//   const run = (await import('../src/main-on-dom.js')).run
//   run()
// })

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
