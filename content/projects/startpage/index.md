---
title: 'Startpage'
date: 2022-02-25T00:03:14Z
lastmod: 2022-06-09T21:44:00Z
slug:
liveUrl: 'https://start.barnz.dev/'
sourceUrl: https://github.com/incinn/startpage
screenshotImage: 'startpage-screenshot.webp'
tags: ['TypeScript']
---

My start page. A lightweight page which provides quick access to information that is important to me.

Built in **TypeScript**, with the intention of being as fast to load as possible. Makes use of the browser's **local storage** to cache api results.

<!--more-->

---

# About

I've long admired the creative startpages shown off on [/r/startpages](https://old.reddit.com/r/startpages/) and wanted to have a go at building my own. I was still pretty new to **TypeScript** and thought this would be a nice side project to work on.

Before I began, I wrote down some requirements I had for the project. It had to be:

- Fast to load
- Customisable 
- Aeasthetic

And I wanted to provide the following features:
- Search
- Date & time
- Weather
- Bookmarks

As for the design, I went through a bunch of iterations before landing on what you see now. I wanted it to be simple, but allow for the user to customise the experience to some degree. I think it is a nice middle ground.

# Technology

- PUG
  - Templating
- TypeScript
  - Brains
- SASS
  - CSS preprocessor

# Usage

Anyone can use the startpage. All configuration options, theme settings, bookmarks and weather location data is saved to the browser's **local storage**. Making clearing your data trivial.

Settings can be found by clicking the cog icon in the top right of the page. Here you're able to configure certain components, add bookmarks etc.

I added some default bookmarks as an example so the page doesn't feel so barron. Feel free to remove them!

# Future

I still have plans for the project. It seems every time I load it up, I get struck with an idea on how I can improve it. I intend to support the project for the forseeable future. If you want to contribute, or spot an issue, the entire project is available on [GitHub](https://github.com/incinn/startpage).

# Changelog

## 24/01/2022
  - Fixed visual bugs
  - Improved settings panel layout
  - Improved text visibility
  - Removed weather icon hover effect

## 16/07/2021
  - Initial release

