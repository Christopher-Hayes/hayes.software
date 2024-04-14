---
layout: layouts/post.html
title: 🛠 My move from Vercel to Hetzener and Coolify
meta:
  desc: My move from Vercel to Hetzener and Coolify
  tag:
date: 2024-04-14
intro:
  title: My move from Vercel to Hetzener and Coolify
  emoji: 🛠️
devto:
tags:
  - webdev
  - featured
---

<figure
  x-data="{
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
    <picture>
      <source
        media="(prefers-color-scheme: dark)"
        srcset="/images/blog/hetzner-and-coolify/screenshot-1-dark.png">
      <source
        media="(prefers-color-scheme: light)"
        srcset="/images/blog/hetzner-and-coolify/screenshot-1-light.png">
      <img
        src="/images/blog/hetzner-and-coolify/screenshot-1-light.png"
        :alt="imageAlt"
        width="100%"
        class="w-full h-full object-cover object-center rounded-2xl md:rounded-xl m-0"
        loading="lazy">
    </picture>
    <figcaption
      class="opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold text-xs text-right -mt-10 mb-12 mr-8"
      x-html="imageAlt"
    ></figcaption>
  </button>
</figure>

Experimenting with different hosts has been a pattern with this site. First GitHub Pages, then AWS EC2, then Netlify, then Surge.sh. More recently I set this site up with Vercel because I enjoy using their platform with Next.JS.

## Static and Serverless Hosting

Surge.sh, Netlify, and Vercel are all insanely easy to get a static site online. Netlify and Vercel do a great job guessing how to build your site, they're particularly great options if you're running serverless functions.

I'm a big proponent of open-source, and tools that are community-forward. I enjoy Vercel's products, but by the same token they're extremely product-forward.

## Coolify.io

I recently learned of [Coolify.io](https://coolify.io/) on Mastodon. Coolify aims to be the FOSS version of Netlify and Vercel. For example, the dashboard you see in Netflify/Vercel, Coolify has their own version of this. And it's not just monitoring, it's the whole process of managing and deploying multiple sites onto your server. That's the other great benefit..

## Hetzner

With a tool like Coolify, you're free to choose where you want to host your sites. I'm fan of how Hetzner operates and engages with the community. If you're not familiar with a big hosting platform like AWS, it's not a bad idea to use this as an opportunity to learn. I'm at a point where know enough to work in AWS when I have to, for my personal projects, I'd like to use the platforms I truly believe in. Coincidentally, Coolify also recommends Hetzner.
