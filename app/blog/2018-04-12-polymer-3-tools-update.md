---
title: Polymer 3.0 Tools Update
---

The latest pre-release version of the Polymer CLI is available, and it includes enhanced support for ES6 modules. Specifically, Polymer CLI version 1.7.0-pre.10 now supports:



*   Bundling ES6 modules.
*   Transforming ES6 modules to AMD modules. (This was previously supported in 
    polymer serve, but not in polymer build.) Bundled modules can be output 
    in either ES6 or AMD form.
*   Support for dynamic imports, including transforming dynamic imports for browsers 
    that don't support ES6 modules.
*   Support for transforming references to `import.meta.url` so they work on browsers 
    that don't support ES6 modules. This will be used in a future version of modulizer and 
    Polymer 3.0 preview to provide backward compatibility for the 2.x `importPath` property. 

To get the new version, install the latest version of the Polymer CLI:


```bash
npm install -g polymer-cli@next
```

If installation fails, remove the existing version of Polymer CLI and retry the installation:

```bash
npm uninstall -g polymer-cli
npm install -g polymer-cli@next
```


Read on for more details on what's supported now.


## Serve and test

The `polymer serve` and `test` commands both use the same development server to serve and transform projects. The development server already supported transforming ES6 modules to AMD modules at runtime. This release adds support for transforming dynamic imports to AMD modules, as well.

By default, the development server tries to autodetect support for ES6 and ES6 modules based on the browser's user agent. Using the` --compile=always` flag causes the server to always transpile to ES5 and transform ES6 modules to AMD. 


## Build

Build now supports bundling and transforming ES6 modules. When working on ES6 modules, build produces either ES6 modules or AMD modules as output. It can also transform dynamic imports into AMD modules.

To create a build with ES6 modules transformed to AMD, set the **<code>transformModulesToAmd</code>**
option for that build in the <code>polymer.json</code> file.


```js
  ...
  "npm": true,
  "module-resolution": "node",
  "builds": [ 
    { 
      "name": "bundled-amd", 
      "bundle": { 
        "inlineScripts": false 
      }, 
      "js": { 
        "transformModulesToAmd": true 
       } 
    } 
   ]
``` 


You can also use the command line flag `--js-transform-modules-to-amd` instead of setting the option in `polymer.json`.

```bash
polymer build --npm --module-resolution=node --js-transform-modules-to-amd 
```

**Note:** Currently, you _must_ set the `inlineScripts` flag to false when bundling Polymer 3.x applications, as shown in the example above.
{.alert .alert-info}


## Known issues

This prerelease version of the CLI has the following known issues:

-   [polymer-build#358](https://github.com/Polymer/polymer-build/issues/358). Modules
    transformed to AMD may fail because of incomplete Babel helper scripts. This occurs
    if a module uses the `import *` syntax. Other forms of the import statement shouldn't 
    have this problem.

-   [`polymer-bundler#653`](https://github.com/Polymer/polymer-bundler/issues/653). 
    Inline module scripts are not processed correctly when bundling. If an inline module script 
    imports another module that's in a bundle, the import specifier isn't rewritten correctly.

    ```html
    <script type="module">
    // importing a module that gets bundled elsewhere
    // this import specifier will not get rewritten properly
    import {PolymerElement} from '@polymer/polymer/polymer-element.js';

    export class FooEl extends PolymerElement { ... }
    </script>
    ```

    For now, avoid these and use the `inlineScripts: false` option when bundling. External 
    module scripts should work fine:

    ```html
    <script type="module" src="./foo-el.js"></script>
    ```

## What's Next

This release brings our tools story much closer to completion, but we still have a few items left in the home stretch:

*   Init templates for Polymer 3.x applications and elements.
*   Support for generating API documentation.
*   More testing and bug fixes.
