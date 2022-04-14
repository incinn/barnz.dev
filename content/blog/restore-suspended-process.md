---
title: 'Restore Suspended Processes'
date: 2022-04-12T00:07:12Z
draft: false
tags: ['linux']
author: barnz
---

Have you ever accidentally hit `CTRL+Z` while working in the terminal, losing your current process with no idea how to get it back? Same.

<!--more-->

TLDR: type `fg` to bring the proccess back to the 'foreground'.

## Suspening a Process

Suspending a process is actually pretty useful, when you intend to do it. Imagine this: You have a long running process, maybe you're monitoring log files or pinging a remote server. You don't want to kill the process only to have to start it up again. Suspending it will allow you to pick back up right where you left off. Peak effeciency.

## What exactly does `CTRL+Z` do?
Hitting `CTRL+Z` sends a `SIGTSTP` signal. This is designed to suspend a process, though it can be ignored. Once suspended, process will then be waiting for the `SIGCONT` signal to continue.

## Ok, so what does `fg` do?
It brings a suspend process back to the foreground. You can suspend multiple processes and choose between. To see all your suspended processes you can run `jobs -l` to list them out, which would look something like this:

```bash {linenos=false}
[4]+ 6161 Stopped       ping barnz.dev
```

You can then choose from the list of suspended processes by either its index in the list, or the command. For example, both of these will resume the `ping` process:

```bash {linenos=false}
fg %4
fg %ping
```
