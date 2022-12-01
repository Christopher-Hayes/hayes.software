---
layout: layouts/home.html
title: Setup
meta:
  desc: Personal site of software engineer, Chris Hayes. My personal setup.
intro:
  title: Setup
  desc: My personal setup.
  emoji: 🧰
---

## <span class="text-bg dark:text-fg inline-block py-1 px-2 bg-fg-dark bg-opacity-40 dark:bg-opacity-30 rounded-md font-bold">ubuntu 22.04</span>

- I've used Ubuntu since 16.04 and continue to use it due to its stability and wide software support.
- **Desktop**: GNOME

</details>

- **Browser**: [Chrome](https://www.google.com/chrome/)<details><summary>Not Firefox?</summary>
  - I'm a huge fan of Mozilla, and a subscriber of [Mozilla VPN](https://vpn.mozilla.org/), [Relay](https://relay.firefox.com/), and [MDN Plus](https://developer.mozilla.org/en-US/docs/MDN/Contribute/MDN_plus). And previously only a Firefox user. But, between browser performance, Google Profiles, and better devtooling (responsive view, snippets, performance insights, local overrides), using Chrome as my main browser just made more sense.
  - However, if Chrome's Manifest V3 update arriving in 2023 completely breaks adblockers, def switching back to Firefox.

</details>

- **Editor**: [VS Code](https://code.visualstudio.com/)
- **Font**: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) - Really nice ligatures.
- **Awesome Ubuntu Software**  <details><summary>Software</summary>
  - [Gnome Tweaks](https://wiki.gnome.org/Apps/Tweaks) <details><summary>The place for missing GNOME configs</summary>
    - A common complaint with Gnome is it's lack of customization. Gnome Tweaks fills that gap for me.

    </details>

  - [GThumb](https://wiki.gnome.org/Apps/Gthumb) <details><summary>Fantastic GNOME photo viewer </summary>
    - I'm a huge fan of GThumb. It's an extremely capable photo viewer and editor with custom bash scripts support.
    - GThumb does have stability issues, but it's still by far the best photo viewer I've used.
    - I have some of my GHumb scripts shared on [GitHub](https://gist.github.com/christopher-hayes/fd1be7ee982726845e7d76f106d0cda8).

    </details>

</details>

## <span class="text-bg dark:text-fg inline-block py-1 px-2 bg-fg-dark bg-opacity-40 dark:bg-opacity-30 rounded-md font-bold">terminal sanity</span>

**Terminal:** [WezTerm](https://wezfurlong.org/wezterm/) - WezTerm is a GPU-accelerated cross-platform terminal written in Rust.

**Editor (when in terminal):** Vim

**[my dotfiles](https://github.com/christopher-hayes/dotfiles)** - Not exhaustive, Slowly moving my private dotfiles into this repo

### Node

`nvm` is a tool used to switch between different versions of Node.js. A `.nvmrc` file is a simple text file that contains the version of Node.js to be used, and running nvm in the same directory as the `.nvmrc` file will automatically switch to that version. I talk more about using `nvm` in [this blog post](https://christopherhayes.dev/blog/nvm/).

### Python

`venv` is a module that comes with Python 3. It provides an easy way to create and manage virtual environments for different Python projects. Using virtual environments is a great way to keep your projects isolated from each other, and to ensure that everyone on a team is using the same version of Python and packages. I talk more about using `venv` in [this blog post](https://christopherhayes.dev/blog/python-venv/).

### Misc utilites

`exiftool` - _**The**_ CLI utility for reading image metadata. [get](https://exiftool.org/)

## <span class="text-bg dark:text-fg inline-block py-1 px-2 bg-fg-dark bg-opacity-40 dark:bg-opacity-30 rounded-md font-bold">mac</span>

I'm not a fan of Apple, but there's still a few nice tools I've I like.

[DevUtils](https://devutils.app/) - A collection of developer utilities.

[Yabai](https://github.com/koekeishiya/yabai) - Tiling window manager for tiling + focus on hover. I'm a big fan of "focus on hover", so Yabai enables that for me.

[Transmit](https://panic.com/transmit/) - A really solid FTP/SFTP client.
