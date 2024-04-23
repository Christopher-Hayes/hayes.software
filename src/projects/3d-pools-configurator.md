---
layout: layouts/project-post.html
title: 🏊‍ Building a WebGL Pool Configurator
meta:
  desc: "A 3D product configurator for endless pools using Vue.js and PlayCanvas3D"
intro:
  title: My experience building the Endless Pools 3D pool configurator
  emoji: 🏊‍♂️
  desc: "An interactive 3d product configurator for endless pools, blending Vue.js and PlayCanvas3D."
  image:
    light: /images/projects/3d-pools-configurator/screenshot-1.webp
    dark: /images/projects/3d-pools-configurator/screenshot-1.webp
    alt: "Screenshot of the Endless Pools 3D Product Configurator"
projectlink: https://www.endlesspools.com/build
date: 2020-10-15
tags: [vue, playcanvas, featured]
aiassist: In the process of writing this post, <a href='https://chat.openai.com' target='_blank'>ChatGPT</a> was used to help verbalize my stream of consciousness. If some parts sound a little fancy, that would be why.
---

## Bringing Endless Pools to Life in 3D

In 2020, I took on the illuminating challenge of crafting a [3D product configurator](https://www.endlesspools.com/build) for Endless Pools. This digital endeavor involved wrangling the power of Vue.js for the interface and the immersive PlayCanvas3D engine for 3D visualization.

PlayCanvas3D won our favor with its robust scene editor and superior physically based rendering (PBR) capabilities at the time. The configurator not only showcases various pool options but also permits users to adorn their chosen pools with accessories, toggle water display, and adjust dimensions and depths on select models – all in real-time 3D.


<figure
  x-data="{
    imageSrc: '/images/projects/3d-pools-configurator/screenshot-2.webp',
    imageAlt: 'Another screenshot, this time inside and with a resizeable pool.',
    showImageOverlay: function (imageElem) {
      this.$dispatch('show-image-overlay', imageElem.src);
    },
  }">
  <button
    @click="showImageOverlay($event.target)"
    class="group h-52 md:h-96 w-full"
    >
    <img
      :src="imageSrc"
      :alt="imageAlt"
      src="/images/projects/3d-pools-configurator/screenshot-2.webp"
      alt="Another screenshot, this time inside and with a resizeable pool."
      width="100%"
      class="w-full h-full object-cover object-center rounded-2xl md:rounded-xl m-0 transition-opacity"
      loading="lazy">
    <figcaption
      class="w-full text-sm text-black dark:text-white text-right mt-2 -mb-2 pr-4"
      x-text="imageAlt"
    ></figcaption>
  </button>
</figure>

### Modeling and Rendering Techniques

To handle pools of variable geometries, I used morph targets, allowing for seamless resizing within the scene. Shiny materials gleamed with the integration of cubemaps, simulating reflections and adding an authentic touch to the visuals.

The development screenshot below shows the result of building a dynamic cubemap at runtime, and applying that to an object to simulate realistic reflections.

<figure
  x-data="{
    imageSrc: '/images/projects/3d-pools-configurator/screenshot-4.webp',
    imageAlt: 'A screenshot from when the dynamic cubemap lighting system was getting built.',
    showImageOverlay: function (imageElem) {
      this.$dispatch('show-image-overlay', imageElem.src);
    },
  }">
  <button
    @click="showImageOverlay($event.target)"
    class="group h-52 md:h-96 w-full"
    >
    <img
      :src="imageSrc"
      :alt="imageAlt"
      src="/images/projects/3d-pools-configurator/screenshot-4.webp"
      alt="A screenshot from when the dynamic cubemap lighting system was getting built."
      width="100%"
      class="w-full h-full object-cover object-center rounded-2xl md:rounded-xl m-0 transition-opacity"
      loading="lazy">
    <figcaption
      class="w-full text-sm text-black dark:text-white text-right mt-2 -mb-2 pr-4"
      x-text="imageAlt"
    ></figcaption>
  </button>
</figure>

### Overcoming Performance Hurdles

Early on, a significant challenge emerged: performance, especially on mobile. Through a series of optimizations such as texture compression via basis and model compression with Draco (for static models) and Meshopt (for morph targets), we achieved a smoother experience across devices.

Moreover, by judiciously controlling render cycles—suspending frame rendering when the camera is static and only updating frames upon changes—we further boosted performance.

<figure
  x-data="{
    imageSrc: '/images/projects/3d-pools-configurator/screenshot-3.webp',
    imageAlt: 'Screenshot of the Endless Pools 3D Product Configurator',
    showImageOverlay: function (imageElem) {
      this.$dispatch('show-image-overlay', imageElem.src);
    },
  }">
  <button
    @click="showImageOverlay($event.target)"
    class="group h-52 md:h-96 w-full"
    >
    <img
      :src="imageSrc"
      :alt="imageAlt"
      src="/images/projects/3d-pools-configurator/screenshot-3.webp"
      alt="Screenshot of the Endless Pools 3D Product Configurator"
      width="100%"
      class="w-full h-full object-cover object-center rounded-2xl md:rounded-xl m-0 transition-opacity"
      loading="lazy">
    <figcaption
      class="w-full text-sm text-black dark:text-white text-right mt-2 -mb-2 pr-4"
      x-text="imageAlt"
    ></figcaption>
  </button>
</figure>

### Project Impact

The configurator has since become an interactive cornerstone on the Endless Pools website, offering customers an engaging and personalized shopping experience.

🌊 Experience the configurator: [Endless Pools 3D Product Configurator](https://www.endlesspools.com/build)

Please note, the source code for this project is not publicly available. This project was managed, executed and delivered by [Reality Interactive](https://www.realityi.com/). I was the lead engineer on this project at the time.

### PlayCanvas3D Experience

Lastly, I'll talk a little about my experience with this 3d platform. We originally chose it because it had this 3d editor to edit your scene. I'd say the "dream" scenario was to have our designer work in there to build the scene and I would focus on code.

That did not pan out.

We had to optimize A LOT, which meant while I'd still find the editor useful, there was little the designer could do in the editor. For example, we had a custom asset pipeline for all assets, so just dropping in a pool model or a plant into the scene, was not an option.

I did enjoy the using the 3d editor, I just didn't use it in the way I imagined.

#### The PlayCanvas3D Engine

As far as the 3D engine PlayCanvas built goes, it doesn't quite have the feature set (and community support) that THREE.js has. There were even features that Babylon.js had that PlayCanvas3D didn't.

But, even then it still had a ton of features, the docs are good, and the developers were actively improving it.

Which leads me to the next topic..

#### Community and Developer Support

The community and developer support was brilliant.

I don't know any other way to say it. While PlayCanvas didn't have "official" support, their developers were HIGHLY active on the forum and in the GitHub issues. And I must say the community has some stand-out members that offered an unprecedented amount of help to beginners and experienced developers alike.

I need to specifically shout-out [Max](https://forum.playcanvas.com/u/max/summary) and [Leonidas](https://forum.playcanvas.com/u/leonidas/summary) for both their assistance on the forum, as well as the consulating work they did to solve a couple specific issues (For example the water shader is Max's work).

If you're planning to work with PlayCanvas3D, use the forum!

<figure
  x-data="{
    imageSrc: '/images/projects/3d-pools-configurator/screenshot-5.webp',
    imageAlt: 'Screenshot of my forum profile, 195 days on there and 5,000 posts read, the forum was my bible.',
    showImageOverlay: function (imageElem) {
      this.$dispatch('show-image-overlay', imageElem.src);
    },
  }">
  <button
    @click="showImageOverlay($event.target)"
    class="group h-52 md:h-96 w-full"
    >
    <img
      :src="imageSrc"
      :alt="imageAlt"
      src="/images/projects/3d-pools-configurator/screenshot-5.webp"
      alt="Screenshot of my forum profile, 195 days on there and 5,000 posts read, the forum was my bible."
      width="100%"
      class="w-full h-full object-cover object-center rounded-2xl md:rounded-xl m-0 transition-opacity"
      loading="lazy">
    <figcaption
      class="w-full text-sm text-black dark:text-white text-right mt-2 -mb-2 pr-4"
      x-text="imageAlt"
    ></figcaption>
  </button>
</figure>
