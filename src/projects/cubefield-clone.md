---
layout: layouts/project-post.html
title: 🕹️ Cubefield with Three.JS
meta:
  desc: "Classic flash game, Cubefield, recreated with THREE.js"
intro:
  title: "Cubefield with Three.JS"
  emoji: 🕹️
  desc: "Classic flash game, Cubefield, recreated with THREE.js"
projectlink: https://christopher-hayes.github.io/cubefield/
date: 2017-01-02
tags: [three, js]
note: "This project was developed in 2017 or earlier, so it may use Three.js methods that have since been updated or deprecated."
---

<figure
  x-data="{
    imageSrc: '/images/projects/cubefield-clone/screenshot-1.png',
    imageAlt: 'Screenshot of the 3D Cubefield game scene',
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
      width="100%"
      class="w-full h-full object-cover object-center rounded-2xl md:rounded-xl m-0 transition-opacity"
      loading="eager">
    <figcaption
      class="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-black text-sm text-right -mt-10 mb-12 mr-8"
      x-text="imageAlt"
    ></figcaption>
  </button>
</figure>

## Recreating a Classic: Cubefield in Three.JS

Remember the days when flash games were all the rage? I certainly do. Taking a trip down memory lane led to my rendition of the classic game 'Cubefield', rebuilt with Three.js.

This was done back in 2017, so THREE.js may look a bit different today if you're looking at the code.

🎮 Play the game here: [Cubefield](https://christopher-hayes.github.io/cubefield/)

👨‍💻 Check out the code [on GitHub](https://github.com/Christopher-Hayes/cubefield).
