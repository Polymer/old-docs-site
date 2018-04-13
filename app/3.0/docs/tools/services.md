---
title: Web services
---

<!-- toc -->

<div>
{% include 'outdated.html' %}
</div>

This document is a list of miscellaneous services that you may find useful
when creating Polymer elements.

## <b>polygit</b>—CDN web service for serving components {#polygit}

[Polygit](http://polygit.org/) is a proxy server for serving components from a CDN. **It is not 
meant to be used for production apps**, but is very useful when prototyping and sharing jsbins.

Usage:

```
<head>
  <base href="https://polygit.org/components/"> <!-- saves typing! -->
  <script src="webcomponentsjs/webcomponents-lite.js"></script>
  <link rel="import" href="paper-button/paper-button.html">
  <link rel="import" href="iron-selector/iron-selector.html">
</head>
```

For more documentation, see [http://polygit.org](http://polygit.org/).

Source: [github.com/PolymerLabs/polygit](https://github.com/PolymerLabs/polygit)

## <b>polystyle</b>—web service for creating style modules {#polystyle}

[polystyle](https://poly-style.appspot.com/demo/) is a web service that can wrap an existing 
stylesheet on a remote server as Polymer [style 
module](/2.0/docs/devguide/style-shadow-dom#style-modules). This is useful if you have a hosted 
third-party stylesheet that you want to use in an element or your application.

Usage:

```
<head>
  <link rel="import" href="bower_components/polymer/polymer.html">
  <link rel="import" 
href="https://poly-style.appspot.com?id=theme-styles&url=https://example.com/styles.css">
  <style is="custom-style" include="theme-styles">
    ...
  </style>
</head>
```

For more information, see 
[https://poly-style.appspot.com/demo/](https://poly-style.appspot.com/demo/).

**Related tools**

- [gulp-style-modules](https://github.com/MaKleSoft/gulp-style-modules)—3rd party Gulp plugin for 
wrapping local CSS files into style modules

Source: [github.com/PolymerLabs/polystyles](https://github.com/PolymerLabs/polystyles)

## <b>polyicon</b>—create an optimized custom icon set {#polyicon}

[polyicon](https://github.com/PolymerLabs/polyicon) is an online tool to generate
an optimized custom icon set for your app, with only the icons that you need.
Instead of loading entire sets, this tool creates a slimmer (custom) icon set that you can load and 
use in your app.

Try it out: [https://poly-icon.appspot.com/](https://poly-icon.appspot.com/)

Source: [github.com/PolymerLabs/polyicon](https://github.com/PolymerLabs/polyicon)
