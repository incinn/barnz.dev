---
title: "Restore a Suspended Process"
date: 2022-04-12T00:00:00Z
summary: "Have you ever accidentally hit CTRL+Z while working in a terminal and seemingly lost your current process with no idea how to get it back? Yeah, me too..."
draft: false
tags: ["linux"]
author: barnz
---

TLDR: use `fg` to bring the process back to the **foreground**.

## Suspending

Suspending a process is actually pretty useful when you intend to do it.

Imagine you have a long running process. Maybe you're running a backup, or uploading to a remote server. You don't want to kill the process, you just want to pause it temporarily so you can get something else done.

Pressing `CTRL+Z` will suspend the **current process**, freeing up your terminal so you can work on something else. When ready to return, run `fg`.

## So what exactly does `CTRL+Z` do?

It sends a `TSTP` signal to the process currently in the foreground. This signal is designed to "politely" suspend a process. As this singal isn't forceful, processes can choose to ignore it.

Once suspended, the process will await the `CONT` signal to continue.

## Bring it back!

The `fg` command brings a suspended process back to the **foreground** with a `CONT` signal. If you have multiple suspended processes, you'll need to specify which process you want to bring back.

To see all suspended processes, run `jobs -l` to list them out. The output would look something like this:

```bash {linenos=false}
[4]+ 6161 Stopped       ping barnz.dev
```

Choose from the list of processes by either the index in the list, or the command. For example, both of these will bring the `ping` process back to the foreground:

```bash {linenos=false}
fg %4
fg %ping
```
