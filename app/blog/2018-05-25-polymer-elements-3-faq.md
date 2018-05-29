---
title: "Polymer Elements 3.0 FAQ"
---
If you've started updating your application to use the recently released 3.0 version
of the Polymer Elements, you might have run into some problems. Here are the
questions we've seen asked the most:

## Getting duplicate registry when importing `<paper-button>` (or any other element)
```
Uncaught DOMException: Failed to execute 'define' on 'CustomElementRegistry': this name has already been used with this registry
```

This is a symptom of duplicate dependencies installed. If you're adding new element
dependencies (like `paper-button`) to your app, be sure you don't end up installing multiple, nested copies of Polymer. The best way to do this is to start with a fresh set of dependences (`rm -rf node_modules/ package-lock.json; npm i`).

If that still doesn’t fix your problem, double check that you’re not accidentally importing multiple copies of Polymer: do you see multiple requests of `polymer-legacy.js` or `paper-button.js` (or whatever element you’re importing) from different `node_modules/` in the network timeline? Are there multiple versions of Polymer in your `package-lock.json`?

## Failed to resolve module specifier
```
Uncaught TypeError: Failed to resolve module specifier. Relative references must start with either "/", "./", or "../".
```

This error occurs in Chrome when loading module specifiers by name rather than by URL.
The easiest way to address this during development is to use the `polymer-cli` and run
`polymer serve` to serve your app. For deployment and production, you can run
`polymer build`, or a Webpack/Rollup solution that converts the named imports to paths.

## The `package.json` does not have a `main` field
This is due to multiple elements existing in the same repo, and multiple main files being listed in our `bower.json`. This happens when multiple elements are defined in the same repo. Our `modulizer` tool, which converts the 2.0 elements to 3.0, requires each of these elements to be listed as main files in their `bower.json` file. It uses this information to crawl the dependency tree and convert multiple elements. A `package.json` file doesn't accept multiple files in the main field, which
means some of our packages simply will not have a `package.json` `main`
field until we can determine a canonical solution to what should go in this field for these types of packages. In the meantime, the workaround is to import the element using its `js`
file extension: `import '@polymer/paper-input/paper-input.js';`
