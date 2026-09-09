const html = String.raw

// Speedlify relaunched at speedlify.dev with a new API shape (sites are now
// keyed by a slugified URL instead of a hash) — see api/site/<slug>.json.
const SPEEDLIFY_SLUG = 'www-hayes-software'
const SPEEDLIFY_URL = 'https://www.speedlify.dev'

// ─── HTML Template ───────────────────────────────────────────────────────────
// Edit this function to match your design. All data values are pre-computed
// and passed in as `d`. See the getData() function below for what's available.

function renderHTML(d) {
  const rankEl = d.rank
    ? `<${
        d.rankUrl ? `a href="${d.rankUrl}"` : 'span'
      } target="_blank" rel="noopener" class="hover:text-fg underline-offset-4 hover:decoration-fg decoration-dotted decoration-2 hover:underline">#${
        d.rank
      }</${d.rankUrl ? 'a' : 'span'}>`
    : ''

  return html`
    <div
      class="mt-8 flex w-full flex-col divide-y divide-fg border-t border-fg bg-border text-xs dark:bg-bg-raised md:text-sm"
    >
      <div class="flex flex-wrap divide-x divide-y divide-fg md:flex-nowrap">
        <div
          class="flex w-full grow items-center md:items-end justify-between gap-2 px-4 pb-2 pt-2 md:w-auto"
        >
          <a class="group" href="${d.rankUrl}" target="_blank" rel="noopener">
            <h2
              class="m-0 transform-none border-none p-0 text-3xl text-fg decoration-fg-highlight decoration-dotted decoration-4 underline-offset-4 group-focus-within:text-fg-highlight group-focus-within:underline group-hover:text-fg-highlight group-hover:underline md:text-4xl"
            >
              Speedlify<br class="hidden md:block" />
              Score
            </h2>
          </a>
          <div
            class="mt-1.5 flex max-w-[2rem] flex-col items-end justify-end md:mb-1 md:mt-0"
          >
            <p class="text-xs text-fg">
              ${d.rankChange
                ? `${d.rankChange > 0 ? '^' : '⌄'}${Math.abs(d.rankChange)}`
                : ''}
            </p>
            <p class="whitespace-nowrap text-fg-highlight">Rank ${rankEl}</p>
          </div>
        </div>
        <div
          class="flex w-1/4 flex-col justify-center gap-1 px-1 py-3 text-center md:w-auto md:px-3"
        >
          <div
            class="${d.scores.performance.value > 99
              ? 'text-fg-highlight'
              : 'text-fg'} pb-0.5 font-rakkas text-3xl"
            labelledby="perf-score-label"
          >
            ${d.scores.performance.value}%
          </div>
          <label class="text-xs" id="perf-score-label"> Performance </label>
        </div>
        <div
          class="flex w-1/4 flex-col justify-center gap-1 px-1 py-3 text-center md:w-auto md:px-3"
        >
          <div
            class="${d.scores.accessibility.value > 99
              ? 'text-fg-highlight'
              : 'text-fg'} pb-0.5 font-rakkas text-3xl"
            labelledby="accessibility-score-label"
          >
            ${d.scores.accessibility.value}%
          </div>
          <label class="text-xs" id="accessibility-score-label">
            Accessibility
          </label>
        </div>
        <div
          class="flex w-1/4 flex-col justify-center gap-1 px-1 py-3 text-center md:w-auto"
        >
          <div
            class="${d.scores.bestPractices.value > 99
              ? 'text-fg-highlight'
              : 'text-fg'} pb-0.5 font-rakkas text-3xl"
            labelledby="best-practices-score-label"
          >
            ${d.scores.bestPractices.value}%
          </div>
          <label
            class="truncate whitespace-nowrap text-xs"
            id="best-practices-score-label"
            >Best Practices</label
          >
        </div>
        <div
          class="flex w-1/4 flex-col justify-center gap-1 px-1 py-3 text-center md:w-auto md:px-3"
        >
          <div
            class="${d.scores.seo.value > 99
              ? 'text-fg-highlight'
              : 'text-fg'} pb-0.5 font-rakkas text-3xl"
            labelledby="seo-score-label"
          >
            ${d.scores.seo.value}%
          </div>
          <label class="text-xs" id="seo-score-label"> SEO </label>
        </div>
      </div>
      <div class="flex w-full divide-x divide-fg text-fg">
        <div class="hidden px-3 pb-1 pt-2 md:block">${d.requests}</div>
        <div class="hidden px-3 pb-1 pt-2 md:block">
          ${d.axe} AXE issue${d.axe !== 1 ? 's' : ''}
        </div>
        <div class="px-3 pb-1 pt-2">${d.weight}</div>
        <div class="flex grow justify-between">
          <a
            class="px-3 pb-1 pt-2 decoration-dotted decoration-2 underline-offset-4 hover:text-fg hover:underline hover:decoration-fg"
            href="${d.rankUrl}"
            target="_blank"
            rel="noopener"
          >
            View details
          </a>
          <div class="grow px-3 pb-1 pt-2 text-end">Tested on ${d.date}</div>
        </div>
      </div>
    </div>
  `
}

// ─── Data ─────────────────────────────────────────────────────────────────────

function scoreClass(value) {
  if (value === '' || value === undefined) return 'circle'
  if (value < 50) return 'circle circle-bad'
  if (value < 90) return 'circle circle-ok'
  return 'circle circle-good'
}

function toScore(raw) {
  return {
    value: raw !== undefined ? Math.round(raw) : '…',
    cls: scoreClass(raw),
    raw,
  }
}

function getData(raw) {
  let date
  if (Intl.DateTimeFormat && raw.updated) {
    date = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(raw.updated))
  }

  return {
    scores: {
      performance: toScore(raw.lighthouse?.performance),
      accessibility: toScore(raw.lighthouse?.accessibility),
      bestPractices: toScore(raw.lighthouse?.bestPractices),
      seo: toScore(raw.lighthouse?.seo),
    },
    requests:
      raw.metrics?.requests !== undefined
        ? `${raw.metrics.requests} requests`
        : null,
    weight:
      raw.metrics?.weight !== undefined
        ? `${(raw.metrics.weight / 1000).toFixed(1)} KB`
        : null,
    rank: raw.rank ?? null,
    rankUrl: raw.page ? `${SPEEDLIFY_URL}${raw.page}` : null,
    // No historical rank is exposed by the current API, so rank movement
    // can't be computed anymore.
    rankChange: null,
    date: date ?? null,
    axe: raw.axe,
  }
}

// ─── Export ───────────────────────────────────────────────────────────────────

module.exports = {
  getSpeedlifyComponent: async () => {
    const url = `${SPEEDLIFY_URL.replace(
      /\/$/,
      '',
    )}/api/site/${SPEEDLIFY_SLUG}.json`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Speedlify request failed: ${response.status} for ${url}`)
    }
    const raw = await response.json()
    return renderHTML(getData(raw))
  },
}
