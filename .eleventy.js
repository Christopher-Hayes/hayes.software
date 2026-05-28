const { getSpeedlifyComponent } = require('./src/speedlify.js')
const eleventyAutoCacheBuster = require('eleventy-auto-cache-buster')
const markdownIt = require('markdown-it')

const html = String.raw
const md = markdownIt({ html: true })

module.exports = function (config) {
  config.addPlugin(eleventyAutoCacheBuster)

  config.setLiquidOptions({
    dynamicPartials: true,
  })

  config.addShortcode('figure', function (src, alt) {
    const escapedAlt = alt.replace(/"/g, '&quot;')
    const renderedAlt = md.render(alt)

    return html`<figure
      x-data="{ showImageOverlay() { this.$dispatch('show-image-overlay', this.$refs.img.currentSrc); } }"
      class="group relative"
    >
      <img
        x-ref="img"
        src="${src}"
        alt="${escapedAlt}"
        width="100%"
        class="m-0 h-full w-full rounded-2xl object-cover object-center transition-opacity md:rounded-xl"
        loading="lazy"
      />
      <figcaption
        class="-mb-3 -mt-0 flex w-full gap-4 pr-4 text-justify text-xs"
      >
        <img
          src="/images/alt-text-icon.svg"
          loading="lazy"
          alt=""
          class="mt-8 h-7 w-7"
        />
        <div class="flex flex-col items-start gap-1">
          <div class="prose prose-sm prose-strong:text-fg-highlight">${renderedAlt.trim()}</div>
          <button
            @click="showImageOverlay()"
            class="border-2 border-bg-raised px-3 pb-1 pt-2 text-fg-highlight hover:border-bg hover:bg-primary hover:text-bg"
          >
            Enbiggen image
          </button>
        </div>
      </figcaption>
    </figure>`
  })

  config.addShortcode('social', function () {
    return html`
      <div class="no-prose mt-2 -mb-4 w-full flex justify-center border-y border-bg-raised">
        <social-wrapper class="flex divide-x divide-bg-raised border-x border-bg-raised">
          <a href="https://nutmeg.social/@chris" target="_blank" rel="noopener"
            class="group block no-underline hover:bg-fg hover:text-bg">
            <div class="flex flex-col divide-y divide-bg-raised">
              <div class="flex">
                <img src="/images/mastodon-logo-fg-highlight.svg" alt="Mastodon logo"
                  class="group-hover:hidden w-10 aspect-square m-0 px-2 pt-0.5 object-contain object-center">
                <img src="/images/mastodon-logo-bg.svg" alt="Mastodon logo"
                  class="hidden group-hover:block w-10 aspect-square m-0 px-2 pt-0.5 object-contain object-center">
                <span
                  class="px-2 pt-1.5 pb-0.5 text-3xl font-display text-fg border-l border-bg-raised group-hover:text-bg">Mastodon</span>
              </div>
              <div class="px-2 pt-1 pb-0.5 text-sm text-fg group-hover:text-bg">
                <span class="text-fg-highlight group-hover:text-bg">@chris</span>@nutmeg.social
              </div>
              <div class="flex divide-x divide-bg-raised text-xs">
                <div class="px-2 pt-1 pb-0.5 text-fg group-hover:text-bg">3.3k posts</div>
                <div class="grow px-2 pt-1 pb-0.5 text-end text-fg group-hover:text-bg">196 followers</div>
              </div>
            </div>
          </a>
          <a href="https://pixelfed.social/chris-hayes" target="_blank" rel="noopener"
            class="group block no-underline hover:bg-fg hover:text-bg">
            <div class="flex flex-col divide-y divide-bg-raised">
              <div class="flex items-center">
                <img src="/images/pixelfed-logo-fg-highlight.svg" alt="Pixelfed logo"
                  class="group-hover:hidden w-10 aspect-square m-0 px-2 pt-0.5 object-contain object-center">
                <img src="/images/pixelfed-logo-bg.svg" alt="Pixelfed logo"
                  class="hidden group-hover:block w-10 aspect-square m-0 px-2 pt-0.5 object-contain object-center">
                <span
                  class="px-2 pt-1.5 pb-0.5 text-3xl font-display text-fg border-l border-bg-raised group-hover:text-bg">Pixelfed</span>
              </div>
              <div class="px-2 pt-1 pb-0.5 text-sm text-fg group-hover:text-bg">
                <span class="text-fg-highlight group-hover:text-bg">@chris-hayes</span>@pixelfed.social
              </div>
              <div class="flex divide-x divide-bg-raised text-xs text-fg group-hover:text-bg">
                <div class="px-2 pt-1 pb-0.5">29 posts</div>
                <div class="grow px-2 pt-1 pb-0.5 text-end">17 followers</div>
              </div>
            </div>
          </a>
          <a href="https://bookwyrm.social/user/chris-hayes" target="_blank" rel="noopener"
            class="group block no-underline hover:bg-fg hover:text-bg">
            <div class="flex flex-col divide-y divide-bg-raised">
              <div class="flex">
                <img src="/images/bookwyrm-logo-fg-highlight.svg" alt="BookWyrm logo"
                  class="group-hover:hidden w-10 aspect-square m-0 px-1.5 object-contain object-center">
                <img src="/images/bookwyrm-logo-bg.svg" alt="BookWyrm logo"
                  class="hidden group-hover:block w-10 aspect-square m-0 px-1.5 object-contain object-center">
                <span
                  class="px-2 pt-1.5 pb-0.5 text-3xl font-display text-fg border-l border-bg-raised group-hover:text-bg">BookWyrm</span>
              </div>
              <div class="px-2 pt-1 pb-0.5 text-sm text-fg group-hover:text-bg">
                <span class="text-fg-highlight group-hover:text-bg">@chris-hayes</span>@bookwyrm.social
              </div>
              <div class="flex divide-x divide-bg-raised text-xs text-fg group-hover:text-bg">
                <div class="px-2 pt-1 pb-0.5">30 books</div>
                <div class="grow px-2 pt-1 pb-0.5 text-end">5 followers</div>
              </div>
            </div>
          </a>
        </social-wrapper>
      </div>
    `
  })

  config.addShortcode('forges', function () {
    return html`
      <div class="no-prose mt-2 -mb-4 w-full flex justify-center border-y border-bg-raised">
        <social-wrapper class="flex divide-x divide-bg-raised border-x border-bg-raised">
          <a href="https://github.com/Christopher-Hayes" target="_blank" rel="noopener"
            class="group block no-underline hover:bg-fg hover:text-bg">
            <div class="flex flex-col divide-y divide-bg-raised">
              <div class="flex">
                <img src="/images/github-logo-fg-highlight.svg" alt="GitHub logo"
                  class="group-hover:hidden w-10 aspect-square m-0 px-2 pt-0.5 object-contain object-center">
                <img src="/images/github-logo-bg.svg" alt="GitHub logo"
                  class="hidden group-hover:block w-10 aspect-square m-0 px-2 pt-0.5 object-contain object-center">
                <span
                  class="px-2 pt-1.5 pb-0.5 text-3xl font-display text-fg border-l border-bg-raised group-hover:text-bg">GitHub</span>
              </div>
              <div class="px-2 pt-1 pb-0.5 text-sm text-fg group-hover:text-bg">
                <span class="text-fg-highlight group-hover:text-bg">@Christopher-Hayes</span>
              </div>
              <div class="flex divide-x divide-bg-raised text-xs">
                <div class="px-2 pt-1 pb-0.5 text-fg group-hover:text-bg">94 repos</div>
                <div class="grow px-2 pt-1 pb-0.5 text-end text-fg group-hover:text-bg">311 stars</div>
              </div>
            </div>
          </a>
          <a href="https://codeberg.org/Chris-Hayes" target="_blank" rel="noopener"
            class="group block no-underline hover:bg-fg hover:text-bg">
            <div class="flex flex-col divide-y divide-bg-raised">
              <div class="flex items-center">
                <img src="/images/codeberg-logo-fg-highlight.svg" alt="Codeberg logo"
                  class="group-hover:hidden w-10 aspect-square m-0 px-2 pt-0.5 object-contain object-center">
                <img src="/images/codeberg-logo-bg.svg" alt="Codeberg logo"
                  class="hidden group-hover:block w-10 aspect-square m-0 px-2 pt-0.5 object-contain object-center">
                <span
                  class="px-2 pt-1.5 pb-0.5 text-3xl font-display text-fg border-l border-bg-raised group-hover:text-bg">Codeberg</span>
              </div>
              <div class="px-2 pt-1 pb-0.5 text-sm text-fg group-hover:text-bg">
                <span class="text-fg-highlight group-hover:text-bg">@Chris-Hayes</span>
              </div>
              <div class="flex divide-x divide-bg-raised text-xs text-fg group-hover:text-bg">
                <div class="px-2 pt-1 pb-0.5">6 repos</div>
                <div class="grow px-2 pt-1 pb-0.5 text-end">1 star</div>
              </div>
            </div>
          </a>
          <a href="https://gitlab.com/Chris-Hayes" target="_blank" rel="noopener"
            class="group block no-underline hover:bg-fg hover:text-bg">
            <div class="flex flex-col divide-y divide-bg-raised">
              <div class="flex">
                <img src="/images/gitlab-logo-fg-highlight.svg" alt="GitLab logo"
                  class="group-hover:hidden w-10 aspect-square m-0 px-1.5 object-contain object-center">
                <img src="/images/gitlab-logo-bg.svg" alt="GitLab logo"
                  class="hidden group-hover:block w-10 aspect-square m-0 px-1.5 object-contain object-center">
                <span
                  class="px-2 pt-1.5 pb-0.5 text-3xl font-display text-fg border-l border-bg-raised group-hover:text-bg">GitLab</span>
              </div>
              <div class="px-2 pt-1 pb-0.5 text-sm text-fg group-hover:text-bg">
                <span class="text-fg-highlight group-hover:text-bg">@Chris-Hayes</span>
              </div>
              <div class="flex divide-x divide-bg-raised text-xs text-fg group-hover:text-bg">
                <div class="px-2 pt-1 pb-0.5">4 repos</div>
                <div class="grow px-2 pt-1 pb-0.5 text-end">0 stars</div>
              </div>
            </div>
          </a>
        </social-wrapper>
      </div>
    `
  })

  // Blog tags
  config.addFilter('postTags', (posts) => {
    const blogPosts = posts.blog
    const allTags = Array.from(
      new Set(
        blogPosts
          .map((post) => post.data.tags)
          .reduce((acc, val) => acc.concat(val), []),
      ),
    )

    // Populate new array with tag info, sort by count
    const tagList = allTags
      .map((tag) => ({
        name: tag,
        count: posts[tag]?.length ?? 0,
      }))
      .filter((tag) => tag.count > 0)
    tagList.sort((a, b) => b.count - a.count)

    return tagList
  })

  // Projects tags
  config.addFilter('projectTags', (posts) => {
    const projectPosts = posts.projects
    const allTags = Array.from(
      new Set(
        projectPosts
          .map((post) => post.data.tags)
          .reduce((acc, val) => acc.concat(val), []),
      ),
    )

    // Populate new array with tag info, sort by count
    const tagList = allTags
      .map((tag) => ({
        name: tag,
        count: posts[tag]?.length ?? 0,
      }))
      .filter((tag) => tag.count > 0)
    tagList.sort((a, b) => b.count - a.count)

    return tagList
  })

  // Static assets to pass through
  config.addPassthroughCopy('./src/fonts')
  config.addPassthroughCopy('./src/images')
  config.addPassthroughCopy('./src/videos')
  config.addPassthroughCopy('./src/public')
  config.addPassthroughCopy('./src/styles')
  config.addPassthroughCopy('./src/scripts')
  config.addPassthroughCopy('./src/main.js')

  config.addCollection('blog', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('./src/blog/*.md')
      .filter((item) => !item.data.archived)
      .sort(function (a, b) {
        return b.date - a.date
      })
  })

  config.addCollection('blog-archives', function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((item) => item.data.archived)
      .sort(function (a, b) {
        return b.date - a.date
      })
  })

  config.addCollection('projects', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('./src/projects/*.md')
      .sort(function (a, b) {
        return b.date - a.date
      })
  })

  config.addGlobalData('speedlify', async () => {
    return await getSpeedlifyComponent()
  })

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
    passthroughFileCopy: true,
    templateFormats: ['html', 'md', 'liquid'],
    htmlTemplateEngine: 'liquid',
    dataTemplateEngine: 'liquid',
    markdownTemplateEngine: 'liquid',
  }
}
