---
layout: layouts/project-post.html
title: 📦 A simple Node.JS template
meta:
  desc: A super simple, but capable Node.JS template
intro:
  title: A simple Node.JS template
  emoji: 📦
  desc: A super simple, but capable Node.JS template
projectlink: https://github.com/Christopher-Hayes/boil-node
date: 2024-04-19
tags: [node]
---

```bash
# One-liner: Create private repo. Clone it. Install deps. Open VSCode.
gh repo create --private --clone --template Christopher-Hayes/boil-node node && cd node && yarn && code .
```

I made a boilerplate for NodeJS that doesn't get in your way, stop configuring, and start building with the command above.

## Prototyping with Node.JS

I use Node.JS a ton for small internal tools. It may be a script to pull data from an API and reformat it, or a prototype for a new project idea.

For some people that may be what Python is for them. I know JS well, so for me it's NodeJS. More recently, ChatGPT has filled the gap for working with CSVs quite nicely. But, I'm still writing scripts with those results or to work with APIs.

I haven't found a SaaS option that fills that need, I've started using [Appsmith](https://appsmith.com) and I love it, but it's too slow for a lot of things, and the moment you need to work with local files, you're already locked into a cloud flow.

## NodeJS is a pain to set up

A pain point I've had with NodeJS is getting started on a new tool takes too long. You could just do `node main.js`, but I _really_ need Typescript if I'm working with data. Then you start to mess with `tsc` and `ts-node`, you later find your setup is using outdated JS features, or you want to use Typescript but you don't care about handling every single possible nullish everywhere.

## Boilerplates are over-engineered

Here's my theory about popular boilerplates — someone on GitHub made a nice NodeJS boilerplate, it becomes popular, this extra attention generates more issues, PRs, and new ideas. And the feature-creep doesn't stop, it just becomes larger and more complex.

This is a problem when the goal is to help people get building quickly.

I concede that inside a company or a large open-source project, it makes sense to enforce editor configs, git hooks, tests, heavy linting, and safe typescript typing.

But for individuals, building a small thing, this is simply counterproductive. This forces users to learn new coding conventions, and get to terms with a number of tools they may not have used before. All in the name of perfection.

Perfection kills time, kills momentum and kills projects.

## A KISS NodeJS Template

After not finding anything I liked, I made my own.

It's a "template" in GitHub, so you create a repo from it with the button in the UI or with `gh repo create --clone --private --template Christopher-Hayes/boil-node node`.

It supports Typescript, but you can still use JS. You should be able to use modern JS features without having to worry about the config. It doesn't have editor configs, git hooks, tests, linting, or anything that's not required to get building.
