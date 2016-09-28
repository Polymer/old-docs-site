---
title: Step 2. Create a new page
subtitle: "Build an app with App Toolbox"
---

<!-- toc -->

This tutorial teaches you how to add a new page (i.e. top-level view) to
your app. 

## Create an element for the new page

The new page you're about to create will itself be a Polymer element. All of 
the content, style, and behavior of the page will be encapsulated inside of 
the element. 

1.  Create a new file called `src/my-new-view.html` and open it in an editor.

2.  Add the following code to `my-new-view.html`.  

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

## Add the page element to your app

Your element is defined, but your app isn't actually using it yet. To use it,
you need to declare it in your app's HTML.

1.  Open `src/my-app.html` in a text editor.

1.  Find the `iron-pages` element and declare your new page at the bottom. 


    ```
      <iron-pages role="main" selected="[[page]]" attr-for-selected="name">
        <my-view1 name="view1"></my-view1>
        <my-view2 name="view2"></my-view2>
        <my-view3 name="view3"></my-view3>
        <my-new-view name="new-view"></my-new-view>
      </iron-pages>
    ```

    The `iron-pages` element is a reusable component that will not be 
    perceivable to viewers of your live page. 
    It just handles the logic for deciding which page to 
    display. The `selected` attribute of `iron-pages` determines which 
    page is displayed. The value of `selected` may look strange to you. 
    That's Polymer's data-binding syntax. The `selected` property is hooked 
    up a variable named `page`. Whenever the value of `page` changes, 
    `iron-pages` automatically displays the new page. 
    {.alert .alert-info}

### Aside: Where's the HTML import?

Normally when adding a new custom element for the first time, you'd
want to add an HTML Import to ensure the component definition has been
loaded.  However, this app template is already set up to lazy-load top
level views on-demand based on the route, so in this case you don't need
to add an import for your new `<my-new-view>` element.

The following code from the app template handles the lazy loading. 
It follows a simple convention for importing each route 
(`'my-' + page + '.html'`). You can adadpt this code as you like to handle
more complex routing and lazy loading. 

Existing template code (You do not need to add this) { .caption }

```
  _pageChanged: function(page) {
    // load page import on demand.
    this.importHref(
      this.resolveUrl('my-' + page + '.html'), null, null, true);
  }
```

## Create a navigation menu item

You've defined your new element and declared it in your app. Now you 
just need to add a menu item in the left-hand drawer so that users can 
navigate to the new page. 

1.  Find the `<app-drawer>` element in `src/my-app.html` and add a menu
    item for your new page at the bottom. 

    ```
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
    ```

Your new page is now ready! 

![Example of new page](/images/1.0/toolbox/app-drawer-template-newview.png)

## Register the page for the build

When you deploy your application to the web, you'll use Polymer CLI
to prepare your files for deployment.  Polymer CLI needs to know about any
demand-loaded fragments like the lazy-loaded view you just added.

1.  Open `polymer.json` in an editor.

1.  Add `src/my-new-view.html` to the bottom of the `fragments` list.

    ```
    "fragments": [
      "src/my-view1.html",
      "src/my-view2.html",
      "src/my-view3.html",
      "src/my-new-view.html"
    ]
    ```

You only need to add files to the `fragments` list if you lazy-load them 
or import them using the `async` attribute. Any files that are imported
synchronously (e.g. `<link rel="import" ...>` should **not** be added to
`fragments`. 

## Next steps

You've added a new page to your application. Next, learn how to install and 
add a third-party reusable component to your app. 

<a class="blue-button"
    href="add-elements">Next step: Add an element</a>
