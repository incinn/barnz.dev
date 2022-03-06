---
title: 'Markdown Formatting Demo'
date: 2022-03-05T13:07:39Z
slug:
coverImage:
externalLink:
---

This is post contains all formatting for posts...

<!--more-->

Lorem ipsum dolor sit amet, _consectetur_ adipisicing elit, sed do eiusmod
tempor incididunt ut **labore et dolore magna aliqua**. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisiudut aliquip ex ea commodo
consequat. **_Duis aute irure dolor_** in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. ~~Excepteur sint occaecat~~ cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## H2

Lorem ipsum dolor sit amet, _consectetur_ adipisicing elit, sed do eiusmod
tempor incididunt ut **labore et dolore magna aliqua**. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat.

---

**_Duis aute irure dolor_** in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. ~~Excepteur sint occaecat~~ cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### H3

unordered list:

-   item-1
    -   sub-item-1
    -   sub-item-2

*   item-2
    -   sub-item-3
    -   sub-item-4

-   item-3
    -   sub-item-5
    -   sub-item-6

ordered list:

1. item-1
    1. sub-item-1
    2. sub-item-2
2. item-2
    1. sub-item-3
    2. sub-item-4
3. item-3

#### Header4

| Table Header-1                                                                              |        Table Header-2         |              Table Header-3 |
| :------------------------------------------------------------------------------------------ | :---------------------------: | --------------------------: |
| Table Data-1                                                                                |         Table Data-2          |                Table Data-3 |
| TD-4                                                                                        |             TD-5              |                        TD-6 |
| Table sajdhkaksjhdkahsdas,djasljdhkasjhkajshdkajshdjkashdaksdjhaksdhaksjdhaksdhaksjdhData-7 |         Table Data-8          |                Table Data-9 |
| Table Data-7                                                                                | Table Dataskdhajkshdkjhasda-8 |                Table Data-9 |
| Table Data-7                                                                                |         Table Data-8          | Table Dataasdasdasdasdasd-9 |

##### Header5

You may also want some images right in here like ![GitHub Logo](https://cloud.githubusercontent.com/assets/5456665/13322882/e74f6626-dc00-11e5-921d-f6d024a01eaa.png 'GitHub') - you can do that but I would recommend you to use the component "image" and simply split your text.

###### Header6

Let us do some links - this for example: https://github.com/MinhasKamal/github-markdown-syntax is **NOT** a link but this: is [GitHub](https://github.com/MinhasKamal/github-markdown-syntax)

```html {linenos=table,linenostart=1}
<span class="test">Hello world</span>
```

```js {linenos=table,linenostart=1}
console.log('Hello world');
```

---

```html {linenos=table,hl_lines=["2-4"],linenostart=1}
<!-- partial header example -->
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Test</title>
</head>
```

`foo` and `bar`

```go {linenos=table,hl_lines=[3, 7],linenostart=1}
// This is a comment
package main
import "fmt"

// Main function
func main() {
  fmt.Println("!... Hello World ...!")
}
```
