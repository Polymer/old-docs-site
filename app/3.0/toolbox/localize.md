---
title: Localization
---

<!-- toc -->

[`AppLocalizeBehavior`](https://www.webcomponents.org/element/PolymerElements/app-localize-behavior)
wraps the [format.js](http://formatjs.io/) library to help you internationalize your application.
Note that if you're on a browser that does not natively support the
[Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) object,
**you must load a polyfill yourself.** An example polyfill can be found at
[github.com/andyearnshaw/Intl.js](https://github.com/andyearnshaw/Intl.js/).

`AppLocalizeBehavior` supports the same
[message syntax](http://formatjs.io/guides/message-syntax/) as `format.js`, in its entirety; use the
library docs as reference for the available message formats and options.

## Install AppLocalizeBehavior

    npm install --save @polymer/app-localize-behavior@next

## Import AppLocalizeBehavior

AppLocalizeBehavior is a legacy behavior. To use it in Polymer 3.0, you need the utility class `mixinBehaviors` as well:

Import AppLocalizeBehavior {.caption}

```js
// Import the PolymerElement base class
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

// Import AppLocalizeBehavior 
import {AppLocalizeBehavior} from '@polymer/app-localize-behavior/app-localize-behavior.js';

// Import a utility class to treat legacy behaviors as mixins
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';

// Define your class, inheriting AppLocalizeBehavior functions and properties
class AppLocalize extends mixinBehaviors([AppLocalizeBehavior], PolymerElement) {
```
  
## Add localization to your app

The main application is usually responsible for loading the localized messages and setting the
current language.

app-localize.js {.caption}

```js
// Imports go here
class AppLocalize extends mixinBehaviors([AppLocalizeBehavior], PolymerElement) {
  static get properties(){
    return{
      language: {
        value: 'en'
      },
      resources: {
        value: function() {
          return {
            'en': { 'hello': 'My name is {name}.' },
            'fr': { 'hello': 'Je m\'apelle {name}.' }
          };
        }
      }
    };
  }
  static get template(){
    return html`
      <div>{{localize('hello', 'name', 'Batman')}}</div>
    `;
  }
}
customElements.define('app-localize', AppLocalize);
```

index.html {.caption}

```html
<head>
  <script src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"></script>
  <script type="module" src="app-localize.js"></script>
</head>
<body>
  <app-localize></app-localize>
</body>
```

More typically, the app loads resources from an external file, as shown in the next example:

app-localize.js {.caption}

```js
// Imports go here
class AppLocalize extends mixinBehaviors([AppLocalizeBehavior], PolymerElement) {
  static get properties(){
    return{
      language: {
        value: 'en'
      },
      resources: {
        value: function() {
          return {
            'en': { 'hello': 'My name is {name}.' },
            'fr': { 'hello': 'Je m\'apelle {name}.' }
          };
        }
      }
    };
  }
  static get template(){
    return html`
      <div>{{localize('hello', 'name', 'Batman')}}</div>
    `;
  }
  attached: function() {
    this.loadResources(this.resolveUrl('locales.json'));
  },
}
customElements.define('app-localize', AppLocalize);
```

The main app is also responsible for loading the `Intl` polyfill
(not shown above).

Each element that needs to localize messages should also add `AppLocalizeBehavior`
and use the `localize` method to translate strings, as shown above.
