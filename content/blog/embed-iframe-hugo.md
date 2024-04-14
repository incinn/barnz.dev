---
title: "Embed an iframe in Hugo content"
slug: embed-iframe-in-hugo-content
date: 2024-04-14T00:00:00Z
tags: ["hugo", "markdown", "tutorial"]
author: barnz
---

In this short and sweet post, I'll show you how easy embedding an `iframe` into
any Hugo content can be.

<!--more-->

## Quick and dirty method

Hugo's rendering engine is smart. If you need a quick solution, you can simply
add almost any `html` markup you want to use, and it will render as you expect:

```markdown
---
title: "My blog post"
---

<iframe src="example.html"></iframe>
```

This will render the `iframe` in place with the default dimensions and might be
all you need.

For reference, the default sizing of an `iframe` is 300 pixels wide by 150
pixels tall.

But we can do better.

## The better method

We can utilize [shortcodes](https://gohugo.io/templates/shortcode-templates/) to
accomplish the same thing in a more structured way.

Let's make a new shortcode file:

```html
<!-- layouts/shortcodes/embed.html -->
<iframe src="{{ .Get 0 }}" width="{{ .Get 1 }}" height="{{ .Get 2 }}"> </iframe>
```

Bear in mind the name of the file inside the `shortcodes` directory dictates
the name of the shortcode.

Now we can use this shortcode in any of our markdown content:

```markdown
---
title: "My blog post"
---

{{</* embed "example.html" "100" "50" */>}}
```

This will render an `iframe` 100 pixels wide by 50 pixels tall.

Using shortcodes to accomplish this, we have a tidy, consistent and
repeatable method of embedding iframes into our content.
