// Time how long it takes to load Utterances using the timing API
// console.log('Loading Utterances...')
// const start = performance.now()
// await import('./utterances/utterances.ts')
// const end = performance.now()
// console.log('Utterances loaded', end - start, 'ms')

window.initUtterances = function () {
  const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'github-dark'
      : 'github-light',
    currentURL = new URL(location.href),
    utterancesParam = currentURL.searchParams.get('utterances')
  utterancesParam &&
    (localStorage.setItem('utterances-session', utterancesParam),
    currentURL.searchParams.delete('utterances'),
    history.replaceState(void 0, document.title, currentURL.href))
  const config = {
    repo: 'Christopher-Hayes/hayes.software',
    'issue-term': 'pathname',
    label: 'comment',
    // theme: window.matchMedia('(prefers-color-scheme: dark)')
    //   ? 'icy-dark'
    //   : 'github-light',
    theme: 'icy-dark',
    crossorigin: 'anonymous',
    async: true,
  }
  'preferred-color-scheme' === config.theme && (config.theme = defaultTheme)
  const currentSite = document.querySelector("link[rel='canonical']")
  ;(config.url = currentSite
    ? currentSite.href
    : currentURL.origin + currentURL.pathname + currentURL.search),
    (config.origin = currentURL.origin),
    (config.pathname =
      currentURL.pathname.length < 2
        ? 'index'
        : currentURL.pathname.substr(1).replace(/\.\w+$/, '')),
    (config.title = document.title)
  const metaDescription = document.querySelector("meta[name='description']")
  config.description = metaDescription ? metaDescription.content : ''
  const descriptionLength = encodeURIComponent(config.description).length
  descriptionLength > 1e3 &&
    (config.description = config.description.substr(
      0,
      Math.floor((1e3 * config.description.length) / descriptionLength),
    ))
  const pageTitle = document.querySelector(
    "meta[property='og:title'],meta[name='og:title']",
  )
  ;(config['og:title'] = pageTitle ? pageTitle.content : ''),
    (config.session =
      utterancesParam || localStorage.getItem('utterances-session') || ''),
    document.head.insertAdjacentHTML(
      'afterbegin',
      '<style>\n    .utterances {\n      position: relative;\n      box-sizing: border-box;\n      width: 100%;\n      max-width: 760px;\n      margin-left: auto;\n      margin-right: auto;\n    }\n    .utterances-frame {\n      color-scheme: light;\n      position: absolute;\n      left: 0;\n      right: 0;\n      width: 1px;\n      min-width: 100%;\n      max-width: 100%;\n      height: 100%;\n      border: 0;\n    }\n  </style>',
    )

  // const htmlTemplate = `/utterances.html`

  // Select the <comment-section> element
  // const commentSection = document.querySelector('comment-section')

  // if (commentSection) {
  //   // Create the div element with the iframe inside it
  //   const divElement = document.createElement('div')
  //   divElement.className = 'utterances'

  //   // Create the iframe element
  //   const iframeElement = document.createElement('iframe')
  //   iframeElement.className = 'utterances-frame'
  //   iframeElement.title = 'Comments'
  //   // iframeElement.scrolling = 'no'
  //   iframeElement.src = `${htmlTemplate}?${new URLSearchParams(config)}`
  //   iframeElement.loading = 'lazy'

  //   // Append the iframe to the div
  //   divElement.appendChild(iframeElement)

  //   // Append the div to the comment-section
  //   commentSection.appendChild(divElement)

  //   // Add event listener for messages
  //   addEventListener('message', (e) => {
  //     if (e.origin !== window.location.origin) return
  //     const t = e.data
  //     if (t && 'resize' === t.type && t.height) {
  //       divElement.style.height = `${t.height}px`
  //     }
  //   })
  // } else {
  //   console.error('Comment section not found.')
  // }
}
// New Change - Self-invoking function was converted to a global function
// So, scoped blocks is used to avoid global scope pollution/conflicts
// This was done to allow AlpineJS to reinitialize Utterances when the view changes.
{
  console.log('Initializing Utterances...')
  // window.initUtterances()
}
