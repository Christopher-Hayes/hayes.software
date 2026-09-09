window.mainContentWrapper = document.querySelector('#main-content-wrapper')
window.pageListeners = []

// Sync the nav's aria-current to whatever page is showing. Eleventy sets
// this correctly on the initial server-rendered load; this covers the SPA
// navigation case, where <header-container> - and its nav - is never
// swapped out, so nothing else touches it after that first render.
const updateActiveNavLink = () => {
  document.querySelectorAll('header-container nav a[href]').forEach((link) => {
    if (new URL(link.href).pathname === window.location.pathname) {
      link.setAttribute('aria-current', 'page')
    } else {
      link.removeAttribute('aria-current')
    }
  })
}

const setupPage = () => {
  document.body.dataset.page = window.location.pathname

  // Load Alpine
  window.loadAlpine()

  updateActiveNavLink()

  // remove all old scroll listeners
  window.pageListeners.forEach((listener) => {
    window.removeEventListener('scroll', listener)
  })
  window.pageListeners = []

  // Animate post header on scroll
  if (document.querySelector('.post-header')) {
    // Mobile
    if (window.innerWidth < 768) {
      const collapsePostHeader = () => {
        const postHeader = document.querySelector('.post-header')
        const tagsElem = postHeader.querySelector('.post-tags')
        const postEmo = postHeader.querySelector('.post-emo')

        // Only on project posts
        if (tagsElem) {
          tagsElem.style.maxHeight = '0'
          tagsElem.style.opacity = '0'
        }

        if (postEmo) {
          postEmo.style.maxWidth = '0'
          postEmo.style.opacity = '0'
        }
      }

      const expandPostHeader = () => {
        const postHeader = document.querySelector('.post-header')
        const tagsElem = postHeader.querySelector('.post-tags')
        const postEmo = postHeader.querySelector('.post-emo')

        // Only on project posts
        if (tagsElem) {
          tagsElem.style.maxHeight = '30px'
          tagsElem.style.opacity = '1'
        }

        if (postEmo) {
          postEmo.style.maxWidth = '80px'
          postEmo.style.opacity = '1'
        }
      }

      // The header starts expanded (matches the page's initial scroll
      // position of 0), so this starts false rather than true.
      let isHeaderCollapsed = false

      const handlePostHeaderScroll = () => {
        const y = window.scrollY

        if (y > 200 && !isHeaderCollapsed) {
          isHeaderCollapsed = true
          collapsePostHeader()
        } else if (y <= 100 && isHeaderCollapsed) {
          isHeaderCollapsed = false
          expandPostHeader()
        }
      }

      window.addEventListener('scroll', handlePostHeaderScroll, {
        passive: true,
      })
      window.pageListeners.push(handlePostHeaderScroll)
    }
  }

  // Defocus any focused elements
  if (document.activeElement) {
    document.activeElement.blur()
  }
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

        // Get the new page's <main> element itself (not just its innerHTML)
        // so the swap below can carry over its tag, id, tabindex and any
        // page-specific classes instead of discarding them.
        const newMain = newDocument.querySelector('#main-content')

        return { newDocument, newMain }
      }

      // Each page's icon sprite is trimmed at build time to just the
      // symbols that page uses (see the 'subset-icon-sprite' transform in
      // .eleventy.js), but the SPA router only ever swaps #main-content -
      // the sprite in the persistent shell never gets refreshed on its
      // own. Top up the live sprite with whatever symbols the incoming
      // page needs that it doesn't already have, so a <use href="#..."> on
      // the new content never points at a symbol that isn't there.
      const mergeIconSprite = (newDocument) => {
        const liveSprite = document.querySelector('#icon-sprite')
        const incomingSprite = newDocument.querySelector('#icon-sprite')
        if (!liveSprite || !incomingSprite) {
          return
        }

        const haveIds = new Set(
          [...liveSprite.querySelectorAll('symbol[id]')].map((s) => s.id),
        )
        incomingSprite.querySelectorAll('symbol[id]').forEach((symbol) => {
          if (!haveIds.has(symbol.id)) {
            liveSprite.appendChild(document.importNode(symbol, true))
          }
        })
      }

      const swapContent = async (newMain, newDocument) => {
        mergeIconSprite(newDocument)

        // Update the page content. Cloning the incoming <main> - rather
        // than building a plain <div> and copying its innerHTML in - keeps
        // the landmark element (and its tabindex/id/classes) intact, so
        // "skip to content" and screen reader landmark navigation keep
        // working after a client-side navigation.
        const contentElem = document.querySelector('#main-content')
        const newContentElem = document.importNode(newMain, true)
        // Alpine may not be loaded yet if every page visited so far had no
        // x-data (see loadAlpine) - mutateDom only exists once it has.
        const replace = () => contentElem.replaceWith(newContentElem)
        if (window.Alpine) {
          window.Alpine.mutateDom(replace)
        } else {
          replace()
        }

        // Update the page title
        const newTitle = newDocument.querySelector('title').textContent
        document.title = newTitle

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

        // Move focus to the new content so screen readers announce the
        // navigation and keyboard users don't lose their tab position.
        // preventScroll avoids fighting the scroll restore/reset above.
        newContentElem.focus({ preventScroll: true })
      }

      const { newDocument, newMain } = await downloadNewPage()
      await swapContent(newMain, newDocument)

      // If a blog page or project page is loaded, rebuild comment section.
      if (document.querySelector('comment-section')) {
        await import('./setup-utterances.js')
        window.initUtterances()
      }
    }
  }
}

// Service Worker
async function createSW() {
  // When a new build deploys, cached HTML may reference old asset hashes that
  // no longer exist on the server. Reload immediately so the page gets fresh assets.
  window.addEventListener('vite:preloadError', () => {
    window.location.reload()
  })

  // Check that service workers are supported
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')

      const activateWaiting = (sw) => sw.postMessage({ type: 'SKIP_WAITING' })

      // SW was already waiting when the page loaded
      if (registration.waiting) {
        activateWaiting(registration.waiting)
      }

      // SW finished installing while the user was already on the page
      registration.addEventListener('updatefound', () => {
        const installing = registration.installing
        installing?.addEventListener('statechange', () => {
          if (
            installing.state === 'installed' &&
            navigator.serviceWorker.controller
          ) {
            activateWaiting(installing)
          }
        })
      })

      // A controllerchange means a new SW just took over. On a first-ever
      // visit there was no previous controller, so there's nothing to
      // refresh - only reload when an existing controller is being
      // replaced by an update.
      const hadController = !!navigator.serviceWorker.controller
      let reloading = false
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!hadController || reloading) {
          return
        }
        reloading = true
        window.location.reload()
      })
    } catch (error) {
      console.error('Service worker registration failed: ', error)
    }
  }
}

const run = async () => {
  createSW()

  // Adds capability to load HTML pages when hovering over a link. This has
  // nothing to do with Alpine, so it's defined unconditionally - it must
  // stay available even on pages (like the homepage) that never load Alpine.
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

      // Load all images in the page too, unless the visitor has asked
      // for reduced data usage - a hover can queue several MB of images
      // for a page they may never open.
      if (!navigator.connection?.saveData) {
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
      }

      // Add to session storage
      sessionStorage.setItem(url, html)
    }
  }

  // Load AlpineJS
  window.loadAlpine = async () => {
    // setupPage() calls this on every SPA content swap, but Alpine only
    // needs to start once - its MutationObserver already picks up new
    // x-data elements swapped into #main-content. Calling Alpine.start()
    // again re-initializes the whole page and logs "Alpine has already
    // been initialized" for every navigation.
    if (window.Alpine) {
      return
    }

    // Most pages (the homepage included) have no Alpine directives at all -
    // don't pay for Alpine or its plugins until a page actually uses it.
    if (!document.querySelector('[x-data]')) {
      return
    }

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
  }

  window.loadAlpine()

  // Add a navigation listener to the document
  // If the user clicks on an internal link, then load the page via XHR
  // and then update the page content in #main-content
  document.addEventListener('click', (event) => {
    // Let the browser handle its normal set of "open elsewhere" gestures -
    // modifier-clicks (new tab/window), middle-click, and anything already
    // handled or opted out of via preventDefault/target/download.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

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

    if (
      clickedLink &&
      (!link.target || link.target === '_self') &&
      !link.hasAttribute('download')
    ) {
      showPage(link, { event })
    }
  })

  // Load page if the user navigates back or forward
  window.addEventListener('popstate', (event) => {
    showPage(new URL(window.location), {
      reverse: true,
      forget: true,
      event,
    })
  })

  const debounce = (func, delay) => {
    let timeoutId
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  const handleScroll = debounce(() => {
    const scrollPosition =
      window?.pageYOffset ?? document.documentElement?.scrollTop ?? 0
    history.replaceState({ scrollPosition: scrollPosition }, '')
  }, 200)

  window.addEventListener('scroll', handleScroll, { passive: true })
}

export { run }
