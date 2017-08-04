---
title: Lazy Imports
---

<!-- toc -->

Normal HTML Imports are eager, meaning that they are loaded and evaluated in
order first, before any code that follows. You can get a large performance
improvement by lazily loading code at runtime, so that you only load the
minimal amount of code needed to display the current view. This is a key piece
of [the PRPL pattern](/2.0/toolbox/prpl).


