// const { execSync } = require('child_process')

// Convert gitmoji git commit emojis to unicode
/*
const gitmojiToUnicode = {
  art: '🎨',
  zap: '⚡',
  fire: '🔥',
  bug: '🐛',
  ambulance: '🚑',
  sparkles: '✨',
  memo: '📝',
  rocket: '🚀',
  lipstick: '💄',
  tada: '🎉',
  white_check_mark: '✅',
  lock: '🔒',
  bookmark: '🔖',
  rotating_light: '🚨',
  construction: '🚧',
  green_heart: '💚',
  arrow_down: '⬇',
  arrow_up: '⬆',
  pushpin: '📌',
  construction_worker: '👷',
  chart_with_upwards_trend: '📈',
  recycle: '♻',
  heavy_minus_sign: '➖',
  heavy_plus_sign: '➕',
  wrench: '🔧',
  hammer: '🔨',
  globe_with_meridians: '🌐',
  pencil2: '✏️',
  poop: '💩',
  rewind: '⏪',
  twisted_rightwards_arrows: '🔀',
  package: '📦',
  alien: '👽',
  truck: '🚚',
  page_facing_up: '📄',
  boom: '💥',
  bento: '🍱',
  wheelchair: '♿',
  bulb: '💡',
  beers: '🍻',
  speech_balloon: '💬',
  card_file_box: '🗃',
  loud_sound: '🔊',
  mute: '🔇',
  busts_in_silhouette: '👥',
  children_crossing: '🚸',
  building_construction: '🏗',
  iphone: '📱',
  clown_face: '🤡',
  egg: '🥚',
  see_no_evil: '🙈',
  camera_flash: '📸',
  alembic: '⚗',
  mag: '🔍',
  seedling: '🌱',
  triangular_flag_on_post: '🚩',
  goal_net: '🥅',
  dizzy: '💫',
  wastebasket: '🗑',
}
*/

// Get all commits on a file
/*
const getCommitsForPost = (post) => {
  // show both date and time
  const commits = execSync(
    `git log --pretty=format:"%h||%H||%ai||%s" -- ${post}`,
    {
      encoding: 'utf-8',
    },
  ).split('\n')

  // Split the commits into an object from the format: "c267143 2022-12-03 00:34:33 -0500 :speech_balloon: Minor copy updates"
  const commitsData = commits.map((commit) => {
    const [shortHash, hash, datetime, message] = commit.split('||')

    return {
      shortHash,
      hash,
      datetime,
      message,
    }
  })

  // Ordered by date
  const commitsByDate = commitsData.sort((a, b) => {
    return new Date(b.datetime) - new Date(a.datetime)
  })

  // Set previous commit on each commit
  const commitsWithPrevious = commitsByDate.map((commit, index) => {
    const previousCommit = commitsByDate[index + 1]
    return {
      ...commit,
      previousCommit,
    }
  })

  return commitsWithPrevious
}
*/

module.exports = {
  eleventyComputed: {
    /* Disabled since this wouldn't build in CI/CD
    edits: (data) => {
      const commits = getCommitsForPost(data.page.inputPath)

      // Iterate over the commit messages and replace github emoji with their unicode equivalent
      const commitsWithUnicodeEmoji = commits.map((commit) => {
        if (!commit.message) {
          commit.message = ''
        }

        const unicodeMessage = commit.message.replace(
          /:([a-z0-9_]+):/g,
          (match, p1) => {
            return gitmojiToUnicode[p1] || match
          },
        )

        return {
          ...commit,
          message: unicodeMessage,
        }
      })

      return commitsWithUnicodeEmoji
    },
    */
  },
}
