const fs = require('fs')
// const fetch = require('node-fetch')
const unionBy = require('lodash/unionBy')
require('dotenv').config()

// Configuration
const DOMAIN = process.env.COOLIFY_FQDN ?? 'www.hayes.software'
const CACHE_DIR_PATH = '_cache/'
const CACHE_FILE_PATH = `${CACHE_DIR_PATH}webmentions.json`
const API_ENDPOINT = 'https://webmention.io/api'
const TOKEN = process.env.WEBMENTION_IO_TOKEN

/**
 * Fetch webmentions from the API.
 * @param {string} since - ISO date string to fetch mentions since.
 * @param {number} perPage - Number of mentions per page.
 * @returns {Object|null} - The fetched feed or null on failure.
 */
async function fetchWebmentions(since, perPage = 10000) {
  if (!DOMAIN || !TOKEN) {
    console.warn('>>> Unable to fetch webmentions: missing domain or token')
    return null
  }

  let url = `${API_ENDPOINT}/mentions.jf2?domain=${DOMAIN}&token=${TOKEN}&per-page=${perPage}`
  if (since) {
    url += `&since=${since}`
  }

  const response = await fetch(url)
  if (response.ok) {
    const feed = await response.json()
    console.log(
      `>>> ${feed.children.length} new webmentions fetched from ${API_ENDPOINT}`,
    )
    return feed
  }

  return null
}

/**
 * Merge two webmention feeds, ensuring uniqueness by 'wm-id'.
 * @param {Object} cache - Cached webmentions.
 * @param {Object} feed - Newly fetched webmentions.
 * @returns {Array} - Merged array of webmentions.
 */
function mergeWebmentions(cache, feed) {
  return unionBy(cache.children, feed.children, 'wm-id')
}

/**
 * Write webmentions data to the cache file.
 * @param {Object} data - Webmentions data to cache.
 */
function writeToCache(data) {
  const dir = CACHE_DIR_PATH
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFile(CACHE_FILE_PATH, JSON.stringify(data, null, 2), (err) => {
    if (err) throw err
    console.log(`>>> Webmentions cached to ${CACHE_FILE_PATH}`)
  })
}

/**
 * Read webmentions data from the cache file.
 * @returns {Object} - Cached webmentions or default structure.
 */
function readFromCache() {
  if (fs.existsSync(CACHE_FILE_PATH)) {
    const cacheContent = fs.readFileSync(CACHE_FILE_PATH, 'utf-8')
    return JSON.parse(cacheContent)
  }

  return { lastFetched: null, children: [] }
}

module.exports = async function () {
  console.log('>>> Reading webmentions from cache...')
  const cache = readFromCache()

  if (cache.children.length) {
    console.log(`>>> ${cache.children.length} webmentions loaded from cache`)
  }

  // if (process.env.NODE_ENV === 'production') {
  console.log('>>> Checking for new webmentions...')
  const feed = await fetchWebmentions(cache.lastFetched)
  if (feed) {
    const updatedWebmentions = {
      lastFetched: new Date().toISOString(),
      children: mergeWebmentions(cache, feed),
    }
    writeToCache(updatedWebmentions)
    return updatedWebmentions
  }
  // }

  return cache
}
