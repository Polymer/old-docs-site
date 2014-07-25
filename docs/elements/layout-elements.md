---
layout: default
type: elements
navgroup: elements
shortname: Elements
title: Layout elements
subtitle: Guide
---

<style shim-shadowdom>
.app-demo {
  border: 1px solid #eee;
  position: absolute;
  top: 44px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

demo-tabs .result {
  position: static;
}

demo-tabs::shadow #results {
  position: relative;
  box-sizing: border-box;
  width: 240px;
  height: 405px;
  max-width: 100%;
}

</style>

The core-elements and paper-elements collections include a number of elements that can be used to structure your app’s layout. These include:

- `<core-header-panel>`. A simple container with a header section and content section. The header can either stay in place or scroll with the content.

- `<core-toolbar>`.  Can be used for an app bar or a toolbar on a smaller UI component, such as a card. The toolbar can serve as a container for controls, such as tabs and buttons.

- `<core-drawer-panel>`. A responsive container that combines a left- or right-side drawer panel for navigation or other options and a main content area.

- `<core-scaffold>`.  A quick responsive app layout that includes a navigation drawer, main app bar and content area (implemented using a core-drawer-panel, core-header-panel and core-toolbar.) The core-scaffold element is a quick way to structure an app’s UI.


## App Bars and Toolbars

[`<core-header-panel>`](/docs/elements/core-elements.html#core-header-panel) is often combined with a
[`<core-toolbar>`](/docs/elements/core-elements.html#core-toolbar). When you use a `<core-toolbar>`,
the panel automatically places it in the header area.  You can also use any type of element in your
header by adding the `core-header` class to its class list.

Other elements placed in the core-header-panel end up in the content area.

`<core-header-panel>` is `position: relative`, and always needs to have a height set on it explicitly.

The following example app uses a `<core-header-panel>` as its top-level layout:

{% include samples/layout-elements/header-app.html %}

<a href="/samples/layout-elements/header-app.html" target="_blank">Open sample in new window</a>

The following example uses a plain `<div>` as the header element, using the `core-header` class:

    <core-header-panel>
      <div class=“core-header”>
         My App
      </div>
      <div>
        My app content.
      </div>
    </core-header-panel>



Setting the `mode` element on the header panel controls how the header area and content area interact. There are several modes:

- `standard`. The header appears at a higher level than the content area, with a drop shadow. Content scrolls under the header.
- `seamed`. The header appears at the same level as the content area, with a seam between the two (no drop shadow). Content scrolls under the header.
- `waterfall`. The header initially presents as seamed. When content scrolls under the header, the header raises up and casts a drop shadow (as in `standard` mode).
- `waterfall-tall`. Like waterfall, except that the toolbar starts off tall (3x standard height) and condenses to a standard-height toolbar as the user scrolls.
- `scroll`. The header is seamed with the content and scrolls with the content.
- `cover`. The content scrolls over the header. This mode is designed to be used with narrow content (for example cards).

See the [`<core-header-panel>` demo](/components/core-header-panel/demo.html) for examples of all of the modes in action.

In addition, you manually choose from several sizes of toolbar by adding one of the following classes to the core-toolbar’s class list:

-   medium-tall (2x normal height)
-   tall (3x normal height)

Taller toolbars are useful when you want to create an app bar with tabs, for example:

{% include samples/layout-elements/toolbar-sample.html %}

If the core-header-panel is in `waterfall-tall` mode, it controls the height of the toolbar automatically, so you shouldn't set `medium-tall` or `tall` on the toolbar yourself.

**Tip:** For fancy scrolling effects where the toolbar animates between tall and condensed states, you can use [`<core-scroll-header-panel>`](/docs/elements/core-elements.html#core-scroll-header-panel). See  the [demos](/components/core-scroll-header-panel/demo.html) here. You may need to look at the source for the demos to implement the more complicated effects.
{: .alert .alert-info }


## Responsive side nav

The [`<core-drawer-panel>`](/docs/elements/core-elements.html#core-drawer-panel)
element creates a left or right side nav area alongside
the main content area. On narrow screens, the nav area acts as a drawer that can
be hidden or revealed by calling the drawer panel's `togglePanel` method.

Any children with the `drawer` attribute set are placed in the navigation area.
Any children with the `main` attribute are placed in the main panel.

You can nest `<core-header-panel>` and `<core-toolbar>` elements inside a
`<core-drawer-panel>` to create the layout for the content area and navigation
drawer, as shown in the following example:

{% include samples/layout-elements/drawer-app.html %}

<a href="/samples/layout-elements/drawer-app.html" target="_blank">Open sample in new window</a>


### Side nav with `<core-scaffold>`

The [`<core-scaffold>`](/docs/elements/core-elements.html#core-drawer-panel)  element
assembles a commonly-used combination of components:
a `<core-drawer-panel>` with a `<core-header-panel>` and `<core-toolbar>` for the
main content area. It also includes a button to display the navigation drawer.

The following example produces the same basic layout as the drawer panel example above:

{% include samples/layout-elements/scaffold-app.html %}

<a href="/samples/layout-elements/scaffold-app.html" target="_blank">Open sample in new window</a>

