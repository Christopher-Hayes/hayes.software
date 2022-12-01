---
layout: layouts/post.html
title: 📱 Managing multiple node version.
meta:
  desc: How to manage multiple node version.
  tag:
date: 2022-11-30
intro:
  title: Managing multiple node version.
  emoji: 📱
  desc: How to manage multiple node version.
---

🤩Hey everyone! Today I'm gonna talk about how developers can use `nvm` to manage node version and how to use `.nvmrc` for that.

`nvm` stands for Node Version Manager and is a tool used to switch between different versions of Node.js. It's a great way to ensure that you are always running the latest version of Node.js, or to switch between different versions of Node.js for different projects.

## Installation

To install `nvm`, you can use the following command:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

## Usage

To use `nvm`, you can use the following command:

```bash
nvm install <version>
```

For example, to install the latest version of Node.js, you can use the following command:

```bash
nvm install node
```

To install a specific version of Node.js, you can use the following command:

```bash
nvm install 14.17.6
```

To use a specific version of Node.js, you can use the following command:

```bash
nvm use 14.17.6
```

To use the latest version of Node.js, you can use the following command:

```bash
nvm use node
```

To list all the versions of Node.js installed, you can use the following command:

```bash
nvm list
```

Using `.nvmrc` files is a great way to make sure that everyone on a team is running the same version of Node.js. A `.nvmrc` file is a simple text file that contains the version of Node.js that you want to use. When someone runs `nvm` in the same directory as the `.nvmrc` file, they will automatically switch to that version of Node.js.

Here's an example of a `.nvmrc` file that specifies the version of Node.js to use:

```bash
v10.16.3
```

To switch to the specified version of Node.js, all you have to do is run the following command inside the project directory that contains the `.nvmrc` file:

```bash
nvm use
```

And that's it! 🤩 Using `nvm` and `.nvmrc` files is a great way to ensure that everyone on a team is using the same version of Node.js. 🎉
