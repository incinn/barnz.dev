---
title: "Toggle switch without JavaScript"
slug: toggle-switch-no-javascript
date: 2023-01-27T00:00:00Z
tags: ["css", "sass", "tutorial"]
author: barnz
---

Ever found yourself in need of an aestheticly pleasing, user friendly toggle switch for your form, but didn't want the hassle
of using JavaScript? Well, this tutorial is for you!

<!--more-->

**TLDR**: Complete example available on [Codepen](https://codepen.io/barnz/pen/bGjKxZj).

## Prerequisites

In this tutorial, I will make the following assumptions:

- You have some basic experience with **HTML**, especially form elements such as `input` and `label`
- You are comfortable with **CSS**, and understand **Sass**

## Step One: Structure

First things first. We need some elements on the page:

```HTML
<label class="toggle" for="myInput">
    <input type="checkbox" name="myInput" id="myInput" />
    <div class="toggle__fill"></div>
</label>
```

Here we have a `label` element that contains a checkbox `input`, as well as an empty `div`. The `label`'s `for` attribute is tied
to the checkbox element, which means clicking on the label - or anything within the label - will toggle the value between checked
and unchecked.

## Step Two: Colouring in

Now we have some structure on the page, we can begin creating our toggle switch.

We will be making use of the empty `div` element with the class `toggle__fill` for our toggle switch. We can utilize the
[`::after`](https://developer.mozilla.org/en-US/docs/Web/CSS/::after) selector to create a pseudo element at the end of
our `div`. This will become the "button" that moves from left to right to signify whether or not the checkbox is active.

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
so that all the child elements can position themselves in relation to it.

Then we add `position: absolute;` to our pseudo element which allows us to precisely position it within its parent.

## Step Three: Hide the input

Now we can safely hide the checkbox element from the page:

```SASS{hl_lines=["3-5"],linenostart=2}
    cursor: pointer;

    input[type="checkbox"] {
        display: none;
    }

    &__fill {
```

## Step Four: Movement

At this point we have a plain looking toggle that does absolutely nothing when you click it. Let's change that.

The magic here comes from the [`:checked`](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked) pseudo selector.
This allows us to target elements differently based on whether or not the checkbox is checked. This, along with
the [general sibling combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator) `~` which
helps us select the relevant sibling elements, allows us to create the toggle effect:

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

## Step Five: Smooth transitions

Our toggle now snaps quickly left to right, then back again when we click it. This is very jarring from a usability
standpoint. We can use the `transition` property to smooth this out a little:

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

## Conclusion

There you have it. A simple toggle switch that utilizes a checkbox input and a label. You can use this method to create
more than just toggle switches. You can use the same method to create dropdown menus, mobile menus, modals, really anything
that has a "toggle" nature to it.

On [my website](https://barnz.dev), the settings menu, mobile navigation and language switcher are all built using this method.
One of the biggest benefits of building UI interactions this way is that you add interactivity for browsers where JavaScript
might be disabled.

You can find a complete example I've put together on [Codepen](https://codepen.io/barnz/pen/bGjKxZj).
