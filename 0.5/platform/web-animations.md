---
layout: default
title: About web animations
type: start
shortname: Platform
subtitle: polyfill

feature:
  spec: https://w3c.github.io/web-animations/
  code: https://github.com/web-animations/web-animations-js
  summary: "Web Animations defines APIs for synchronizing several of the web's animation models with complex, scriptable animations."

---

<!-- TODO(ericbidelman): remove when Toolkit builds in Web Animations. -->
<!-- <script src="/toolkit/platform/web-animations-js/web-animations.js"></script> -->

{% include spec-header.html %}

{% include toc.html %}

## Why Web Animations?

Several animation-related specifications already exist on the web platform: [CSS Transitions](http://dev.w3.org/csswg/css-transitions/),
[CSS Animations](http://dev.w3.org/csswg/css-animations/), and `requestAnimationFrame()`. However:

- *CSS Transitions / CSS Animations are not very expressive* - animations can't
be composed, or sequenced, or even reliably run in parallel; and animations can't be tweaked from script.
- *`requestAnimationFrame()` is not a declarative approach* - it requires the use
of the main thread, and will therefore jank if the main thread is busy.

Web Animations is a new specification for animated content on the web. It's being
developed as a W3C specification as part of the CSS and SVG working groups. It aims
to address the deficiencies inherent in these specifications. Web Animations also aims to replace the underlying implementations of CSS Transitions and CSS Animations, so that:

- The code cost of supporting animations on the web is reduced.
- The various animations specifications are interoperable.
- Spec authors and browser vendors have a single place to experiment with new animation innovations to improve the Web for the future.

## Basic usage

Here's a simple example of an animation that scales and changes the opacity of
a `<div>` over 0.5 seconds. The animation alternates producing a pulsing effect.

    <div class="pulse" style="width:150px;">Hello world!</div>
    <script>
      var elem = document.querySelector('.pulse');
      var player = elem.animate([
        {opacity: "0.5", transform: "scale(0.5)"},
        {opacity: "1.0", transform: "scale(1)"}
      ], {
        direction: "alternate", duration: 500, iterations: Infinity
      });
    </script>

For more information on this `Animatable` interface, see the [specification](https://w3c.github.io/web-animations/#the-animatable-interface). It's supported natively in Chrome and Opera, and available with the [web-animations.min.js polyfill](https://github.com/web-animations/web-animations-js#web-animationsminjs) on other modern browsers.

## The animation model

The Web Animations model is a description of an engine for animation content on the web. In browsers like Chrome, the engine is sufficiently powerful to support CSS animations.

Web Animations also exposes a JS API to the model. This API defines a number of
new interfaces that are exposed to JavaScript. We'll go through some of the more
important ones here: `KeyframeEffect`, `AnimationEffectReadOnly`, `AnimationEffectTiming`, and `Animation`.

## Specifying animation effects

A `KeyframeEffect` object defines a single keyframe effect that applies to a single element target. For example:

    var effect = new KeyframeEffect(targetElement,
        [{left: '0px'}, {left: '100px'}], 2000);

Here, the target element's "left" CSS property is modified smoothly from `0px` to `100px` over 2 seconds. It's a subclass of `AnimationEffectReadOnly`, which provides timing configuration.

Note! Animating the "left" property is good for simple sites, but it will cause the browser to run layout on every frame. Regardless of your approach to animation, try to stick to animating "tranform" and "opacity" for the greatest performance.

### Animating between keyframes

A `KeyframeEffect` controls one or more properties/attributes by linearly
interpolating values between specified keyframes. KeyframeEffects are usually
defined by specifying a sequence of keyframes, each including an offset and the property-value pair in a dictionary:

    [
      {offset: 0.2, left: "35px"},
      {offset: 0.6, left: "50px"},
      {offset: 0.9, left: "70px"},
    ]

If the offset is not specified, keyframes are evenly distributed at offsets
between 0 and 1.

    [{left: "35px"}, {left: "50px"}, {left: "70px"}]

See the [specification](https://w3c.github.io/web-animations/#keyframe-effects) for the details
of the keyframe distribution procedure, and how keyframe effects are
evaluated at offsets outside those specified by the keyframes.

### Animating along paths

Use the `KeyframeEffect` along with the CSS `motion-path` and `motion-offset` properties to animate an object along a path. These are upcoming CSS features, supported natively in Chrome 46+.

    .object {
      motion-path: path("M 100,100 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0");
    }

    <div class="object">Hello world!</div>
    <script>
      var object = document.querySelector('.object');
      var player = object.animate([
        {'motion-offset': '0%'},
        {'motion-offset': '100%'}
      ], {
        duration: 2000, easing: 'ease-in-out'
      });
    </script>

For more information on `motion-path`, see the [specification](http://www.w3.org/TR/motion-1/).

### Custom animation effects

Setting the `onsample` property of a `KeyframeEffect` allows animations to generate call-outs to JavaScript
rather than manipulating properties directly.

    var myEffect = new KeyframeEffect(element, [], 1000);
    effect.onsample = function(timeFraction, effect, animation) {
       effect.target.style.opacity = timeFraction;
    };
    var myAnimation = document.timeline.play(myEffect);

As this is an experimental feature, for more information, see the release notes of the [JavaScript polyfill](https://github.com/web-animations/web-animations-js/releases/tag/2.1.1).

## Sequencing and synchronizing animations

Two different types of groups (`GroupEffect` and `SequenceEffect`) allow animations to be synchronized and sequenced.

To play a list of animations in parallel:

    var groupEffect = new GroupEffect([new KeyframeEffect(...), new KeyframeEffect(...)]);

To play a list in sequence:

    var sequenceEffect = new SequenceEffect([new KeyframeEffect(...), new KeyframeEffect(...)]);

Because `KeyframeEffect`, `GroupEffect`, `SequenceEffect` are all TimedItems, groups can be nested:

    var groupEffect = new GroupEffect([
      new SequenceEffect([
        new KeyframeEffect(...),
        new KeyframeEffect(...),
      ]),
      new KeyframeEffect(...)
    ]);

Groups also take an optional `AnimationEffectTiming` parameter (see below), which among other things allows iteration and timing functions to apply at the group level:

    var groupEffect = new GroupEffect(
      [new KeyframeEffect(...), new KeyframeEffect(...)],
      {iterations: 4});

## Controlling the animation timing

Timing objects are used to control the internal timing of an animation (players control how an animation progresses relative to document time). The `AnimationEffectTiming` object has several properties that can be tweaked:

- **duration**: the duration of a single iteration of the animation
- **iterations**: the number of iterations of the animation that will be played (fractional iterations are allowed)
- **iterationStart**: the start offset of the first iteration
- **fill**: whether the animation has effect before starting the first iteration and/or after finishing the final iteration
- **delay**: the time between the animation's start time and the first animation effect of the animation
- **playbackRate**: the rate at which the animation progresses relative to external time
- **direction**: the direction in which successive iterations of the animation play back
- **easing**: fine-grained control over how external time impacts an animation across the total active duration of the animation.

The values provided within `AnimationEffectTiming` combine with the animation hierarchy
to generate concrete start and end values for animation iterations, animation
backwards fills, and animation forwards fills. There are a few simple rules which govern this:

- Animations never extend beyond the start or end values of their parent iteration.
- Animations only fill beyond their parent iteration if:
    - the relevant fill value is selected for the animation;
    - the matching fill value is selected for the parent; and
    - this is the first parent iteration (for `fill: 'backwards'`, `fill: 'both'`) or last parent iteration (for `fill: 'forwards', fill: 'both'`)
- Missing `duration` values for `AnimationEffectTiming` are generated based on the calculated durations of the child animations.

The following example illustrates these rules:

    var groupEffect = new GroupEffect([
      new SequenceEffect([
        new KeyframeEffect(..., {duration: 3000}),
        new KeyframeEffect(..., {duration: 5000, fill: 'both'})
      ], {duration: 6000, delay: 3000, fill: 'none'}),
      new KeyframeEffect(..., {duration: 8000, fill: 'forwards'})
    ], {iterations: 2, fill: 'forwards'});

In this example:

- The `SequenceEffect` has an explicit `duration` of 6 seconds, and so the
second child animation will only play for the first 3 of its 5 second duration
- The `GroupEffect` has no explicit duration, and will be provided with a
calculated duration of the max (`duration + delay`) of its children - in this case 9 seconds.
- Although `fill: "both"` is specified for the second `KeyframeEffect` within the `SequenceEffect`, the `SequenceEffect` itself has a `fill` of "none". Hence, as the animation ends right at the end of the `SequenceEffect`, the animation will only fill backwards, and only up until the boundary of the `SequenceEffect` (i.e. 3 seconds after the start of the `GroupEffect`).
- The `KeyframeEffect` inside the `GroupEffect` and the `GroupEffect` are both `fill: "forwards"`. Therefore the animation will fill forward in two places:
    - from 8 seconds after the `GroupEffect` starts until the second iteration of the `GroupEffect` starts (i.e. for 1 second)
    - from 17 seconds after the `GroupEffect` starts, extending forward indefinitely.

## Playing Animations

In order to play an `MotionEffect` or other `AnimationEffectReadOnly` (such as a group or sequence), an `Animation` must be constructed:

    var animation = document.timeline.play(myEffect);

Animations provide complete control the start time and current playback head of their attached animation. However, players can't modify any internal details of an animation.

Animations can be used to pause, seek, reverse, or modify the playback rate of an animation. For more information on these operations, check out [this Web Updates blogpost](https://developers.google.com/web/updates/2014/12/web-animation-playback?hl=en).


{% include other-resources.html %}
