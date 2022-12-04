// Create a Vite plugin that will iterate over all files in the folder /blog, and then get from git the commit datetime and commit message that each file was last modified. Then print the output to the console.

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Get all commits on a file
const getCommitsForPost = (post) => {
  // show both date and time
  const commits = execSync(`git log --pretty=format:"%h||%ai||%s" -- ${post}`, {
    encoding: 'utf-8',
  }).split('\n')

  // Split the commits into an object from the format: "c267143 2022-12-03 00:34:33 -0500 :speech_balloon: Minor copy updates"
  const commitsData = commits.map((commit) => {
    const [hash, datetime, message] = commit.split('||')

    return {
      hash,
      datetime,
      message,
    }
  })

  // Ordered by date
  return commitsData.sort((a, b) => {
    return new Date(b.datetime) - new Date(a.datetime)
  })
}

const getBlogFiles = () => {
  return fs.readdirSync(path.resolve(__dirname, '../src', 'blog'))
}

const getBlogPostCommits = () => {
  const posts = getBlogFiles()

  const postsWithCommits = posts.map((post) => {
    const postPath = path.resolve(__dirname, '../src', 'blog', post)
    const commits = getCommitsForPost(postPath)
    return {
      [post]: commits,
    }
  })

  return Object.assign({}, ...postsWithCommits)
}

console.log(getBlogPostCommits())
