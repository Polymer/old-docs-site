---
title: Step 3. Add some elements
subtitle: "Build an app with App Toolbox"
---

<!-- toc -->

Now that we've added a new view to our application, we can start building
out the details of that view.

In the process, we'll likely want to turn
to some off-the-shelf components, for example from the
[Polymer Element Catalog][catalog] or community catalogs like
[customelements.io][ceio].  Let's see what that process looks like.

## Ensure bower is installed

[Bower][bower] is a front-end package manager which is the most common
tool used for fetching and managing web components.

Ensure it is installed by running the following command:

    npm install -g bower

## Install a 3rd-party component

Once you've identified a component you'd like to install, you'll want to find
the bower package name for the component.

Let's add Polymer's `<paper-slider>` element to our app, which is listed in the
[Polymer Element Catalog here][paper-slider].  You'll find its bower install
command on the left hand side of that screen.

Run that from your project root directory:

    bower install --save PolymerElements/paper-slider

## Add the element to our application

1.  Open `src/my-new-view.html` in a text editor.

1.  Import `paper-slider.html` as a dependency

    Add this import beneath the existing import for `polymer.html`:

    ```
    <link rel="import" href="../bower_components/paper-slider/paper-slider.html">
    ```

1.  Add the `<paper-slider>` element to the template for the element.

    ```
    <paper-slider min="-100" max="100" value="50"></paper-slider>
    ```

    We can add it under the `<h1>` we added in the previous step.  Our new
    template should look like this:

    ```
    <!-- Defines the element's style and local DOM -->
    <template>
      <style>
        :host {
          display: block;
          padding: 16px;
        }
      </style>
      <h1>New view</h1>
      <paper-slider min="-100" max="100" value="50"></paper-slider>
    </template>
    ```

You should be able to see the `paper-slider` working in your new view now:
[http://localhost:8080/new-view](http://localhost:8080/new-view).

![Example of page with slider](/images/1.0/toolbox/app-drawer-template-slider.png)

## Next steps

Now that you've added a 3rd-party component to your page, lear how to
[deploy the app to the web](deploy).

[bower]: http://bower.io/
[catalog]: https://elements.polymer-project.org/
[paper-slider]: https://elements.polymer-project.org/elements/paper-slider
[ceio]: https://customelements.io/
