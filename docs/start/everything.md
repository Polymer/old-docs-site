---
layout: default
type: concepts
navgroup: start
shortname: Concepts
title: Understanding Polymer
subtitle: The concepts and layering
---

{% include toc.html %}

{{site.project_title}} isn't like other frameworks or libraries you might have used before. To fully understand what it is, you'll need to understand {{site.project_title}}'s world-view and take a quick tour through the three conceptual layers.

## Everything is an Element: The {{site.project_title}} world-view
The mantra of "Everything is an element" is core to understanding {{site.project_title}}.

Ever since the beginning of the web, browsers have shipped with a default set of elements. Most of them, like `<div>`, didn't do very much. But some elements are quite powerful. Consider the humble `<select>`. We take it for granted, but it's actually a pretty impressive little guy:

- **Reusable functionality**: It's a convenient package of reuse

- **The browser knows about it**: When the browser encounters a `<select>` in markup it conjures one up for you.

- **Interoperability**: Every JavaScript library knows how to interact with DOM.

- **Encapsulated**: It keeps its guts all tucked away, so including one won't break the rest of your page.

- **Default UI**: It's got a functioning UI out of the box, although you can tweak it if you want to.

- **Attributes for configuration**: You can configure its behavior with HTML attributes, without involving any script.

- **Methods and properties for more complex interactions**: If you grab the element from the DOM it also has methods and properties for things that don't make sense in markup.

- **Emits events**: It lets you know when something interesting happens.

- **Composable**: Not only can you include a `<select>` inside of most other kinds of element, its behavior can also change depending on which things you put inside of it.

Elements are pretty great. They're the building blocks of the web. Unfortunately, as web apps got more complex, we collectively outgrew the basic set of elements that ship in browsers. Our solution was to replace markup with gobs of script. In that shift, we've lost the elegance of the element.

{{site.project_title}} returns to our roots. We think the answer is not gobs of script, but rather to build more powerful elements. A set of powerful new technologies called Web Components makes this possible.

That brings us back to the world-view of {{site.project_title}}: **Everything is an element**

When we say "element", we mean a real element, with all of the great properties of built-in elements. And when we say _everything_, we really do mean practically everything. Why limit elements to only UI? Sure, some of the good properties of elements relate to UI--but most of them don't. They're a generic concept for packaging up useful functionality.

The world looks different when you take this view. You take a few low-level elements, put them together, and make a larger, more powerful element with its internals safely encapsulated. You can take those elements and build even bigger and better elements. Before you know it, you'll arrive at an entirely encapsulated, reusable _app_.

In the old world, script was your concrete, and the solution to most of your problems was to use gobs of it. In this world, elements are your bricks and script has been relegated back to the role of mortar. The strongest solution will be built by selecting the bricks that fit your need most closely and using only a judicious amount of mortar to hold them tightly together. This is what we mean when we say **everything is an element**.


## Layers of {{site.project_title}}

There are three conceptual layers to {{site.project_title}}:

1. **[Using elements](/docs/start/usingelements.html)**: {{site.project_title}} provides a comprehensive set of elements--both visual and non-visual--that you can use right out of the box. You can mix and match {{site.project_title}} elements with other elements, including built-in elements and other custom elements.

1. **[Creating elements](/getting-started.html)**: {{site.project_title}}'s declarative syntax makes it simpler to define custom elements. Features like two-way data binding, property observation, and gesture support help you build powerful, reusable elements.

1. **[The Platform](/docs/start/platform.html)**: {{site.project_title}} is built on the latest web technologies, like Web Components and Object.observe. Not all browsers support these features yet, so {{site.project_title}}'s platform layer fills the gaps, implementing the APIs in JavaScript. At runtime, {{site.project_title}} automatically picks the fastest path -- native implementation or JavaScript.


## Next steps {#nextsteps}

Now that you've got the basic concepts of {{site.project_title}}, it's time to
start digging in.

Next section:

<a href="/docs/start/customelements.html" class="paper-button"><polymer-ui-icon src="/images/picons/ic_arrowForward_dark_.png"></polymer-ui-icon>What are custom elements?</a>
