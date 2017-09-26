---
title: Handle and fire events
---

<!-- toc -->

Elements  use events to communicate state changes up the DOM tree to parent elements.
Polymer elements can use the standard DOM APIs for creating, dispatching, and listening for events.

Polymer also provides annotated event listeners, which allow you to specify event listeners
declaratively as part of the  element's DOM template.

## Add annotated event listeners {#annotated-listeners}

To add event listeners to local DOM children, use
<code>on-<var>event</var></code>  annotations in your template. This often
eliminates the need to give an element an `id` solely for  the purpose of
binding an event listener.

Example: { .caption }

```html
<dom-module id="x-custom">
  <template>
    <button on-click="handleClick">Kick Me</button>
  </template>
  <script>
    class XCustom extends Polymer.Element {

      static get is() {return 'x-custom'}

      handleClick() {
        console.log('Ow!');
      }
    }
    customElements.define(XCustom.is, XCustom);
  </script>
</dom-module>
```

Because the event name is specified using an HTML attribute, **the event name is always
converted to lowercase**. This is because HTML attribute names are case
insensitive. So specifying `on-myEvent` adds a listener for `myevent`. The event _handler_
name (for example, `handleClick`) **is** case sensitive. **To avoid confusion, always use
lowercase event names.**

## Add and remove listeners imperatively {#imperative-listeners}

You can use the standard `addEventListener` and `removeEventListener`
methods to add and remove event listeners imperatively.

```js
ready() {
  super.ready();
  this.addEventListener('click', e => this._myClickListener(e));
}
```

The previous example uses an arrow function to ensure the listener is called with the element as the
`this` value. You can also use `bind` to create a bound instance of the listener function. This can
be  useful if you need to remove the listener.

```js
constructor() {
  super();
  this._boundListener = this._myLocationListener.bind(this);
}

connectedCallback() {
  super.connectedCallback();
  window.addEventListener('hashchange', this._boundListener);
}

disconnectedCallback() {
  super.disconnectedCallback();
  window.removeEventListener('hashchange', this._boundListener);
}
```

An element adding an event listener to itself or one of its shadow DOM children shouldn't prevent
the element from being garbage collected. However, an event listener attached to an outside element,
like a window or document level event listener, may prevent the element from being garbage
collected. Remove the event listener in `disconnectedCallback` to prevent memory leaks.


## Fire custom events {#custom-events}

To fire a custom event from the host element use the standard `CustomEvent` constructor and
the `dispatchEvent` method.

Example: { .caption }

```html
<dom-module id="x-custom">
  <template>
    <button on-click="handleClick">Kick Me</button>
  </template>

  <script>
    class XCustom extends Polymer.Element {

      static get is() {return 'x-custom'}

      handleClick(e) {
        this.dispatchEvent(new CustomEvent('kick', {detail: {kicked: true}}));
      }
    }
    customElements.define(XCustom.is, XCustom);
  </script>

</dom-module>
<x-custom></x-custom>

<script>
    document.querySelector('x-custom').addEventListener('kick', function (e) {
        console.log(e.detail.kicked); // true
    })
</script>
```
The `CustomEvent` constructor is not supported on IE, but the webcomponents polyfills include a
small polyfill for it so you can use the same syntax everywhere.

By default, custom events stop at shadow DOM boundaries. To make a custom event pass through
shadow DOM boundaries, set the `composed` flag to true when you create the event:

```js
var event = new CustomEvent('my-event', {bubbles: true, composed: true});
```

**Backwards compatibility.** The `fire` instance method in the legacy API sets both `bubbles` and `composed` to true by default.
To get the same behavior, you need to specify both options when you create a custom event, as shown
above.
{.alert .alert-info}

## Handle retargeted events {#retargeting}

Shadow DOM has a feature called "event retargeting" which changes an event's
target as it bubbles up, such that target is always in the same scope as the
receiving element. (For example, for a listener in the main document, the
target is an element in the main document, not in a shadow tree.)

The event's `composedPath()` method returns an array of nodes through which the event will pass.
So `event.composedPath()[0]` represents the original target for the event (unless that target is
hidden in a closed shadow root).

Example: { .caption }

```html
<!-- event-retargeting.html -->
 ...
<dom-module id="event-retargeting">
  <template>
    <button id="myButton">Click Me</button>
  </template>

  <script>
    class EventRetargeting extends Polymer.Element {
      static get is() {return 'event-retargeting'}

      ready() {
        super.ready();
        this.$.myButton.addEventListener('click', e => {this._handleClick(e)});
      }

      _handleClick(e) {
        console.info(e.target.id + ' was clicked.');
      }

    }

    customElements.define(EventRetargeting.is, EventRetargeting);
  </script>
</dom-module>


<!-- index.html  -->
  ...
<event-retargeting></event-retargeting>

<script>
  var el = document.querySelector('event-retargeting');
  el.addEventListener('click', function(e){
    // logs the instance of event-targeting that hosts #myButton
    console.info('target is:', e.target);
    // logs [#myButton, ShadowRoot, event-retargeting,
    //       body, html, document, Window]
    console.info('composedPath is:', e.composedPath());
  });
</script>
```

In this example, the original event is triggered on a `<button>` inside the `<event-retargeting>`
element's local DOM tree. The listener is added on the `<event-retargeting>` element itself, which
is in the main document. To hide the implementation of the element, the event should be retargeted
so it appears to come from `<event-retargeting>` rather than from the `<button>` element.

The shadow root may show up in the console as `document-fragment`. In shady DOM this is an instance
of `DocumentFragment`. In native shadow DOM, this would show up as an instance of `ShadowRoot`
(a DOM interface that extends `DocumentFragment`).

For more information, see [Event retargeting](shadow-dom#event-retargeting) in Shadow DOM concepts.

## Property change events {#property-changes}

You can configure an element to fire a non-bubbling DOM event when a specified
property changes. For more information, see [Change notification events](data-system#change-events).


