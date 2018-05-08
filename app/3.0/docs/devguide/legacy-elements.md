---
title: Work with legacy elements
---

<!-- toc -->

## Define a legacy element {#legacy-element}

Legacy elements can use use the `Polymer` function to register an element.
The function takes as its argument the  prototype for the new element. The prototype
must have an `is` property that specifies the HTML tag name for your custom element.

By specification, the custom element's name **must start with an ASCII letter and contain a dash (-)**.

Example: { .caption }

```
    // register an element
    MyElement = Polymer({

      is: 'my-element',

      // See below for lifecycle callbacks
      created: function() {
        this.textContent = 'My element!';
      }

    });

    // create an instance with createElement:
    var el1 = document.createElement('my-element');

    // ... or with the constructor:
    var el2 = new MyElement();
```

The `Polymer` function registers the element with the browser and returns a
constructor that can be used to create new instances of your element via code.

The `Polymer` function sets up the prototype chain for your custom element,
chaining it to the Polymer `Base` prototype (which provides
Polymer value-added features), so you cannot set up your own
prototype chain. However, you can use [behaviors](#legacy-behaviors) to
share code between elements.

## Legacy lifecycle callbacks {#lifecycle-callbacks}

Legacy elements use a different set of lifecycle callbacks than standard Polymer 3.x elements.
These callbacks are based on the  custom elements v0 lifecycle that was supported in Polymer 1.x.

<table>
  <tr>
    <th>Legacy callback</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>created</code></td>
    <td>Called when the element has been created, but before property values are
       set and local DOM is initialized.
      <p>Use for one-time set-up before property values are set.
      </p>
      <p>Equivalent to the native constructor.
      </p>
    </td>
  </tr>
  <tr>
    <td><code>ready</code></td>
    <td>Called after property values are set and local DOM is initialized.
      <p>Use for one-time configuration of your component after its shadow
        DOM tree is initialized. (For configuration based on property values, it
        may be preferable to use an <a href="observers">observer</a>.)
      </p>
    </td>
  </tr>
  <tr>
    <td><code>attached</code></td>
    <td>Called after the element is attached to the document. Can be called multiple
        times during the lifetime of an element. The first <code>attached</code> callback
        is guaranteed not to fire until after <code>ready</code>.
      <p>Uses include adding document-level event listeners. (For listeners local to the element, you can use declarative
        event handling, such as <a href="events#annotated-listeners">annotated
        event listeners</a>.)</p>
     <p>Equivalent to native <code>connectedCallback</code>.</p>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>detached</code></td>
    <td>Called after the element is detached from the document. Can be called
        multiple times during the lifetime of an element.
      <p>Uses include removing event listeners added in <code>attached</code>.
      </p>
      <p>Equivalent to native <code>disconnectedCallback</code>.</p>
      </p>
    </td>
  </tr>
  <tr>
    <td><code>attributeChanged</code></td>
    <td>Called when one of the element's attributes is changed.
      <p>Use to handle attribute changes that <em>don't</em> correspond to
        declared properties. (For declared properties, Polymer
        handles attribute changes automatically as described in
        <a href="properties#attribute-deserialization">attribute deserialization</a>.)
      </p>
      <p>Equivalent to the native <code>attributeChangedCallback</code>.
      </p>
    </td>
  </tr>
</table>

## Legacy behaviors {#legacy-behaviors}

Legacy elements can share code in the form of _behaviors_, which can define
properties, lifecycle callbacks, event listeners, and other features.

For more information, see [Behaviors](/1.0/docs/devguide/behaviors) in the Polymer 1.x docs.
