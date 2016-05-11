---
title: Routing with <carbon-route>
---

<!-- toc -->

For client-site routing, App Toolbox uses the `<carbon-route>` element to provide _modular routing_.  Modular routing means that instead of having a central repository for all your application's routes, individual components manage some portion of the route, and delegate the rest to other components.

**Why modular routing?** For background on `<carbon-route>` and modular routing, see [Encapsulated routing with elements](/1.0/articles/routing.html).
{.alert .alert-info}

For example, if you have an application with several main views:

| View | Route |
| User profile view | <code>/profile/<var>user_id</var></code> |
| Message list | <code>/messages</code> |
| Message view | <code>/detail/<var>message_id</var></code> |

You might have a main application element and a separate view component for each tab. The application element manages the top-level route, selects one of the views to display, and _delegates_ the rest of the route to the active view. The app element's template might include markup like this:

```
<!-- carbon-location binds to the app's URL -->
<carbon-location route="{{route}}"></carbon-location>

<!-- this carbon-route manages the top-level routes —>
<carbon-route
    route="{{route}}"
    pattern="/:view"
    data="{{routeData}}"
    tail="{{subroute}}"></carbon-route>
```

The `<carbon-location>` element is simply a proxy for `window.location` that provides two-way data binding. A single `<carbon-location>` element binds the top-level `<carbon-route>` element to the state of the URL bar.

The `<carbon-route>` element matches the current `route` against a `pattern` (where `:view` represents a parameter). If the pattern matches, the route is _active_ and any URL parameters are added to the `data` object. In this case, the path `/profile/tina` matches the top-level route, setting `routeData.view` to `profile`. The remainder of the route (`/tina`) forms the `tail`.

Based on the route, the app can use `<iron-pages>` to select a view to display:

```
<!-- iron-pages selects the view based on the active route —>
<iron-pages selected="[[routeData.view]]" attr-for-selected="name">
  <my-profile-view name="profile" route="{{subroute}}"></my-profile-view>
  <my-message-list-view name="messages" route="{{subroute}}"></my-message-list-view>
  <my-detail-view name="messages" route="{{subroute}}"></my-detail-view>
</iron-pages>
```

If the current URL is `/profile/tina`, the `<my-profile-view>` element is displayed, with _its_ route set to `/tina`. This view might embed its own `<carbon-route>` to process the route: for example, to load the user's data:

```
<carbon-route
    route="{{route}}"
    pattern="/:user_id"
    data="{{routeData}}"></carbon-route>
<iron-ajax url="{{_profileUrlForUser(routeData.user_id)}}
           on-response="handleResponse" auto>
```


## Route object

## Navigation

When using `<carbon-route>`, there are two ways to change the current path.

-   Links. When you click a link, `<carbon-location>` intercepts the navigation
    event and updates its `route` property. Using links for your primary
    navigation is a good idea because they help search indexers understand the
    structure of your application.

-   Updating the route. The `route` object is read-write, so you can use two-way
    data binding or `this.set` to update the route. Both the `route` and
    `routeData` objects can be manipulated this way. For example:

    `this.set('route.path', '/search/);`

## Taking action on route changes

Previous sections showed data binding to routes and route data, but sometimes you need to run code when the route changes. Using observers, it's simple to react to changes to the route or data:

```
observers: [
  '_routeChanged(route.*)'
  '_viewChanged(routeData.view)'
],
_routeChanged: function(changeRecord) {
  if (changeRecord.path == 'path' {
    console.log('Path changed!');
  }
},
_viewChanged: function(view) {
  // load data for view
}
```

## More resources

-   [Encapsulated routing with elements](/1.0/blog/routing.html)
-   [`<carbon-route>`
    API reference](https://elements.polymer-project.org/elements/carbon-route)