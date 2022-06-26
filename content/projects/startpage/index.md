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

A lightweight start page, providing quick access to information that is important to me.

Built with **TypeScript**, with the intention of being as fast to load as possible. Makes use of the browser's **local storage** API to cache data.

<!--more-->

---

# About

I've long admired the creative startpages shown off on [/r/startpages](https://old.reddit.com/r/startpages/) and wanted to have a go at building my own. I was still pretty new to **TypeScript** when I started, and thought this would be a nice side project to work on.

Before I began, I wrote down some requirements I had for the project. It had to be:
- Fast to load
- Customisable 
- Aesthetic

And I wanted to provide the following features:
- Search
- Date & time
- Weather
- Bookmarks

As for the design, I had nothing in mind when I started, and went through many iterations before landing on what you see now. I wanted it to be simple, but allow for the user to customise the experience to some degree. I think it turned out well and accomplished those goals.

# Technology
I used this project as an excuse to play around with the templating language **Pug**.

- PUG
  - For quick and easy templating
- TypeScript
  - Controls all interactive elements
- SASS
  - CSS preprocessor for sanity

# Usage

Anyone can use the startpage. All configuration options, theme settings, bookmarks and weather location data is saved to the browser's **local storage**. Making clearing your data trivial.

Settings can be found by clicking the cog icon in the top right of the page. Here you're able to configure certain components, add bookmarks etc.

I added some default bookmarks as an example so the page doesn't feel so empty. Feel free to remove them!

# Future

It seems every time I load it up, I get struck with inspiration on how I can improve it. I use it daily, and intend to support the project for the foreseeable future. 

As it stands, the project currently **requires JavaScript**. I do intend on creating a cut-down version which will run without it enabled. Watch this space!

There are many other features and improvements I'd like to make moving forward. If you spot an issue, feel free to open an issue on the [GitHub](https://github.com/incinn/startpage) issues page for the project.

