---
title: Define an element
---

<!-- toc -->


## Define a custom element {#register-element}


To define a custom element, create a class that extends Polymer.Element, and pass the class to the customElements.define method. The class must have a static `is` getter that returns the HTML tag name for your custom element.

By specification, the custom element's name **must start with a lower-case ASCII letter, and must contain a dash (-)**.

Example: { .caption }

```
// define the element's class element
class MyElement extends Polymer.Element {

  static get is() { return 'my-element'; }

  // Element class can define custom element reactions
  connectedCallback() {
    super.connectedCallback();
    console.log('my-element created!');
  }

  ready() {
    super.ready();
    this.textContent = 'I'm a custom element!';
  }
}

// Associate the new class with an element name
window.customElements.define(MyElement.is, MyElement);

// create an instance with createElement:
var el1 = document.createElement('my-element');

// ... or with the constructor:
var el2 = new MyElement();
```

As shown above, the element's class can define callbacks for the custom element reactions as described in [Custom element lifecycle](custom-elements#element-lifecycle).

## Define an element in the main HTML document {#main-document-definitions}

You should only define elements from the main document when
experimenting. In production, elements should always be defined in
separate files and imported into your main document.

To define an element in your main HTML document, define the element
from `HTMLImports.whenReady(callback)`. `callback` is invoked when
all imports in the document have finished loading.

```
<!DOCTYPE html>
<html>
  <head>
    <script src="bower_components/webcomponentsjs/webcomponents-lite.js">
    </script>
    <link rel="import" href="bower_components/polymer/polymer-element.html">
    <title>Defining a Polymer Element from the Main Document</title>
  </head>
  <body>
    <dom-module id="main-document-element">
      <template>
        <p>
          Hi! I'm a Polymer element that was defined in the
          main document!
        </p>
      </template>
      <script>
        HTMLImports.whenReady(function() {
          class MainDocumentElement extends Polymer.Element {

            static get is() { return 'main-document-element'; }

          }
          window.customElements.define(MainDocumentElement.is, MainDocumentElement);
        });
      </script>
    </dom-module>
    <main-document-element></main-document-element>
  </body>
</html>
```

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
prototype chain. However, you can use [behaviors](#prototype-mixins) to
share code between elements.

## Lifecycle callbacks {#lifecycle-callbacks}

The Polymer.Element class implements the standard Custom Element lifecycle
callbacks to perform tasks necessary for Polymer's built-in features.

Polymer adds an extra callback, `ready`, which is invoked when Polymer has
finished creating and initializing the element's DOM.

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
      <p>Use for one-time configuration of your component after local
        DOM is initialized. (For configuration based on property values, it
        may be preferable to use an <a href="observers">observer</a>.)
      </p>
    </td>
  </tr>
  <tr>
    <td><code>attached</code></td>
    <td>Called after the element is attached to the document. Can be called multiple
        times during the lifetime of an element. The first `attached`  callback
        is guaranteed not to fire until after `ready`.
      <p>Uses include adding document-level event listeners. (For listeners local to the element, you can use declarative
        event handling, such as <a href="events.html#annotated-listeners">annotated
        event listeners</a> or the
        <a href="events#event-listeners"><code>listeners</code> object</a>,
        Polymer automatically adds listeners.)</p>
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

### Legacy behaviors {#prototype-mixins}

Legacy elements can share code in the form of _behaviors_, which can define
properties, lifecycle callbacks, event listeners, and other features.

For more information, see [Behaviors](/1.0/docs/devguide/behaviors) in the Polymer 1.0 docs.

