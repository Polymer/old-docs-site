---
title:  "Polymer 3.0: New Year, New Preview"
---

Happy New Year from the Polymer team! Hope everyone had a nice break. The Polymer team members have returned from their various travels and are getting ready to roll out some more web component goodness. Today, we're releasing a second preview of Polymer 3.0.

Here's what we'll cover today:

* What is Polymer 3.0? 
* What's the status of the Polymer 3.0 project?
* What's in today's preview release?

## What is Polymer 3.0?

We announced Polymer 3.0 at Polymer Summit 2017. 

Polymer 3.0 repackages the Polymer 2.0 code with minimal API changes. What does change is the packaging and distribution:

* JavaScript modules replace HTML imports.
* npm replaces Bower.

For more details, you can see the original announcement: [Polymer 3.0 preview: npm and ES6 Modules](2017-08-22-npm-modules).

Polymer 3.0 is intended to be a purely mechanical upgrade, using the Polymer Modulizer tool. We're using this tool to convert the core library and our elements. You'll be able to use this tool to convert your elements, too.

## Polymer 3.0 status and roadmap

Since we released the initial Polymer 3.0 preview, we've been working steadily towards a 3.0 release—but most of that progress has been invisible from the outside.

That's because most of our work has been on tools—improving Modulizer, and enhancing the other Polymer tools to handle 3.0. Meanwhile, the 3.0 preview branches haven't received any updates: these branches are generated code, so we're not merging any pull requests to them.

The project enters a new phase today. We're hoping to release 3.0 by the end of Q1, and until then we're aiming to make our progress more transparent. To that end, we're providing:

* Bi-weekly releases of Polymer 3.x and 3.x compatible elements.
* An element test status page. 
* A roadmap and burndown list of remaining tasks.

We still won't be taking any pull requests in the 3.x branches, however. Fixes should go into the appropriate master branch and/or to the Modulizer tool itself.

Today's release marks the first of our bi-weekly releases. Read on to find out what's changed since preview 1.

## What's in 3.0 Preview 2?

The new versions of Polymer and the elements are available as version `3.0-pre.2` from npm (the `@next` version tag has also been updated to point to the new preview).

This version includes the latest changes from the Polymer master branch, including some important bug fixes and new features.

The latest version of Modulizer features better conversion, especially around test and demo paths. This is still an early preview for elements; many tests don't run, and many that do have failures. But most elements work well enough for you to try them out.

The 3.0 preview release of the Polymer core library includes two new features:

* `PropertiesMixin`. This mixin breaks out a small subset of the lower Polymer layers responsible for defining declarative properties, creating accessors, and syncing attributes to properties. 

  Users of lit-html and other templating alternatives may find `PropertiesMixin` useful. It provides a single `_propertiesChanged` callback and can be used to create new, lightweight base classes. 

  To illustrate, the following example shows a very simple element using `PropertiesMixin`:

  ```js
  import {PropertiesMixin} from "../node_modules/@polymer/polymer/lib/mixins/properties-mixin.js"

    class MyPropertiesElement extends PropertiesMixin(HTMLElement) {
      // Define properties to watch. Only types are supported.
      static get properties() {
        return {
          name: String
        }
        // Called whenever the declared properties change. 
        _propertiesChanged(currentProps, changedProps, oldProps) {
          // Render the changed content.
          this.textContent = `Hello, ${this.name}`;
        }
      }
    }
  }
  ```

  For more information, see the source for `PropertiesMixin`. Documentation will be coming in a future release. 

  For people interested in using lit-html, an experimental base class using `PropertiesMixin` with lit-html templating is available [somewhere](https://). 

* `html` tag function. Starting with this preview, you need to return an instance of `HTMLTemplateElement` from your element’s static template getter—the option to return a string has been removed. This change makes the template type predictable, which in turn will make it simpler to extend superclass templates.

  The easiest way to return an `HTMLTemplateElement` from your template getter is to use Polymer’s new `html` helper, which automatically generates an `HTMLTemplateElement` from a template literal string, as shown here: 

  ```js
  import {Element as PolymerElement, html} from "../node_modules/@polymer/polymer/polymer-element.js"
  class MyAppElement extends PolymerElement {
    static get template() {
      return html`<div>I'm a template</div>
                  <div>[[withBindings]]</div>
                  <button on-click="clickHandler">Click me!</button>`
    }
    ...
  }
  customElements.define('my-app-element', MyAppElement);
  ```

These new features will also be released in the next minor release of 2.x. However, there's no need to manually convert your 2.x code to use the `html` helper—the Polymer Modulizer will make that conversion for you.

Other than these changes, APIs haven't changed, and you can follow the instructions in our previous blog post, [Hands-on with the Polymer 3.0 preview](2017-08-23-hands-on-30-preview).

So give the latest Polymer 3.0 preview a try. Send us feedback, report bugs, and let us know what you think!
