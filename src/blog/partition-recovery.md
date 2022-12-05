---
layout: layouts/post.html
title: 💾 Recovering Files from a Corrupt Linux Partition 
meta:
  desc: How to recover files from a corrupt Linux partition
  tag: 
date: 2022-11-18
intro:
  title: Recovering Files from a Corrupt Linux Partition
  emoji: 💾
  desc: How to recover files from a corrupt Linux partition
aiassist: This post was Slack thread on <a href='https://newhaven.io' target='_blank'>newhaven.io</a> that was converted to a blog post using GPT-3.
devto:
tags:
  - linux
---

A few days ago, I encountered a strange issue with my Ubuntu/Windows dual-boot computer. After restarting, I noticed that my Linux partition had been corrupted and was now a “Sun” type partition. I was at a loss and wasn’t sure how to fully recover the partition's filesystem structure.

I decided to take a step back and try to recover my files instead. Here’s how I went about it:

1. I used the `dd` command to copy the corrupt partition onto an external SSD for recovery purposes.

2. I then used `mke2fs` to search for superblocks backups within the partition (these are essentially scattered throughout the partition).

3. I used `fsck -b` to attempt a recovery using a superblock backup.

Unfortunately, I couldn’t recover the full filesystem folder structure. But, after running `fsck`, I noticed a ton of numbered folders appear in the ext4’s “Lost + Found” folder. I was able to search for folders from there and eventually locate the files I was looking for.

The biggest takeaway from this experience is to make partition table backups. For GPT, use `gdisk --backup=backup.txt` to backup and `gdisk --load-backup=backup.txt` to recover. This way, you’ll be able to restore your partition table in the event of a corrupt partition.

I’m glad I was able to recover my files and learn a few new commands along the way. Always remember to keep a backup of your partition table to avoid any potential data loss. 📁

💾 **Update 2022-12-05:** I've since written a blog post about [partition table management here](/blog/partition-backup/)

