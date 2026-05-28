---
layout: layouts/post.html
title: Python Virtual Environments
meta:
  desc: How to manage Python virtual environments.
  tag:
date: 2022-12-01
intro:
  # title: Python Virtual Environments
  desc: How to manage Python virtual environments.
aiassist: This post was was written in part by <a href='https://beta.openai.com/playground' target='_blank'>GPT-3</a>.
devto:
tags:
  - python
archived:
  title: Archived due to substantial ai writing.
  desc:
    As part of an effort to raise the quality of my blog, I'm distancing myself from posts that were partially written by AI. Besides devaluing the rest of the site, I want my site to show my best work and these posts read like a 300-word essay.
    
    I probably won't rewrite this article. Conda, anaconda, venv drive me nuts as a web developer, but venv is the one I still use 4 years later.
  date: 2026-04-28
---

`venv` is a module that comes with Python 3. It provides an easy way to create and manage virtual environments for different Python projects. Using virtual environments is a great way to keep your projects isolated from each other, and to ensure that everyone on a team is using the same version of Python and packages.

To create a virtual environment, you'll need to make sure you have Python 3 installed. You can then run the following command in your terminal:

```bash
python3 -m venv <environment_name>
```

This will create a new virtual environment with the specified name. You can then activate the virtual environment using the following command:

```bash
source <environment_name>/bin/activate
```

Once the environment is activated, you can start installing packages as needed. When you're done working in the environment, you can deactivate it by running the following command:

```bash
deactivate
```

Using virtual environments is important because without it you can have dependency conflicts. It also makes it easier to switch between projects that use different versions of Python and packages.

Thanks for reading! 🙌
