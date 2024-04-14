---
layout: layouts/post.html
title: 📱 Switch monitor display source from your phone
meta:
  desc: Using ddcutil to switch monitor display source from your phone
  tag:
date: 2022-11-29
intro:
  title: Switch monitor display source from your phone
  emoji: 📱
  desc: Using ddcutil to switch monitor display source from your phone
aiassist: This post was Slack thread on <a href='https://newhaven.io' target='_blank'>newhaven.io</a> that was converted to a blog post using GPT-3.
devto:
tags:
  - linux
  - automation
---

If you're like me and you have multiple external monitors connected to two different computers, you know what a pain it can be to manually switch the display source every time you want to switch between them. But, with some clever use of ddcutil, a utility that allows you to interact with monitors via the I2C protocol, you can programmatically switch the display source with just a few button pushes on your phone.

**Prerequisite:** This post assumes KDE Connect is installed on your phone and your computer. If you don't have KDE Connect installed, you can install it from the [KDE Connect website](https://kdeconnect.kde.org/).

First, you need to install `ddcutil` to be able to communicate with the monitor. To do this on Ubuntu, simply run the following command:

```bash
sudo add-apt-repository ppa:rockowitz/ddcutil
sudo apt-get update
sudo apt install ddcutil
```

For other distros, check out the [ddcutil docs](http://www.ddcutil.com/install/).

Once installed, you can use `ddcutil` to figure out which monitor is on which bus, and what hex code corresponds to the display source you want. To do this, run the following command:

```bash
ddcutil detect
```

You should now be able to change your display source with the right `ddcutil` args from the CLI. However, KDE Connect won't be able to run the script because `sudo` is required to run it.

To solve that, use the following C code to run the `ddcutil` command as a bash script inside a compiled executable:

```c
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>

int main()
{
  setuid(0);
  // Monitor 1 on bus 6 -> DisplayPort
  system("ddcutil -b 6 setvcp 0x60 0x0f");
  // Monitor 2 on bus 7 -> DisplayPort
  // Comment out the line below if you only have one monitor
  system("ddcutil -b 7 setvcp 0x60 0x0f");
  return 0;
}
```

The `0x60` hex code corresponds to the display source config, and the `0x0f` hex code corresponds to the DisplayPort value.

Some common display sources are:

DisplayPort 1: `0x0f`
DisplayPort 2: `0x10`
HDMI 1: `0x11`
HDMI 2: `0x12`
VGA: `0x01`
USB-C: `0x1e`

```bash
gcc -o show_displayport show_displayport.c
```

Then you need to set the executable to be in the "root" group with the correct permissions for it to be executable as an administrator. To do this, run the following command:

```bash
sudo chown root:root show_displayport 
sudo chmod 4755 show_displayport 
```

Finally, add the c executable as a command in KDE Connect so you can control it from your phone.

🎉 Now you can switch the source on one or multiple external monitors with ease!

To switch the display back, make another c file, update the `0x0f` to another display source, and compile it.

For example, if you want to switch the display source back to HDMI 1, you can use the following c code:

```c
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>

int main()
{
  setuid(0);
  // Monitor 1 on bus 6 -> HDMI 1
  system("ddcutil -b 6 setvcp 0x60 0x11");
  // Monitor 2 on bus 7 -> HDMI 1
  // Comment out the line below if you only have one monitor
  system("ddcutil -b 7 setvcp 0x60 0x11");
  return 0;
}
```

Then compile it with:

```bash
gcc -o show_hdmi1 show_hdmi1.c
```

And set the permissions with:

```bash
sudo chown root:root show_hdmi1
sudo chmod 4755 show_hdmi1
```

💯 Add that executable as a command in KDE Connect, and now you can switch between the two display sources with just a few button pushes on your phone!
