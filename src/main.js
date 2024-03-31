// This import is only needed for running in dev mode
import.meta.env.DEV && import('./styles/main.css')

window.addEventListener('DOMContentLoaded', async () => {
  // Using dynamic import with a default export
  const run = (await import('../src/main-on-dom.js')).run
  run()
})
