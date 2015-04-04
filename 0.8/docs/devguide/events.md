---
layout: default
type: guide
shortname: Docs
title: Events
subtitle: Developer guide
---

{% include toc.html %}

## Event listener setup {#event-listeners}

Add event listeners to the host element by providing a 
`listeners` object that maps events to event handler function names.

Example:

    <dom-module id="x-custom">
      <template>
        <div>I will respond</div>
        <div>to a click on</div>
        <div>any of my children!</div>
      </template>
    </dom-module>

    <script>

      Polymer({

        is: 'x-custom',

        listeners: {
          'click': 'handleClick'
        },

        handleClick: function(e) {
          alert("Thank you for clicking");
        }

      });

    </script>

## Annotated event listener setup {#annotated-listeners}

To add event listeners to local-DOM children, use
<code>on-<var>event</var></code>  annotations in your template. This often
eliminates the need to give an element an `id` solely for  the purpose of
binding an event listener.

Example:

    <dom-module id="x-custom">
      <template>
        <button on-click="handleClick">Kick Me</button>
      </template>
    </dom-module>

    <script>

      Polymer({

        is: 'x-custom',

        handleClick: function() {
          alert('Ow!');
        }

      });

    </script>

**Compatibility note:** The syntax differs from 0.5, which required curly brackets ({%raw%}{{}}{%endraw%})
around the event handler name.
{: .alert .alert-info }

## Event retargeting {#retargeting}

Shadow DOM has a feature called "event retargeting" which changes an event's
target as it bubbles up, such that target is always in the receiving element's
light DOM. Shady DOM does not do event retargeting, so events may behave differently
depending on which local DOM system is in use.

Use `Polymer.dom(event)` to get a normalized event object that provides
equivalent target data on both shady DOM and shadow DOM. Specifically, the
normalized event has the following properties:

*   `rootTarget`: The original or root target before shadow retargeting
    `(equivalent to `event.path[0]` under shadow DOM or `event.target` under
    `shady DOM).

*   `localTarget`: Retargeted event target (equivalent to `event.target` under
    shadow DOM)

*   `path`: Array of nodes through which event will pass 
    (equivalent to `event.path` under shadow DOM).


