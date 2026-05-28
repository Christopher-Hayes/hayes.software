const html = String.raw

const SPEEDLIFY_HASH = '8ab34fe5'
const RANK_URL = 'https://www.11ty.dev/speedlify/hayes-software/'
const SPEEDLIFY_URL = 'https://www.11ty.dev/speedlify'

// ─── HTML Template ───────────────────────────────────────────────────────────
// Edit this function to match your design. All data values are pre-computed
// and passed in as `d`. See the getData() function below for what's available.

function renderHTML(d) {
  const rankEl = d.rank
    ? `<${
        RANK_URL ? `a href="${RANK_URL}"` : 'span'
      } target="_blank" rel="noopener" class="rank">#${d.rank}</${
        RANK_URL ? 'a' : 'span'
      }>`
    : ''

  return html`
    <div
      class="mt-8 flex w-full flex-col bg-bg-raised divide-y divide-fg border-t border-fg text-sm"
    >
      <div class="flex divide-x divide-fg">
        <div class="flex grow justify-between gap-2 px-4 pb-2 pt-2.5">
          <a
            class="group"
            href="https://www.11ty.dev/speedlify/hayes-software/"
            target="_blank"
            rel="noopener"
          >
            <h2
              class="m-0 transform-none border-none p-0 text-4xl text-fg decoration-fg-highlight decoration-dashed decoration-4 underline-offset-4 group-focus-within:text-fg-highlight group-focus-within:underline group-hover:text-fg-highlight group-hover:underline"
            >
              Speedlify<br />
              Score
            </h2>
          </a>
          <div class="mb-1 flex max-w-[2rem] flex-col items-end justify-end">
            <p class="text-xs text-fg">
              ${d.rankChange > 0 ? '^' : '⌄'}${Math.abs(d.rankChange)}
            </p>
            <p class="whitespace-nowrap text-fg-highlight">Rank ${rankEl}</p>
          </div>
        </div>
        <div class="flex flex-col justify-end gap-1 px-3 py-3 text-center">
          <div
            class="${d.scores.performance.value > 99
              ? 'text-fg-highlight'
              : 'text-fg'} pb-0.5 font-rakkas text-4xl"
            labelledby="perf-score-label"
          >
            ${d.scores.performance.value}%
          </div>
          <label class="text-sm" id="perf-score-label"> Performance </label>
        </div>
        <div class="flex flex-col justify-end gap-1 px-3 py-3 text-center">
          <div
            class="${d.scores.accessibility.value > 99
              ? 'text-fg-highlight'
              : 'text-fg'} pb-0.5 font-rakkas text-4xl"
            labelledby="accessibility-score-label"
          >
            ${d.scores.accessibility.value}%
          </div>
          <label class="text-sm" id="accessibility-score-label">
            Accessibility
          </label>
        </div>
        <div class="flex flex-col justify-end gap-1 px-3 py-3 text-center">
          <div
            class="${d.scores.bestPractices.value > 99
              ? 'text-fg-highlight'
              : 'text-fg'} pb-0.5 font-rakkas text-4xl"
            labelledby="best-practices-score-label"
          >
            ${d.scores.bestPractices.value}%
          </div>
          <label class="text-sm" id="best-practices-score-label">
            Best Practices
          </label>
        </div>
        <div class="flex flex-col justify-end gap-1 px-3 py-3 text-center">
          <div
            class="${d.scores.seo.value > 99
              ? 'text-fg-highlight'
              : 'text-fg'} pb-0.5 font-rakkas text-4xl"
            labelledby="seo-score-label"
          >
            ${d.scores.seo.value}%
          </div>
          <label class="text-sm" id="seo-score-label"> SEO </label>
        </div>
      </div>
      <div class="flex w-full divide-x divide-fg text-fg">
        <div class="px-3 pb-1 pt-2">${d.requests}</div>
        <div class="px-3 pb-1 pt-2">${d.weight}</div>
        <div class="grow px-3 pb-1 pt-2 text-end">Tested on ${d.date}</div>
      </div>
    </div>
  `
}

// ─── Data ─────────────────────────────────────────────────────────────────────

function scoreClass(value) {
  if (value === '' || value === undefined) return 'circle'
  if (value < 0.5) return 'circle circle-bad'
  if (value < 0.9) return 'circle circle-ok'
  return 'circle circle-good'
}

function toScore(raw) {
  return {
    value: raw !== undefined ? parseInt(raw * 100, 10) : '…',
    cls: scoreClass(raw),
    raw,
  }
}

function getData(raw) {
  const summarySplit = raw.weight?.summary?.split(' • ') || []
  const rankChange = raw.previousRanks?.cumulative - raw.ranks?.cumulative
  let date
  if (Intl.DateTimeFormat && raw.timestamp) {
    date = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(raw.timestamp))
  }

  return {
    scores: {
      performance: toScore(raw.lighthouse?.performance),
      accessibility: toScore(raw.lighthouse?.accessibility),
      bestPractices: toScore(raw.lighthouse?.bestPractices),
      seo: toScore(raw.lighthouse?.seo),
    },
    requests: summarySplit[0] ?? null,
    weight: summarySplit[1] ?? null,
    rank: raw.ranks?.cumulative ?? null,
    rankChange: !isNaN(rankChange) && rankChange !== 0 ? rankChange : null,
    date: date ?? null,
  }
}

// ─── Export ───────────────────────────────────────────────────────────────────

module.exports = {
  getSpeedlifyComponent: async () => {
    const url = `${SPEEDLIFY_URL.replace(/\/$/, '')}/api/${SPEEDLIFY_HASH}.json`
    const raw = await (await fetch(url)).json()
    return renderHTML(getData(raw))
  },
}
