---
title: Responsive app layout
---

<!-- toc -->

<div>
{% include 'outdated.html' %}
</div>

Every application needs some layout, and the app layout elements provide the tools to create
responsive layouts easily.

If you've worked with the previous generation of Material Design layout elements, like
`paper-header-panel` and `paper-drawer-panel`, the app layout elements should feel fairly familiar.
However, these elements are designed to be:

- More flexible and composable -- supporting a wider range of layout patterns.
- Less opinionated -- these elements don't enforce a particular look and feel
(although they still support the Material Design effects and UI patterns if that's
what you're looking for).
- Extensible -- with a new, pluggable system for scroll effects.

## Design your layout

Before you can build your layout, you need to design it.

-   Do you want a simple app header that scrolls with the content, or a collapsing header with fancy
    scroll effects?
-   How will users navigate your app? Tabs? A side menu?
-   How does the app layout change on a small screen?

You may already have design mockups you're trying to implement, or you may be doing it yourself. If
you're not sure exactly what you want, you can browse through some of the pre-built app layout
templates for inspiration:

-   [Simple landing page.](https://polymerelements.github.io/app-layout/templates/landing-page/)
    A simple landing page with a header. Tabs at the top of the page jump to sections on the page.
    The basic layout of this page stays the same across all screen sizes.
-   [Getting started](https://polymerelements.github.io/app-layout/templates/getting-started/). A basic
    layout with a simple header and a responsive drawer.
-   [ZUPERKÜLBLOG](https://polymerelements.github.io/app-layout/templates/publishing/). A basic blog-style
    layout, similar to Getting Started, but with a fixed header.
-   [Shrine](https://polymerelements.github.io/app-layout/templates/shrine/). An e-commerce-style
    site that implements a number of patterns, including tab navigation that's replaced by a
    navigation drawer on narrow screens, and multiple toolbars that collapse to a single toolbar as
    you scroll down.

Once you've decided on your basic design, you can start implementing it, starting with the top of
the screen: toolbars and headers.


## Toolbars and headers

Almost every app has some kind of header or toolbar at the top. The header can scroll with the
content, be fixed at the top of the screen, or have dynamic behavior as the user scrolls. The
elements you need depend on what you're looking for:

-   For a simple header that scrolls with the content, you can use an, `<app-toolbar>` element by
    itself. The `<app-toolbar>` is a simple horizontal container for controls and labels. If you
    need multiple rows of controls, you just use multiple toolbars.

-   For scroll effects (like a header that changes size as the user scrolls), you need the
    `<app-header>` element. The `<app-header>` can hold one or more toolbars, and it manages scroll
    effects.

### Simple toolbars

A toolbar by itself serves as a simple header that scrolls with the page content. With a little
extra CSS, it can be fixed to the top of the page. The following [sample](http://jsbin.com/haroru/edit?html,output) uses a toolbar as a simple scrolling header with a title.

`index.html` { .caption }

```
  <head>
    <!-- import latest release version of all components from polygit -->
    <base href="https://polygit.org/components/">
    <script src="webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="app-layout/app-toolbar/app-toolbar.html">

    <!-- sample-content included for demo purposes only -->
    <link rel="import" href="app-layout/demo/sample-content.html">

    <custom-style>
      <style>
        body {
          /* No margin on body so toolbar can span the screen */
          margin: 0;
        }
        app-toolbar {
          /* Toolbar is the main header, so give it some color */
          background-color: #1E88E5;
          font-family: 'Roboto', Helvetica, sans-serif;
          color: white;
          --app-toolbar-font-size: 24px;
        }
      </style>
    </custom-style>
  </head>
  <body>
    <app-toolbar>
      <div main-title>Spork</div>
    </app-toolbar>
    <sample-content size="10"></sample-content>
  </body>
```

![screenshot of a simple app-toolbar](/images/1.0/toolbox/simple-toolbar.png)

The toolbar is a horizontal flexbox container, so you can use the usual flexbox rules to adjust the
layout of its children. A child with the attribute `main-title` is
automatically styled to flex, so it
takes up all the extra space in the container. If you add buttons or icons on either side of the
title, they'll automatically be pushed to the sides of the toolbar:

```
  <app-toolbar>
    <paper-icon-button icon="menu"></paper-icon-button>
    <div main-title>Spork</div>
    <paper-icon-button icon="search"></paper-icon-button>
  </app-toolbar>
```

![screenshot of a simple app-toolbar with a menu and search buttons](/images/1.0/toolbox/toolbar-with-buttons.png)


### Dynamic headers

An `<app-header>` element is a container that applies scroll effects. The app header can hold any
kind of element, but the most common children are toolbars and tab bars. Use multiple toolbars for
multiple rows of controls.

By default, the header scrolls offscreen as you scroll down the page, just like the simple toolbar.
You can change the default behavior by adding attributes to the header:

- `fixed`. A _fixed header_ stays put at the top of the screen.
- `reveals`. A _revealing header_ scrolls back on-screen (reveals itself)  as soon as you start
    scrolling up, no matter how far down the page you are.
- `condenses`. A _condensing header_ is taller than the usual header, and shrinks vertically as
    you scroll down. Condensing headers usually have multiple toolbars/tab bars with one (the
    _sticky_ element) that is always shown. This mode can be combined with either a fixed or
    revealing header.


### Condensing header

When using a condensing header with multiple toolbars, you can choose two basic techniques:

-   All toolbars stay on screen, but "collapse" on top of one another. The toolbar contents must be
    staggered so they don't overlap. (In the Material Design guidelines, this pattern is called
    flexible space, and it's often combined with one or more scroll effects.)

    ![screenshot of an expanded, tall, app-toolbar with a menu and shop button, and titled My App](/images/1.0/toolbox/collapsing-headers-open.png)
    ![screenshot of the same toolbar collapsed to a regular, smaller size, with the same title and buttons](/images/1.0/toolbox/collapsing-headers-closed.png)

-   The top toolbars go offscreen while the bottom toolbar or toolbars stay on screen. (In the
    Material Design patterns, this bottom toolbar is usually a tab bar or search bar.)

    ![screenshot of an expanded, tall app-toolbar with a back and shop buttons, titled Spork. Below it are three tabs, labelled food, drink, life](/images/1.0/toolbox/spork-tabs-tall.png)
    ![screenshot of the same app-toolbar, but with the title and the buttons gone, and only with the 2 tabs visible](/images/1.0/toolbox/spork-tabs-condensed.png)


One toolbar in the set is identified as `sticky`. When the page scrolls, any toolbars _above_ the
sticky toolbar scroll off screen. You can designate a sticky toolbar by setting the `sticky`
attribute on it. If no toolbar has the `sticky` attribute, the `<app-header>`'s first child is
sticky.

```
  <app-header fixed condenses effects="waterfall">
    <app-toolbar>
      <paper-icon-button icon="menu"></paper-icon-button>
      <div main-title></div>
      <paper-icon-button icon="shopping-cart"></paper-icon-button>
    </app-toolbar>
    <app-toolbar></app-toolbar>
    <app-toolbar>
      <div spacer main-title>My App</div>
    </app-toolbar>
  </app-header>
```

Here, the first toolbar (with the icon buttons) is sticky. It stays on screen while other toolbars
slide up to stack on top of it. The `spacer` attribute on the title adds some left padding to the
title so it doesn't overlap a menu button on the left side of the toolbar.

The condensing header starts out its natural height (that is, the height of its contents, unless an
explicit height is set on it in CSS). It condenses down until it reaches the height of its sticky
element.

To retain just a tab bar, place the tab bar last, and mark it as sticky.

```
  <app-header id="header" effects="waterfall" fixed condenses>
    <app-toolbar>
      <paper-icon-button icon="arrow-back"></paper-icon-button>
      <div main-title>Spork</div>
      <paper-icon-button icon="shopping-cart"></paper-icon-button>
    </app-toolbar>
    <paper-tabs selected="0" sticky>
      <paper-tab>Food</paper-tab>
      <paper-tab>Drink</paper-tab>
      <paper-tab>Life</paper-tab>
    </paper-tabs>
  </app-header>
```

### Scroll effects

Most of the scroll effects are used with _condensing headers_. These effects change the header's
appearance as it condenses.

One exception is the waterfall effect, which requires a fixed header, but can be used with or
without the `condenses` attribute. It makes the header appear to lift up above the the content when
the user starts scrolling, so the content can scroll underneath it.

```
  <app-header fixed effects="waterfall">
    <app-toolbar>
      <div main-title>App name</div>
    </app-toolbar>
  </app-header>
```

To try out the various header options including all of the scroll effects, try the demo:

<a href="https://polymerelements.github.io/app-layout/templates/test-drive/" class="blue-button">
  Launch Test Drive Demo
</a>

For a list of available scroll effects, see [the `<app-header>`
reference](https://www.webcomponents.org/element/PolymerElements/app-layout/app-header). For
instructions on creating your own scroll effects, see the [`AppScrollEffectsBehavior`
reference](https://www.webcomponents.org/element/PolymerElements/app-layout/Polymer.AppScrollEffectsBehavior).

For more background, see [Scrolling
techniques](https://material.io/guidelines/patterns/scrolling-techniques.html) in the material
design specification for an overview of the different scroll effects.

### Document scroller and element scrollers

The `<app-header>` element uses the document scroller used by default. On mobile browsers, this
means the browser can hide the URL bar as you scroll down the page. However, since there's only one
document scroller, if you switch between pages of content, your app needs to manage the scroll
position on each page.

**Manage multiple scrolling views.**
If you're using something like `<iron-pages>` to switch views, you can use
[`<app-scroll-position>`](https://www.webcomponents.org/element/PolymerElements/app-layout/app-scroll-position)
to track scroll position for each of the views. See the API docs for sample usage.
`<app-scroll-position>` was renamed in release 2.0 (replacing `<app-scrollpos-control>`).
{.alert .alert-info}

You can use an element scroller by specifying a `scrollTarget` property on `<app-header>`:

```
  <div id="scrollingRegion" style="overflow-y: auto;">
    <app-header scroll-target="scrollingRegion">
    </app-header>
  </div>
```

This can be useful if you want to use header scroll effects in a side panel, such as a drawer.


### Header layout

The [`<app-header-layout>`](https://www.webcomponents.org/element/PolymerElements/app-layout/app-header-layout)
element is a simple way to put together a layout with an `<app-header>`. It supplies the necessary
padding around the content so the content isn't hidden by the header.

To use it, just place an `<app-header>` and some content inside an `<app-header-layout>`.

```
  <app-header-layout>
    <app-header fixed condenses effects="waterfall" slot="header">
      <app-toolbar>
        <div main-title>App name</div>
      </app-toolbar>
    </app-header>
    <div>
      <!-- content goes here -->
    </div>
  </app-header-layout>
```

Specifying `slot="header"` is required with App Layout 2.0.
{.alert .alert-info}

By default the layout uses document scrolling. If you don't want to to scroll the whole page, the
layout can define its own scrolling region, as shown in the [API
docs](https://www.webcomponents.org/element/PolymerElements/app-layout/app-header-layout).

## Drawers

The [`<app-drawer>`](https://www.webcomponents.org/element/PolymerElements/app-layout/app-drawer)
element is a drawer that can be positioned on the left or right side of the screen.

```
<app-drawer>
  <paper-menu selected="0">
    <paper-item>Item One</paper-item>
    <paper-item>Item Two</paper-item>
    <paper-item>Item Three</paper-item>
  </paper-menu>
</app-drawer>
```

There are a few ways to open and close the drawer:

-   Swipe an open drawer closed. Set
    [`swipeOpen`](https://www.webcomponents.org/element/PolymerElements/app-layout/app-drawer#property-swipeOpen)
    to `true` to detect swipe gestures at the edge of the screen to open the drawer.

-   Drag the drawer more than halfway closed (or open) and it continues on its own. A fast swipe (flick or fling gesture) has the same effect, even if it goes less than halfway.

-   Open and close the drawer programmatically by calling
    [`open`](https://www.webcomponents.org/element/PolymerElements/app-layout/app-drawer#method-open),
    [`close`](https://www.webcomponents.org/element/PolymerElements/app-layout/app-drawer#method-close),
    or [`toggle`](https://www.webcomponents.org/element/PolymerElements/app-layout/app-drawer#method-toggle).
    Or bind to the
    [`opened`](https://www.webcomponents.org/element/PolymerElements/app-layout/app-drawer#property-opened) property.

-   A drawer can act as a persistent sidebar by setting the `persistent` property, which disables
    the swipe/fling gestures.

Because the drawer is a separate component, you can compose it in different ways. For example:

-   For a full-height drawer, place the drawer outside of a header layout, or wrap a header layout
    inside a drawer layout.
-   For a drawer that opens _underneath_ a header, put the drawer or drawer layout inside a header
    layout.

### Styling the drawer

You can style the drawer using the `--app-drawer-content-container` mixin. For example, you can set
a background, or add a border or shadow to define the edge of the drawer.

When a responsive drawer is open, the rest of the screen is covered with a backdrop or _scrim_. Set
the scrim background with the `--app-drawer-scrim-background` custom property. The default scrim has
a semi-transparent grey background.

The following CSS adds a border shadow to the drawer and provides a colored scrim.

```
  app-drawer {
    --app-drawer-content-container: {
      box-shadow: 1px 0 2px 1px rgba(0,0,0,0.18);
    }
    --app-drawer-scrim-background: rgba(179, 157, 219, 0.5);
  }
```

### Drawer layouts

The [`<app-drawer-layout>`](https://www.webcomponents.org/element/PolymerElements/app-layout/app-drawer-layout)
element creates a responsive layout with a single drawer. On
wider screens, the drawer acts as a persistent sidebar by default; it's always displayed and swipe
and fling gestures are disabled.

To add a drawer toggle button, place an element with the `drawer-toggle` attribute as one of the
descendants of an `<app-drawer-layout>`. Usually the drawer toggle button is placed inside one of
the app's toolbars.

In App Layout 2.0, the `drawer-toggle` element is no longer automatically hidden when the drawer is persistent.
To hide `drawer-toggle`, you can style based on when the `narrow` attribute is present on `app-drawer-layout`
(e.g. `app-drawer-layout:not([narrow]) [drawer-toggle] { display: none; }`)
{.alert .alert-info}

An `<app-header-layout>` can be nested inside an `<app-drawer-layout>` to create a responsive layout
with drawer and header.

```
  <app-drawer-layout>

    <app-drawer slot="drawer">
      <app-toolbar>Getting Started</app-toolbar>
    </app-drawer>

    <app-header-layout>

      <app-header reveals effects="waterfall" slot="header">
        <app-toolbar>
          <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
          <div main-title>Title</div>
        </app-toolbar>
      </app-header>

      <div>Content goes here</div>

    </app-header-layout>

  </app-drawer-layout>
```

Specifying `slot="drawer"` is required with App Layout 2.0.
{.alert .alert-info}

## Responsive navigation pattern

In many cases, you'll want to switch your navigation based on the screen size. One common pattern
uses navigation tabs on desktop, which are replaced by a navigation drawer on mobile, as in the
[Shop app](https://shop.polymer-project.org/).

![screenshot of a nav menu with 5 tabs, displayed horizontally, labelled "item one" through "item four"](/images/1.0/toolbox/app-layout-responsive-nav-tabs.png)
![screenshot of the same menu displayed vertically, after being open from a mobile drawer button ](/images/1.0/toolbox/app-layout-responsive-nav-drawer.png)

You can achieve this with some app layout elements, using data binding to switch between the tab and
drawer navigation.

The [transform navigation demo](https://polymerelements.github.io/app-layout/patterns/transform-navigation/)
shows a simple version of this transition.

```
  <!-- force-narrow prevents the drawer from ever being displayed
       in persistent mode -->
  <app-drawer-layout force-narrow>

    <app-drawer id="drawer" slot="drawer">

      <!-- an empty toolbar in the drawer looks like a
           continuation of the main toolbar. It's optional. -->
      <app-toolbar></app-toolbar>

      <!-- Nav on mobile: side nav menu -->
      <paper-menu selected="{{selected}}" attr-for-selected="name">
        <template is="dom-repeat" items="{{items}}">
          <paper-item name="{{item}}">{{item}}</paper-item>
        </template>
      </paper-menu>

    </app-drawer>

    <app-header-layout>
      <app-header class="main-header" slot="header">

        <app-toolbar>
          <!-- drawer toggle button -->
          <paper-icon-button class="menu-button" icon="menu" drawer-toggle hidden$="{{wideLayout}}"></paper-icon-button>
        </app-toolbar>

        <app-toolbar class="tabs-bar" hidden$="{{!wideLayout}}">
          <!-- Nav on desktop: tabs -->
          <paper-tabs selected="{{selected}}" attr-for-selected="name" bottom-item>
            <template is="dom-repeat" items="{{items}}">
              <paper-tab name="{{item}}">{{item}}</paper-tab>
            </template>
          </paper-tabs>
        </app-toolbar>

      </app-header>
    </app-header-layout>

  </app-drawer-layout>

  <iron-media-query query="min-width: 600px" query-matches="{{wideLayout}}"></iron-media-query>
```

<a href="https://polymerelements.github.io/app-layout/patterns/transform-navigation/" class="blue-button">Launch Demo</a>

<a href="https://github.com/polymerelements/app-layout/blob/master/patterns/transform-navigation/x-app.html" class="blue-button">View full source</a>

The [Shop app](https://shop.polymer-project.org/). uses a slightly more sophisticated version of this pattern, using conditional templates
to avoid creating the navigation elements until they're needed. This means that the app doesn't need
to create the tabs when running on mobile.
