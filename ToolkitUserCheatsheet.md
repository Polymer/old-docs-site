## Toolkit Cheatsheet

#### Basics

1. Load *platform.js* to shim missing platform features
2. Load components with `<link rel="import" href="<path to component file>.html">`
3. Use component tags in HTML.

		<!DOCTYPE html>
		<html>
		  <head>
		    <script src="toolkit/platform/platform.js"></script>
" href="toolkit/components/g-menu-item.html">
		  </head>
		  <body>
			<g-menu-item src="images/email.svg">Email Link</g-menu-item>
	      </body>
		</html>

#### Component Links

Links (`<link rel="import" href="<path to component file>.html">`) can be used to collate dependencies, including additional component files, styles, and javascript.

For example:

*app-components.html*

    <!-- load some components -->
    <link rel="import" href="toolkit/components/g-toolbar.html">
    <link rel="import" href="toolkit/components/g-menu-button.html">
    <link rel="import" href="toolkit/components/g-menu-item.html">

		<!-- can load stylesheets and scripts here also -->
		<link rel="stylesheet" href="my-app-styles.css">
		<script src="my-app.js"></script>

*index.html*

		<!DOCTYPE html>
		<html>
		  <head>
		    <script src="toolkit/platform/platform.js"></script>
			<link rel="import" href="app-components.html">
		  </head>
		...
		</html>
