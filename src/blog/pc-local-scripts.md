---
layout: layouts/post.html
title: 🖥️ Local scripts in PlayCanvas Preview
meta:
  desc: How to use localhost hot-reloading scripts in your PlayCanvas project preview.
date: 2025-05-01
intro:
  # Separate from SEO meta, used for internally for content rendering
  title: Local Scripts in PlayCanvas Preview
  emoji: 🖥️
tags:
  - playcanvas
aiassist: The article was reviewed and fact-checked by Copilot AI.

---

If you have a separate HTML UI repo, you might want to use your local dev server with the PlayCanvas project previewer.

## Prerequisites

### CORS browser extension

Your local script will be blocked by CORS, so you'll need an extension to circumvent this security policy.

I've found "Access Control-Allow-Origin" Unblock to be useful, it has Chrome, Edge, and Firefox versions.

[Access Control-Allow-Origin Unblock](https://webextension.org/listing/access-control.html)

## Setting up your PlayCanvas script

You can stick this in any of your PlayCanvas scripts, it's probably most effective in your loading screen script, which will be one of the first scripts to run.

```js
const isPreview = window.location.hostname === 'launch.playcanvas.com'
// Whatever your production script URL is
// If it's a PC Asset, you need to wait for the asset to load, and then use `asset.getFileUrl()` to get the URL
const productionScriptUrl = 'https://example.com/script.js';
// By default, use the production script URL
let scriptSrc = productionScriptUrl;

if (isPreview) {
  const devUrl = new URLSearchParams(window.location.search).get('use_local_script');

  if (devUrl) {
    // Use localhost script for development
    scriptSrc = devUrl ?? productionScriptUrl;
  } else {
    // Code is running in PlayCanvas Preview, but no local script specified
    // Optional - Use a separate script URL for preview mode
    // scriptSrc = 'https://example.com/preview-script.js';
  }
}

const script = document.createElement('script');
script.src = scriptSrc;
script.type = 'module'; // Use 'module' if your script is an ES module
document.head.appendChild(script);
```

Most importantly, this script always defaults to the production script URL, and it does not allow `?use_local_script=` to be used in production, which would be a significant security issue.

## Putting it all together

### Building locally

If you're building the directory locally, you can serve the `/dist` folder with something like `npx serve .` from inside the `/dist` folder.  
This allows you to add something like `?use_local_script=http://localhost:3000/script.js` to the PlayCanvas preview URL.

### Hot-reloading locally

If you're using a dev server like `vite dev`, you can hot-reload the module with something like `?use_local_script=http://localhost:5173/src/main.ts`.

## Tab reloading

In your modules, you can avoid reloading the entire page by using the `import.meta.hot` API, which is available in many modern build tools that support hot module replacement (HMR).

For example, in your `main.ts`:

```ts
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    // Handle the new module, e.g., re-render your UI
    console.log('Module updated:', newModule);
  });
}
```

This allows you to update your module without a full page reload, which is especially useful for UI components and rapid development.

## Don't forget

- You must "turn on" the CORS extension to enable CORS bypass.
- Remember to turn off the CORS extension when you're done; besides opening security risks, it can also break random sites.
- If you have query params in your preview URL like `?debug=true`, you need to use an `&` to add the `use_local_script` param, like `?debug=true&use_local_script=http://localhost:3000/script.js`.
