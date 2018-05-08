---
title: "Case study: the News app"
---

<!-- toc -->

News is a full-featured Progressive Web App (PWA) demo built using the Toolbox. You can try it out
here:

<a href="https://news.polymer-project.org/" class="blue-button">Launch News demo</a>

This case study shows how News uses the principles of Progressive Web App (PWA) design to deliver a great user experience.

## App structure

Like other PWAs, News is designed with an [application shell
architecture](https://developers.google.com/web/fundamentals/architecture/app-shell). The app shell
element, `<news-app>`, contains the main framework for News. Here's the basic structure:

<div class="image-container layout horizontal">
  <div class="image-wrapper">
    <img src="/images/3.0/toolbox/app-structure.png" alt="app structure" width="600px">
  </div>
</div>

* `<news-app>` lays out the structure for the application.
* `<app-route>` contains routing logic that parses the user's selected URL.
* `<news-data>` fetches resources from the raw HTML files and images in the /data/ folder and its
subfolders.
* `<iron-pages>` switches between the News application's two views - list view and article view.
* `<news-list>` is the application's *list view*.
* `<news-article>` is the application's *article view*.

<div class="image-container layout horizontal">
  <div class="image-wrapper">
    <img src="/images/3.0/toolbox/news-list.png" alt="screenshot of the list view" width="300px">
  </div>
  <div class="image-wrapper">
    <img src="/images/3.0/toolbox/news-article.png" alt="screenshot of the article view" width="300px">
  </div>
</div>

## Views and routing

Views in the News app use the same implementation as the Shop app. [See the Shop app case study for
more information on views and
routing](case-study#views).

For more information on encapsulated routing, see [Encapsulated routing with
elements](/blog/routing).

For more information on the `<app-route>` Polymer element used in these implementations, see the
[`<app-route>` API reference](https://www.webcomponents.org/element/PolymerElements/app-route).

There are two main views in the News app. The `<news-list>` element displays a list of articles for
the selected category - for example, Top Stories. The `<news-article>` element displays article
content. When the user is offline and the category data is not cached, both views display a network
error via the `<news-network-warning>` element:

`news-list.js`

{.caption}
```html
<news-network-warning
  hidden$="[[!category.failure]]"
  offline="[[offline]]"
  on-try-reconnect="_tryReconnect"></news-network-warning>
```

If the user is offline but category data is cached and ServiceWorker is installed,
the cached content is displayed.

-   [`<app-route>` API reference](https://www.webcomponents.org/element/PolymerElements/app-route)

## Routing and data binding in the News app

Routing and data bindings work together in the News app to retrieve and display the data relevant
to the URL that the user selects.

Polymer's data system allows for data to flow one-way (downward-only, from host element to target
element) or two-way (from host to target and target to host). For more information on data binding
in Polymer, see [Data binding](/{{{polymer_version_dir}}}/docs/devguide/data-binding).

The News app uses both one-way and two-way binding to transfer data between elements.

The app shell element, `<news-app>`, acts as the host, while `<news-data>`, `<news-list>`, and
`<news-article>` act as targets. `<news-app>` contains data properties for:

* The name of the current category (`categoryName`)
* The ID of the current article (`articleId`)
* The list of articles in the current category (`category`)
* The raw HTML for the current article (`article`)

### Part 1: Routing

`categoryName` and `articleId` are set by the routing logic in the view elements (`<news-list>` and
`<news-article>`). The active view element processes the user's selected URL in order to set
`categoryName` or `articleId`. The properties are two-way bound between the view elements and the
app shell, so they are "pushed" up to the app shell.

For example, here's how the URL `/list/top_stories` would be processed:

The top-level `<app-route>` element in `<news-app>` consumes the first part of the URL, and `page`
is set to `"list"`:

`news-app.js` {.caption}

```html
<app-location route="{{route}}"></app-location>
<app-route 
  route="{{route}}" 
  pattern="/:page" 
  data="{{routeData}}" 
  tail="{{subroute}}">
</app-route>
```

The `<iron-pages>` element in `<news-app>` displays the `<news-list>` element (because `page` ==
"list"):

`news-app.js`
{.caption}
```html
<iron-pages role="main" selected="[[page]]" attr-for-selected="name" fallback-selection="path-warning">
```

The `<app-route>` element in `<news-list>` consumes the next part of the URL (`/top-stories`), and
sets `categoryName` to `top-stories`:

`news-list.js` {.caption}

```html
<app-route
  route="[[route]]"
  pattern="/:category"
  data="{{routeData}}">
</app-route>
```

Two-way data binding in the host element ensures that the data is passed back to `<news-app>`:

`news-app.js` {.caption}

```html
<news-list
    ...
    category-name="{{categoryName}}"
    ...
    ...></news-list>
```

### Part 2: Data retrieval

`categoryName` and `articleId` are one-way bound from `<news-app>` to `<news-data>`:

`news-app.js` {.caption}

```html
<news-data
  ...
  category-name="[[categoryName]]"
  article-id="[[articleId]]"
  ...
  ...></news-data>
```

These properties tell `<news-data>` which resources to retrieve. `<news-data>` then creates an
`XMLHttpRequest` for the relevant resources, and stores the resulting category or article
information in its `category` and `article` properties.

For example, if the user has visited `/list/top_stories`, `categoryName` is set to `top_stories`.
`<news-data>` queries `/data/top_stories.json` and retrieves a list of the articles in the
`top_stories` category. This list is stored in `category`.

The `category` and `article` properties are two-way bound from `<news-app>` to `<news-data>`, and
therefore propagate back to `<news-app>`:

`news-app.js` {.caption}

```html
<news-data
    ...
    category="{{category}}"
    ...
    article="{{article}}"
    ...
    ...></news-data>
```

### Part 3: Data display

`category` and `article` are one-way bound from `<news-app>` to the elements that display this
content (`<news-list>` and `<news-article>`. When these properties are updated in `<news-app>`,
triggered by their change of state in `<news-data>`, they flow down to `<news-list>` or
`<news-article>`, depending on routing.

For example, if the user has visited `/list/top_stories`, `<news-data>` has populated
`<news-app>`'s `category` object with a list of articles in the `top_stories` category. The data
now propagates to `<news-list>` through one-way data binding:

`news-app.js` {.caption}

```html
<news-list
    ...
    category="[[category]]"
    ...
    ...></news-list>
```

These relationships are shown here:

<div class="image-container layout horizontal">
  <div class="image-wrapper">
    <img src="/images/3.0/toolbox/data-binding.png" alt="data binding relationships" width="700px">
  </div>
</div>

This sequence diagram shows the interactions between the elements of the News app when the user
visits `/list/top_stories`:

<div class="image-container layout horizontal">
  <div class="image-wrapper">
    <img src="/images/1.0/toolbox/sequence-diagram.png" alt="sequence diagram of data flow" width="700px">
  </div>
</div>

## Displaying ads

The `<news-gpt-ad>` element uses [Google Publisher Tag](https://developers.google.com/doubleclick-gpt/) to build ad requests from parameters supplied by its host elements. For example, in the `<news-article>` element:

`news-article.js` {.caption}

```javascript
<news-gpt-ad id="ad_slot_2"
  ad-unit-path="/6355419/Travel/Europe/France/Paris"
  ad-width="300" ad-height="250"></news-gpt-ad>
```
