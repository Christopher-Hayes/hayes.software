const { getSpeedlifyComponent } = require('./src/speedlify.js')
const eleventyAutoCacheBuster = require('eleventy-auto-cache-buster')
const markdownIt = require('markdown-it')

const html = String.raw
const md = markdownIt({ html: true })

const defaultLinkOpen = md.renderer.rules.link_open || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))

const REL_ME_LINKS = [
  'https://github.com/Christopher-Hayes',
  'https://codeberg.org/chris-hayes',
]

md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
  const href = tokens[idx].attrGet('href') || ''
  const target = /^https?:\/\//.test(href) ? '_blank' : '_self'

  if (REL_ME_LINKS.includes(href)) {
    tokens[idx].attrSet('rel', 'me')
  }

  if (target === '_blank') {
    tokens[idx].attrSet('target', '_blank')
    tokens[idx].attrSet('rel', (tokens[idx].attrGet('rel') || '') + ' noopener')
  }

  return defaultLinkOpen(tokens, idx, options, env, self) + '<span class="link-text">'
}

md.renderer.rules.link_close = function(tokens, idx, options, env, self) {
  let icon = '#logo-square'

  // href is on the link_open token, not link_close — walk back to find it
  let i = idx;
  while (i >= 0 && tokens[i].type !== 'link_open') i--;
  const href = i >= 0 ? tokens[i].attrGet('href') : '';

  if (/^https?:\/\/en\.wikipedia\.org/.test(href)) {
    icon = '#wikipedia-logo';
  } else if (/^https?:\/\/codeberg\.org/.test(href)) {
    icon = '#codeberg-logo';
  } else if (/^https?:\/\/github\.com/.test(href)) {
    icon = '#github-logo';
  } else if (/^https?:\/\/nutmeg\.social/.test(href)) {
    icon = '#mastodon-logo';
  } else if (/^https?:\/\//.test(href)) {
    icon = '#icon-external';
  }

  return html`</span>
    <span class="link-icon">
      <svg aria-hidden="true" focusable="false">
        <use href="${icon}"/>
      </svg>
    </span>
  </a>`
}

module.exports = function (config) {
  config.addPlugin(eleventyAutoCacheBuster)
  config.setLibrary('md', md)

  config.setLiquidOptions({
    dynamicPartials: true,
  })

  config.addShortcode('link', function (href, text) {
    let icon = '#logo-square'
    const rel = REL_ME_LINKS.includes(href) ? 'me' : (/^https?:\/\//.test(href) ? 'noopener' : '')
    const target = /^https?:\/\//.test(href) ? '_blank' : '_self'

    if (/^https?:\/\/en\.wikipedia\.org/.test(href)) {
      icon = '#wikipedia-logo';
    } else if (/^https?:\/\/codeberg\.org/.test(href)) {
      icon = '#codeberg-logo';
    } else if (/^https?:\/\/github\.com/.test(href)) {
      icon = '#github-logo';
    } else if (/^https?:\/\/nutmeg\.social/.test(href) || /^https?:\/\/mastodon\.social/.test(href) || /^https?:\/\/mastodon\.art/.test(href)) {
      icon = '#mastodon-logo';
    } else if (/^https?:\/\/pixelfed\.social/.test(href)) {
      icon = '#pixelfed-logo';
    } else if (/^https?:\/\/bookwyrm\.social/.test(href)) {
      icon = '#bookwyrm-logo';
    } else if (/^https?:\/\//.test(href)) {
      icon = '#icon-external';
    }

    return html`<a href="${href}" target="${target}" rel="${rel}"
        class="box-link no-prose">
      <span class="link-text">
        ${text}
      </span>
      <span class="link-icon">
        <svg aria-hidden="true" focusable="false">
          <use href="${icon}"/>
        </svg>
      </span>
    </a>`
  })

  config.addShortcode('figure', function (src, alt, hideBorder = false) {
    const escapedAlt = alt.replace(/"/g, '&quot;')
    const renderedAlt = md.render(alt)

    return html`<figure
      x-data="{ showImageOverlay() { this.$dispatch('show-image-overlay', this.$refs.img.currentSrc); } }"
      class="group relative"
    >
      <picture>
        <source srcset="${src}" media="(prefers-color-scheme: light)" />
        <img
          x-ref="img"
          src="${src}"
          alt="${escapedAlt}"
          width="100%"
          class="mx-0 mt-24 mb-20 h-full w-full object-cover object-center transition-opacity ${hideBorder ? '' : 'border-2 border-border'} transform scale-150"
          loading="lazy"
        />
      </picture>
      <figcaption
        class="-mb-3 -mt-0 flex w-full gap-4 pr-4 text-justify text-xs"
        style="right: ${hideBorder ? '-30rem' : '-34rem'}"
      >
        <img
          src="/images/alt-text-icon.svg"
          loading="lazy"
          alt=""
          class="mt-8 h-7 w-7"
        />
        <div class="flex flex-col items-start gap-1">
          <div class="prose prose-sm text-fg prose-strong:text-fg dark:prose-strong:text-fg-highlight">${renderedAlt.trim()}</div>
          <button
            @click="showImageOverlay()"
            class="border border-fg dark:border-bg-raised px-3 pb-1 pt-2 text-fg dark:text-fg-highlight hover:text-fg hover:border-fg hover:bg-primary dark:hover:border-bg dark:hover:bg-primary dark:hover:text-bg focus:text-fg focus:border-fg focus:bg-primary dark:focus:border-bg dark:focus:bg-primary dark:focus:text-bg"
          >
            Enbiggen image
          </button>
        </div>
      </figcaption>
    </figure>`
  })

  config.addShortcode('figureThemed', function (srcLight, srcDark, alt, hideBorder = false) {
    if (!alt) { console.warn(`Warning: Missing alt text for image with src "${srcLight}". Please provide alt text for accessibility.`) }

    const escapedAlt = alt.replace(/"/g, '&quot;')
    const renderedAlt = md.render(alt)

    return html`<figure
      x-data="{ showImageOverlay() { this.$dispatch('show-image-overlay', this.$refs.img.currentSrc); } }"
      class="group relative"
    >
      <picture>
        <source srcset="${srcDark}" media="(prefers-color-scheme: dark)" />
        <source srcset="${srcLight}" media="(prefers-color-scheme: light)" />
        <img
          x-ref="img"
          src="${srcLight}"
          alt="${escapedAlt}"
          width="100%"
          class="mx-0 my-20 h-full w-full object-cover object-center transition-opacity ${hideBorder ? '' : 'border-2 border-border'} transform scale-125"
          loading="lazy"
        />
      </picture>
      <figcaption
        class="-mb-3 -mt-0 flex w-full gap-4 pr-4 text-justify text-xs"
        style="right: ${hideBorder ? '-30rem' : '-34rem'};"
      >
        <img
          src="/images/alt-text-icon.svg"
          loading="lazy"
          alt=""
          class="mt-8 h-7 w-7"
        />
        <div class="flex flex-col items-start gap-1">
          <div class="prose prose-sm text-fg prose-strong:text-fg dark:prose-strong:text-fg-highlight">${renderedAlt.trim()}</div>
          <button
            @click="showImageOverlay()"
            class="border border-fg dark:border-bg-raised px-3 pb-1 pt-2 text-fg dark:text-fg-highlight hover:text-fg hover:border-fg hover:bg-primary dark:hover:border-bg dark:hover:bg-primary dark:hover:text-bg focus:text-fg focus:border-fg focus:bg-primary dark:focus:border-bg dark:focus:bg-primary dark:focus:text-bg"
          >
            Enbiggen image
          </button>
        </div>
      </figcaption>
    </figure>`
  })

  config.addShortcode('video', function (src, caption = "") {
    if (!caption) { console.warn(`Warning: Missing caption for video "${src}". Please provide a caption for accessibility.`) }
    const renderedCaption = caption ? md.render(caption) : ''

    return html`<figure
      class="group relative"
      x-data="{
        isPlaying: true,
        togglePlayPause() {
          if (this.isPlaying) {
            $refs.video.pause();
          } else {
            $refs.video.play();
          }
          this.isPlaying = !this.isPlaying;
        },
        showVideoOverlay() {
          this.$dispatch('show-video-overlay', '${src}');
          $refs.video.pause();
        },
        init() {
          const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              if (!$refs.video.src) {
                $refs.video.src = '${src}';
                observer.disconnect();
              }
            }
          });
          observer.observe($refs.video);
        },
      }"
      @hide-video-overlay.window="$refs.video.play()"
    >
      <video
        class="m-0 my-20 w-full h-full object-cover object-center border-2 border-border transform scale-150"
        autoplay
        loop
        muted
        playsinline
        x-ref="video"
      ></video>
      <figcaption
        class="-mb-3 -mt-0 flex w-full gap-4 pr-4 text-justify text-xs"
        style="right: -34rem;"
        >
        <div class="flex flex-col items-start gap-1">
          ${renderedCaption ? html`<div class="prose prose-sm text-fg-muted prose-strong:text-fg dark:prose-strong:text-fg-highlight">${renderedCaption.trim()}</div>` : ''}
          <div class="flex gap-2">
            <button
              @click="togglePlayPause()"
              class="border border-fg dark:border-bg-raised px-3 pb-1 pt-2 text-fg dark:text-fg-highlight hover:text-fg hover:border-fg hover:bg-primary dark:hover:border-bg dark:hover:bg-primary dark:hover:text-bg focus:text-fg focus:border-fg focus:bg-primary dark:focus:border-bg dark:focus:bg-primary dark:focus:text-bg"
            >
              <span x-text="isPlaying ? 'Pause' : 'Play'">Pause</span>
            </button>
            <button
              @click="showVideoOverlay()"
              class="border border-fg dark:border-bg-raised px-3 pb-1 pt-2 text-fg dark:text-fg-highlight hover:text-fg hover:border-fg hover:bg-primary dark:hover:border-bg dark:hover:bg-primary dark:hover:text-bg focus:text-fg focus:border-fg focus:bg-primary dark:focus:border-bg dark:focus:bg-primary dark:focus:text-bg"
            >
              Enbiggen video
            </button>
          </div>
        </div>
      </figcaption>
    </figure>`
  })

  config.addShortcode('forges', function () {
    return html`
      <div
        class="no-prose mt-2 -mb-4 w-full flex justify-center"
        style="container-type: inline-size;"
        >
        <div class="grow border-y border-border"></div>
        <social-wrapper class="flex divide-x divide-fg border border-fg">
          <a href="https://github.com/Christopher-Hayes" target="_blank" rel="noopener"
            class="min-w-[27cqw] group block no-underline bg-bg-raised hover:bg-primary dark:hover:bg-fg hover:text-bg focus:bg-primary dark:focus:bg-fg focus:text-bg">
            <div class="flex flex-col divide-y divide-fg dark:group-hover:divide-bg dark:group-focus:divide-bg">
              <div class="flex">
                <svg class="overflow-visible w-10 aspect-square m-0 px-1.5 text-fg dark:group-hover:text-bg dark:group-focus:text-bg">
                  <use href="#github-logo" />
                </svg>
                <span
                  class="px-2 pt-1.5 pb-0.5 text-3xl font-display text-fg border-l border-fg dark:group-hover:border-bg dark:group-focus:border-bg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">GitHub</span>
              </div>
              <div class="px-2 pt-1 pb-0.5 text-sm text-fg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">
                <span class="text-fg-highlight group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">@Christopher-Hayes</span>
              </div>
              <div class="flex divide-x divide-fg dark:group-hover:divide-bg dark:group-focus:divide-bg text-xs">
                <div class="px-2 pt-1 pb-0.5 text-fg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">94 repos</div>
                <div class="grow px-2 pt-1 pb-0.5 text-end text-fg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">311 stars</div>
              </div>
            </div>
          </a>
          <a href="https://codeberg.org/Chris-Hayes" target="_blank" rel="noopener"
            class="min-w-[27cqw] group block no-underline bg-bg-raised hover:bg-primary dark:hover:bg-fg hover:text-bg focus:bg-primary dark:focus:bg-fg focus:text-bg">
            <div class="flex flex-col divide-y divide-fg dark:group-hover:divide-bg dark:group-focus:divide-bg">
              <div class="flex items-center">
                <svg class="overflow-visible w-10 aspect-square m-0 px-1.5 text-fg dark:group-hover:text-bg dark:group-focus:text-bg">
                  <use href="#codeberg-logo" />
                </svg>
                <span
                  class="px-2 pt-1.5 pb-0.5 text-3xl font-display text-fg border-l border-fg dark:group-hover:border-bg dark:group-focus:border-bg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">Codeberg</span>
              </div>
              <div class="px-2 pt-1 pb-0.5 text-sm text-fg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">
                <span class="text-fg-highlight group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">@Chris-Hayes</span>
              </div>
              <div class="flex divide-x divide-fg dark:group-hover:divide-bg dark:group-focus:divide-bg text-xs text-fg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">
                <div class="px-2 pt-1 pb-0.5">6 repos</div>
                <div class="grow px-2 pt-1 pb-0.5 text-end">1 star</div>
              </div>
            </div>
          </a>
          <a href="https://gitlab.com/Chris-Hayes" target="_blank" rel="noopener"
            class="min-w-[27cqw] group block no-underline bg-bg-raised hover:bg-primary dark:hover:bg-fg hover:text-bg focus:bg-primary dark:focus:bg-fg focus:text-bg">
            <div class="flex flex-col divide-y divide-fg dark:group-hover:divide-bg dark:group-focus:divide-bg">
              <div class="flex">
                <svg class="overflow-visible w-10 aspect-square m-0 px-1.5 text-fg dark:group-hover:text-bg dark:group-focus:text-bg">
                  <use href="#gitlab-logo" />
                </svg>
                <span
                  class="px-2 pt-1.5 pb-0.5 text-3xl font-display text-fg border-l border-fg dark:group-hover:border-bg dark:group-focus:border-bg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">GitLab</span>
              </div>
              <div class="px-2 pt-1 pb-0.5 text-sm text-fg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">
                <span class="text-fg-highlight group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">@Chris-Hayes</span>
              </div>
              <div class="flex divide-x divide-fg dark:group-hover:divide-bg dark:group-focus:divide-bg text-xs text-fg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">
                <div class="px-2 pt-1 pb-0.5">4 repos</div>
                <div class="grow px-2 pt-1 pb-0.5 text-end">0 stars</div>
              </div>
            </div>
          </a>
        </social-wrapper>
        <div class="grow border-y border-border"></div>
      </div>
    `
  })

  config.addShortcode('social', function () {
    return html`
      <div
        class="no-prose mt-2 -mb-4 w-full flex justify-center"
        style="container-type: inline-size;">
        <div class="grow border-y border-border"></div>
        <social-wrapper class="flex divide-x divide-fg dark:group-hover:divide-bg border border-fg">
          <a href="https://nutmeg.social/@chris" target="_blank" rel="noopener"
            class="group block no-underline bg-bg-raised hover:bg-primary dark:hover:bg-fg hover:text-bg focus:bg-primary dark:focus:bg-fg focus:text-bg">
            <div class="flex flex-col divide-y divide-fg dark:group-hover:divide-bg dark:group-focus:divide-bg">
              <div class="flex items-center">
                <svg class="overflow-visible w-10 h-8 aspect-square m-0 px-1.5 text-fg dark:group-hover:text-bg dark:group-focus:text-bg">
                  <use href="#mastodon-logo" />
                </svg>
                <span
                  class="px-2 pt-1.5 pb-0.5 text-3xl font-display text-fg border-l border-fg dark:group-hover:border-bg dark:group-focus:border-bg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">Mastodon</span>
              </div>
              <div class="px-2 pt-1 pb-0.5 text-sm text-fg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">
                <span class="text-fg-highlight group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">@chris</span>@nutmeg.social
              </div>
              <div class="flex divide-x divide-fg dark:group-hover:divide-bg dark:group-focus:divide-bg text-xs">
                <div class="px-2 pt-1 pb-0.5 text-fg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">3.3k posts</div>
                <div class="grow px-2 pt-1 pb-0.5 text-end text-fg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">196 followers</div>
              </div>
            </div>
          </a>
          <a href="https://pixelfed.social/chris-hayes" target="_blank" rel="noopener"
            class="group block no-underline bg-bg-raised hover:bg-primary dark:hover:bg-fg hover:text-bg focus:bg-primary dark:focus:bg-fg focus:text-bg">
            <div class="flex flex-col divide-y divide-fg dark:group-hover:divide-bg dark:group-focus:divide-bg">
              <div class="flex items-center">
                <svg class="overflow-visible w-10 aspect-square m-0 px-1.5 text-fg dark:group-hover:text-bg dark:group-focus:text-bg">
                  <use href="#pixelfed-logo" />
                </svg>
                <span
                  class="px-2 pt-1.5 pb-0.5 text-3xl font-display text-fg border-l border-fg dark:group-hover:border-bg dark:group-focus:border-bg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">Pixelfed</span>
              </div>
              <div class="px-2 pt-1 pb-0.5 text-sm text-fg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">
                <span class="text-fg-highlight group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">@chris-hayes</span>@pixelfed.social
              </div>
              <div class="flex divide-x divide-fg dark:group-hover:divide-bg dark:group-focus:divide-bg text-xs text-fg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">
                <div class="px-2 pt-1 pb-0.5">29 posts</div>
                <div class="grow px-2 pt-1 pb-0.5 text-end">17 followers</div>
              </div>
            </div>
          </a>
          <a href="https://bookwyrm.social/user/chris-hayes" target="_blank" rel="noopener"
            class="group block no-underline bg-bg-raised hover:bg-primary dark:hover:bg-fg hover:text-bg focus:bg-primary dark:focus:bg-fg focus:text-bg">
            <div class="flex flex-col divide-y divide-fg dark:group-hover:divide-bg dark:group-focus:divide-bg">
              <div class="flex">
                <svg class="overflow-visible w-10 aspect-square m-0 px-1.5 text-fg dark:group-hover:text-bg dark:group-focus:text-bg">
                  <use href="#bookwyrm-logo" />
                </svg>
                <span
                  class="px-2 pt-1.5 pb-0.5 text-3xl font-display text-fg border-l border-fg dark:group-hover:border-bg dark:group-focus:border-bg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">BookWyrm</span>
              </div>
              <div class="px-2 pt-1 pb-0.5 text-sm text-fg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">
                <span class="text-fg-highlight group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">@chris-hayes</span>@bookwyrm.social
              </div>
              <div class="flex divide-x divide-fg dark:group-hover:divide-bg dark:group-focus:divide-bg text-xs text-fg group-hover:text-fg dark:group-hover:text-bg group-focus:text-fg dark:group-focus:text-bg">
                <div class="px-2 pt-1 pb-0.5">30 books</div>
                <div class="grow px-2 pt-1 pb-0.5 text-end">5 followers</div>
              </div>
            </div>
          </a>
        </social-wrapper>
        <div class="grow border-y border-border"></div>
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
  config.addPassthroughCopy('./src/main-on-ready.js')
  config.addPassthroughCopy('./src/setup-utterances.js')

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
