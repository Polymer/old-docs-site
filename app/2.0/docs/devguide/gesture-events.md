---
title: Gesture events
---

<!-- toc -->

Polymer provides optional support for custom "gesture" events for certain user
interactions. the up, down, and track events fire consistently on both touch and mouse 
environments, so we recommend using these events instead of their mouse- or		
touch-specific event counterparts. This provides better interoperability with 
both touch and mouse devices.	

**In general, use the standard `click` event instead of `tap` in mobile browsers.** The `tap`
event is included in the gesture event mixin for backwards compatibility, but it's no longer
required in modern mobile browsers.
{.alert .alert-info}

## Using gesture events

Gesture events are supported by default when using hybrid elements. For class-style elements based
on `Polymer.Element`, you need to explicitly add gesture support by importing and using the
`Polymer.GestureEventListeners` mixin.

```html
<link rel="import" href="polymer/lib/mixins/gesture-event-listeners.html">

<script>
    class TestEvent extends Polymer.GestureEventListeners(Polymer.Element) {
      ...
</script>
```

Gesture events require some extra setup, so you can't simply add a listener
using the generic `addEventListener` method. To listen for a gesture event:

*   Use an [annotated event listener](events#annotated-listeners) for one of the gesture events.
       
    ```html
    <div id="dragme" on-track="handleTrack">Drag me!</div>
    ```
    
    Polymer automatically does the extra bookkeeping for gesture events when you use annotated
    event listeners.
    
*   Use the `Polymer.Gestures.addListener`/`Polymer.Gestures.removeListener` methods.
    
    ```js
    Polymer.Gestures.addListener(this, 'track', e => this.trackHandler(e));
    ```
    
    You can use the `Polymer.Gestures.addListener` function to add a listener to the host element.

### Gesture event types

The following are the gesture event types supported, with a short description
and list of detail properties available on `event.detail` for each type:

* **down**—finger/button went down
  * `x`—clientX coordinate for event
  * `y`—clientY coordinate for event
  * `sourceEvent`—the original DOM event that caused the `down` action
* **up**—finger/button went up
  * `x`—clientX coordinate for event
  * `y`—clientY coordinate for event
  * `sourceEvent`—the original DOM event that caused the `up` action
* **tap**—down & up occurred
  * `x`—clientX coordinate for event
  * `y`—clientY coordinate for event
  * `sourceEvent`—the original DOM event that caused the `tap` action
* **track**—moving while finger/button is down
  * `state`—a string indicating the tracking state:
      * `start`—fired when tracking is first detected (finger/button down and moved past a pre-set distance threshold)
      * `track`—fired while tracking
      * `end`—fired when tracking ends
  * `x`—clientX coordinate for event
  * `y`—clientY coordinate for event
  * `dx`—change in pixels horizontally since the first track event
  * `dy`—change in pixels vertically since the first track event
  * `ddx`—change in pixels horizontally since last track event
  * `ddy`—change in pixels vertically since last track event
  * `hover()`—a function that may be called to determine the element currently being hovered

### Examples

Example declarative event listener { .caption }

```html
<link rel="import" href="polymer/polymer-element.html">
<link rel="import" href="polymer/lib/mixins/gesture-event-listeners.html">

<dom-module id="drag-me">
  <template>
    <style>
      #dragme {
        width: 500px;
        height: 500px;
        background: gray;
      }
    </style>

    <div id="dragme" on-track="handleTrack">[[message]]</div>
  </template>

  <script>
    class DragMe extends Polymer.GestureEventListeners(Polymer.Element) {

      static get is() {return 'drag-me'}

      handleTrack(e) {
        switch(e.detail.state) {
          case 'start':
            this.message = 'Tracking started!';
            break;
          case 'track':
            this.message = 'Tracking in progress... ' +
              e.detail.x + ', ' + e.detail.y;
            break;
          case 'end':
            this.message = 'Tracking ended!';
            break;
        }
      }

    }
    customElements.define(DragMe.is, DragMe);
  </script>
</dom-module>
```

Example imperative event listener { .caption }

This example uses `Polymer.Gestures.addListener` to add a listener to the host element, which can't be
done with annotated event listeners. If the listener is attached to the host element or a shadow DOM
child, you can usually add the event listener once and not worry about removing it.

If you are adding an event listener to a dynamically-added child, you may need to remove the event
listener with `Polymer.Gestures.addListener` when you remove the child, to allow the child element
to be garbage collected.

```html
<link rel="import" href="../../bower_components/polymer/polymer-element.html">
<link rel="import" href="../../bower_components/polymer/lib/mixins/gesture-event-listeners.html">

<dom-module id="drag-me-app">
  <template>
    <style>
      :host {
        border: 1px solid blue;
        background: gray;
      }
    </style>
    [[message]]
  </template>

  <script>
    class DragMeApp extends Polymer.GestureEventListeners(Polymer.Element) {
      static get is() { return 'drag-me-app'; }
      static get properties() {
        return {
          message: {
            type: String,
            value: "Select my text. I will track you."
          }
        };
      }
      constructor() {
        super();
        Polymer.Gestures.addListener(this, 'track', e => this.handleTrack(e));
      }
      handleTrack(e) {
        switch(e.detail.state) {
          case 'start':
            this.message = 'Tracking started!';
            break;
          case 'track':
            this.message = 'Tracking in progress... ' +
              e.detail.x + ', ' + e.detail.y;
            break;
          case 'end':
            this.message = 'Tracking ended!';
            break;
        }
      }
    }
    customElements.define(DragMeApp.is, DragMeApp);
  </script>
</dom-module>

```

## Native browser gesture handling {#gestures-and-scroll-direction}

Browsers implement native handling for certain gestures, such as touch-based scrolling, or letting the user zoom content with a pinch gesture.

Listening for gesture events disables native browser gesture handling by default. For example, nodes with a listener for the `track` event prevent the browser from handling scrolling and pinch-zoom gestures. 

If you want get Polymer gesture events _and_ native gesture handling, you can use the `Polymer.Gestures.setTouchAction` function to specify which events the browser should handle natively. For example, if you want the browser to handle vertical scrolling, but have your element handle left-right swiping actions, you could do something like this:

```js
constructor() {
  super();
  Polymer.Gestures.addListener(this, 'track', this.handleTrack);
  // Let browser handle vertical scrolling and zoom
  Polymer.Gestures.setTouchAction(this, 'pan-y pinch-zoom');
}
```

The first argument to `setTouchAction` is the node that the listener is attached to. The second argument is a valid value for the `touch-action` CSS property.

For a complete list of `touch-action` keywords, see [`touch-action` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action).

You must call `setTouchAction` *immediately after adding the event listener.*

When native gesture handling is enabled, Polymer gesture events may be fired, depending on 
the behavior of the browser. When gesture events are fired, the listeners are called before the native browser handling. You can prevent the native browser handling by calling `preventDefault` on the event.

```js
handleTrack(e) {
  // do something
  ...
  // suppress native scrolling
  e.preventDefault();
}
```

To ensure that gesture event listeners **don't** interfere with scroll performance, you can force all gesture event listeners to be _passive_, as described in the next section.

### Use passive gesture listeners

Applications can call `Polymer.setPassiveTouchGestures(true)` to force all event listeners for gestures to be _passive_. Passive event listeners can't call `preventDefault` to prevent the default browser handling, so the browser can handle the native gesture without waiting for the  event listener to return.

You must call `setPassiveTouchGestures` before adding any gesture event listeners—for example,
by setting it in the application entrypoint, or in the `constructor` of your main application element (assuming that's always the first element to load).

Using passive touch gestures may improve scrolling performance, but will cause problems if any of the elements in your application depend on being able to call `preventDefault` on a gesture.




