---
layout: default
type: guide
shortname: Docs
title: Global Polymer settings
subtitle: Developer guide
---

Document-level global {{site.project_title}} settings can be set before loading
by setting a `Polymer` object on window as the first script in the main
document:

		<html>
		<head>
		  <meta charset="utf-8">
		  <script> Polymer = { dom: 'shadow' }; </script>
		  <script src="../../../webcomponentsjs/webcomponents-lite.js"></script>
		  <link rel="import" href="components/my-app.html">
		</head>
		<body>

		  ...
    

Settings can also be switched on the URL query string:

```
http://myserver.com/test-app/index.html?dom=shadow
```

Available settings:

* `dom` - options:
    * `shady`. All local DOM is rendered using shady DOM, even where shadow DOM is supported (current default).
    * `shadow`. Local DOM is rendered using shadow DOM where supported (this will be the default in the future).