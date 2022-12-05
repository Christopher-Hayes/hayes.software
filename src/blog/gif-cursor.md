---
layout: layouts/post.html
title: 🐹 Making a GIF your cursor in Chrome
meta:
  desc: How to use a GIF as your cursor in Chrome
  tag:
date: 2022-04-04
intro:
  title: Making a GIF your cursor in Chrome
  emoji: 🐹
  desc: How to use a GIF as your cursor in Chrome
aiassist:
devto: This post was originally published on <a href='https://dev.to/chris_hayes/make-a-gif-your-cursor-in-chrome-4odo' target='_blank'>dev.to</a>.
tags:
---

Using "AniTuner" to create a special `.ani` cursor file and the Chrome extension, "Animated Cursors Forever!". One can use a GIF as their cursor inside Chrome.

![Image description](/images/blog/gif-cursor/gif-cursor-1.webp)

## Limitations

- Windows-only software is used in this guide. Software for building .ani files on other OS's is difficult to find.
- This cursor would only show inside websites, not on the Chrome titlebar or outside of Chrome.
- This changes the "default" cursor. When websites change the cursor, the animated cursor will be hidden.
- The gif needs to be small! The `.ani` file that gets created needs to be less than `80KB`. Larger than that and the browser extension won't work.

## Process

### Split the GIF into individual images

1. Download the GIF - choose a small GIF!
2. Upload the GIF to EZGif's Splitter tool at: <https://ezgif.com/split>
![Image description](/images/blog/gif-cursor/gif-cursor-2.webp)
3. Hit "Split to Frames" and then "Download frames as ZIP" to get the GIF as individual images. Extract those images into a folder.
![Image description](/images/blog/gif-cursor/gif-cursor-3.webp)

### Create the .ani cursor file

4. Install the Window application, [AniTuner](https://www.gdgsoft.com/anituner). Which some consider the best application for creating `.ani` cursor files.
5. In AniTuner, hit "Create a new animated cursor"
![Image description](/images/blog/gif-cursor/gif-cursor-4.webp)
6. Then "Edit Cursor Frames" on the left side
![Image description](/images/blog/gif-cursor/gif-cursor-5.webp)
7. Then "Import image(s)" to import the images from that were downloaded from EZGif.
![Image description](/images/blog/gif-cursor/gif-cursor-6.webp)
8. If the image looks good, hit "Okay" on the popup. Might need to select the "transparent" checkbox.
9. If the "Resize Image" popup shows, select the "Center image in the frame" option and hit "Okay".
![Image description](/images/blog/gif-cursor/gif-cursor-7.webp)
10. Select the blank frame at the top left, and hit "Remove frame(s)".
![Image description](/images/blog/gif-cursor/gif-cursor-8.webp)
11. Hit "Test Cursor" on the left side, to see what the cursor looks like. Hit "Set Length" at the bottom right to change the animation speed.

12. Finally, hit "Save Animated Cursor.." on the left side when the animation looks good.
![Image description](/images/blog/gif-cursor/gif-cursor-9.webp)
13. Important - check the `.ani` file that was created is under 80KB. Any larger and it won't work with the browser extension. If it's too large, EZGif can be used to optimize the gif and remove frames. In AniTuner, you can also try different cursor dimensions.

### Use the .ani cursor in Chrome

14. Get the Chrome extension, "Animated Cursors Forever!": <https://chrome.google.com/webstore/detail/animated-cursors-forever/glbompdcoknijlagjdallgimohbcopem?hl=en>
15. After clicking on the installed extension, hit the "Choose File" button to upload the `.ani` cursor file.
![Image description](/images/blog/gif-cursor/gif-cursor-10.webp)
16. If the file isn't too large (less than 80KB), then the next time the website refreshes, it will use the animated cursor. Note that the cursor won't show immediately, you need to refresh the page to see the new cursor.
