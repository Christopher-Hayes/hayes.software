---
layout: layouts/post.html
title: 🛠 My move from Vercel to Coolify on Hetzner
meta:
  desc: My move from Vercel to Coolify on Hetzner
  tag:
date: 2024-04-14
intro:
  title: My move from Vercel to Coolify on Hetzner
  emoji: 🛠️
  image:
    light: /images/blog/hetzner-with-coolify/screenshot-1-light.png
    dark: /images/blog/hetzner-with-coolify/screenshot-1-dark.png
    alt: Screenshot of the coolify.io dashboard
devto:
tags:
  - webdev
---

Experimenting with different hosts has been a pattern with this site. First GitHub Pages, then AWS EC2, then Netlify, then Surge.sh. More recently I set this site up with Vercel because I enjoy using their platform with Next.JS.

## Static and Serverless Hosting

Surge.sh, Netlify, and Vercel are all insanely easy to get a static site online. Netlify and Vercel do a great job guessing how to build your site, they're particularly great options if you're running serverless functions.

I'm a big proponent of open-source, and tools that are community-forward. I enjoy Vercel's products, but by the same token they're extremely product-forward.

## Coolify.io

I recently learned of [Coolify.io](https://coolify.io/) on Mastodon. Coolify aims to be the FOSS version of Netlify and Vercel. For example, the dashboard you see in Netflify/Vercel, Coolify has their own version of this. And it's not just monitoring, it's the whole process of managing and deploying multiple sites onto your server. That's the other great benefit..

## Hetzner

With a tool like Coolify, you're free to choose where you want to host your sites. I'm fan of how Hetzner operates and engages with the community. If you're not familiar with a big hosting platform like AWS, it's not a bad idea to use this as an opportunity to learn. I'm at a point where know enough to work in AWS when I have to, for my personal projects, I'd like to use the platforms I truly believe in. Coincidentally, Coolify also recommends Hetzner.

## Takeaway

I'm still in the process of learning about working with Coolify. It uses NixPacks to make configuration of some projects less configuration heavy. Which so far is working, though I have found this less "out-of-the-box" than I hoped with NixPacks not paying attention to the package.json engine or the .nvmrc.

For more complicated projects, I am having to build a Dockerfile to get them running. Not crazy about having to do that, but I'll see how it goes.

For git integration it does have everything you would need to have a project automatically building when you push to a repo, though you have to find the settings for that and set them up. I was hoping that would've been part of a more streamlined git setup process. But, maybe one day Coolify will have it.

I'll try to remember to update this post in 6 months if I'm still using Coolify. I'm a big fan of the idea.
