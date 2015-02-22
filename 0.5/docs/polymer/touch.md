---
layout: default
type: guide
shortname: Docs
title: Touch &amp; gestures
subtitle: Guide
---

{% include toc.html %}

## Why polymer-gestures?

Mouse events and Touch events are fundamentally different beasts in browsers
today, and that makes it hard to write cross-platform apps.

For example, a simple finger paint app needs plenty of work to behave correctly
with mouse and touch:

- Mouse events are only fired after the touch sequence ends.
- Mouse events are not fired on elements without a click event handler. One must
  be attached by default, or directly on the element with "onclick".
- Click events are not fired if the content of the page changes in a mousemove
  or mouseover event.
- Click events are fired 300ms after the touch sequence ends.
- More information: [Apple Developer Documentation](http://developer.apple.com/library/safari/#documentation/appleapplications/reference/safariwebcontent/HandlingEvents/HandlingEvents.html).

Current platforms that implement touch events also provide mouse events for
backward compatibility; however, only a subset of mouse events are fired and the
semantics are changed.

Additionally, Touch events are sent only to the element that received the
touchstart. This is fundamentally different than mouse events, which fire on the
element that is under the mouse. To make them behave similarly, touch events
need to be retargeted with `document.elementFromPoint`.

These incompatibilities lead to applications having to listen to 2 sets of events, mouse on
desktop and touch on mobile.

**This forked interaction experience is cumbersome and hard to maintain.**

To reduce the overhead involved in managing both event systems, polymer-gestures provides a set of normalized events, which behave the same no matter what the source.

**Note:** Although Pointer Events provide a wonderful model to unify these different event systems, they can be difficult to polyfill in a performant fashion. The polymer-gestures library is designed to fill the gap until the web platform provides a native solution.
{: .alert }

## Basic Usage

By default, no polymer-gesture events are sent from an element. This maximizes the possibility that a browser can deliver smooth scrolling and jank-free gestures. If you want to receive events, you must set the `touch-action` property of that element. See the Web Fundamentals [guide to `touch-action`](https://developers.google.com/web/fundamentals/input/touch/touchevents/#control-gestures-using-touch-actions) for a primer. Below are a few examples:

1. Set up some elements to create events with the `touch-action` attribute.
  - `<div id="not-a-scroller" touch-action="none"></div>`
      - Generates events all the time, will not scroll
  - `<div id="horizontal-scroller" touch-action="pan-x">`
      - Generates events in the y axis, scrolls in the x axis
  - `<div id="vertical-scroller" touch-action="pan-y">`
      - Generates events in the x axis, scrolls in the y axis
  - `<div id="all-axis-scroller" touch-action="pan-x pan-y">`
      - Generates events only when tapping, scrolls otherwise
      - Can also have the value `pan-y pan-x` or `scroll`

2. Listen for the desired events
  - `down`: a pointer is activated, or a device button held.
  - `up`: a pointer is deactivated, or a device button released. Same target as `down`, provides the element under the pointer with the `relatedTarget` property
  - `tap`: a pointer has quickly gone down and up. Used to denote activation.
  - `trackstart`: denotes the beginning of a series of tracking events. Same `target` as `down`.
  - `track`: fires for all pointer movement being tracked.
  - `trackend`: denotes the end of a series of tracking events. Same `target` as `down`. Provides the element under the pointer with the `relatedTarget` property.
  - `hold`: a pointer is held down for 200ms.
  - `holdpulse`: fired every 200ms while a pointer is held down.
  - `release`: a pointer is released or moved.


1. As elements come and go, or have their `touch-action` attribute changed, they will send the proper set of polymer-gesture events.

## Examples

- [Simple Event Example](http://polymer.github.io/polymer-gestures/samples/simple/index.html)

## Library Limitations

### touch-action

According to the spec, the
[touch-action](https://dvcs.w3.org/hg/pointerevents/raw-file/tip/pointerEvents.html#the-touch-action-css-property)
css property controls whether an element will perform a "default action" such as scrolling, or receive a continuous stream of events.

Due to the difficult nature of polyfilling new CSS properties, this library will
use a touch-action *attribute* instead. In addition, run time changes involving
the `touch-action` attribute will be monitored for maximum flexibility.

Touches will not generate events unless inside of an area that has a valid `touch-action` attribute defined.
This is to maintain compositiong scrolling optimizations where possible.

**Note:** Opera 12-14, does not support changes to `touch-action` attribute, nor added or removed elements
{: .alert }
