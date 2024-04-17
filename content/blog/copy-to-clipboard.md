---
title: "Copy to clipboard"
slug: copy-to-clipboard-js
date: 2024-04-17T00:00:00Z
summary: "We've all seen those handy copy-to-clipboard widgets. A useful tool that saves the user a few keystrokes, and banks the development team valuable UX brownie points. But how..."
tags: ["javascript"]
author: barnz
---

## Introduction

We've all seen those handy copy-to-clipboard widgets. A useful tool that saves the user a few keystrokes and banks the development team valuable {{< abbr "UX" "User Experience" true >}} brownie points. But how are they made? Should you use a library or roll your own? Let's discuss.

## Libraries

There's no shortage of libraries that offer copy-to-clipboard functionality. A quick Google search will give you more options than you can shake a stick at. Here are a few that I've come across:

- [copy-to-clipboard](https://www.npmjs.com/package/copy-to-clipboard)
  The most popular result on NPM. ~5 million weekly downloads.
- [Angular CDK clipboard](https://material.angular.io/cdk/clipboard/overview)
  Provided by the [Angular CDK](https://material.angular.io/cdk/) team.
- [clipboard.js](https://clipboardjs.com/)
  A lightweight framework-agnostic plugin.

While there is nothing wrong with using one of the options above, do you really want to add another dependency? Let's have a go at creating our own.

## Minimum viable product

Below is an example I threw together to illustrate how easy it can be:

{{< embed "/embeds/copy-to-clipboard.html" "150" >}}

I keep hinting at how easy this functionality is to implement. Enough talk, let me show you:

```javascript{linenos=false}
await navigator.clipboard.writeText("Hello world");
```

Yep. That's it. All you need to do is hook that up to a button and provide the content you want to populate the clipboard with.

This magic is made possible by the relatively new [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API). This browser {{< abbr "API" "User Experience" >}} provides developers with a nice interface for responding to clipboard commands (cut, copy, paste), as well as the ability to read and write to the system clipboard.

## Considerations

As this API is still pretty new, adoption is not consistent across browsers yet. However, the `writeText` method is all we care about. And it is supported in all major browsers except, of course, old reliable Internet Explorer.

Before you go ahead and implement this in your projects, make sure your [target browsers are supported](https://caniuse.com/mdn-api_clipboard_writetext). As you can see from that page, some browsers have additional requirements before allowing you access to the Clipboard API.

The Clipboard API is only available in secure contexts (HTTPS) for obvious reasons.

The `writeText` method returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), which resolves once the clipboard contents have been updated. So you can add some nice user feedback, like in my example above.

Thanks for reading! I hope I persuaded you from adding an unnecessary dependency to your project.
