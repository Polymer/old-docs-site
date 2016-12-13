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

## Install AppLocalizeBehavior

Install the `app-localize-behavior` package with Bower:

    bower install --save PolymerElements/app-localize-behavior


## Add localization to your app

The main application is usually responsible for loading the localized messages and setting the
current language.

Sample application loading resources from an external file. { .caption.}

```
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
