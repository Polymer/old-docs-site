---
layout: default
type: guide
title: Introducing Polymer 1.0
subtitle: About this release
shortname: Introducing
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

{% include toc.html %}


The 1.0 release of the {{site.project_title}} core library is now out.

This release is optimized for performance and size, and is not yet a 
feature-complete replacement for 0.5. We're working hard on getting to 
feature parity.  See the [roadmap](#roadmap) for more detailed
timelines.

<div class="alert alert-error"><strong>BREAKING CHANGES.</strong> 
This release is <strong>not compatible with the 0.5 APIs.</strong></div>

*   For guidance on migrating an existing 0.5 element to the 1.0 APIs, 
    see the <a href="docs/migration.html">Migration guide</a>.

*   For changes from 0.8 and 0.9 to 1.0, see the <a href="docs/release-notes.html">
    Release notes</a>.


## Highlights

* Dramatically faster startup time and runtime performance than 0.5, even in Chrome where web components are natively supported.
* Significantly smaller payload than 0.5.
* Completely refactored internally to be clearly layered and much less complex.
* Brand new data-binding system that is simpler, faster, offers tighter control, and is easier to debug.
* Brand new, lightweight shadow DOM shim called `shady DOM`, that lets you avoid the complexity, size, performance penalty, and invasiveness of the shadow DOM polyfill.
* Upper bound _and lower bound_ scoped styling, even without native shadow DOM: scoped styles don’t bleed out, and children in their own roots are protected from descendant selectors in a shadow root.

There's a lot more to 1.0 &mdash; check out the [Developer guide](docs/devguide/feature-overview.html) for 
the run-down of all the features.

## Benchmarks {#benchmarks}

As a sample of the performance difference between 0.5 and the new codebase,
below are the
results from our `medium-list` benchmark. The benchmark measures time to first
paint for an application with a few thousand nested custom elements, with data 
binding.

<figure class="benchmark" layout vertical center-center>
<figcaption>Time to first paint (lower is better)</figcaption>

<img src="images/benchmark.svg" alt="Chrome (Desktop) showed a 4.1x speed
improvement, Safari (Desktop) a 5.3x speed improvement, Safari (iOS) a 5.3x
speed improvement, and Firefox (Desktop) an 8x speed improvement going from 
0.5 to the new codebase. Mobile Safari tested on an iPhone 6, other browsers on a Macbook Pro.">
</figure>

Device specs vary wildly, so the differences between browsers are less 
significant than the difference between 0.5 and 0.8 on each browser. For this test
it's clear that the same Polymer-based app written in 0.8 will be multiple times 
faster to start up than one written in 0.5, across all environments.

You can find the benchmark code [on
GitHub](//github.com/polymerlabs/benchmarks/). As with all benchmarks, your
mileage may vary. Please try it out or create  your own tests &mdash; we'd love
to see them. 

## Roadmap {#roadmap}

The following is a high-level outline of our plans for the library toward 1.0 and beyond.

### Pre-1.0 priorities

The following items are high priorities for 1.0, and many will be available before 1.0 rolls out.

#### Gestures

{{site.project_title}} 0.5 had a fairly robust gesture recognition system &mdash; we still have
to figure out where it fits in 0.8, but plan to get it in as soon as possible.
This may roll in feature-by-feature, beginning with mitigating any remaining
click-delay issues on certain browsers.

#### Shady DOM system improvements

The shady DOM system is new to Polymer in 0.8, and radically improves
performance and decreases the size of the polyfill needed to run on browsers
that don’t support shadow DOM natively. The shadow DOM polyfill was optimized
for correctness, though it remained impossible to perfectly polyfill shadow DOM.
Shady DOM is optimized for speed. 0.9 added additional DOM accessors.

In the 1.0 timeframe, we will explore possible ways to do better custom element
interop for external frameworks not expecting the shady DOM system, and improve
dynamic redistribution of children based on class and attribute changes.

#### Cross-scope styling

The "theming problem" &mdash; you want to be able to easily style Polymer
elements from the outside, but `::shadow` and `/deep/` are far too painful (we
agree!). This release includes a system for ergonomic cross-scope styling
inspired by and based on [CSS Custom Properties](http://dev.w3.org/csswg/css-
variables/), which we will continue improve in 1.0.

#### Templating features

*   Support for parser-challenged elements like `<table>`, `<select>`, etc.

*   Compound binding/string interpolation in bindings: 
    
        {%raw%}<div>Dear {{ title }} {{ lastName }},</div>{%endraw%}

*   Exploring helpers for binding to class and style.

#### Binding developer tools

We're investing heavily in tooling around {{site.project_title}}, and many of
the changes in 0.8 make it much more conducive to tooling. We intend to create a
tool to make it easier to trace dataflow between bindings.

#### Benchmark suite

We've created some benchmarks around 0.8, but have many more that we'd like to
create. We plan on releasing new benchmarks and tools for better performance
measurement in general.

#### Documentation

The [documentation](docs/devguide/feature-overview.html) is in draft form
and missing some pieces, such as  tutorials and tooling information. We'll be 
filling out the documentation set as we move towards 1.0. 

If you find errors or missing information in the documentation, please 
[file an issue](https://github.com/Polymer/docs/issues).

### 1.1 Priorities
_These haven't made the cut for the 1.0 feature set, though we are always open to feedback as well as pull requests!_

#### Inheritance

Inheritance is a great feature introduced with native Custom Elements. 0.8
supports extending native HTML elements using the `is` attribute, but doesn’t
yet support extending custom elements. There are two main reasons that this has
so far landed outside the 1.0 scope:

1) it is a more complex problem to solve than it was in 0.5 given some of the performance optimizations we have made. 
2) from building lots and lots of elements, we've found that you can get nearly 100% of the way using mixins and composition. 

That said, there are certainly some legitimate use-cases for true custom element
inheritance, and we fully plan to support inheritance to the extent that it
existed in 0.5.

#### Build tools for cross-scope shimmed styles

We're looking to create a tool to enable the shimming of cross-scope styles at
build-time, to avoid having to shim the styles at runtime. This will always
remain optional &mdash; we intend to never require a build step when working with the
core library &mdash; but can be a performance optimization along with vulcanize.

## FAQ's

_We'll update this section as asked-questions become frequently-asked._

#### Where did the elements go?

Not all elements have been ported to the current release, but we're porting them
as fast as we can. You can find work-in-progress versions of many elements in the 
[PolymerElements GitHub organization](https://github.com/PolymerElements).

The elements are being reorganized into more consistent product lines, including:

*   Iron elements. Basic elements that don't express a visual style. 
    Most of the old `core-` elements are being renamed to `iron-`. 
    Some former `core-` elements that implemented material design (such as `core-toolbar`,
    `core-menu`, `core-header-panel`) are being migrated to `paper-`.

*   Paper elements. Material design elements. All of the old `paper-` elements,
    plus a few of the old `core-` elements.

*   Neon elements. Animation elements.

These element sets will be launching with their own site sometime around
the {{site.project_title}} 1.0 timeframe. The new site will include API docs
for the elements. If you want to get started with the work-in-progress versions,
the individual repos are the best source for information about the elements right now.

You can also check out the community [Road to Polymer](http://chuckh.github.io/road-to-polymer/)
project which is tracking the status of {{site.project_title}} elements.

#### Will you continue to support Polymer 0.5?

We recognize that many projects rely on 0.5, and won’t be able to switch to the 
new codebase  until the elements are ready. We’ll continue viewing and merging PR’s until the
elements are ported.  We intend for 1.0 to be the new baseline though, and to
work within this high-performance, production-ready mindset going forward. Any
incremental 0.5 releases, if needed, will be available in a branch.

#### Where and how can I give feedback on this release?

The best place for feedback is on Github, [by filing an
issue](https://github.com/polymer/polymer/issues), adding to an existing one, or
submitting a pull request.  Feedback and contributions will be critical to
achieving a successful 1.0.  Pull requests tend to be the clearest way of
expressing an idea or change, but short of a pull request, as much detail as you
can add around your use-case will help us and the broader community better
understand the question or suggestion.

## Next steps

Continue on to the {{site.project_title}} docs:

<div layout horizontal wrap>
<p><a href="docs/start/quick-tour.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Quick tour of {{site.project_title}}</paper-button>
</a></p>

<p><a href="docs/devguide/feature-overview.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Developer guide</paper-button>
</a></p>

<p><a href="docs/migration.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Migration guide</paper-button>
</a></p>
<div>


