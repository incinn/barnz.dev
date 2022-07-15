---
title: 'Restore a Suspended Process'
date: 2022-04-12T00:00:00Z
draft: false
tags: ['linux']
author: barnz
---

Have you ever accidentally hit `CTRL+Z` while working in a terminal and seemingly lost your current process with no idea how to get it back? Yeah, me too.

<!--more-->

TLDR: use `fg` to bring the process back to the **foreground**.

## Suspending
Suspending a process is actually pretty useful when you intend to do it. Imagine you have a long running process. Maybe you're running a cpu intensive task that will take a long time to complete. You don't want to kill the process, you just want to pause it temporarily so you can get something else done.

Press `CTRL+Z`. This suspends the **current process**, freeing up your terminal so you can work on something else. When ready to return, run `fg`.

## So what exactly does `CTRL+Z` do?
Pressing `CTRL+Z` sends a `SIGTSTP` signal to the process running in the foreground. This is designed to suspend a process, though not mandatory, and some processes may choose to ignore it. Once suspended, the process will await the `SIGCONT` signal to continue.

## Okay, so what does `fg` do?
The `fg` command brings a suspended process back to the **foreground** with a `SIGCONT` signal. If there are multiple suspended processes, you'll need to specify which process you want to bring back. To see all suspended processes, run `jobs -l` to list them out. The output would look something like this:

```bash {linenos=false}
[4]+ 6161 Stopped       ping barnz.dev
```

Choose from the list of suspended processes by either the index in the list, or the command. For example, both of these will bring the `ping` process back to the foreground:

```bash {linenos=false}
fg %4
fg %ping
```
