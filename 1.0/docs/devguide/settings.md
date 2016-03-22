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
	    /* this script must run before Polymer is imported */
        window.Polymer = {
          dom: 'shadow',
          lazyRegister: true
        };
      </script>
      <!-- import a component that relies on Polymer -->
	  <link rel="import" href="elements/my-app.html">
	</head>
	<body>

	  ...

Settings can also be switched on the URL query string:

```
http://example.com/test-app/index.html?dom=shadow
```

Available settings:

*   `dom`—options:
    * `shady`. All local DOM is rendered using shady DOM, even where shadow DOM is supported (current default).
    * `shadow`. Local DOM is rendered using shadow DOM where supported (this will be the default in the future).

*   `lazyRegister`—if true, many registration-time activities are deferred until the first instance of an element
	type is created. Defaults to false. (This default may change in the future.)
