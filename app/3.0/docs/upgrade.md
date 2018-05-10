---
title: Polymer 3.0 upgrade guide
---

<!-- toc -->


The Polymer modulizer tool automates most of the changes you need to make to upgrade a project from 2.x to 3.x.

Polymer modulizer is still in pre-release, but has been fairly well-tested converting the Polymer library and elements. See the [README](https://github.com/Polymer/polymer-modulizer/blob/master/README.md) for the latest updates.

**Start with a clean repo.** Before upgrading an element, make sure that any changes in your repo are committed, so you don't lose any previous changes, and can roll back to a previous state if you run into trouble. 
{.alert .alert-info}

## Upgrade a project using modulizer

To upgrade a project:

1.  Install the latest version of the Polymer CLI. 

    ```
    npm install -g polymer-cli
    ```

1.  Install Polymer modulizer.

    ```
    npm install -g polymer-modulizer
    ```

1.  Make sure your bower dependencies are up to date. 
 
    `bower cache clean && bower install`

1.  Run modulizer.

	  `modulizer --import-style name --out .` 

    The `--import-style name` option tells modulizer to write imports using package names instead of paths. You might want to omit this option when converting an application project. 

    The `--out .` option tells modulizer to write its output to the current directory, overwriting its current contents.

1.  Test the project. 

    You may need to perform some manual fixes at this point. See [Post-conversion cleanup](#post-conversion-cleanup) for details.

### Post-conversion cleanup

There are a few manual steps that may be required after converting a project using modulizer.

1.  Fix strict mode and module errors.

    Modules always run in strict mode, and with various other restrictions. A few examples include: 

    *   Variables must be declared.
    *   `this` is undefined at the top level.
    *   `document.write` doesn't work.
    *   `document.currentScript` doesn't work.

    Modulizer can't make these changes for you.

1.  Convert `importHref` to dynamic `import`()

    For example, this:

    ```js
    const resolvedPageUrl = this.resolveUrl('my-page.html');
    Polymer.importHref(
        resolvedPageUrl,
        null,
        this._showPage404.bind(this),
        true);
    ```

    Becomes: 

    `import('my-page.js').then(null, this._showPage404.bind(this));`

    Note that `resolveUrl` is not required. Imports are always resolved relative to the current module.

1.  Fix imports that load polyfills.

    In the past some elements have provided HTML imports for loading polyfills. For example, the neon-animation element provided an HTML import to load the web animations polyfill. 

    In the ES6 module world, the extra file is no longer required. Any required polyfills should be loaded at the application level. 
    
    For example, given a `some-polyfill.html` file that loads a polyfill script:

    ```html
    <script src="./bower_components/some_polyfill/some_polyfill.js"></script>
    ```

    Move the script into the main document.

## Steps automated by modulizer

This section lists the changes made by Polymer modulizer. They may be helpful as an overview of what the Polymer modulizer is doing to convert your code. 

Before upgrading an element, make sure that any changes in your repo are committed, so you don't lose any previous changes, and can roll back to a previous state if you run into trouble. 

1.  Rename the file from `.html` to `.js`.

    `mv my-el.html my-el.js`

1.  Convert HTML imports for ES6 module imports.

	  `<link rel=import href="foo.html">`

    Becomes:

    ```js
    import './foo.js';
    ```

    For importing resources _that are part of the same project_ (for example, app-specific elements), use an absolute path (starting with `/`) or a relative path (starting with `./` or `../`) .

    For importing resources installed using npm, use a module specifier starting with the package name. For example, for Polymer imports, you'll usually replace a path like `/bower_components/polymer` with `@polymer/polymer`.

    In many cases, you'll need to import specific symbols. For example, the standard Polymer element import:

    ```html
    <link rel="import" href="../bower_components/polymer/polymer-element.html">
    ```

    Becomes:

    ```js
    import {PolymerElement, html} from '@polymer/polymer/polymer-element.js'
    ```

1.  Move the template from HTML into a static `template` getter.

    ```html
    <html>
      <dom-module>
        <template>foo</dom-module>
      </dom-module>
      <script>
        class A extends Polymer.Element { … }
      </script>
    </html>
    ```
    Becomes:

    ```js
    import {PolymerElement, html} from '@polymer/polymer';

    class A extends PolymerElement {
      static get template() {
        return html`foo`;
      }
    }
    ```

1.  Replace namespaced references with imports.

    ```html
    <link rel="import" href="/bower_components/polymer/lib/utils/render-status.html">
    ```

    And: 

    ```js 
    Polymer.RenderStatus.afterNextRender(callback);
    ```

    Becomes:

    ```js
    import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js;
      ...
    afterNextRender(callback);
    ```

    The 3.x modules correspond to the 2.x HTML imports. See the [3.0 API docs](/3.0/docs/api/) for a list of exports from each module.

1.  Remove any top-level IIFE wrappers.

    Modules automatically encapsulate their contents.

    ```js
    (() => {
      let foo;
    })();
    ```

    Becomes:

    ```js
    let foo;
    ```

1.  Add `importMeta` static getter, if necessary.

    If you use the `importPath` property in you element's template, you must add a static `importMeta` getter:

    ```js
    class extends PolymerElement {
      static get importMeta() { return import.meta; }
    }
    ```

1.  Convert `polymer.json`

    Replace the `.html` filenames with their `.js` equivalent.

    If you're using the polyfill loader (`webcomponents-loader.js`), update the `extraDependencies` array to include the new webcomponents bundles:

    ```js
    "extraDependencies": [
      "node_modules/@webcomponents/webcomponentsjs/bundles/**"
    ],
    ```

1.  Convert `bower.json` to `package.json`.

    Add all of your dependencies here. Note that `package.json` can only have one main file.

1.  Update to newer polyfills

	  Make sure you're depending on the v2 versions of the polyfills in `package.json`.

    ```js
        "@webcomponents/webcomponentsjs": "^2.0.0",
    ```

    If you were using `webcomponents-lite.js`, replace it with `webcomponents-bundle.js`.

1.  Update top-level `.html` files.

    Certain HTML files stay as HTML—things like an index.html with content, or test documents. They usually just need to update` <link rel=import>` to `<script type=module>`

Some projects may also need the steps described in [Less common upgrade tasks](#less-common-upgrade-tasks), which are typically performed by modulizer.

If you are converting by hand, see [Post-conversion cleanup](#post-conversion-cleanup) for the final steps.

### Less common upgrade tasks

This section describes a few tasks which aren't required for every element, but which may be required for some elements or modules.

#### Move any non-template DOM into imperative code

If your module contains any DOM that's _not_ part of the element template, you'll need to add imperative code to insert it into the main document. For example, if your 2.x HTML import includes a `<custom-style>` tag, you could replace it with code like this:

```js
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<custom-style>
  <style>
    html { 
      --theme-color: #eee;
    }
   </style>
  </custom-style>`
document.head.appendChild($_documentContainer.content);
```

#### Replace namespace declarations with exports

If you have a module that added properties or functions to a global namespace, use exports to make the APIs available, instead. 

For example: 

```js
const MyStuff = MyStuff || {}; 
MyStuff.MyMixin = (base) =>  class extends base { ... }; 
``` 

Instead of appending to the `MyStuff` namespace, the module can simply export `MyMixin`:

```js
export const MyMixin = (base) => class extends base { ... };
```

Generally remove `this` references that refer to the namespace object.

```js
Foo.Bar = {
  one() {
    return this.two();
  },
  two() {
    return 2;
  }
}
```

Becomes:

```js
export function one() {
  return two();
}

export function two() {
  return 2;
}
```

Likewise you don't need to bind functions where the `this` value should be the namespace object.

```js
Foo.Bar = {
  one() {
    el.addEventListener('click', this.onclick.bind(this));
  },
  onclick() {...}
}
```

Becomes:

```js
export function one() {
  el.addEventListener('click', onclick);
}

export function onclick() { … }
```