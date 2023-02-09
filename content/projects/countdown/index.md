---
title: "Countdown"
date: 2022-08-19T18:37:04+01:00
draft: false
layout: project
slug: "countdown"
liveUrl: https://count.barnz.dev
sourceUrl: https://github.com/incinn/countdown
screenshotImage: countdown-screenshot.webp
tags: ["TypeScript"]
---

A project to help me count down to important dates. Built with **TypeScript** and **Sass**.

I'm bad at remembering dates, and even worse at calculating how far away they are. This project outsources that task to something more reliable.

<!--more-->

---

I am useless at dates. Without my calendar I'd never remember everywhere I have to be or at what time.
Sometimes, it is useful to know how long it is until a specific date and time. For example a holiday abroad, or the release of a new game. Something to look at to help build up the hype!

That is where the inspiration for this project came from. _"How hard could it be?"_ I thought.

As with all projects, I had a couple of broad goals:

- it needed to be aesthetic
- easily shareable
- have the ability to easily add/remove timers
- confetti 🎉

I decided against using any kind of front-end framework, as the scope of the project is fairly small.
Besides, sometimes it's just nice to do something **vanilla**. The business logic of the project means it can all be done front-end, and requires no back-end infrastructure.

## Custom Timers

The original version of the project only supported hardcoded dates. After a while it got annoying to have to redeploy the application every time I wanted a new timer.
I explored a couple of ways around that, eventually settling on handling timer data encoded in the URL. This has multiple benefits:

- ability to add timers at will without redeploying
- anyone could add timers they desire (once I've built the UI to allow it, coming soon!)
- it is privacy respecting, as you'd need to know the URL in order to see the timer

But it also has a couple of drawbacks:

- not able to revoke a timer once it has been shared
- could potentially hit URL length limits with large text fields
- long/ugly URLs

For now, I think this works well. In order to build it out so that anybody can add a timer, I might have to look at creating a microservice to handle them.
This would eliminate most of the drawbacks listed above.

## Future

Here is a brain-dump of all the features/changes I'd like to make to the application in the future:

- ~~ability to add custom timers~~
- ~~show how long it has been since the timer completed~~
- add UI to allow anybody to generate a valid timer
- button to stop the confetti
- be able to "save" private timers, so you don't have to remember the magic URL
- offer different ways of counting down
