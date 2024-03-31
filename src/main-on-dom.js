const run = async () => {
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

  window.loadAlpine()

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
    if (target?.tagName === 'A') {
      clickedLink = true
    } else if (target?.parentElement?.tagName === 'A') {
      clickedLink = true
      link = target.parentElement
    } else if (target?.parentElement?.parentElement?.tagName === 'A') {
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

          let html = ''

          // Check if the link is already loaded in session storage
          if (sessionStorage.getItem(link.href)) {
            html = sessionStorage.getItem(link.href)
          } else {
            // Get the HTML from the link
            const response = await fetch(link.href, {
              method: 'GET',
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
              },
            })

            // Get the HTML from the response
            html = await response.text()
          }

          // Create a new document from the HTML
          const newDocument = new DOMParser().parseFromString(html, 'text/html')

          // Get the new page content
          const newContent =
            newDocument.querySelector('#main-content').innerHTML

          // Update the page content
          const contentElem = document.querySelector('#main-content')
          const newContentElem = document.createElement('div')
          newContentElem.innerHTML = newContent
          newContentElem.id = 'main-content'
          window.Alpine.mutateDom(() => contentElem.replaceWith(newContentElem))

          // Scroll to the top of the page
          window.scrollTo(0, 0)

          // Get the new page title
          const newTitle = newDocument.querySelector('title').innerText

          // Update the page title
          document.querySelector('title').innerText = newTitle

          // Update the URL in the browser
          window.history.pushState({}, newTitle, link.href)

          // Load Alpine
          window.loadAlpine()
        }
      }
    }
  })

  // Add a popstate listener to the window
  // If the user clicks the back button, then load the page via XHR
  // and then update the page content in #main-content
  window.addEventListener('popstate', async () => {
    let html = ''

    // Check if the link is already loaded in session storage
    if (sessionStorage.getItem(window.location.href)) {
      html = sessionStorage.getItem(window.location.href)
    } else {
      // Get the HTML from the link
      const response = await fetch(window.location.href, {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      })

      // Get the HTML from the response
      html = await response.text()
    }

    // Create a new document from the HTML
    const newDocument = new DOMParser().parseFromString(html, 'text/html')

    // Get the new page content
    const newContent = newDocument.querySelector('#main-content').innerHTML

    // Update the page content
    const contentElem = document.querySelector('#main-content')
    const newContentElem = document.createElement('div')
    newContentElem.innerHTML = newContent
    newContentElem.id = 'main-content'
    window.Alpine.mutateDom(() => contentElem.replaceWith(newContentElem))

    // Scroll to the top of the page
    window.scrollTo(0, 0)

    // Get the new page title
    const newTitle = newDocument.querySelector('title').innerText

    // Update the page title
    document.querySelector('title').innerText = newTitle

    // Load Alpine
    window.loadAlpine()
  })

  // Defer - Vercel Analytics
  const inject = (await import('@vercel/analytics')).inject
  inject()

  // Defer - Vercel Speed Insights
  const injectSpeedInsights = (await import('@vercel/speed-insights'))
    .injectSpeedInsights
  injectSpeedInsights()
}

export { run }
