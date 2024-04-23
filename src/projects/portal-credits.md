---
layout: layouts/project-post.html
title: "🎶 Portal Ending Credits in JS"
meta:
  desc: "An in-depth look into how I recreated the Portal series ending credits with web technologies."
intro:
  title: "Portal Ending Credits in JS"
  emoji: 🎶
  desc: "An in-depth look into how I recreated the Portal series ending credits with web technologies."
  image:
    light: "/images/projects/portal-credits/portal-2-screenshot.png"
    dark: "/images/projects/portal-credits/portal-1-screenshot.png"
    alt:
      light: "Screenshot of the Portal 2 ending credits"
      dark: "Screenshot of the Portal 1 ending credits"
projectlink: https://christopher-hayes.github.io/portal-1-credits/portal-1-ending.html
date: 2018-02-27
tags: [js]
---

## Recreating the Portal Credits in the Web

I adore Portal's ending credits, the music and visuals are iconic. For this project, I wanted to recreate them in the web with HTML/CSS/JS.

While I could've used an off-the-shelf typing animation library, I wanted the challenge of creating the animations from scratch. Everything here is vanilla js.

This was done in 2018, a time before ai. So, I was there on youtube watching someone's game footage of the credits, copying down all of the lyrics (including every single name that scrolls on the right). I then made a makeshift tool to manually sync up each line of lyrics with the real credits.

At some point around 2020-ish, browsers started enforcing autoplay policies. The audio wouldn't play until you interact with the page. So, I later had to add a "play" button before the credits would start.

This was fun project, a lot of manual work. In 2024, I'd probably over-engineer an ai script to avoid all that. But, a satisfying result I think.

Naturally, I want it to be MORE REALISTIC, so maybe when I'm next learning WebGPU, I'll revisit this project.

<figure
  x-data="{
    imageSrc: '/images/projects/portal-credits/portal-2-screenshot.png',
    imageAlt: 'A screenshot of the Portal 2 ending credits',
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
      src="/images/projects/portal-credits/portal-2-screenshot.png"
      alt="A screenshot of the Portal 2 ending credits."
      width="100%"
      class="w-full h-full object-cover object-center rounded-2xl md:rounded-xl m-0 transition-opacity"
      loading="lazy">
    <figcaption
      class="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-white font-bold text-xs text-right -mt-10 mb-12 mr-8"
      x-text="imageAlt"
    ></figcaption>
  </button>
</figure>

### Experience them here

- [Portal 1 Ending demo](https://christopher-hayes.github.io/portal-1-credits/portal-1-ending.html) | [Source code](https://github.com/Christopher-Hayes/portal-1-credits/)
- [Portal 2 Ending demo](https://christopher-hayes.github.io/portal-2-credits/portal-2-ending.html) | [Source code](https://github.com/Christopher-Hayes/portal-2-credits/)

Huge thanks to [@kazitor](https://blog.kazitor.com/) for the ASCII art used in the Portal 1 Credits.
