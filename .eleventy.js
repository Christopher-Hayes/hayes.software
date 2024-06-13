const { getSpeedlifyComponent } = require('./src/speedlify.js')
const fs = require('fs')
const eleventyAutoCacheBuster = require("eleventy-auto-cache-buster");


module.exports = function (config) {
  config.addPlugin(eleventyAutoCacheBuster);

  if (fs.existsSync('_site')) {
    fs.rmdirSync('_site/', { recursive: true })
  }

  config.setLiquidOptions({
    dynamicPartials: true,
  })

  // Blog tags
  config.addFilter('postTags', posts => {
    const blogPosts = posts.blog
    const allTags = Array.from(new Set(blogPosts.map(post => post.data.tags).reduce((acc, val) => acc.concat(val), [])))

    // Populate new array with tag info, sort by count
    const tagList = allTags.map(tag => ({
      name: tag,
      count: posts[tag]?.length ?? 0,
    })).filter(tag => tag.count > 0)
    tagList.sort((a, b) => b.count - a.count)

    return tagList
  })

  // Projects tags
  config.addFilter('projectTags', posts => {
    const projectPosts = posts.projects
    const allTags = Array.from(new Set(projectPosts.map(post => post.data.tags).reduce((acc, val) => acc.concat(val), [])))

    // Populate new array with tag info, sort by count
    const tagList = allTags.map(tag => ({
      name: tag,
      count: posts[tag]?.length ?? 0,
    })).filter(tag => tag.count > 0)
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

  config.addGlobalData("speedlify", async () => {
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
