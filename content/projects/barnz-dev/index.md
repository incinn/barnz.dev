---
title: "barnz.dev"
date: 2022-02-24T23:45:04Z
slug: "barnz-dot-dev"
layout: project
liveUrl: "https://barnz.dev/"
sourceUrl: "https://github.com/incinn/barnz.dev"
screenshotImage: "barnzdev-screenshot.webp"
tags: ["TypeScript", "Hugo", "Markdown", "Jest"]
---

This website. My home on the web. Built with **Hugo**, **Sass** and **TypeScript**.

This project is ever evolving and I doubt it'll ever be finished.

<!--more-->

---

# About

This website has gone through many iterations. The current version is a result of me picking up the [#100DaysOfCode](https://twitter.com/hashtag/100DaysOfCode) challenge. I needed a deliverable project I could work on during that time, and a personal website update was a perfect fit.

Originally, it was only meant to be a handful of static pages: A landing page, contact page, and maybe a project listing page. The landing page would contain 95% of the content, with a separate contact page purely for linking convenience. However, as with most things, the original plans were thrown out of the window as the spec expanded.

# Technology

I decided to go with [Hugo](https://gohugo.io/) for a couple of reasons. I wanted something fast and reliable, content to be handled in **markdown**, but mostly, I just wanted an excuse to work with a modern static site generator. Hugo ticked all those boxes and more.

**TypeScript** was a no-brainer. It was relatively easy to integrate into the Hugo workflow. As a first for me outside of the **Angular** ecosystem, everything is also fully unit tested with **Jest**.

It was important to me that everything worked with **JavaScript disabled**. I spent a lot of time making sure the core functionality all worked, and JavaScript only ever added additional flavour.

# Future

My intention is for this version of the website to stick around for a while. If I ever feel the itch to rebuild it, I can just create a new theme and use that without throwing everything away and starting from scratch. I want to add more fun - and arguably pointless - interactive features (such as the accent colour picker), and I intend on releasing various components individually.

I want to write more blog posts. As I mentioned in my [Hello World]({{< relref "hello-world.md" >}}) post, I am not a confident writer. I want that to change.

I don't think I'll ever consider this project finished, and intend on keeping it up to date for the foreseeable future.
