const SHOW_REQUESTS = true
const SHOW_WEIGHT = true
const SHOW_RANK = true
const SHOW_RANK_CHANGE = true
const SHOW_SCORE = true

const SPEEDLIFY_URL = 'https://www.11ty.dev/speedlify'
const SPEEDLIFY_HASH = '579d941c'
const RANK_URL = 'https://www.11ty.dev/speedlify/hayes-software/'

module.exports = {
  getSpeedlifyComponent: async () => {
    // Yoinked from the speedlify-score lib
    const normalizeUrl = function (speedlifyUrl, path) {
      let host = `${speedlifyUrl}${speedlifyUrl.endsWith('/') ? '' : '/'}`
      return host + (path.startsWith('/') ? path.substr(1) : path)
    }

    let apiUrl = normalizeUrl(SPEEDLIFY_URL, `api/${SPEEDLIFY_HASH}.json`)

    const data = await (await fetch(apiUrl)).json()

    const getResultsDate = (data) => {
      if (!Intl.DateTimeFormat || !data.timestamp) {
        return
      }
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      const date = new Intl.DateTimeFormat('en-US', options).format(
        new Date(data.timestamp),
      )

      return `Results from ${date}`
    }

    const getScoreClass = (score) => {
      if (score === '' || score === undefined) {
        return 'circle'
      }
      if (score < 0.5) {
        return 'circle circle-bad'
      }
      if (score < 0.9) {
        return 'circle circle-ok'
      }
      return 'circle circle-good'
    }

    const getScoreHtml = (title, value = '') => {
      return `<span title="${title}" class="${getScoreClass(value)}">${
        value ? parseInt(value * 100, 10) : '…'
      }</span>`
    }

    const render = (data = {}) => {
      let content = []

      content.push('<div class="flex flex-col items-start gap-2">')

      content.push('<div class="speedlify flex flex-wrap gap-2">')

      // no extra attributes
      if (
        (!SHOW_REQUESTS && !SHOW_WEIGHT && !SHOW_RANK && !SHOW_RANK_CHANGE) ||
        SHOW_SCORE
      ) {
        content.push(getScoreHtml('Performance', data.lighthouse?.performance))
        content.push(
          getScoreHtml('Accessibility', data.lighthouse?.accessibility),
        )
        content.push(
          getScoreHtml('Best Practices', data.lighthouse?.bestPractices),
        )
        content.push(getScoreHtml('SEO', data.lighthouse?.seo))
      }

      let meta = []
      let summarySplit = data.weight?.summary?.split(' • ') || []

      if (SHOW_REQUESTS && summarySplit.length) {
        meta.push(`<span class="requests">${summarySplit[0]}</span>`)
      }
      if (SHOW_WEIGHT && summarySplit.length) {
        meta.push(`<span class="weight">${summarySplit[1]}</span>`)
      }

      // Ranking
      if (data.ranks?.cumulative) {
        if (SHOW_RANK) {
          meta.push(
            `<${RANK_URL ? `a href="${RANK_URL}"` : 'span'} class="rank">${
              data.ranks?.cumulative
            }</${RANK_URL ? 'a' : 'span'}>`,
          )
        }
        if (SHOW_RANK_CHANGE) {
          let change = data.previousRanks?.cumulative - data.ranks?.cumulative
          meta.push(
            `<span class="rank-change ${
              change > 0 ? 'up' : change < 0 ? 'down' : 'same'
            }">${change !== 0 ? Math.abs(change) : ''}</span>`,
          )
        }
      }
      if (meta.length) {
        content.push(`<span class="meta">${meta.join('')}</span>`)
      }

      content.push('</div>')

      // at the end add a "fetch at" note in small print
      // use getResultsDate to get the date
      const date = getResultsDate(data)
      // append the date to the content
      if (date) {
        console.log(date)
        content.push(`<span class="italic">${date}</span>`)
      }

      content.push('</div>')

      return content.join('')
    }

    return render(data)
  },
}
