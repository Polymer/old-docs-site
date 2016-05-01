---
layout: default
type: guide
shortname: Docs
title: Behaviors
subtitle: Developer guide
---

{% include toc.html %}

{{site.project_title}} supports extending custom element prototypes with
shared code modules called _behaviors_.

A behavior is an object that looks similar to a typical
{{site.project_title}} prototype.  A behavior can define
[lifecycle callbacks](registering-elements.html#basic-callbacks),
[declared properties](properties.html), [default attributes](registering-elements.html#host-attributes),
[`observers`](properties.html#observing-changes-to-multiple-properties), and [`listeners`](events.html#event-listeners).

To add a behavior to a {{site.project_title}} element definition, include it in a
`behaviors` array on the prototype.

    Polymer({
      is: 'super-element',
      behaviors: [SuperBehavior]
    });

Due to a current [bug](https://github.com/Polymer/polymer/issues/2451), if you are using Polymer with ES6/ES2015 classes, you must use a getter defined on the class:

    get behaviors() {
        return [SuperBehavior];
    }

For lifecycle events, the lifecycle callback is called for each
behavior in the order given in the `behaviors` array, followed by the
callback on the prototype.

Any non-lifecycle functions on the behavior object are mixed into
the base prototype, **unless the prototype already defines a function
of the same name.**  If multiple behaviors define the same function, the
**last** behavior in the `behaviors` array takes precedence over other
behaviors.

## Defining behaviors

To define a behavior, create a JavaScript object that you can reference from your element definition.
The following example simply adds `HighlightBehavior` to the global scope:


`highlight-behavior.html`:

    <script>
        HighlightBehavior = {

          properties: {
            isHighlighted: {
              type: Boolean,
              value: false,
              notify: true,
              observer: '_highlightChanged'
            }
          },

          listeners: {
            click: '_toggleHighlight'
          },

          created: function() {
            console.log('Highlighting for ', this, 'enabled!');
          },

          _toggleHighlight: function() {
            this.isHighlighted = !this.isHighlighted;
          },

          _highlightChanged: function(value) {
            this.toggleClass('highlighted', value);
          }

        };
    </script>

`my-element.html`:

    <link rel="import" href="highlight-behavior.html">

    <script>
      Polymer({
        is: 'my-element',
        behaviors: [HighlightBehavior]
      });
    </script>

{{site.project_title}} doesn't specify any
particular method for referencing your behaviors. Behaviors created by the {{site.project_title}}
team are added to the {{site.project_title}} object. When creating your own behaviors, you should
use some other namespace to avoid collisions with future {{site.project_title}} behaviors. For example:

    window.MyBehaviors = window.MyBehaviors || {};
    MyBehaviors.HighlightBehavior = { ... }

Here the `MyBehaviors` namespace is explicitly added to the global `window` object, so the behavior can be referenced from your elements as `MyBehaviors.HighlightBehavior`.

## Extending behaviors {#extending}

To extend a behavior, or create a behavior that includes an existing behavior, you can define a
behavior as an array of behaviors:

    <!-- import an existing behavior -->
    <link rel="import" href="oldbehavior.html">

    <script>
      // Implement the extended behavior
      NewBehaviorImpl = {
        // new stuff here
      }

      // Define the behavior
      NewBehavior = [ OldBehavior, NewBehaviorImpl ]
    </script>

As with the element's `behaviors` array, the rightmost behavior takes precedence over behaviors earlier in the array.
In this case, anything defined in `NewBehaviorImpl` takes precedence over anything defined in `OldBehavior`.

Naming each element in the behavior array is a good practice, since it allows behaviors to explicitly reference methods
on the behaviors they extend (for example, `NewBehaviorImpl` can call to methods on `OldBehavior`).

## Performing work at registration time

In some cases, a behavior may need to perform one-time work when an element is
registered. For example, to allocate a shared object accessed by all element
instances, or to modify the element prototype.

For example, `iron-a11y-keys-behavior` allows elements and other behaviors to
add bindings by specifying a `keyBindings` object on the prototype. A single
element could potentially have multiple `keyBindings` objects, one from its own
prototype and several inherited from behaviors. The `iron-a11y-keys-behavior`
uses the `registered` callback to collate these `keyBindings` objects into a
single object on the element's prototype.

The following simplified example demonstrates how `iron-a11y-keys-behavior`
collates objects from multiple behaviors.

    registered: function() {
      // collate keyBindings objects from behaviors & element prototype
      var keyBindings = this.behaviors.map(function(behavior) {
        return behavior.keyBindings;
      });
      if (keyBindings.indexOf(this.keyBindings) === -1) {
        keyBindings.push(this.keyBindings);
      }
      // process key bindings in order
      keyBindings.forEach(function() {
        ...
      });
    }
