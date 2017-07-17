---
title: An Update on Neon Animation
---

You are probably here because you've probably seen this message on [`neon-animation`](https://github.com/PolymerElements/neon-animation).

> ⚠️ This element is now deprecated ⚠️

 and to you this may seem like

 > 🔥 This element is now deprecated 🔥

Well, rest easy, because nothing is actually changing. By deprecated we mean that we will keep the element as-is. There won't be any major changes or any new features coming to it, so if it works for you, it should keep working for you.

## Why is this happening?
Animations provide continuity between your page’s states through movement. This continuity should help users easily identify objects on your page and relationships between them. For example, a page sliding animation triggered by a user changing tabs shows the spatial relationship of two pages. It provides the user an idea of the interaction model of your site: they can imagine the shape of the off-screen elements. An animation typically represents a transition that takes place in response to user interaction.

On the other hand, the element model represents one state of an object, not a transition between states. An input can be enabled or disabled; a paper-button can be elevated or flat. An element can be at position x, y, but it can't be moving to x' y'. The element model can describe the relation between visual components and provide affordances to the user by changing its properties over time, but the element model at a static state cannot intrinsically provide relation or affordance. This is where `neon-animation` went wrong: it tried to shove the entire animation space into the element model which is similar but fundamentally incompatible.

Simply put, `neon-animation` makes animation more complicated than it needs to be. Making performant animations is hard enough as it is. The `neon-animation` API requires you to use a proprietary JSON configuration object instead of the native animation interfaces (CSS keyframe animations, CSS transitions, and the web animations API) which already describe the states of an animation clearly.

Animations are incredibly powerful, but thinking about animations through `neon-animations` limited the scope of what could be achieved.

For these reasons, we're not planning on maintaining the package going forward.

## What should I do?
If you're creating a new element from scratch, we recommend using CSS keyframe animations, CSS transitions, or the Web Animations API.

If you're using another element from the PolymerElements org that depends on `neon-animation`, like `iron-dropdown` or `paper-menu-button`, don't sweat it. We'll replace these animations.

If you're using `neon-animation` directly, you should start planning to eventually move off it.

## What about sharing animations?
`neon-animation` gives the appearance of having a shared approach to animations, but in reality it provides a non-standard, JSON structure that then configures and fills in the parameters for the Web Animations API. This unfortunately locks you into our ill-defined animations API, when all you want is to apply a set of pre-defined parameters into the Web Animations API.

What does it mean to share an animation? If the goal is to have a set of elements play the same animation in different parts of the code, then sharing an animation is the same as defining a set of keyframes and applying them to different elements. The question then becomes: how do you share a stylesheet or a javascript object / function across your project? There are many ways to do this: HTML imports, javascript modules, mixins, namespacing, XHRs to name a few. There is not a one-size-fits-all approach here: use what makes sense in your situation.

Sharing is easy if you restrict the probability space of your animation down to something as simple as a sequence of predefined states or keyframes. If the goal is instead to share an animation concept with infinite flexibility, then you’d essentially be exposing the entire animations API and reinventing the wheel.

## Alternatives
As I've mentioned, animations have not gone away, they're still here in the platform. There are 3 different alternatives that we suggest (in no particular order):

1. CSS Keyframe Animations
2. Web Animations API
3. CSS Transitions

A quick TL;DR of the pros and cons of each:

1. __CSS Keyframe Animations__
    * Pros:
        * Simple
        * Declarative
        * Decoupled from JS
        * Well-supported
    * Cons:
        * Hard to change
        * Harder to share
2. __Web Animations API__
    * Pros:
        * Easy replacement for `neon-animation`
        * Can do everything CSS Keyframes can do
        * Easy to change
        * Easy to share
    * Cons:
        * Requires Polyfill
3. __CSS Transitions__
    * Pros:
        * Quick for simple animations
        * Easy to share
        * Easy to change
    * Cons:
        * Animates on changes
        * Difficult to perform multi-step animations

For more tips on what to use when, I highly recommend [_CSS Versus JavaScript Animations_](https://developers.google.com/web/fundamentals/design-and-ui/animations/css-vs-javascript) by the Chrome Developers.

### CSS Keyframe Animations
CSS Keyframe animations are great because they provide great control over animations. Ways they do this: they introduce the concept of a Keyframe which essentially represent a CSS snapshot at a specific percentage of an animation's timeline, CSS Keyframes also provide a nice, declarative syntax to define an animation by stylistically decoupling animations into the CSS. Another nice thing about CSS Keyframes is that they have been [supported](http://caniuse.com/#search=css%20animation) (prefixed) since Obama's first term (unprefixed around when [The Weeknd](https://www.youtube.com/watch?v=KEI4qSrkPAs) stopped feeling their face).

What makes them not so great is trying to make changes to the keyframes; it's possible but it's ugly, painful, and not always efficient. This makes it difficult to make “dynamic” animations that calculate keyframes. Additionally, they must be defined in the same document or scope as the animating element which makes sharing these animations slightly more difficult requiring a mixin or a Polymer shared style.

The basics of CSS Keyframe animations are well-covered by [Mozilla](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations).

### Web Animations API
The [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) is a great all-around replacement as `neon-animation` was designed around the Web Animations API. It  does everything the CSS Keyframe Animations do, but it also has the luxury of being in Javascript and thus can make changes on the fly. The web animations API is natively supported in Chrome & Firefox, with a [polyfill](https://github.com/web-animations/web-animations-js) required in other browsers [other browsers](http://caniuse.com/#search=web%20animations%20api).

[Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API) has a good intro to the API.

### CSS Transitions
CSS Transitions allow you to animate changes in CSS properties. Transitions can also easily be set via javascript so you don't run into the same issues as CSS Keyframe animations.

The largest limitation of CSS Transitions is that they make it difficult to coordinate animations involving multiple properties or multiple states.

Here's a trusty [MDN link](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions) on how to use them.

## Conclusion
To Sum up:

* If you're using another element from the PolymerElements org that depends on `neon-animation`, like `iron-dropdown` or `paper-menu-button`, you don't have to do anything. We'll replace these animations.
* If you're creating a new element from scratch, we recommend using CSS keyframe animations, CSS transitions, or the Web Animations API.
* If you're using `neon-animation` directly, you should start planning to eventually move off it, and use one of the platform's animation APIs instead.

Still not sure what these APIs look like? We'll share some examples in a future blog post.

## Recommended Reading
* [CSS Versus JavaScript Animations](https://developers.google.com/web/fundamentals/design-and-ui/animations/css-vs-javascript)
* [Animations and Performance](https://developers.google.com/web/fundamentals/design-and-ui/animations/animations-and-performance)
* [Creating Usability with Motion: The UX in Motion Manifesto](https://medium.com/ux-in-motion/creating-usability-with-motion-the-ux-in-motion-manifesto-a87a4584ddc)
* [FLIP Your Animations](https://aerotwist.com/blog/flip-your-animations/)
* [Perofrmant expand & collapse animations](https://medium.com/@valdrinkoshi/performant-expand-collapse-animations-93d99e80f7f)
