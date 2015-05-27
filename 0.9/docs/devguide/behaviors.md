---
layout: default
type: guide
shortname: Docs
title: Behaviors
subtitle: Developer guide
---

{% include toc.html %}

## Behaviors {#behaviors}

{{site.project_title}} supports extending custom element prototypes with 
shared code modules called _behaviors_.

A behavior is an object that looks similar to a typical
{{site.project_title}} prototype.  A behavior can define [lifecycle callbacks
](registering-elements.html#basic-callbacks),  [declared
properties](properties.html), [default attributes](registering-elements.html#host-attributes),
[`observers`](properties.html#observing-changes-to-multiple-properties) [`listeners`](events.html#event-listeners).

To add a behavior to a {{site.project_title}}  element definition, include it in a
`behaviors` array on the prototype. 

    Polymer({
      is: 'super-element',
      behaviors: [SuperBehavior]
    });

Lifecycle callbacks are called on the base prototype first, then for each
behavior in the order given in the `behaviors` array.

Any non-lifecycle functions on the behavior object are mixed into
the base prototype. These may be useful for adding APIs or implementing 
observer or event listener callbacks defined by the behavior. **A function
defined on the prototype always takes precedence over a function defined 
by a behavior.** If multiple behaviors define the same function, the 
**last** behavior in the `behaviors` array takes precedence. 




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
            console.log('Highlighting for ', this, + 'enabled!');
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
