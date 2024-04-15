---
layout: layouts/post.html
title: 🌊 Why I chose 11ty over NextJS for this site
meta:
  desc: Why a developer that uses NextJS every day chose 11ty for their personal site.
  tag:
date: 2024-03-31
intro:
  title: Why I chose 11ty over NextJS for this site
  emoji: 🌊
  desc: Why I chose 11ty over NextJS for this site.
aiassist:
devto:
tags:
  - webdev 
---

I created this site in late 2022, but I've yet to write a post about building it. Something to know about me is that professionally I use NextJS all the time. It's extremely powerful.

For this light blog, NextJS would be a major drag.

**Site Goals:** Nimble, Clean, and Clear.

## Nimble

Slow sites drive me nuts. This is just a blog, let's make it fast.

### This site is built with 11ty

I use NextJS a ton for big web builds. A small blog doesn't need that. [Vercel hilariously tries to push Next](https://twitter.com/leeerob/status/1769096798348464270) as an "extremely simple tool" for static site generation. No, just no.

[11ty](https://11ty.dev) is a modern tool that only focuses on static site generation. Something like Next gives you options between SSR, ISR, and SSG, but it's still bloated for this use-case. 11ty has a strong, independent foundation in open-source, so it's also a tool I believe in.

There's other lightweight static generators like Jeykll and Hugo, but those are starting to show their age.

### Isn't static generation old tech?

It doesn't matter what framework you're using or what year it is, your goals are the same.

- Minimize server work when a page is requested.
- Cache EVERYTHING.
- Minimize work in the browser before the page shows.

Static site generation means you do the work once. The user NEVER waits on the server. This also means everything is cached, the "edge" will always have what the user needs.

### Minimizing browser work

This deserves its own section.

**Next has an inherit problem.** You can have a "server component" that renders HTML server-side with javascript, that becomes static HTML that can be cached.

**Great?** Yes, but now your page is not interactive, it's static like I said.

**But, I need part of the page to be interactive.** Now you have to make that part of the page a "client component". Your page is now blocking on the client component to load.

### AlpineJS

This is why I went with Alpine. I want to deliver HTML **INSTANTLY**. I don't want HTML waiting on JS. Alpine let's me add interactivity to the page without interfering with instant page load. React has hydration, but it's still a blocking process with a big impact on LCP.

The way Alpine puts state where its used is super nice. You don't need your components split up across a dozen files.

**Need a variable to track which tag is being filtered?**

Let's see..

```html
<ul
  x-data="{ tag: 'webdev' }"
  >
</ul>
```

That's it.

This feels natural to a Tailwind user and refreshing when you're only adding minimal interactivity. No need to build The Hanging Gardens of Babylon just to track which blog tag is being filtered on.

Combine the super power of static generating the HTML exactly how it should look on page load, with Alpine allowing the page to come alive when the user interacts with it, **and you got a fast site.**

### Tailwind

Tailwind from a page speed standpoint may not be the fastest, but as a heavy tailwind user, the development speed boost is worth it for me.

You either love it or you hate it, not much to say here.

### Web Safe Fonts

This site uses the age-old, Helvetica.

Waiting for a font to download delays render and can cause a page jump. Few people notice your custom font. If you're using a custom font that looks a lot like a web-safe font, **you're leaving performance on the table.**

### Preloading Pages

While I've tried not to overcomplicate this site build. I do have a script that preloads pages that *might* be visited next. When the user clicks an internal link, not only are the assets already downloaded, the JS will swap out the page HTML content instantly.

If navigating between pages feels snappy, that's why.

## Clean and Clear

When it comes to design, I favor sites with a clear distinction in colors. Nothing is hard to see, colors are used purposefully.

You can see that in the frequent use of bold, underlines on anything that is a link, and generous padding around buttons.

Actions should be clear, the user shouldn't have to guess.

## Regrets and Future

### Liquid

I'd say while 11ty made some parts simpler, some parts of the build feel like they became more complicated. 11ty's allows you to build your site how you want, which means not everything works out-of-the-box. For example, if you're static generating with Liquid + MDX, I found myself building custom Liquid filters and custom build steps to style MDX components in a certain way.

I've built my fair share of Shopify Liquid sites, even though I'm pretty familiar with Liquid, I don't love it. It's annoyingly restrictive in it's capabilities and a build like this heavily relies on custom filters.

I know JS well, and the Next/React flow of populating your components with data that comes from JS objects feels natural. So, while I'd like to keep the build process, I'd like to eliminate Liquid.

### Content in Markdown

I like the idea of writing blog posts in markdown. Particularly because it's easy to store in a filesystem anywere, easy to update, and I can use a tool like Obsidian to write posts.

One issue I had was anytime I wanted more advanced functionality in a blog post, I was writing a lot of custom code into the markdown file. I want to stay with markdown, but I'd like to look at mitigating the amount of custom code going into the markdown files.
