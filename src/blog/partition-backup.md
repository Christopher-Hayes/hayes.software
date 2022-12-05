---
layout: layouts/post.html
title: 💽 Manage Partition Tables on Linux
meta:
  desc: How to backup, restore and manage Linux partition tables
  tag: 
date: 2022-12-05
intro:
  title: Managing Disk Partitions on Linux
  emoji: 💽
  desc: How to manage disk partitions on Linux
aiassist: This post was was written in part by <a href='https://chat.openai.com/chat' target='_blank'>ChatGPT</a>.
devto:
---

<figure class="group">
  <img src="/images/blog/partition-backup/3d-data-backup.webp" alt="null" width="100%" class="h-52 md:h-72 object-cover object-center rounded-2xl md:rounded-xl" loading="lazy">
  <figcaption class="opacity-0 group-hover:opacity-100 transition-opacity text-white text-opacity-60 text-xs text-right -mt-10 mb-12 mr-8">Credit: <a class="opacity-60 hover:opacity-100" href="https://unsplash.com/@brechtcorbeel?utm_source=blog&utm_medium=referral&utm_campaign=api-credit" target="_blank" rel="noopener noreferrer">Brecht Corbeel</a>
  </figcaption>
</figure>

First, let's talk about the `fdisk` and `sfdisk` commands. These tools allow you to view and manage partitions on a disk. 💽

### <span class="text-primary dark:text-fg inline-block py-1 px-2 bg-primary bg-opacity-10 dark:bg-fg-dark dark:bg-opacity-10 rounded-md font-bold">fdisk</span>

To list the partitions of each device, you can use the following commands:

```bash
fdisk -l
fdisk -l /dev/sda
```

### <span class="text-primary dark:text-fg inline-block py-1 px-2 bg-primary bg-opacity-10 dark:bg-fg-dark dark:bg-opacity-10 rounded-md font-bold">sfdisk</span>

Alternatively, you can use `sfdisk` like this:

```bash
sfdisk -l
sfdisk -l /dev/sda
```

The difference between the two commands is that `fdisk` is interactive, while `sfdisk` is not. 🤔 This means that `fdisk` will prompt you for input, while `sfdisk` will not.

Here's an example of the output:

```bash
Disk /dev/sda: 238.5 GiB, 256060514304 bytes, 500118192 sectors
Disk model: ST1000LM035-1RK172
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x00000000
```

Now, let's say you want to back up your /dev/sda partition table. You can use the `sfdisk` command like this:

```bash
sfdisk -d /dev/sda > sda.partition.table.2022-12-05.txt
```

Then, you can copy the file sda.partition.table.12-30-2015.txt to an NFS mounted share or a USB drive. 💾 💻

But what if you want to restore the Linux partition from that file? No problem! Just use the `sfdisk` command like this:

```bash
sfdisk /dev/sda < sda.partition.table.2022-12-05.txt
```

Or, if the file is on a USB drive:

```bash
sfdisk /dev/sda < /path/to/usb/pen/sda.partition.table.2022-12-05.txt
```

You can also use the -f flag like this:

```bash
sfdisk -f /dev/sda < /media/usb/sda.partition.table.2022-12-05.txt
```

But wait, there's more! You can also replicate a disk partition table from one device to another. This can be useful if you're using Linux-based software RAID. Here's an example:

```bash
sfdisk -d /dev/sda | sfdisk -f /dev/sdd
```

Then, you can verify that the partition tables are the same on both disks like this:

```bash
fdisk -l /dev/sda
fdisk -l /dev/sdd
```

### <span class="text-primary dark:text-fg inline-block py-1 px-2 bg-primary bg-opacity-10 dark:bg-fg-dark dark:bg-opacity-10 rounded-md font-bold">mdadm</span>

You can also use `mdadm` to manage and rebuild your RAID device:

```bash
mdadm --manage /dev/mdX --add /dev/sdd1
mdadm --manage /dev/mdX --add /dev/sdd2
..
..
mdadm --manage /dev/mdX --add /dev/sddN
```

You can use the watch command to see the progress of the RAID array sync:

```bash
watch cat /proc/mdstat
```

### <span class="text-primary dark:text-fg inline-block py-1 px-2 bg-primary bg-opacity-10 dark:bg-fg-dark dark:bg-opacity-10 rounded-md font-bold">gdisk</span>

But what if your disk uses GPT (GUID Partition Table)? No problem! You can use the gdisk command to manage those disks. The difference between gdisk and `fdisk` is that `gdisk` supports GPT partitions, while `fdisk` does not.

If it's not already installed, install gdisk on a Debian or Ubuntu Linux system like this:

```bash
sudo apt-get install gdisk
```
  
Then, you can list the partitions on a disk like this:

```bash
gdisk -l /dev/sda
```

Here's an example of the output you might see:

```bash
Disk /dev/sda: 500.1 GB, 500107862016 bytes, 976773168 sectors
Disk model: ST500DM002-1BD142
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disklabel type: gpt
Disk identifier: 2B0E2B0E-2B0E-2B0E-2B0E-2B0E2B0E2B0E
```

To backup your partition table with `gdisk`, you can use the following command:

```bash
sudo gdisk -b /path/to/backup/file /dev/sda
```

To restore the partition table from a backup file, you can use the following command:

```bash
sudo gdisk -r /path/to/backup/file /dev/sda
```

You can also use the `gdisk` command to copy a partition table from one disk to another. Here's an example:

```bash
sudo gdisk -c /dev/sda /dev/sdb
```

Finally, you can use the `gdisk` command to create a new partition table on a disk. Here's an example:

```bash
sudo gdisk /dev/sda
```

That's it! Now you know how to manage disk partitions on Linux. 🐧
