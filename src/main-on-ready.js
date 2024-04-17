window.mainContentWrapper = document.querySelector('#main-content-wrapper')

const setupPage = () => {
  // Load Alpine
  window.loadAlpine()
}

const showPage = async (link, { event, reverse, forget }) => {
  // If the user clicked on an internal link
  if (link.host === window.location.host) {
    // If the user clicked on a link that isn't a hash link
    if (!link.hash) {
      if (event) {
        // Prevent the browser from navigating to the link
        event.preventDefault()
      }

      const downloadNewPage = async () => {
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
        const newContent = newDocument.querySelector('#main-content').innerHTML

        return { newDocument, newContent }
      }

      const swapContent = async (newContent, newDocument) => {
        // Update the page content
        const contentElem = document.querySelector('#main-content')
        const newContentElem = document.createElement('div')
        newContentElem.innerHTML = newContent
        newContentElem.id = 'main-content'
        window.Alpine.mutateDom(() => contentElem.replaceWith(newContentElem))

        // Get the new page title
        const newTitle = newDocument.querySelector('title').innerText

        // Update the page title
        document.querySelector('title').innerText = newTitle

        if (!forget) {
          // Update the URL in the browser
          window.history.pushState(
            {
              now: new Date().toISOString(),
              title: newTitle,
              url: link.href,
            },
            newTitle,
            link.href,
          )

          // Scroll to the top of the page
          window.scrollTo(0, 0)
        } else {
          // Back button was clicked
          // Recall the scroll position from the history state
          if (event.state) {
            window.scrollTo(0, event.state?.scrollPosition ?? 0)
          }
        }

        setupPage()
      }

      // View Transition API not supported
      if (!document.startViewTransition) {
        console.warn('View Transition API not supported')
        const { newDocument, newContent } = await downloadNewPage()
        swapContent(newContent, newDocument)
      } else {
        // set the direction of the transition
        const isTopLevelPage = ['/', '/blog/', '/projects/'].includes(
          link.pathname,
        )
        document.documentElement.style.setProperty(
          '--transition-direction',
          isTopLevelPage || reverse ? -1 : 1,
        )

        const downloadPromise = downloadNewPage()

        /* Manually assign view transition to the body content
         * This is needed due to a chrome bug with backdrop blur
         * not applying correctly when view transition is present.
         * For that reason, it gets removed immediately after the transition.
         */
        if (window.mainContentWrapper) {
          window.mainContentWrapper.style.viewTransitionName =
            'main-content-wrapper'
        }

        // View Transition API
        const transitionPromise = document.startViewTransition()

        // Wait for all promises to resolve using Promise.all
        try {
          const [{ newDocument, newContent }] = await Promise.all([
            downloadPromise,
            transitionPromise,
          ])
          await swapContent(newContent, newDocument)
        } catch (error) {
          console.error('Error transitioning views', error)
        } finally {
          setTimeout(() => {
            if (window.mainContentWrapper) {
              window.mainContentWrapper.style.viewTransitionName = ''
            }
          }, 500)
        }
      }
    }
  }
}

const run = async () => {
  // Load AlpineJS
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
      showPage(link, { event })
    }
  })

  // Load page if the user navigates back or forward
  window.addEventListener('popstate', async (event) => {
    showPage(new URL(window.location), { reverse: true, forget: true, event })
  })

  window.onscroll = function () {
    const scrollPosition =
      window?.pageYOffset ?? document.documentElement?.scrollTop ?? 0
    history.replaceState({ scrollPosition: scrollPosition }, '')
  }
}

export { run }
