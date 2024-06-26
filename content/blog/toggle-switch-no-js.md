---
title: "Toggle switch without JavaScript"
slug: toggle-switch-no-javascript
date: 2023-01-27T00:00:00Z
summary: "Sometimes you need a simple toggle switch, without all the hassle of using JavaScript. This short tutorial will hold your hand through creating just that..."
tags: ["css", "sass", "tutorial"]
author: barnz
---

## Requirements

In this tutorial, I will make the following assumptions:

- You have some experience with {{< abbr "HTML" "Hyper Text Markup Language" >}}
- You are aware how form elements such as `input` and `label` work together
- You are comfortable with {{< abbr "CSS" "Cascading Style Sheets" >}} and {{< abbr "SASS" "Syntactically Awesome Style Sheets" >}}

## The result

Here is an example of the toggle switch we are going to create together. It's okay to be excited.

{{< embed "/embeds/no-js-toggle-switch.html" "100" >}}

## 1: Structure

First things first. We need some elements on the page:

```HTML
<label class="toggle" for="myInput">
    <input type="checkbox" name="myInput" id="myInput" />
    <div class="toggle__fill"></div>
</label>
```

Here we have a `label` element that contains a checkbox `input`, and we created an empty `div` next to it. The `label`'s `for` attribute is tied
to the checkbox element, which means clicking on the label - or anything within the label - will toggle the value between checked
and unchecked.

## 2: Colouring in

Now the boring part is out of the way, we can start making something that looks more like a toggle switch!

We will be making use of the empty `div` element we added earlier for the container of the switch. And we can utilize the
[`::after`](https://developer.mozilla.org/en-US/docs/Web/CSS/::after) selector to create a pseudo element at the end of it,
which will become the "button" that moves from left to right to signify whether or not the checkbox is active.

```SASS
.toggle {
    display: inline-block;
    cursor: pointer;

    &__fill {
        position: relative;
        width: 50px;
        height: 25px;
        border-radius: 12.5px;
        border: 1px solid #A6A6A6;
        background-color: #FFF;

        &::after {
            content: "";
            position: absolute;
            top: -1px;
            left: -1px;
            height: 25px;
            width: 25px;
            background-color: #EEE;
            border: 1px solid #A6A6A6;
            border-radius: 12.5px;
        }
    }
}
```

The positioning here is important. We need to make sure that `.toggle__fill` has its position set to `relative`
so that all the child elements (and pseudo elements) can position themselves in relation to it.

We then need to add `position: absolute;` to our pseudo element, and can precisely position it in relation to `.toggle__fill` with `top` and `left`.

## 3: Hide the input

Now we can safely hide the checkbox element from the page:

```SASS{hl_lines=["3-5"],linenostart=2}
    cursor: pointer;

    input[type="checkbox"] {
        display: none;
    }

    &__fill {
```

## 4: Movement

At this point we have a plain looking toggle that does absolutely nothing when you click it. Let's change that.

The magic here comes from the [`:checked`](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked) pseudo selector, which
allows us to target elements differently based on whether or not the checkbox is checked. Along with
the [general sibling combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator) `~` (which
helps us select the relevant sibling elements) allows us to complete the toggle effect:

```SASS{hl_lines=["4-12"],linenostart=4}
    input[type="checkbox"] {
        display: none;

        &:checked {
            ~ .toggle__fill {
                background-color: #A2EAB9;
            }

            ~ .toggle__fill::after {
                transform: translateX(25px);
            }
        }
    }
```

## 5: Smooth transitions

Now our toggle snaps quickly from left to right, then back again when we click it. This is very jarring, not to mention ugly. We can do better.

Using the `transition` property we can smooth out the change between the two states:

```SASS{hl_lines=[8, 20],linenostart=20}
    &__fill {
        position: relative;
        width: 50px;
        height: 25px;
        border-radius: 12.5px;
        border: 1px solid #A6A6A6;
        background-color: #FFF;
        transition: background-color 500ms;

        &::after {
            content: "";
            position: absolute;
            top: -1px;
            left: -1px;
            height: 25px;
            width: 25px;
            background-color: #EEE;
            border: 1px solid #A6A6A6;
            border-radius: 12.5px;
            transition: transform 400ms;
        }
    }
```

You might want to think about adjusting the transition speed for users who have `prefers-reduced-motion` set:

```SASS{linenostart=40}
@media (prefers-reduced-motion) {
    transition: transform: 100ms;
}
```

## Switch it up

So there you have it! A simple toggle switch created from three simple HTML elements and a handful of CSS sprinkles.

The biggest benefit I've found of building UI this way is that you add interactivity for browsers where JavaScript is disabled.

But that's not it. You can use this method to create more than just toggle switches. I've used this method
to create dropdown menus and modals. It's suitable for almost anything that has a "toggle" nature to it. For a live example
[my website](https://barnz.dev)'s settings menu, mobile navigation and language switcher are all built like this.
