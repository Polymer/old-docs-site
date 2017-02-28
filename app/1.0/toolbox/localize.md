---
title: Localization
---

<!-- toc -->

**The localization behavior is prerelease.** APIs may be subject to change.
{.alert .alert-info}

[`Polymer.AppLocalizeBehavior`](https://elements.polymer-project.org/elements/app-localize-behavior)
wraps the [format.js](http://formatjs.io/) library to help you internationalize your application.
Note that if you're on a browser that does not natively support the
[Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) object,
**you must load a polyfill yourself.** An example polyfill can be found at
[github.com/andyearnshaw/Intl.js](https://github.com/andyearnshaw/Intl.js/).

`Polymer.AppLocalizeBehavior` supports the same
[message syntax](http://formatjs.io/guides/message-syntax/) as `format.js`, in its entirety; use the
library docs as reference for the available message formats and options.

Each element that displays content to be localized should add `Polymer.AppLocalizeBehavior`.
All of these elements share a common localization cache, so you only need to load translations once.

`AppLocalizeBehavior` can be used directly in Polymer 1.x elements and Polymer 2.x hybrid elements.
For class-style elements, use the `mixinBehaviors` method.

## Install AppLocalizeBehavior

Install the `app-localize-behavior` package with Bower:

    bower install --save PolymerElements/app-localize-behavior

For 2.0 Release Candidate, use the `2.0-preview` branch:

    bower install --save PolymerElements/app-localize-behavior#2.0-preview


## Add localization to your app

The main application is usually responsible for loading the localized messages and setting the
current language.

Sample application (Polymer 2.x) {.caption}

```html
<dom-module id="x-app">
  <template>
    <!-- use the localize method to localize text -->
    <div>{{localize('hello', 'name', 'Batman')}}</div>
  </template>
  <script>
    class XApp extends Polymer.mixinBehaviors([Polymer.AppLocalizeBehavior], Polymer.Element) {
      static get is() { return 'x-app'}

      static get config() {
        return {
          properties: {

            // set the current language—shared across all elements in the app
            // that use AppLocalizeBehavior
            language: {
              value: 'en'
            },

            // Initialize locale data
            resources: {
              value() {
                return {
                  'en': { 'hello': 'My name is {name}.' },
                  'fr': { 'hello': 'Je m\'apelle {name}.' }
                }
              }
            }
          }
        }
      }
    }

    customElements.define(XApp.is, XApp);
  </script>
</dom-module>
```

More typically, the app loads resources from an external file, as shown in the next example.

Sample application (Polymer 1.x or hybrid) {.caption}

```html
<dom-module id="x-app">
   <template>
    <!-- use the localize method to localize text -->
    <div>{{localize('hello', 'name', 'Batman')}}</div>
   </template>
   <script>
      Polymer({
        is: "x-app",

        // include the behavior
        behaviors: [
          Polymer.AppLocalizeBehavior
        ],

        // set the current language—shared across all elements in the app
        // that use AppLocalizeBehavior
        properties: {
          language: {
            value: 'en'
          },
        }

        // load localized messages
        attached: function() {
          this.loadResources(this.resolveUrl('locales.json'));
        },
      });
   </script>
</dom-module>
```


The main app is also responsible for loading the `Intl` polyfill
(not shown above).

Each element that needs to localize messages should also add the `Polymer.AppLocalizeBehavior`
and use the `localize` method to translate strings, as shown above.
