---
layout: layouts/post.html
title: 📚 AI is changing how I use Wikipedia
meta:
  desc: How AI is changing how I use Wikipedia
  tag:
date: 2022-12-11
intro:
  title: AI is changing how I use Wikipedia
  emoji: 📚
  desc: How AI is changing how I use Wikipedia
aiassist: This post was written with the help of <a href='https://chat.openai.com/chat' target='_blank'>ChatGPT</a>.
devto:
tags:
  - featured
  - ai
---

<figure
  x-data="{
    imageSrc: '/images/blog/wikiped-ai/wordtune-light.png',
    imageAlt: 'WordTune summary in Wikipedia',
    showImageOverlay: function (imageElem) {
      this.$dispatch('show-image-overlay', imageElem.src);
    },
    }">
  <button
    @click="showImageOverlay($event.target)"
    class="group h-52 md:h-96 w-full"
    >
    <img
      :src="imageSrc"
      :alt="imageAlt"
      width="100%"
      class="w-full h-full object-cover object-center rounded-2xl md:rounded-xl m-0 transition-opacity group-hover:opacity-50 group-focus:opacity-50"
      loading="lazy">
    <figcaption
      class="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-white font-bold text-xs text-right -mt-10 mb-12 mr-8"
      x-text="imageAlt"
    ></figcaption>
  </button>
</figure>

The rise of artificial intelligence (AI) has had a profound impact on how we use and access information. In particular, AI is changing how people learn about something and how they use Wikipedia. By providing smarter search capabilities, improved accuracy, automated summaries, and personalized content recommendations, AI is making it easier than ever before for us to access reliable information quickly and accurately whenever we need it most.

## 📓 Reading Wikipedia in 2021

Wikipedia's default user interface (UI) can be plain and unappealing. Luckily, there are alternatives like Wikiwand that offer a more aesthetically pleasing experience. To find information, users can skim articles for relevant information or click on links to other articles. If Wikipedia does not have an article on a particular topic, users can turn to search engines like Google to find answers on other websites like Quora or specialized websites in the relevant field.

## 🧠 Reading Wikipedia in the Age of AI

<figure
  x-data="{
    imageSrc: '/images/blog/wikiped-ai/wordtune.png',
    imageAlt: 'WordTune summary in Wikipedia',
    showImageOverlay: function (imageElem) {
      this.$dispatch('show-image-overlay', imageElem.src);
    },
    }">
  <button
    @click="showImageOverlay($event.target)"
    class="group h-52 md:h-96 w-full"
    >
    <img
      :src="imageSrc"
      :alt="imageAlt"
      width="100%"
      class="w-full h-full object-cover object-center rounded-2xl md:rounded-xl m-0 transition-opacity group-hover:opacity-50 group-focus:opacity-50"
      loading="lazy">
    <figcaption
      class="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity text-white font-bold text-xs text-right -mt-10 mb-12 mr-8"
      x-text="imageAlt"
    ></figcaption>
  </button>
</figure>

The age of artificial intelligence (AI) has made reading Wikipedia even more convenient and accessible. For example, the popular AI-powered tool [WordTune](https://wordtune.com) now has an integration with Wikipedia that automatically creates summaries for each section of an article. This makes it easy for users to quickly understand the main points.

<figure class="relative"
  x-data="{
    videoSrc: '/videos/bearlyai.webm',
    showVideoOverlay: function () {
      this.$dispatch('show-video-overlay', this.videoSrc);
      $refs.video.pause();
    },
    init: function () {
      // wait until the user has scrolled down to this element before loading the video
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (!$refs.video.src) {
            $refs.video.innerHTML = `<source src='${this.videoSrc}' type='video/${this.videoSrc.split('.').pop()}'>`;
            observer.disconnect();
          }
        }
      });
      observer.observe($refs.video);
    },
    }"
    @hide-video-overlay.window="$refs.video.play()"
    >
    <button
    @click="showVideoOverlay()"
    class="h-52 md:h-96 w-full">
  <video
    class="w-full h-full object-cover object-center rounded-2xl md:rounded-xl m-0"
    autoplay
    loop
    muted
    playsinline
    loading="lazy"
    x-ref="video"
    >
  </video>
  <figcaption class="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold text-xs text-right -mb-10 mr-8">Bearly.ai in action</figcaption>
  </button>
</figure>

Additionally, the [Bearly.ai](https://bearly.ai) app allows users to ask any question they have using GPT-3, a powerful AI language model. With Bearly.ai, users can simply press a key to activate the app and quickly ask any question that comes to mind. This makes it perfect for clarifying confusing terms or gaining a better understanding of a topic.

Overall, AI has made reading Wikipedia even more efficient and user-friendly.

## 🤖 Potential drawbacks of AI-powered tools and integrations

The integration of AI-powered tools and integrations like WordTune and Bearly.ai into the Wikipedia experience has both positive and negative effects on how people get their information. On the positive side, these tools make it easier and more efficient for users to find and understand information on Wikipedia. Summaries created by WordTune, for example, can help users quickly grasp the main points of an article, and Bearly.ai allows users to ask specific questions and receive answers from GPT-3 in real-time.

However, there are also potential drawbacks to relying on AI for information. One major issue is that GPT-3, like other language models, is not perfect and can sometimes generate incorrect or misleading information. This can be particularly problematic if the user is not aware that the information they are receiving is potentially unreliable.

For well-known and well-documented topics, the risk of receiving inaccurate information is lower. Overall, while AI can be a useful tool for accessing information on Wikipedia, it is essential for users to verify information from multiple sources to ensure accuracy.
