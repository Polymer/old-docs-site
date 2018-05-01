---
title: Step 3. Add some elements
subtitle: "Build an app with App Toolbox"
---

<!-- toc -->

Now that you've added a new view to your application, you can start building
out the details of that view.

In the process, you'll likely want to turn
to some off-the-shelf components, for example from [webcomponents.org][webcomponents.org].


## Install an off-the-shelf component

Once you've identified a component you'd like to install, you'll want to find
the npm package name for the component.

In this step, you'll add Polymer's `<paper-checkbox>` element to your app.

Run the following command from your root project folder:

    npm install @polymer/paper-checkbox@next --save

## Add the element to your application

1.  Open `src/my-new-view.js` in a text editor.

1.  Import `paper-checkbox.js`.

    Add this import beneath the existing import for `polymer-element.js`:

    ```
    import '@polymer/paper-checkbox/paper-checkbox.js';
    ```

1.  Add the `<paper-checkbox>` element to the template for the element.

    ```
    <paper-checkbox>Ready to deploy!</paper-checkbox>
    ```

    You can add it under the `<h1>` you added in the previous step. Your `template` function
    should now look like this:

    my-new-view.js {. caption}

    ```js
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
          <paper-checkbox>Ready to deploy!</paper-checkbox>
          <p>New view!</p>
        </div>
      `;
    }
    ```

You should be able to see the `paper-checkbox` working in your new view now:

![Example of page with checkbox](/images/3.0/toolbox/starter-kit-checkbox.png)

## Next steps

Now that you've added a 3rd-party component to your page, learn how to
[deploy the app to the web](deploy).

[webcomponents.org]: https://www.webcomponents.org
[paper-checkbox]: https://www.webcomponents.org/element/PolymerElements/paper-checkbox
