// This import is only needed for running in dev mode
import.meta.env.DEV && import('./styles/main.css')

const loadAlpine = async () => {
  window.Alpine = (await import('alpinejs')).default

  // Collapse is only used in on mobile
  if (window.innerWidth < 768) {
    const collapse = (await import('@alpinejs/collapse')).default
    window.Alpine.plugin(collapse)
  }

  window.Alpine.start()

  // Adds capability to load HTML pages when hovering over a link
  window.htmlPreload = function (url) {
    fetch(url, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  loadAlpine()

  // Check that service workers are supported
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    try {
      navigator.serviceWorker.register('/sw.js')
    } catch (error) {
      console.error('Service worker registration failed: ', error)
    }
  }

  // Add a navigation listener to the document
  // If the user clicks on an internal link, then load the page via XHR
  // and then update the page content in #main-content
  document.addEventListener('click', async (event) => {
    const target = event.target

    // Determine if the user clicked on a link
    let clickedLink = false
    let link = target
    if (target.tagName === 'A') {
      clickedLink = true
    } else if (target.parentElement.tagName === 'A') {
      clickedLink = true
      link = target.parentElement
    } else if (target.parentElement.parentElement.tagName === 'A') {
      clickedLink = true
      link = target.parentElement.parentElement
    }

    // If the user clicked on a link
    if (clickedLink) {
      // If the user clicked on an internal link
      if (link.host === window.location.host) {
        // If the user clicked on a link that isn't a hash link
        if (!link.hash) {
          // Prevent the browser from navigating to the link
          event.preventDefault()

          // Get the HTML from the link
          const response = await fetch(link.href, {
            method: 'GET',
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
            },
          })

          // Get the HTML from the response
          const html = await response.text()

          // Create a new document from the HTML
          const newDocument = new DOMParser().parseFromString(html, 'text/html')

          // Get the new page title
          const newTitle = newDocument.querySelector('title').innerText

          // Get the new page content
          const newContent =
            newDocument.querySelector('#main-content').innerHTML

          // Update the page title
          document.querySelector('title').innerText = newTitle

          // Update the page content
          document.querySelector('#main-content').innerHTML = newContent

          // Update the URL in the browser
          window.history.pushState({}, newTitle, link.href)

          // Scroll to the top of the page
          window.scrollTo(0, 0)

          // Load Alpine
          loadAlpine()
        }
      }
    }
  })

  // Add a popstate listener to the window
  // If the user clicks the back button, then load the page via XHR
  // and then update the page content in #main-content
  window.addEventListener('popstate', async () => {
    // Get the HTML from the link
    const response = await fetch(window.location.href, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })

    // Get the HTML from the response
    const html = await response.text()

    // Create a new document from the HTML
    const newDocument = new DOMParser().parseFromString(html, 'text/html')

    // Get the new page title
    const newTitle = newDocument.querySelector('title').innerText

    // Get the new page content
    const newContent = newDocument.querySelector('#main-content').innerHTML

    // Update the page title
    document.querySelector('title').innerText = newTitle

    // Update the page content
    document.querySelector('#main-content').innerHTML = newContent

    // Scroll to the top of the page
    window.scrollTo(0, 0)

    // Load Alpine
    loadAlpine()
  })
})
