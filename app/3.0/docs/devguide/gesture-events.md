---
title: Gesture events
---

<!-- toc -->

Polymer provides optional support for custom "gesture" events for certain user
interactions. These events fire consistently on both touch and mouse environments,
so we recommend using these events instead of their mouse- or
touch-specific event counterparts. This provides better interoperability with both touch and mouse devices.

## Using gesture events

Add gesture support by importing and using the `GestureEventListeners` mixin:

```js
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

class UsingGestures extends GestureEventListeners(PolymerElement){
  ...
}
```

Gesture events require some extra setup, so you can't simply add a listener
using the generic `addEventListener` method. To listen for a gesture event:

*   Use an [annotated event listener](events#annotated-listeners) for one of the gesture events.

    ```html
    <div on-tap="tapHandler">Tap here!</div>
    ```

    Polymer automatically does the extra bookkeeping for gesture events when you use annotated
    event listeners.

*   Use the `addListener`/`removeListener` methods from the `gestures` module (`@polymer/polymer/lib/utils/gestures.js`).

    ```js
    import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
    import * as Gestures from '@polymer/polymer/lib/utils/gestures.js';
    
    class UsingGestures extends GestureEventListeners(PolymerElement){
      constructor(){
        super();
        Gestures.addListener(this, 'tap', this.tapHandler.bind(this));
      }
      ...
      disconnectedCallback() {
        super.disconnectedCallback();
        Gestures.removeListener(this, 'tap', this.tapHandler.bind(this));
      }
    } 
    ```

    You can use the `addListener` function to add a listener to the host element.

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

```js
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

class DragMe extends GestureEventListeners(PolymerElement){
  static get template(){
    return html`
      <style>
        #dragme {
          width: 500px;
          height: 500px;
          background: lightgray;
        }
      </style>
      <div id="dragme" on-track="handleTrack">[[message]]</div>
    `;
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
customElements.define('drag-me', DragMe);
```

Example imperative event listener { .caption }

This example uses the `addListener` method from the `gestures` module to add a listener to the host element, which can't be done with annotated event listeners. If the listener is attached to the host element or a shadow DOM child, you can usually add the event listener once and not worry about removing it.

If you are adding an event listener to a dynamically-added child, you may need to remove the event listener with the `removeListener` method from the `gestures` module when you remove the child, to allow the child element to be garbage collected.

```js
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import * as Gestures from '@polymer/polymer/lib/utils/gestures.js';

class TapMe extends GestureEventListeners(PolymerElement){
  static get template(){
    return html`
      <style>
        :host {
          display: block;
          width: 200px;
          height: 200px;
          border: 1px solid blue;
        }
      </style>
      <div>Tap me!</div>
      <div>I've been tapped [[count]] times.</div>
    `;
  }
  constructor() {
    super();
    this.count = 0;
    Gestures.addListener(this, 'tap', this.handleTap.bind(this));
  }
  handleTap(e) {
    this.count++;
  }
}
customElements.define('tap-me', TapMe);
```

## Gestures and scroll direction

Listening for certain gestures controls the scrolling direction for touch input.
For example, nodes with a listener for the `track` event will prevent scrolling
by default. Elements can override scroll direction with
`this.setScrollDirection(direction, node)`, where `direction` is one of `'x'`,
`'y'`, `'none'`, or `'all'`, and `node` defaults to `this`.
