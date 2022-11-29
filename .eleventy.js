const fs = require('fs');

module.exports = function (config) {
  config.setLiquidOptions({
    dynamicPartials: true,
  });

  // Static assets to pass through
  config.addPassthroughCopy('./src/images');
  config.addPassthroughCopy('./src/public');
  config.addPassthroughCopy('./src/styles');
  config.addPassthroughCopy('./src/main.js');

  config.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/blog/*.md").sort(function(a, b) {
      return b.date - a.date;
    });
  });

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
  };
};
