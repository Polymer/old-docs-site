## Learn the tech

### Why Custom Elements?

Custom Elements let authors define their own elements. Authors associate JavaScript code with custom tag names, and then use those custom tag names as they would any standard tag.

For example, after registering a special kind of button called `super-button`, use the super button just like this:

    <super-button></super-button>

Custom elements are still elements. We can create, use, manipulate, and compose them just as easily as any standard `<div>` or `<span>` today.

The Custom Elements specification also supports declaring custom elements in markup, using the `<element>` tag. The `<element>` tag provides a mechanism to encapsulate HTML, CSS, and JavaScript into reusable, encapsulated components. As before, custom elements built this way work just like standard elements.

### Basic usage

#### document.register()

Invoke `document.register()` somewhere in script.

    var XFooPrototype = Object.create(HTMLElement.prototype);
    XFooPrototype.readyCallback = function() {
      this.textContent = "I'm an x-foo!";
    };

    var XFoo = document.register('x-foo', {
      prototype: FooPrototype
    });
  
#### &lt;element&gt;

    <element name='x-foo'>
      <section>
        <b>I'm an x-foo!</b>
      </section>
      <script>
        // when <element> is in document, we might run in wrong context,
        // we only want to do work when this == <element>
        if (this !== window) {
          var section = this.querySelector('section');
        }
        // has built-in 'window' protection
        this.register({
          prototype: {
            readyCallback: function() {
              this.innerHTML = this.section.innerHTML;
            }
          }
        });
      </script>
    </element>

#### Notes

* In the `document.register()` example above, `XFoo` is the new element's constructor. Browser limitations require that we supply the constructor while you supply the prototype. You can use `readyCallback` to do initialization work that might otherwise be in the constructor.
     
After registration, elements with the custom tag name are expressed with new features, so

    <x-foo></x-foo>
  
displays as

    I'm an x-foo!  

* Custom element names must always contain a dash (-)
* Using `document.register` the input prototype must be chained to `HTMLElement.prototype` (i.e. must be `instanceof HTMLElement.prototype`).

If input prototype uses a specialization of `HTMLElement.prototype`, you must declare the type using the `extends` option when calling `document.register`
  
Example extending `button`:
  
    var XFooPrototype = Object.create(HTMLButtonElement.prototype);
    XFooPrototype.readyCallback = function() {
      this.textContent = "I'm an x-foo!";
    };

    var XFoo = document.register('x-foo', {
      prototype: FooPrototype,
      extends: 'button'
    });

* Using `<element>`, the input prototype must be a simple object, and the system chains the correct prototype based on the `extends` attribute.
  
Example extending `button`:

    <element name="x-foo" extends="button">

## Polyfill details

### Getting Started

Include the `custom-elements.js` or `custom-elements.min.js` (minified) file in your project.

    <script src="CustomElements/custom-elements.js"></script>

`custom-elements.js` is the debug loader and uses `document.write` to load additional modules. 
Use the minified version (`custom-elements.min.js`) if you need to load the file dynamically.

### Polyfill Notes

The polyfill parses `<element>` tags and handles element upgrades asynchronously. To know when the polyfill has
finished all start up tasks, listen to the `WebComponentsReady` event on `document` or `window`.

Example:

    <script>
      // hide body to prevent FOUC
      document.body.style.opacity = 0;
      window.addEventListener('WebComponentsReady', function() {
        // show body now that everything is ready
        document.body.style.opacity = 1;
      });
    </script>

The Custom Elements specification is still under discussion. The polyfill implements certain features in advance of the specification. In particular, there are several notification callback methods that are used if implemented on the element prototype.

* `readyCallback()` is called when a custom element is created.
* `insertedCallback()` is called when a custom element is inserted into a DOM subtree.
* `removedCallback()` is called when a custom element is removed from a DOM subtree.
* `attributeChanged(attributeName)` is called when a custom element's attribute value has changed

`readyCallback` is invoked _synchronously_ with element instantiation, the other callbacks are called _asyncronously_. The asynchronous callbacks generally use MutationObserver timing model, which means they are called before layouts, paints, or other triggered events, so the developer need not worry about flashing content or other bad things happening before the callback has a chance to react to changes.

The `extends` option to `document.register()` (discussed above)  is exclusive to this polyfill.

## Tools & Testing

For running tests or building minified files, consult the [tooling information](http://toolkitchen.github.com/tooling-strategy.html).