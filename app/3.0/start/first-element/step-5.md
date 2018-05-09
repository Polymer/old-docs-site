---
title: "Step 5: Style an element with custom CSS properties"
subtitle: "Build your first Polymer element"
---

<!-- toc -->

Shadow DOM helps prevent users from styling your element's internals by accident. To allow users to style your component, you can use _custom CSS properties_. 

  * _Inside your element_, you create styles using the values of custom CSS properties.
    
  * _Outside your element_, users of the element assign values to the custom CSS properties that are used by your styles.

## Step 5: Style an element with custom CSS properties

In this step, you'll: 

* [Create styles using the values of custom CSS properties](#create).
* [Set values for the custom properties](#set).

If you want to learn how custom properties can be used to create a document-level theme, you can also:

* [Extra credit: Set custom properties at the document level](#extra).

### Create styles using the values of custom CSS properties {#create}

In `icon-toggle.js`, inside the `template` function, edit the `<style>` block. Replace the values assigned to `fill` and `stroke` with custom properties.

Before  { .caption }

```html
<style>
  :host {
    display: inline-block;
  }
  iron-icon {
    fill: rgba(0,0,0,0);
    stroke: currentcolor;
  }
  :host([pressed]) iron-icon {
    fill: currentcolor;
  }
</style>
```

After  { .caption }

```html
<style>
  :host {
    display: inline-block;
  }
  iron-icon {
    fill: var(--icon-toggle-color, rgba(0,0,0,0));
    stroke: var(--icon-toggle-outline-color, currentcolor);
  }
  :host([pressed]) iron-icon {
    fill: var(--icon-toggle-pressed-color, currentcolor);
  }
</style>
```

Key information:

  * A custom property name must always start with two dashes (`--`). 

  * Access the value of a custom property with the `var` function, e.g.:
  
    ```css
    iron-icon {
      fill: var(--icon-toggle-color);
    }
    ```
  
  * You can add a default value, which will be used if the custom property is not defined:

    ```css
    iron-icon {
      fill: var(--icon-toggle-color, rgba(0,0,0,0));
    }
    ```

### Set values for custom properties {#set}

From the `demo` folder, open `demo-element.js` and set values for the new properties.

demo/demo-element.js: Before { .caption }

```html
<style>
  :host {
    font-family: sans-serif;
  }
</style>
```

demo/demo-element.js: After { .caption }

```html
<style>
  :host {
    font-family: sans-serif;
    --icon-toggle-color: lightgrey;
    --icon-toggle-outline-color: black;
    --icon-toggle-pressed-color: red;
  }
</style>
```

Key information:

  * Assign values to custom properties with a CSS rule. E.g.: 

    ```css
    <style>
      :host {
        --icon-toggle-color: lightgrey;
      }
    </style>
    ```

Run the demo again to get colorful!

<img src="/images/3.0/first-element/toggles-styled.png" alt="Demo showing icon toggles with star and heart icons. Pressed icons are red.">

That's it — your element is finished. You've created an element that has a basic UI, API, and custom styling properties.

If you have any trouble getting the element working, the `icon-toggle-finished` folder contains the final code.

If you'd like to learn a little more about custom properties, read on.

### Extra credit: Set custom properties at the document level {#extra}

You might want to create a theme for an entire application. One way to do this is to define custom properties at the document level, outside of your Polymer elements. 

Because custom properties aren't built into most browsers yet, if you use them outside a Polymer element, you need to use a special `custom-style` tag. 

Add the following code inside the `<head>` tag of `demo/index.html`:

demo/index.html {.caption}

```html
<custom-style>
  <style>
    /* Define a document-wide default */
    html {
      --icon-toggle-outline-color: red;
    }
    /* Override the value specified inside demo/demo-element.js */
    demo-element {
      --icon-toggle-pressed-color: blue;
    }
    /* This rule does not work! */
    body {
      --icon-toggle-color: purple;
    }
  </style>
</custom-style>
```

Key information:

  * The `html` selector matches the root HTML document element in `demo/index.html`. The custom property value defined in the `html {...}` rule in `demo/index.html` acts as a default and will be inherited by any elements in its scope. 

  * The `demo-element` selector matches the `<demo-element>` element and has a **higher specificity** than the `:host` selector inside `demo-element`. You can use this fact to specify your own values for custom properties that the author of a custom element has defined inside that custom element, without altering the element's code.

  * Custom properties can **only** be defined in rule-sets that match the `html` selector **or a Polymer custom element.** This is a limitation of the Polymer implementation of custom properties. 
  
  * Elements must be in the same document scope as the `<custom-style>` for selectors defined in a `<custom-style>` to match them. Elements inside another element's shadow DOM are not in main document scope.

    For example, in the diagram below, `<demo-element>` is in the same scope as a `<custom-style>` in `demo/index.html`, while `<iron-icon>` and `<icon-toggle>` are not.

    demo/index.html DOM tree {.caption}

    ```
    <html>
      <demo-element>
        #shadow-root
          <icon-toggle>
            #shadow-root 
              <iron-icon>
    ```

    Using the DOM tree above, the selectors in the following code sample will find a match:

    demo/index.html {.caption}

    ```html
    <custom-style>
      <style>
        html { ... }
        demo-element { ... }
      </style>
    </custom-style>
    <demo-element></demo-element>
    ```

    The selectors in the following code sample, however, will not find a match: 

    demo/index.html {.caption}

    ```html
    <custom-style>
      <style>
        iron-icon { ... }
        icon-toggle { ... }
      </style>
    </custom-style>
    <demo-element></demo-element>
    ```

For more information, see the documentation on [custom CSS properties](/{{{polymer_version_dir}}}/docs/devguide/custom-css-properties).

### Next steps

* Ready to get started on your own element? You can use the Polymer CLI to
[Create an element project](/{{{polymer_version_dir}}}/docs/tools/polymer-cli#element).

* You can also see the [Build an app](/{{{polymer_version_dir}}}/start/toolbox/set-up)
tutorial to get started on an app using the Polymer App Toolbox.

Or review the previous section:

<a class="blue-button" href="step-4">
  Previous Step: React to input
</a>
