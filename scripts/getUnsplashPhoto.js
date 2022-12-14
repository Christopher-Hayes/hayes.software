require('dotenv').config()
const exec = require('child_process').exec
const fs = require('fs')
const axios = require('axios')

const download_image = (url, image_path) =>
  axios({
    url,
    responseType: 'stream',
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on('finish', () => resolve())
          .on('error', (e) => reject(e))
      }),
  )

const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY
const IMAGE_WIDTH = 704
const FILE_TYPE = 'webp'
const FILE_QUALITY = 90
const searchTerm = process.argv[2]

// use the Unsplash API to get a photo based on a search term
// add randomization to the search term to get a different photo each time
const getUnsplashPhoto = async (searchTerm) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${UNSPLASH_API_KEY}&orientation=landscape&per_page=1&page=${Math.floor(
      Math.random() * 100,
    )}`,
  )
  const json = await response.json()
  if (!json.results) {
    console.error('Request failed:', json)
    throw new Error('Request failed')
  }

  return json.results[0]
}

let folder = 'images/blog'

// Get the photo
const run = async () => {
  // Ask user if they want to use the photo or get a new one
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  try {
    for (let foundPhoto = false; !foundPhoto; ) {
      const photo = await getUnsplashPhoto(searchTerm)

      // save the photo
      const fileName = `./src/${folder}/${searchTerm.replaceAll(
        ' ',
        '-',
      )}.${FILE_TYPE}`
      console.log(fileName)

      await download_image(
        `${photo.links.download}&q=${FILE_QUALITY}&w=${IMAGE_WIDTH}&fm=${FILE_TYPE}`,
        fileName,
      )

      exec(`code ${fileName}`)

      const question = () => {
        return new Promise((resolve) => {
          readline.question(
            'Use this photo? (y)es (N)o (q)uit ',
            async (answer) => {
              if (answer === 'y') {
                // ask the user which blog post they want to add the photo to
                // Get a list of all blog posts in the blog folder that end in .md
                // then append the photo to the end of the file in markdown format
                const blogPosts = fs
                  .readdirSync('./src/blog')
                  .filter((file) => file.endsWith('.md'))

                const question2 = () => {
                  return new Promise((resolve) => {
                    // use integer keys to make it easier to select the blog post
                    readline.question(
                      `Which blog post do you want to add the photo to? ${blogPosts
                        .map((post, index) => `(${index}) ${post}`)
                        .join(' ')} `,
                      async (answer) => {
                        const blogPost = blogPosts[answer]
                        if (blogPost) {
                          // create a folder inside images/blog for all the photos for this blog post if it doesn't already exist
                          const blogPostFolder = `./src/images/blog/${blogPost
                            .split('.')
                            .slice(0, -1)
                            .join('.')}`
                          if (!fs.existsSync(blogPostFolder)) {
                            fs.mkdirSync(blogPostFolder)
                          }

                          // move the photo to the blog post folder
                          const newFileName = `${blogPostFolder}/${searchTerm.replaceAll(
                            ' ',
                            '-',
                          )}.${FILE_TYPE}`
                          fs.renameSync(fileName, newFileName)

                          // append the photo to the blog post
                          fs.appendFileSync(
                            `./src/blog/${blogPost}`,
                            `<figure class="group">
  <img src="/images/blog/${blogPost
    .split('.')
    .slice(0, -1)
    .join('.')}/${searchTerm.replaceAll(' ', '-')}.${FILE_TYPE}" alt="${
                              photo.alt_description
                            }" width="100%" class="h-52 md:h-72 object-cover object-center rounded-2xl md:rounded-xl" loading="lazy">
  <figcaption class="opacity-0 group-hover:opacity-100 transition-opacity text-white text-opacity-60 text-xs text-right -mt-10 mb-12 mr-8">Credit: <a class="opacity-60 hover:opacity-100" href="${
    photo.user.links.html
  }?utm_source=blog&utm_medium=referral&utm_campaign=api-credit" target="_blank" rel="noopener noreferrer">${
                              photo.user.name
                            }</a>
  </figcaption>
</figure>
`,
                          )

                          console.log(`Added photo to ./src/blog/${blogPost}`)

                          // open the blog post in VS Code
                          exec(`code ./src/blog/${blogPost}`)

                          resolve()
                        } else {
                          console.log('Invalid blog post')
                          question2()
                        }
                      },
                    )
                  })
                }

                await question2()

                foundPhoto = true

                process.exit()
              } else if (answer === 'q') {
                // Delete the photo
                exec(`rm ${fileName}`)

                // quit
                console.log('Quitting')

                process.exit()
              } else {
                // get a new photo
                console.log('Getting new photo')

                resolve()
              }
            },
          )
        })
      }

      await question()
    }
  } catch (error) {
    console.error(error)
    readline.close()
    process.exit()
  }
}

run()

// Run the script from the command line:
// node scripts/getUnsplashPhoto.js "dog"
