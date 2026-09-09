const axios = require('axios')

// Runs as a `postbuild` step (see package.json), so it fires automatically
// right after `yarn build` - including nixpacks' `yarn build` in Coolify's
// deploy pipeline. It intentionally does NOT call `dotenv.config()` like
// getUnsplashPhoto.js does: the real Cloudflare secrets are only ever
// injected directly into the process environment (by Coolify in CI/CD, or
// by `bw-run` locally) - never parsed from the committed .env file, which
// holds `bw://...` placeholder references, not real values. Skipping
// whenever the token isn't a real injected secret is what keeps a plain
// local `yarn build` from ever touching the production cache.

const DOMAIN = 'hayes.software'
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID

const looksLikeRealToken = (value) =>
  Boolean(value) && !value.startsWith('bw://') && !value.startsWith('op://')

const cloudflare = axios.create({
  baseURL: 'https://api.cloudflare.com/client/v4',
  headers: {
    Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
})

const getZoneId = async () => {
  const params = { name: DOMAIN }
  if (looksLikeRealToken(CLOUDFLARE_ACCOUNT_ID)) {
    params['account.id'] = CLOUDFLARE_ACCOUNT_ID
  }

  const { data } = await cloudflare.get('/zones', { params })
  const zone = data.result?.[0]

  if (!zone) {
    throw new Error(`No Cloudflare zone found for "${DOMAIN}"`)
  }

  return zone.id
}

const purgeCache = async (zoneId) => {
  const { data } = await cloudflare.post(`/zones/${zoneId}/purge_cache`, {
    purge_everything: true,
  })

  if (!data.success) {
    throw new Error(
      `Cloudflare purge_cache reported failure: ${JSON.stringify(data.errors)}`,
    )
  }
}

const run = async () => {
  if (!looksLikeRealToken(CLOUDFLARE_API_TOKEN)) {
    console.log(
      'Skipping Cloudflare cache purge: CLOUDFLARE_API_TOKEN is not set ' +
        '(expected on a local build without `bw-run`).',
    )
    return
  }

  const zoneId = await getZoneId()
  await purgeCache(zoneId)
  console.log(`Purged Cloudflare cache for ${DOMAIN}.`)
}

run().catch((error) => {
  // A failed purge just means the CDN edge briefly serves an older cached
  // response until it expires on its own - not worth failing the whole
  // deploy over. Log it loudly so a persistent failure doesn't go unnoticed.
  console.error(
    'Cloudflare cache purge failed (deploy continues anyway):',
    error.response?.data ?? error.message,
  )
})
