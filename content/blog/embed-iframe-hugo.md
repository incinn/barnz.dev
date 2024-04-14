---
title: "Embed an iframe in Hugo content"
slug: embed-iframe-in-hugo-content
summary: "In this short post, I will demonstrate how easy embedding an iframe into any Hugo content can be. Using shortcodes to create a consistent and repeatable method of embedding content..."
date: 2024-04-14T00:00:00Z
tags: ["hugo", "markdown", "tutorial"]
author: barnz
---

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
repeatable method of embedding `iframe`s into our content.

## Content Security Policy

Depending on your
[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)
headers, you might find that the `iframe` refuses to load. The header `X-Frame-Options`
controls this. By setting the value to `SAMEORIGIN`, it will, as the name suggests,
allow you to load `iframe`s from the same origin.

If you want to load a resource from an external origin, you will need to
modify your `Content-Security-Policy` header, specifically the `frame-ancestors`
policy. You can read more about that header
[here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors).
