---
layout: layouts/post.html
title: 🛠 My move from Vercel to Hetzener and Coo
meta:
  desc: How to manage multiple node version.
  tag:
date: 2022-11-30
intro:
  title: My move from Vercel to Hetzener and Cooliff
  emoji: 🛠️
aiassist: This post was was written in part by <a href='https://beta.openai.com/playground' target='_blank'>GPT-3</a>.
devto:
tags:
  - webdev
  - featured
---

<figure
  x-data="{
    imageSrc: '/images/blog/hetzner-and-coolify/screenshot-1.png',
    imageAlt: 'Screenshot of the coolify.io dashboard',
    showImageOverlay: function (imageElem) {
      this.$dispatch('show-image-overlay', imageElem.src);
    },
    }"
  class="group">
  <button
    @click="showImageOverlay($event.target)"
    class="h-52 md:h-96 w-full"
    >
    <img
      :src="imageSrc"
      :alt="imageAlt"
      width="100%"
      class="w-full h-full object-cover object-center rounded-2xl md:rounded-xl m-0"
      loading="lazy">
    <figcaption
      class="opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold text-xs text-right -mt-10 mb-12 mr-8"
      x-html="imageAlt"
    ></figcaption>
  </button>
</figure>
