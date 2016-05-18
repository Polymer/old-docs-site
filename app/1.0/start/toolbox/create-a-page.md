---
title: Step 2. Create a new page
subtitle: "Build an app with App Toolbox"
---

<!-- toc -->

The `app-drawer-template` includes 3 placeholder pages you can use
to start building out the views of your application. But at some point, you'll
probably want to add more

This step takes you through the process of adding a new page or top-level view
to your application.

## Create an element for the new page

First, create a new custom element that encapsulates the contents of
your new view.

1.  Create a new file called `src/my-new-view.html` and open it in an editor.

2.  Add some scaffolding for a new custom element definition using Polymer:

    ```
    <link rel="import" href="../bower_components/polymer/polymer.html">

    <dom-module id="my-new-view">

      <!-- Defines the element's style and local DOM -->
      <template>
        <style>
          :host {
            display: block;
            padding: 16px;
          }
        </style>
        <h1>New view</h1>
      </template>

      <!-- Creates the element's prototype and registers it -->
      <script>
        Polymer({
          is: 'my-new-view',
          properties: {
            route: Object
          }
        });
      </script>

    </dom-module>

    ```

For now your element is very basic, and just has a `<h1>` that says "New View",
but we can return to it and make it more interesting later.

## Add the element to your app

1.  Open `src/my-app.html` in a text editor.

1.  Find the set of existing pages inside the `<iron-pages>`:

    ```
      <iron-pages role="main" selected="[[page]]" attr-for-selected="name">
        <my-view1 name="view1"></my-view1>
        <my-view2 name="view2"></my-view2>
        <my-view3 name="view3"></my-view3>
      </iron-pages>
    ```

    The `<iron-pages>` is bound to the `page` variable that changes with the
    route, and selectes the active page while hiding the others.

1.  Add your new page inside the iron-pages:

    ```
        <my-new-view name="new-view"></my-new-view>
    ```

    Your `<iron-pages>` should now look like this:

    ```
      <iron-pages role="main" selected="[[page]]" attr-for-selected="name">
        <my-view1 name="view1"></my-view1>
        <my-view2 name="view2"></my-view2>
        <my-view3 name="view3"></my-view3>
        <my-new-view name="new-view"></my-new-view>
      </iron-pages>
    ```

    Note: Normally when adding a new custom element for the first time, you'd
    want to add an HTML Import to ensure the component definition has been
    loaded.  However, this app template is already set up to lazy-load top
    level views on-demand based on the route, so in this case you don't need
    to add an import for your new `<my-new-view>` element.

    The following code that came with the app template will ensure the
    definition for each page has been loaded when the route changes.  As
    you can see, we followed a simple convention (`'my-' + page + '.html'`)
    importing the definition for each route, and you can adapt this code as you
    like to handle more complex routing and lazy loading.

    Existing template code—you do not need to add this { .caption }

    ```
      _pageChanged: function(page) {
        // load page import on demand.
        this.importHref(
          this.resolveUrl('my-' + page + '.html'), null, null, true);
      }
    ```

## Create a navigation menu item

Last, we'll add a menu item in the left-hand drawer to allow navigating to
your new page.

1.  Keep `src/my-app.html` open in your editor.

1.  Find the navigation menu inside the `<app-drawer>` element.

    ```
    <!-- Drawer content -->
    <app-drawer>
      <app-toolbar>Menu</app-toolbar>
      <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
        <a name="view1" href="/view1">View One</a>
        <a name="view2" href="/view2">View Two</a>
        <a name="view3" href="/view3">View Three</a>
      </iron-selector>
    </app-drawer>
    ```

    Each navigation menu item consists of an anchor element (`<a>`) styled with CSS.

1.  Add the following new navigation item to the bottom of the menu.

    ```
        <a name="new-view" href="/new-view">New View</a>
    ```

    Your menu should now look like the following:

    ```
    ...
    <!-- Drawer content -->
    <app-drawer>
      <app-toolbar>Menu</app-toolbar>
      <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
        <a name="view1" href="/view1">View One</a>
        <a name="view2" href="/view2">View Two</a>
        <a name="view3" href="/view3">View Three</a>
        <a name="new-view" href="/new-view">New View</a>
      </iron-selector>
    </app-drawer>
    ...
    ```

Your new page is now ready! Open your web browser and view it at
[http://localhost:8080/new-view](http://localhost:8080/new-view).

![Example of new page](/images/1.0/toolbox/app-drawer-template-newview.png)

## Register the page for the build

When you deploy your application to the web, you'll use the Polymer CLI
to prepare your files for deployment.  Polymer CLI will need to know about any
demand-loaded fragments like the lazy-loaded view you just added.

1.  Open `polymer.json` in a text editor.

1.  Add `src/my-new-view.html` to the list of `fragments`.

    The new list should look like this:

    ```
    "fragments": [
      "src/my-view1.html",
      "src/my-view2.html",
      "src/my-view3.html",
      "src/my-new-view.html"
    ]
    ```

Note: You only need to add files you will lazy load or import using the `async`
attribute to the `fragments` list.  Any files that are imported using synchronous
`<link rel="import">` tags should *not* be added to `fragments`.

## Next steps

Now that you've added a new page to your application, learn how to [add 3rd-party
elements to your application](add-elements), or how to
[deploy the app to the web](deploy).
