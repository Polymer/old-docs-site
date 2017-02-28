---
title: Application templates
---

<!-- toc -->

You can get started with the Polymer App Toolbox using one of several templates
that incorporate the elements and patterns discussed here using the Polymer CLI.

## Initialize project from template

To initialize a project from a template, ensure you have the
[Polymer CLI](../tools/polymer-cli) installed, `cd` into an empty project folder,
and simply run the following command, which will prompt you to select from
the currently available templates.

```
    $ polymer init
```

## Templates

### Application

The  `application` template is the most basic starting point for any app built
with Polymer. It starts with a single bare-bones custom element that can serve
as the root of your application, from which you can build in any direction with
maximum flexibility.

### Starter Kit

![](/images/1.0/toolbox/starter-kit.png)

The `starter-kit` introduces the [`app-layout`](app-layout) elements,
and composes them in a common left-hand drawer arrangement with a toolbar.
The template provides navigation between a series of views that load and
are rendered in the main content area.

The template is also set up to use the [PRPL pattern](server) for efficient
and progressive loading of the application, where views are loaded on-demand
and will be pre-cached for offline and subsequent use.

### Shop demo application

![](/images/1.0/toolbox/shop-template-desktop.png)

The `shop` template is a full-fledged application that builds on the
`starter-kit` and implements a series of elements that compose into
a complete e-commerce application.  It demonstrates a typical
"home - list - detail" type of application flow, and can serve as inspiration
or a starting point for a complete application.

### News demo application

![](/images/1.0/toolbox/news-template-desktop.png)

The `news` template is a full-fledged application that builds on the
`starter-kit` and implements a series of elements that compose into
a complete news progressive web app.  It demonstrates loading news
items, and can serve as inspiration or a starting point for a complete application.

For implementation details, see the [News case study](news-case-study). For information on using
or customizing the news template, see the
[News documentation site](https://news-docs.polymer-project.org).

## Where to go from here

The templates are starting points, and you are free to add web components
discussed in the rest of the Polymer App Toolbox documentation according
to the needs of your application, as well as from other sources such as the
[Polymer Element Catalog](https://elements.polymer-project.org/).

See the section on [Building your first Polymer application](../start/toolbox/set-up)
for a tutorial on getting started with one of the App Toolbox templates.
