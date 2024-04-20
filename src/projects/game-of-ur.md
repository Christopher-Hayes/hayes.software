---
layout: layouts/project-post.html
title: "🎲 The Ancient Game of Ur"
meta:
  desc: "The classic Game of Ur recreated in the modern web."
intro:
  title: "The Ancient Game of Ur"
  emoji: 🎲
  desc: "The classic Game of Ur recreated in the modern web."
  image:
    light: "/images/projects/game-of-ur/screenshot-1.png"
    dark: "/images/projects/game-of-ur/screenshot-1.png"
    alt: "Screenshot of the online Game of Ur"
projectlink: https://early.games/
date: 2019-04-06
tags: [angular, three]
---

## Bringing an ancient game to the modern web

After watching Tom Scott's video about "The Game of Ur", a centuries-old game, I felt inspired to build a digital version of it. It looked pretty fun.

### Hosting

The project is currently hosted on [surge.sh](https://surge.sh/), which I chose as a way to familiarize myself with diverse hosting services. Although Surge is convenient for its free tier, I may switch to Netlify or Vercel for their additional features.

### Tech

As for the technology stack, I used [Angular](https://angular.io/) 6, [THREE.js](https://threejs.org/), [Bootstrap](https://getbootstrap.com/), [Angular Material](https://material.angular.io/), and [SASS](https://sass-lang.com/).

#### UI

Bootstrap and Angular Material were used to speed up the creation of the user interface. This would however be one of the last projects I use Bootstrap on. I've since moved to [TailwindCSS](https://tailwindcss.com/) for its utility-first approach.

#### 3D Elements

The 3D dice were modeled with [TinkerCAD](https://www.tinkercad.com/). I then exported them as OBJ files that I could render with THREE.js. This was a fun way to learn to use TinkerCAD for modeling.

#### SVGs

I've always enjoyed doing image work in [Inkscape](https://inkscape.org/). I used it to create the SVGs for the game's chip pieces.

### Future Plans

My long-term plan for [early.games](https://early.games/) is to include more games from antiquity, as a sort of fun and educational project about history.

### Links

🎮 [Play The Game of Ur Online](https://early.games/)

👨‍💻 [View the Source Code on GitHub](https://github.com/christopher-hayes/early.games)
