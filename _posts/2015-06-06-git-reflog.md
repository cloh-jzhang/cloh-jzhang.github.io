---
layout: post
title:  "The reflog" 
date:   2016-06-06
---

**What is the reflog?**

The reflog is git's undo button.

As opposed to the centralized commit log, the reflog is a record of every commit that HEAD has referenced in your local repository. Actions recorded include: checking out a branch, stashing changes, and amending to a commit. 

**Example: Accidental Amend**

I'm in the middle of working on a bug fix. The tip of my commit log looks like:

```
jizhang-ld2| git log -n 1
commit 747011a6c8ec86c1dcfd568689681bf8da85acdb
Author: Jimmy Zhang <jizhang@linkedin.com>
Date:  Thu May 28 19:54:17 2015 +0000

Magical feature to increase stock price.
```
After squashing the bug, I accidentally amend my changes on top of the 'magical feature' commit. To fix my history, I need to (1) extract the bug fix changes from my now jumbled HEAD, and (2) store them in a new commit. 

**Solution**

Use the reflog. 

```
jizhang-ld2| git reflog
40aeaf9 HEAD@{0}: commit (amend): Magical feature to increase stock price.
747011a HEAD@{1}: commit: Magical feature to increase stock price.
```
HEAD@{0} references my current HEAD. The reflog contains my 'magical feature' commit before it was corrupted -  the parent pointer of my current HEAD, or HEAD@{1}. I temporarily reset the state of my repository to point there. 

```
git reset --soft HEAD@{1} 
```
 
After the reset, my bug fix is still saved on my filesystem. I can correctly store the changes in a new commit.

```
jizhang-ld2| git add .
jizhang-ld2| git commit -m 'bug fix'
jizhang-ld2| git log -n 2
commit 92f727902845ef1f17ff2b4999866b1642c79991
Author: Jimmy Zhang <jizhang@linkedin.com>
Date:   Thu May 28 20:04:54 2015 +0000

bug fix
    
commit 747011a6c8ec86c1dcfd568689681bf8da85acdb
Author: Jimmy Zhang <jizhang@linkedin.com>
Date:  Thu May 28 19:54:17 2015 +0000

Magical feature to increase stock price.
```

Remember the reflog, and use it your advantage. 