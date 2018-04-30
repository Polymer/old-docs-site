---
title: Step 2. Create a new page
subtitle: "Build an app with App Toolbox"
---

<!-- toc -->

The starter kit includes placeholder pages you can use to start building out
the views of your application. But at some point, you'll probably want to add more.

This step takes you through the process of adding a new page or top-level view to your application.

## Create an element for the new page

First, create a new custom element that encapsulates the contents of
your new view.

1.  Create a new file called `src/my-new-view.js` and open it in an editor.

2.  Add some scaffolding for a new custom element definition using Polymer:

    ```js
    /* Load the PolymerElement base class and html helper function */
    import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
    /* Load shared styles. All view elements use these styles */
    import './shared-styles.js';
    
    /* Extend the base PolymerElement class */
    class MyNewView extends PolymerElement {
      /* Define a template for the new element */
      static get template() {
        return html`
          <style include="shared-styles">
            :host {
              display: block;

              padding: 10px;
            }
          </style>

          <div class="card">
            <div class="circle">1</div>
            <h1>New View</h1>
            <p>New view!</p>
          </div>
        `;
      }
    }
    /* Register the new element with the browser */
    window.customElements.define('my-new-view', MyNewView);
    ```

## Add the element to your app

Your element is defined, but your app isn't actually using it yet. To use it,
you need to add it to your app's HTML template.

1.  Open `src/my-app.js` in a text editor.

1.  Find the set of existing pages inside the `<iron-pages>`:

    ```html
    <iron-pages
        selected="[[page]]"
        attr-for-selected="name"
        role="main">
      <my-view1 name="view1"></my-view1>
      <my-view2 name="view2"></my-view2>
      <my-view3 name="view3"></my-view3>
      <my-view404 name="view404"></my-view404>
    </iron-pages>
    ```

    The `<iron-pages>` is bound to the `page` variable that changes with the
    route, and selects the active page while hiding the others.

1.  Add your new page inside the iron-pages:

    ```html
    <my-new-view name="new-view"></my-new-view>
    ```

    Your `<iron-pages>` should now look like this:

    ```html
    <iron-pages
        selected="[[page]]"
        attr-for-selected="name"
        role="main">
      <my-view1 name="view1"></my-view1>
      <my-view2 name="view2"></my-view2>
      <my-view3 name="view3"></my-view3>
      <my-new-view name="new-view"></my-new-view>
      <my-view404 name="view404"></my-view404>
    </iron-pages>
    ```

## Add a valid route for your new view

As the user navigates your app, the route data changes. In `src/my-app.js`, the app checks
the requested route against a list of valid routes. Now, you'll add your new view to the 
list of valid routes. 

1.  Locate the `_routePageChanged` function:

    ```js
    _routePageChanged(page) {
      if (!page) {
        /* If no page was found in the route data, page will be an empty string.
           Default to 'view1' in that case. */
        this.page = 'view1';
      } else if (['view1', 'view2', 'view3'].indexOf(page) !== -1) {
        this.page = page;
      } else {
        this.page = 'view404';
      }
      ...
    }
    ```

2.  Modify the `else if` line to include the name of your new view (`new-view`).
    
    `_routePageChanged` should now look like this:

    ```js
    _routePageChanged(page) {
      if (!page) {
        /* If no page was found in the route data, page will be an empty string.
            Default to 'view1' in that case. */
        this.page = 'view1';
      } else if (['view1', 'view2', 'view3', 'new-view'].indexOf(page) !== -1) {
        this.page = page;
      } else {
        this.page = 'view404';
      }
      ...
    }
    ```

## Import your new view dynamically

The starter kit uses [dynamic `import()`](https://developers.google.com/web/updates/2017/11/dynamic-import) to load views on demand. You need to add the file you created earlier (`src/my-new-view.js`) to the set of views that are imported dynamically. 
    
1.  In `src/my-app.js`, locate the `_pageChanged` function:

    ```js
    _pageChanged(page) {
      // Load page import on demand. Show 404 page if fails
      // Note: `polymer build` doesn't like string concatenation in
      // the import statement, so break it up.

      switch(page) {
        case 'view1':
          import('./my-view1.js');
          break;
        case 'view2':
          import('./my-view2.js');
          break;
        case 'view3':
          import('./my-view3.js');
          break;
        case 'view404':
          import('./my-view404.js');
          break;
      }
    }
    ```

2.  Add the following `case` to the `switch` statement to handle your new view:

    ```js
    case 'new-view':
      import('./my-new-view.js');
      break;
    ```

    Your `_pageChanged` function should now look like this:

    ```js
    _pageChanged(page) {
      // Load page import on demand. Show 404 page if fails
      // Note: `polymer build` doesn't like string concatenation in
      // the import statement, so break it up.

      switch(page) {
        case 'view1':
          import('./my-view1.js');
          break;
        case 'view2':
          import('./my-view2.js');
          break;
        case 'view3':
          import('./my-view3.js');
          break;
        case 'new-view':
          import('./my-new-view.js');
          break;
        case 'view404':
          import('./my-view404.js');
          break;
      }
    }
    ```

## Create a navigation menu item

You've defined your new element, created a valid route to handle the case when a user navigates to it, and imported its JavaScript file dynamically. Now you need to add a menu item in the left-hand drawer so that users can navigate to the new page.

1.  In `src/my-app.js`, find the navigation menu inside the `<app-drawer>` element:

    ```html
    <!-- Drawer content -->
    <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
      <app-toolbar>Menu</app-toolbar>
      <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
        <a name="view1" href="[[rootPath]]view1">View One</a>
        <a name="view2" href="[[rootPath]]view2">View Two</a>
        <a name="view3" href="[[rootPath]]view3">View Three</a>
      </iron-selector>
    </app-drawer>
    ```

1.  Add the following new navigation item to the bottom of the menu:

    ```html
    <a name="new-view" href="[[rootPath]]new-view">New View</a>
    ```

    Your menu should now look like the following:

    ```html
    <!-- Drawer content -->
    <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
      <app-toolbar>Menu</app-toolbar>
      <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
        <a name="view1" href="[[rootPath]]view1">View One</a>
        <a name="view2" href="[[rootPath]]view2">View Two</a>
        <a name="view3" href="[[rootPath]]view3">View Three</a>
        <a name="new-view" href="[[rootPath]]new-view">New View</a>
      </iron-selector>
    </app-drawer>
    ```

## Serve your app

Your new page is now ready! If the Polymer CLI development server is still running, you can refresh your browser window to see the changes. Otherwise, serve your app with `polymer serve` and open the URL shown at `applications`.

![Example new page](/images/3.0/toolbox/new-view.png)

## Next steps

You've added a new page to your application. Next, learn how to install and add an off-the-shelf custom element to your app.

<a class="blue-button"
    href="add-elements">Next step: Add an element</a>
