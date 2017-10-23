---
title: "Encapsulated Routing with Elements"
---

<!-- toc -->

<style>
  iframe {
    border: 1px solid #D7D7D7;
    width: 100%;
    height: 600px;
  }
</style>


## Introduction


Polymer is designed with a set of principles in mind: **encapsulation**, **composition**, and **separation of concerns**. When we set out to tackle routing, we knew we wanted to do it in a way that adheres to these principles.

Most client side routers are monolithic black boxes that require a complete and centralized route configuration with perfect knowledge of every routable location in the app. It’s also common for routing to be conflated with other concerns, like loading data or transitioning between views.

In contrast, the app-route elements are a minimal, decoupled, and decentralized solution to routing in your app. With app-route, you layer routing into the reusable elements that make up your app.

You can then use the data binding system to integrate with other elements like `<neon-animated-pages>` for transitioning views, and `<iron-ajax>` for loading data. And because these concerns are decoupled from routing, it’s easy to use other implementations, like `<iron-pages>` if you don’t need animation, or `<firebase-element>` to load data from a realtime database .

## Example

Ok, enough philosophy, let’s get into some examples.

Here’s a simple UI with tabs and animated transitions:

```
<app-route route="{{route}}" pattern="/tabs/:tabName" data="{{data}}">
</app-route>

<paper-tabs selected='{{data.tabName}}' attr-for-selected='key'>
  <paper-tab key='foo'>Foo</paper-tab>
  <paper-tab key='bar'>Bar</paper-tab>
  <paper-tab key='baz'>Baz!</paper-tab>
</paper-tabs>

<neon-animated-pages selected='{{data.tabName}}'
                     attr-for-selected='key'
                     entry-animation='slide-from-left-animation'
                     exit-animation='slide-right-animation'>
  <neon-animatable key='foo'>Foo Page Here</neon-animatable>
  <neon-animatable key='bar'>Bar Page Goes Here</neon-animatable>
  <neon-animatable key='baz'>Baz Page, the Best One of the Three</neon-animatable>
</neon-animated-pages>
```

Here the `<app-route>` is data bound to both the tabs and the currently displayed page. So when the route changes, the selected tab and the currently displayed page automatically get updated too. And likewise, when the user selects a new tab, the route also updates in turn.

Note also, how little actual routing there is here. Almost all of the work is being done by other elements that are purpose built for their roles in the UI, and they're just data bound to `<app-route>`. This is right and proper.

You can see the core of the idea here, but we’ve jumped ahead a bit. I mean, where does the route in `route="{{route}}"` come from? What’s that `pattern` property doing, and how is it related to `data`?


## &lt;app-route>

Let’s walk back a bit and consider the routing problem, one piece at a time, beginning with just a `<app-route>`. What does it do, and how does it work?

`<app-route>` simply matches an input path against a specified pattern. Here's a simple demo of a standalone `<app-route>`. Instead of being hooked up to the page URL, it's hooked up to inputs, so you can change the path and pattern by hand.

<iframe src="/2.0/samples/routing/demo1" style="height: 840px;"></iframe>
<a href="/2.0/samples/routing/demo1" target="_blank">Open demo in new window</a>

`<app-route>` deals with hierarchical, slash separated paths. You give it a pattern, and it tells you when the input matches.

If the pattern contains any variables, like `/:tabName` then the `<app-route>` extracts that portion of the matched URL and exposes it via the `data` object. It also exposes the rest of the path that it didn’t match, but we’ll get to that later.

We're still iterating on the syntax of `pattern`. The most surprising thing to notice is that `/foo` will match `/foo`, `/foo/`, and `/foo/bar/baz`. The pattern `/foo/` with a trailing slash however will only match `/foo/`.

## &lt;app-location>

`<app-route>` doesn't know about the URL, it just knows about paths. While you’ll have many `<app-route>` elements in your app, there’s only one URL bar. The URL is global. So we’ve got an element whose single responsibility is connecting the URL to your app. We call this element `<app-location>`, and it exposes a `route` property suitable for binding into a `<app-route>`, like so:

<iframe src="/2.0/samples/routing/demo2" style="height: 745px;"></iframe>
<a href="/2.0/samples/routing/demo2" target="_blank">Open demo in new window</a>

Notice however that if you open the demo in its own window and change the path,
refreshing will give you a 404. That's because the server doesn't know what
file to serve out for that new URL!

Helpfully, `<app-location>` provides the `use-hash-as-path` option, which
will place the route path in the `#hash` portion of the URL. All modern browsers
(IE ≥10) support routing in either the pathname or the hash but search engines
prefer pathname. So you should only `use-hash-as-path` when you don't control
the server (e.g. github pages, jsbin, or demo pages like this one that need to
work with any server). Fortunately, everything else works identically either
way.

The next demo will use hashes rather than native paths.

## Chaining Routes Together

Ok, so that’s how to get a `<app-route>` hooked up to the URL. However, the best part of `<app-route>` is that you can hook the output of one to the input of another.

`<app-route>` exposes a property named `tail` that can be passed in as the the `route` of another `<app-route>`. The `tail` represents the rest of the path that comes after the part that `pattern` matches. When the `tail` route changes, those changes propagate up, so the bidirectional data binding is still working its magic.

<iframe src="/2.0/samples/routing/demo3#/" style="height: 955px;"></iframe>
<a href="/2.0/samples/routing/demo3#/" target="_blank">Open demo in new window</a>


### Why chain routes?

Why would you use this? You could just pass around the `route` object from `<app-location>` and specify all of your patterns with absolute paths, like `/user/profile`. However chaining routes together lets you distribute and delegate your app’s routing.

For example, you can write a `<user-page>` element and pass it the `tail` of a `<app-route>` that matches the `/user` pattern. It then takes that route and passes it to its own `<app-route>` elements to handle all of its internal routing. Written this way, the `<user-page>` element doesn’t need to know whether its prefix is `/user` or `/myApp/user` or `/foobar`, and the element that uses `<user-page>` doesn’t need to know about all of the routes that `<user-page>` handles.

This encapsulation and delegation is important for larger apps, where it becomes impractical to centralize all routing information and decisions into a single point of responsibility. It also makes it easy to lazily load elements on demand, opening the door to much faster initial page loads. Expect more info about lazy loading from us soon.

## Summary

`<app-route>` and `<app-location>` provide a modular routing system for Polymer apps. With these elements:

*   Routing is **decentralized**. An element can handle just the part of the URL it's interested in, and **delegate** parts of the URL space to other elements.
*   Routing elements can be **composed** into larger applications.
*   Route changes can trigger other actions, like page transitions and loading of data, using data binding and observers.

There are a couple of mini-app-sized demos, as well as an ongoing design discussion in the [app route repo](https://github.com/PolymerElements/app-route) on GitHub!

## More resources

* Check out demos, API docs, and source code in [the github repo](https://github.com/PolymerElements/app-route).
* We'll be watching for any questions you've got on [stackoverflow](https://stackoverflow.com/questions/tagged/app-route).
* Come join us on [slack](https://polymer.slack.com/messages/general/) too! ([register here](https://polymer-slack.herokuapp.com))
