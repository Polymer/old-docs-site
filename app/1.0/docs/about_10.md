---
layout: default
type: about
title: About Polymer 1.0
---

<style>
  .benchmark img {
    max-width: 500px;
  }
  .benchmark figcaption {
    font-weight: bold;
    margin-bottom: 16px;
  }
</style>

<!-- toc -->


The 1.0 release of the Polymer core library is now out.

This release is optimized for performance and size. We're working hard on filling out the feature set.  See the [roadmap](#roadmap) for more detailed
timelines.

<div class="alert alert-error"><strong>BREAKING CHANGES.</strong>
This release is <strong>not compatible with the 0.5 APIs.</strong></div>

*   For guidance on migrating an existing 0.5 element to the 1.0 APIs,
    see the <a href="migration.html">Migration guide</a>.

*   For changes between 0.8 and 1.0, see the <a href="release-notes.html">
    Release notes</a>.


## Highlights

* Dramatically faster startup time and runtime performance than 0.5, even in Chrome where web components are natively supported.
* Significantly smaller payload than 0.5.
* Completely refactored internally to be clearly layered and much less complex.
* Brand new data-binding system that is simpler, faster, offers tighter control, and is easier to debug.
* Brand new, lightweight shadow DOM shim called `shady DOM`, that lets you avoid the complexity, size, performance penalty, and invasiveness of the shadow DOM polyfill.
* Upper bound _and lower bound_ scoped styling, even without native shadow DOM: scoped styles don’t bleed out, and children in their own roots are protected from descendant selectors in a shadow root.

There's a lot more to 1.0—check out the [Developer guide](devguide/feature-overview.html) for
the run-down of all the features.

## Benchmarks {#benchmarks}

As a sample of the performance difference between 0.5 and 1.0,
the results from our `medium-list` benchmark was that Polymer 1.0 was about 3x faster on Chrome and 4x faster on Safari. The benchmark measures time to first
paint for an application with a few thousand nested custom elements, with data
binding.

You can find the benchmark code [on
GitHub](//github.com/polymerlabs/benchmarks/). As with all benchmarks, your
mileage may vary. Please try it out or create your own tests—we'd love
to see them.

## Roadmap {#roadmap}

The following is a high-level outline of our plans for the library post-1.0.

#### Gestures

Polymer 0.5 had a fairly robust gesture recognition system—1.0 includes [basic gestures](/1.0/docs/devguide/gesture-events) as part of the core library. More sophisticated gestures may be added in a future release as an optional components.

#### Shady DOM Interoperability

The shady DOM system is new to Polymer in 1.0, and radically improves
performance and decreases the size of the polyfill needed to run on browsers
that don’t support shadow DOM natively. The shadow DOM polyfill was optimized
for correctness, though it remained impossible to perfectly polyfill shadow DOM.
Shady DOM is optimized for speed.

If you're curious about the motivation behind creating shady DOM, see [What is shady dom?](../articles/shadydom.html).

In the immediate future we’ll be exploring improvements to the shady DOM system to improve interoperability with other frameworks.  Shadow DOM is of course the ultimate primitive to allow for interoperability, but with shady DOM we may be able to shim such interoperability to a significant degree, focusing on common interoperability use cases.

#### Cross-scope styling

The "theming problem"—you want to be able to easily style Polymer
elements from the outside, but `::shadow` and `/deep/` proved to be a poor solution and are slated
to be removed from the Shadow DOM spec. This release includes a robust [system for ergonomic
cross-scope styling](/1.0/docs/devguide/styling#xscope-styling-details) inspired by and based on
[CSS Custom Properties](http://dev.w3.org/csswg/css-variables/).

We’ll continue to refine and improve the performance of this system. We’ll also be exploring new features around mixing in bags of properties to be redistributed to individual child elements, as well as passing arguments to mixins.


#### Binding features

There are a few binding and template features we’ll be working on.

We’ll explore growing support for parser-challenged elements like `<table>` in `<dom-repeat>`’s.

We’ll also be adding in support for compound binding and string interpolation in bindings:

```
<div>Dear {{ title }} {{ lastName }},</div>
```

Finally, we’ll be exploring adding in a layer for using Object.observe to power the data-binding system.

#### Contributing shady DOM to web components polyfills

We’d like to explore modularizing the shady DOM shim to be able to utilize its manipulation of scoped DOM sub-trees outside of Polymer. We’d love to be able to add this very lightweight and performant system to the broader set of web component polyfills as an alternative to the shadow DOM polyfill.

#### Pre-processing stylesheets

Currently Polymer uses a run-time shim for CSS custom properties to enable theming and styling elements. If you know that your styles won’t change dynamically, there is a potential performance improvement to realize by calculating all the resulting styles in advance.

We’re working on building a tool—either as an extension to `vulcanize` or as a separate package—that will allow you to generate all the cross-scope styling at build-time, and bump performance a bit.

#### Tooling

The Polymer team is devoting a lot of work to tooling. There are four tools in our immediate sights to work on post-1.0:

- Stylesheet preprocessor.
- Polymer linter to help catch common errors that come up when developing with Polymer.
- “Data explorer” to help visualize data flow within a Polymer application.
- A tool to help teams manage releases for large numbers of inter-dependent elements—we certainly are in dire need of this ourselves!


#### Inheritance

Inheritance is a great feature introduced with native Custom Elements. 1.0
supports extending native HTML elements using the `is` attribute, but doesn’t
yet support extending custom elements. There are two main reasons that this has
so far landed outside the 1.0 scope:

1) it is a more complex problem to solve than it was in 0.5 given some of the performance optimizations we have made.
2) from building lots and lots of elements, we've found that you can get nearly 100% of the way using Polymer’s “behaviors” mechanism and composition.

That said, there are certainly some legitimate use-cases for true custom element
inheritance, and we fully plan to support inheritance to the extent that it
existed in 0.5.


## FAQ's

_We'll update this section as asked-questions become frequently-asked._

#### Where did the elements go?

Not all elements have been ported to the current release, but we're porting them
as fast as we can. You can find the updated elements on the all-new [Element catalog](https://elements.polymer-project.org).

The elements are being reorganized into more consistent product lines, including:

*   Iron elements. Basic elements that don't express a visual style.
    Most of the old `core-` elements are being renamed to `iron-`.
    Some former `core-` elements that implemented material design (such as `core-toolbar`,
    `core-menu`, `core-header-panel`) are being migrated to `paper-`.

*   Paper elements. Material design elements. All of the old `paper-` elements,
    plus a few of the old `core-` elements.

*   Neon elements. Animation elements.

#### Will you continue to support Polymer 0.5?

We recognize that many projects rely on 0.5, and won’t be able to switch to the
new codebase  until the elements are ready. We’ll continue viewing and merging PR’s until the
elements are ported.  We intend for 1.0 to be the new baseline though, and to
work within this high-performance, production-ready mindset going forward. Any
incremental 0.5 releases, if needed, will be available in a branch.

#### Where and how can I give feedback on this release?

Checkout our [contributing guide](https://github.com/Polymer/polymer/blob/master/CONTRIBUTING.md)
for the full rundown of how to contribute. The best place for feedback is on Github, [by filing an
issue](https://github.com/polymer/polymer/issues), adding to an existing one, or
submitting a pull request.  Feedback and contributions are critical to
keeping Polymer successful.

Pull requests tend to be the clearest way of
expressing an idea or change, but short of a pull request, as much detail as you
can add around your use-case will help us and the broader community better
understand the question or suggestion.


## Next steps

Continue on to the Polymer docs:

<a href="/1.0/docs/devguide/quick-tour" class="blue-button vertical">Try Polymer</a><br>
<a href="/1.0/docs/devguide/feature-overview" class="blue-button vertical">Developer guide</a><br>
<a href="/1.0/docs/migration" class="blue-button vertical">Migration guide</a>
