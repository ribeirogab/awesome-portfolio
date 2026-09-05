---
title: Visual regression checks for every handoff
date: 2025-11-03
tag: Engineering
excerpt: How a single screenshot diff per pull request removed the most awkward conversation in client work.
---

## The awkward conversation

Every studio knows the message: "something looks different on the homepage." Nobody changed the homepage. Somebody changed a shared component, and the homepage was the one place that noticed.

For years the answer was a careful human clicking through every page before a handoff. It worked, until the site had forty pages and the human had a deadline.

## One diff per pull request

We now render every page of a client site at three widths on each pull request and compare the images against the last approved set. The tooling is not exotic. What changed is the rule: a visual diff is a required check, and a red diff blocks the merge until someone looks at it.

The surprising part was how rarely the diff was a bug. Most of the time it was an intentional change that nobody had told the rest of the team about. The check turned into a communication tool before it turned into a safety net.

## What it costs

About ninety seconds per pull request, and a small folder of reference images that lives with the code. Cheaper than one awkward message.
