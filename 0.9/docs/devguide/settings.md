---
layout: default
type: guide
shortname: Docs
title: Global Polymer settings
subtitle: Developer guide
---

Document-level global {{site.project_title}} settings can be set 
by creating a `Polymer` object on window before importing the {{site.project_title}}
library:

	<html>
	<head>
	  <meta charset="utf-8">
	  <script src="components/webcomponentsjs/webcomponents-lite.js"></script>
	  <script>
        window.Polymer = window.Polymer || {};
        window.Polymer.dom = 'shadow';
      </script>
      <!-- import a component that relies on Polymer -->
	  <link rel="import" href="elements/my-app.html">
	</head>
	<body>

	  ...
    
**Note:**  The _full_ version of `webcomponents.js` includes a stub version
of the `Polymer` function. Setting the value this way avoids overwriting the 
stub.
{: .alert .alert-info }


Settings can also be switched on the URL query string:

```
http://myserver.com/test-app/index.html?dom=shadow
```

Available settings:

* `dom` - options:
    * `shady`. All local DOM is rendered using shady DOM, even where shadow DOM is supported (current default).
    * `shadow`. Local DOM is rendered using shadow DOM where supported (this will be the default in the future).