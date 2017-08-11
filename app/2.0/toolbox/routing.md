---
title: Routing with <app-route>
---

<!-- toc -->

For client-side routing, App Toolbox uses the
[`<app-route>`](https://www.webcomponents.org/element/PolymerElements/app-route) element to provide
_modular routing_. Modular routing means that instead of having a central repository for all your
application's routes, individual components manage some portion of the route, and delegate the rest
to other components.

**Why modular routing?** For background on `<app-route>` and modular routing, see
[Encapsulated routing with elements](/blog/routing).
{.alert .alert-info}

## Install app-route

Install the `app-route` package with Bower:

    bower install --save PolymerElements/app-route

## Add routing

Your first task is to decide how your app's routes map to elements. For example, if you have an
application with several main views:

| View | Route |
| :--- | :---- |
| User profile view | <code>/profile/<var>:user_id</var></code> |
| Message list | <code>/messages</code> |
| Message view | <code>/detail/<var>:message_id</var></code> |

You might have a main application element and a separate view component for each tab. The application
element manages the top-level route, selects one of the views to display, and _delegates_ the rest
of the route to the active view. The app element's template might include markup like this:

```
<!-- app-location binds to the app's URL -->
<app-location route="{{route}}"></app-location>

<!-- this app-route manages the top-level routes -->
<app-route
    route="{{route}}"
    pattern="/:view"
    data="{{routeData}}"
    tail="{{subroute}}"></app-route>
```

The `<app-location>` element is simply a proxy for `window.location` that provides two-way data
binding. A single `<app-location>` element binds the top-level `<app-route>` element to the state of
the URL bar.

The `<app-route>` element matches the current `route` against a `pattern` (where `:view` represents
a parameter). If the pattern matches, the route is _active_ and any URL parameters are added to the
`data` object. In this case, the path `/profile/tina` matches the top-level route, setting
`routeData.view` to `profile`. The remainder of the route (`/tina`) forms the `tail`.

Based on the route, the app can use `<iron-pages>` to select a view to display:

```
<!-- iron-pages selects the view based on the active route -->
<iron-pages selected="[[routeData.view]]" attr-for-selected="name">
  <my-profile-view name="profile" route="{{subroute}}"></my-profile-view>
  <my-message-list-view name="messages" route="{{subroute}}"></my-message-list-view>
  <my-detail-view name="detail" route="{{subroute}}"></my-detail-view>
</iron-pages>
```

If the current URL is `/profile/tina`, the `<my-profile-view>` element is displayed, with _its_
route set to `/tina`. This view might embed its own `<app-route>` to process the route: for example,
to load the user's data:

```
<app-route
    route="{{route}}"
    pattern="/:user_id"
    data="{{routeData}}"></app-route>
<iron-ajax url="{{_profileUrlForUser(routeData.user_id)}}"
           on-response="handleResponse" auto>
```


## Route objects

The `route` object contains two properties:

-   `prefix`. The path matched by the previous `<app-route>` element. For the
    top-level `<app-route>` element, `prefix` is always the empty string.
-   `path`. The path this route object is matching against.

The `tail` object is also a route object, representing the route to pass to the
next `<app-route>` in line.

For example, if the current URL is `/users/bob/messages` and the top-level
`<app-route>` has the pattern `/users/:user':

The `route` object is:

    {
      prefix: '',
      path: '/users/bob/messages'
    }

The `tail` object is:

    {
      prefix: '/users/bob',
      path: '/messages'
    }

And the `routeData` object is:

    {
      user: 'bob'
    }

## Change routes

When using `<app-route>`, there are two ways to change the current URL.

-   Links. When you click a link, `<app-location>` intercepts the navigation
    event and updates its `route` property. Using links for your primary
    navigation is a good idea because they help search indexers understand the
    structure of your application.

-   Updating the route. The `route` object is read-write, so you can use
    two-way data binding or `this.set` to update the route. Both the `route`
    and `routeData` objects can be manipulated this way. For example:

    `this.set('route.path', '/search/');`

    Or:

    `this.set('routeData.user', 'mary');`

## Take action on route changes

Previous sections showed data binding to routes and route data, but sometimes you need to run code
when the route changes. Using observers, it's simple to react to changes to the route or data:

Route observer example {.caption}

```
static get observers() {
  return [
    '_routeChanged(route.*)',
    '_viewChanged(routeData.view)'
  ]
}

_routeChanged(changeRecord) {
  if (changeRecord.path === 'path') {
    console.log('Path changed!');
  }
}
_viewChanged(view) {
  // load data for view
}
```

## More resources

-   [Encapsulated routing with elements](/blog/routing)
-   [`<app-route>`
    API reference](https://www.webcomponents.org/element/PolymerElements/app-route)
