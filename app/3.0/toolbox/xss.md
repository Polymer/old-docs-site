---
title: Protect users from cross-site scripting (XSS) attacks
---

<!-- toc -->

Cross-site scripting (XSS) attacks are attempts to insert malicious code where it will be unknowingly executed by the end user of a web app. XSS attacks might attempt to break security by inserting and running a script in a context where it has access to a user's session tokens, cookies, or other privileged data.

To protect users from these kinds of attacks in a production environment, Polymer developers should implement security practices to prevent exploits of features specific to custom elements, in addition to implementing standard web security practices.

[To implement security practices for custom elements](#customelementssecurity):

* [Treat all Polymer templates like scripts](#treatlikescripts).
* [Use Polymer's Strict Template Policy setting](#stricttemplatepolicy).
* [Work with templates defined in scripts](#templatesdefinedinscripts).
* [Implement Polymer’s sanitizeDOMValue callback](#sanitizedomvalue).

[To implement standard web security practices](#standardsecurity):

* [Avoid using `innerHTML` to set untrusted strings](#avoidinnerhtml).
* [Implement Content Security Policy (CSP)](#csp).

## Implement security practices for custom elements {#customelementssecurity}

### Treat all Polymer templates like scripts {#treatlikescripts}

Polymer templates can evaluate a subset of JavaScript expressions, and can call methods from an element prototype. This means that if an attacker can inject Polymer templates into HTML, it's possible for them to set up conditions to run any arbitrary script.

For this reason, you should apply the same security practices to Polymer templates as you would to any script.

To help you treat Polymer templates with the same restrictions as scripts, we're providing an opt-in `strictTemplatePolicy` setting in the latest releases of Polymer 1.x, 2.x, and 3.x.

### Use Polymer's Strict Template Policy setting {#stricttemplatepolicy}

The `strictTemplatePolicy` setting disables evaluation of untrusted templates in HTML.

* In Polymer 1.x and 2.x, Polymer only parses and evaluates templates from `<dom-module>` blocks associated with elements that have been registered in a script. In addition, `strictTemplatePolicy` in Polymer 1.x and 2.x disables the ability to re-register a `<dom-module>`.

* In Polymer 3.x, `strictTemplatePolicy` disables element template lookup from a `<dom-module>` block altogether, as templates are by convention defined in a `template` getter.

* In all versions of Polymer, `strictTemplatePolicy` disables the use of `<dom-bind>`, `<dom-if>`, and `<dom-repeat>` in a main document. You can only use these elements inside a trusted Polymer template.

We strongly encourage you to enable `strictTemplatePolicy` in production. In the event that an attacker gains the ability to inject arbitrary HTML, this policy will prevent an attacker from being able to execute scripts.

Enable `strictTemplatePolicy` from your app entrypoint (usually index.html), before loading your app shell or any Polymer elements:

index.html {.caption}

```html
<script type="module">
  // Import setStrictTemplatePolicy from Polymer settings module
  import { setStrictTemplatePolicy } from '/node_modules/@polymer/polymer/lib/utils/settings.js';
  // enable strictTemplatePolicy
  setStrictTemplatePolicy(true);
</script>
<!-- load element definitions -->
<script type="module" src="my-app.js"></script>
```

See the [API docs on `strictTemplatePolicy`](/{{{polymer_version_dir}}}/docs/devguide/settings) for more information.

### Work with templates defined in scripts {#templatesdefinedinscripts}

In Polymer 2.x and 3.x, you can define templates in JavaScript with the `template` getter and the `html` helper function. In Polymer 3.x, the `template` getter is the primary way to define a template. For example:

```js
import {PolymerElement, html} from '@polymer/polymer-element.js';

class MyElement extends PolymerElement{
 static get template(){
   return html`
     <h1>hello</h1>
   `;
 }
}
customElement.define('my-element', MyElement);
```

The `html` tag function only accepts literal HTML strings. It will throw an error if dynamic values (other than those returned from `html` or `htmlLiteral`) are interpolated with JavaScript expressions (the `${...}` syntax).

This is a protection against users accidentally compromising their element templates by interpolating untrusted values.

To make sure your templates are evaluated without errors, don’t use JavaScript expressions (`${...}`) unless the values you are interpolating are themselves trusted templates.

#### Examples

```js 
// Fine: html tag function accepts other values returned by html tag function.

import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

class CustomElement extends PolymerElement{
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <header>${this.getHeader}</header>
    `;
  }
  static get getHeader(){
    return html`<h1>stuff</h1>`;
  }
}
```

```js
// Also fine: html tag function accepts values returned from htmlLiteral.

import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { htmlLiteral } from '@polymer/polymer/lib/utils/html-tag.js';

class CustomElement extends PolymerElement{
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Random: ${htmlLiteral([Math.random()])}</h2>
    `;
  }
}
```

```js
// Not fine: Throws "non-template value passed to Polymer's html function".

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

class CustomElement extends PolymerElement{
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Random: ${Math.random()}</h2>
    `;
  }
}
```

### Implement Polymer’s sanitizeDOMValue callback {#sanitizedomvalue}

An [XSS sink](https://github.com/wisec/domxsswiki/wiki/Sinks) is a location in which an attacker could potentially place malicious code, with the intention that your app or element will unintentionally execute that code.

Properties and attributes that are only ever treated as text are not vulnerable to these kinds of attacks. However, an attacker could potentially exploit element properties and attributes like `src`, `href`, and `onclick` as XSS sinks.

To safeguard against this type of attack, implement Polymer's `sanitizeDOMValue` callback.

`sanitizeDOMValue` is a global callback that Polymer runs on all values directly before they are processed in a property or attribute binding, or synchronized to an attribute with `reflectToAttribute`.

All versions of Polymer include the `sanitizeDOMValue` hook.

Polymer does not ship with a default implementation of `sanitizeDOMValue`. However, a useful implementation might inspect the property or attribute being set, and either reject, sanitize, or require trusted value types before setting the value. 

Set your sanitizer function from your app entrypoint (usually index.html), before loading your app shell or any Polymer elements:

index.html {.caption}

```html
<script type="module">
  // import the setSanitizeDOMValue method from Polymer settings utils
  import { setSanitizeDOMValue } from '/node_modules/@polymer/polymer/lib/utils/settings.js';

  // call setSanitizeDOMValue on the function that performs sanitization
  setSanitizeDOMValue((value, name, type, node) => {
    // sanitze value here
    return sanitizedValue;
  });
</script>

<!-- now it's safe to load element definitions and upgrade elements -->
<script type="module" src="my-app.js"></script>
```

See the [API docs on `sanitizeDOMValue`](/{{{polymer_version_dir}}}/docs/devguide/settings) for more information.

## Implement standard web security practices {#standardsecurity}

### Avoid using innerHTML to set untrusted values {#avoidinnerhtml}

Developers using any web technology must take extreme care with APIs like [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) and [insertAdjacentHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML) that directly manipulate DOM. If you use these APIs, you must guarantee that any HTML strings you pass to them are free from possibly malicious code. See the [MDN documentation on innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) for more info.

Polymer developers , an extra consideration applies to these APIs, in that we must also rule out the evaluation of untrusted custom element templates.

If you need to use `innerHTML` or similar APIs, use a library like [DOMPurify](https://github.com/cure53/DOMPurify) to sanitize the values you pass to them:

```js
var el=this.shadowRoot.getElementById('mydiv');
el.innerHTML = DOMPurify.sanitize(/* dirty HTML */);
```

### Implement CSP (Content Security Policy) {#csp}

In addition to taking the steps above, we strongly encourage you to implement [CSP (Content Security Policy)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

CSP is an opt-in JavaScript security model built into web browsers. CSP disables the execution of scripts from within HTML; when CSP is configured, a browser will only execute scripts in JavaScript source files that come from trusted domains.

To enable CSP, configure your web server to return the `Content-Security-Policy HTTP` header, and use the `<meta http-equiv="Content-Security-Policy"...>` tag in HTML documents. See the [MDN documentation on CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) for more info.

#### A Note on HTML Imports {#htmlimports}

In Polymer 1.x and 2.x, HTML Imports present a challenge for deploying CSP, since inline scripts typically contained within HTML Imports are disabled by default. To use HTML Imports in a CSP environment, add the [Crisper tool](https://github.com/PolymerLabs/crisper) to your build pipeline. Crisper removes all scripts from HTML Imports and places their contents into an external JavaScript file.

For instructions on installing and using Crisper, see the [Crisper README](https://github.com/PolymerLabs/crisper).

## More information {#moreinfo}

For an introduction to cross-site scripting, see the [MDN article on Cross-site scripting](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting).



