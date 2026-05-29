# Personal site: [hayes.software](https://hayes.software)

**:iphone: Website URL:** https://hayes.software

**:zap: Speedlify performance stats:** [https://web-perf.netlify.app](https://web-perf.netlify.app/personal-site/)

## :package: 11ty template: [11st-Starter-Kit](https://github.com/stefanfrede/11st-starter-kit)

[11ty](https://www.11ty.dev/) - [Vite](https://vitejs.dev/) - [Tailwind CSS](https://tailwindcss.com) - [Alpine.js](https://github.com/alpinejs/alpine/)

## Scripts

### Install

```bash
yarn
```

### Development

```bash
yarn dev
```

### Production

```bash
yarn build
```

## Performance Strategies

### Prefetch

This site already uses Speculation rules to prefetch pages, but it also has custom js to prefetch html as well as images on those pages to more aggressively prefetch pages.

### PWA

This site uses a service worker navigate between internal pages to reduce load time when navigating.

This strategy may be removed at some point since it disables bfcache.

### Fonts

Fonts are minified to only send a subset of the font characters, only the ones that are required. This is done with `fonttools`.

Subsetting and using modern font compression formats achieves ~90% font file size reduction.

Previously, I preferred websafe fonts like Verdana to avoid needing to ship any fonts. This can totally eliminate layout shifts due to the font loading. However, having an interesting font is too important to the design of my site.

### SVG logos

Using SVG for logos both reduces file size and allows logos to be as high-fidelty as possible.

All SVG logos are defined in the HTML of the page with `<symbol>`, they are then referenced anywhere they're used with `<svg><use></svg>`. This also allows the site to have light mode, dark mode, and hover states for svg icons with a single svg image.

SVG logos are compressed with `svgo` to get 60-80% file size reduction.

### Images

Images are used in blog / projects posts, as they are necessary. But, outside article pages, this site was designed to avoid relying on images. This significantly decreases total page size.

### SVG images

In some blog posts I use svg images. This is not done for load performance. Unless the SVG image is very basic, the WebP version would probably still be less heavy. This is only done because SVGs look better due to the lack of raster compression.
