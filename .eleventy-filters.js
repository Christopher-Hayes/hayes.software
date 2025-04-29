const { Temporal } = require("@js-temporal/polyfill");

// Already in eleventy-base-blog
module.exports = {
  getWebmentionsForUrl: (webmentions, url) => {
    return webmentions.children.filter(entry => entry['wm-target'] === url);
  },
  webmentionsByType: (mentions, mentionType) => {
    return mentions.filter(entry => !!entry[mentionType]);
  },
  readableDateFromISO: (dateStr, formatStr = "dd LLL yyyy 'at' hh:mma") => {
    const date = Temporal.Instant.from(dateStr).toZonedDateTimeISO('UTC');

    return date.toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
}