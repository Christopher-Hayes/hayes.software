# 📦 Personal site: [hayes.software](https://hayes.software)

## 11ty template: `11st-Starter-Kit`

[11ty](https://www.11ty.dev/), powered by [Vite](https://vitejs.dev/)
with [Tailwind CSS](https://tailwindcss.com) and
[Alpine.js](https://github.com/alpinejs/alpine/).

## Install Dependencies

First, make sure you have `npm` (packaged with
[Node.js](https://nodejs.org)) installed, then run `npm run setup` to install
the dependencies and validate that everything is running correctly.

## Scripts

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
```

## Netlify

To get your own instance of this 11st-Starter-Kit cloned and deploying to
Netlify very quickly, just click the button below and follow the instructions.

[<img src="https://www.netlify.com/img/deploy/button.svg" />](https://app.netlify.com/start/deploy?repository=https://github.com/stefanfrede/11st-starter-kit)

### Add some Netlify helpers

Netlify Dev adds the ability to use Netlify redirects, proxies, and serverless functions.

```bash
# install the Netlify CLI in order to get netlify dev
npm install -g netlify-cli

# run a local server with some added Netlify sugar
netlify dev
```

## Code Quality

By default `CSS` and `JavaScript` is getting linted with every commit.

You can lint manually by running `npm run lint` and if errors occur you can try to fix them automatically by running `npm run format`.

With every pull request it is checked if the code can be build without errors and afterwards `CSS` and `JavaScript` is getting linted.

Additionally each page is audited by Lighthouse which can take some time. You can find the performance budget for this audit in the file `./budget.json`.

## License

This project is open source and available under the [MIT License](LICENSE).
