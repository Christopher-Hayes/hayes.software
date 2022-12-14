const fs = require('fs')

module.exports = function (config) {
  if (fs.existsSync('_site')) {
    fs.rmdirSync('_site/', { recursive: true })
  }

  config.setLiquidOptions({
    dynamicPartials: true,
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
      .sort(function (a, b) {
        return b.date - a.date
      })
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
