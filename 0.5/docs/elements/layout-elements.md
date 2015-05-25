---
layout: default
type: elements
shortname: Elements
title: Layout elements
subtitle: Guide
---

<link rel="import" href="../../components/google-youtube/google-youtube.html">

<style shim-shadowdom>
.app-demo {
  border: 1px solid #aaa;
}
</style>

The core-elements and paper-elements collections include a number of elements that can be used to structure your app’s layout. These include:

- `<core-header-panel>`. A simple container with a header section and content section. The header can either stay in place or scroll with the content.

- `<core-toolbar>`.  Can be used for an app bar or a toolbar on a smaller UI component, such as a card. The toolbar can serve as a container for controls, such as tabs and buttons.

- `<core-drawer-panel>`. A responsive container that combines a left- or right-side drawer panel for navigation or other options and a main content area.

- `<core-scaffold>`.  A quick responsive app layout that includes a navigation drawer, main app bar and content area (implemented using a core-drawer-panel, core-header-panel and core-toolbar.) The core-scaffold element is a quick way to structure an app's UI.

## App Bars and Toolbars

<div class="yt-embed">
  <google-youtube
    videoid="qDhHdi8RtwI"
    thumbnail="/images/polycasts/PC003.jpg"
    autoplay="0"
    rel="0"
    fluid>
  </google-youtube>
</div>

[`<core-header-panel>`](core-header-panel.html) is often combined with a
[`<core-toolbar>`](core-toolbar.html). When you use a `<core-toolbar>`, the panel automatically places it in the header area.  You can also use any type of element in your header by adding the `core-header` class to its class list.

Other elements placed in the core-header-panel end up in the content area.

`<core-header-panel>` is `position: relative`, and always needs to have a height set on it explicitly. An easy way to go about this is to use [layout attributes](../polymer/layout-attrs.html). Add `fullbleed`, `vertical`, and `layout` attributes to the `<body>` and then add a `flex` attribute to the `<core-header-panel>` itself.

The following example app uses a `<core-header-panel>` as its top-level layout:

<a href="../../samples/layout-elements/header-app.vulcanized.html" target="_blank">
  <img class="app-demo" src="/images/layout-elements/header-app.png">
</a>

<a href="../../samples/layout-elements/header-app.vulcanized.html" target="_blank">Click image for demo</a>

Use the following code to create the header panel app.

<demo-tabs selected="0">
  <demo-tab heading="HTML">
{% highlight html %}
{% include_external /samples/layout-elements/header-app.html html version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="CSS">
{% highlight html %}
{% include_external /samples/layout-elements/header-app.html styles version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="Imports">
{% highlight html %}
{% include_external /samples/layout-elements/header-app.html imports version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
</demo-tabs>

The following example uses a plain `<div>` as the header element, using the `core-header` class:

    <core-header-panel flex>
      <div class="core-header">
         My App
      </div>
      <div>
        My app content.
      </div>
    </core-header-panel>

Setting the `mode` attribute on the header panel controls how the header area and content area interact. There are several modes:

- `standard`. The header appears at a higher level than the content area, with a drop shadow. Content scrolls under the header.
- `seamed`. The header appears at the same level as the content area, with a seam between the two (no drop shadow). Content scrolls under the header.
- `waterfall`. The header initially presents as seamed. When content scrolls under the header, the header raises up and casts a drop shadow (as in `standard` mode).
- `waterfall-tall`. Like waterfall, except that the toolbar starts off tall (3x standard height) and condenses to a standard-height toolbar as the user scrolls.
- `scroll`. The header is seamed with the content and scrolls with the content.
- `cover`. The content scrolls over the header. This mode is designed to be used with narrow content (for example cards).

See the [`<core-header-panel>` demo](../../components/core-header-panel/demo.html) for examples of all of the modes in action.

<div class="yt-embed">
  <google-youtube
    videoid="ZAc51_0Xa_M"
    thumbnail="/images/polycasts/PC004.jpg"
    autoplay="0"
    rel="0"
    fluid>
  </google-youtube>
</div>

In addition, you manually choose from several sizes of toolbar by adding one of the following classes to the core-toolbar's class list:

-  medium-tall (2x normal height)
-  tall (3x normal height)

Taller toolbars are useful when you want to create an app bar with tabs, for example:

<a href="../../samples/layout-elements/toolbar-sample.vulcanized.html" target="_blank">
  <img class="app-demo" src="/images/layout-elements/toolbar-sample.png">
</a>

<a href="../../samples/layout-elements/toolbar-sample.vulcanized.html" target="_blank">Click image for demo</a>

Use the following code to create the toolbar shown above:

<demo-tabs selected="0">
  <demo-tab heading="HTML">
{% highlight html %}
{% include_external /samples/layout-elements/toolbar-sample.html html version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="CSS">
{% highlight html %}
{% include_external /samples/layout-elements/toolbar-sample.html styles version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="Imports">
{% highlight html %}
{% include_external /samples/layout-elements/toolbar-sample.html imports version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
</demo-tabs>

If the core-header-panel is in `waterfall-tall` mode, it controls the height of the toolbar automatically, so you shouldn't set `medium-tall` or `tall` on the toolbar yourself.

**Tip:** For fancy scrolling effects where the toolbar animates between tall and condensed states, you can use [`<core-scroll-header-panel>`](core-scroll-header-panel.html). See  the [demos](../../components/core-scroll-header-panel/demo.html) here. You may need to look at the source for the demos to implement the more complicated effects.
{: .alert .alert-info }

## Responsive side nav

The [`<core-drawer-panel>`](core-drawer-panel.html)
element creates a left or right side nav area alongside
the main content area. On narrow screens, the nav area acts as a drawer that can
be hidden or revealed by calling the drawer panel's `togglePanel` method.

Any children with the `drawer` attribute set are placed in the navigation area.
Any children with the `main` attribute are placed in the main panel.

<div class="yt-embed">
  <google-youtube
    videoid="GAjpaM4HcCQ"
    thumbnail="/images/polycasts/PC005.jpg"
    autoplay="0"
    rel="0"
    fluid>
  </google-youtube>
</div>

You can nest `<core-header-panel>` and `<core-toolbar>` elements inside a
`<core-drawer-panel>` to create the layout for the content area and navigation
drawer, as shown in the following example:

<a href="../../samples/layout-elements/drawer-app.vulcanized.html" target="_blank">
  <img class="app-demo" src="/images/layout-elements/drawer-app-closed.png">
</a>

<a href="../../samples/layout-elements/drawer-app.vulcanized.html" target="_blank">Click image for demo</a>

Use the following code to create the drawer panel app:

<demo-tabs selected="0">
  <demo-tab heading="HTML">
{% highlight html %}
{% include_external /samples/layout-elements/drawer-app.html html version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="JS">
{% highlight html %}
{% include_external /samples/layout-elements/drawer-app.html javascript version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="CSS">
{% highlight html %}
{% include_external /samples/layout-elements/drawer-app.html styles version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="Imports">
{% highlight html %}
{% include_external /samples/layout-elements/drawer-app.html imports version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
</demo-tabs>

**Note:** On wide screens, the drawer is always open and the menu button is hidden.
On narrow screens, you can press the button or swipe from the left to show the drawer.
On desktop, resize the browser window to see the different modes.
{: .alert .alert-info }

### Side nav with `<core-scaffold>`

The [`<core-scaffold>`](core-scaffold.html) element
assembles a commonly-used combination of components:
a `<core-drawer-panel>` with a `<core-header-panel>` and `<core-toolbar>` for the
main content area. It also includes a button to display the navigation drawer.

The following example produces the same basic layout as the drawer panel example above:

<a href="../../samples/layout-elements/scaffold-app.vulcanized.html" target="_blank">
  <img class="app-demo" src="/images/layout-elements/scaffold-app.png">
</a>

<a href="../../samples/layout-elements/scaffold-app.vulcanized.html" target="_blank">Click image for demo</a>

Use the following code to create the scaffold app:

<demo-tabs selected="0">
  <demo-tab heading="HTML">
{% highlight html %}
{% include_external /samples/layout-elements/scaffold-app.html html version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="CSS">
{% highlight html %}
{% include_external /samples/layout-elements/scaffold-app.html styles version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="Imports">
{% highlight html %}
{% include_external /samples/layout-elements/scaffold-app.html imports version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
</demo-tabs>


