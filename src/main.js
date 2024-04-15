// Static import
import 'speedlify-score'

// This import is only needed for running in dev mode
if (import.meta.env.DEV) {
  import('./styles/main.css')
}

// On DOM content loaded - not used atm
// window.addEventListener('DOMContentLoaded', async () => {
//   // Using dynamic import with a default export
//   const run = (await import('../src/main-on-dom.js')).run
//   run()
// })

// On ready
window.addEventListener('load', async () => {
  // Dynamic import after page load
  const run = (await import('../src/main-on-ready.js')).run
  run()
})
