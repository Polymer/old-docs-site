## Toolkit Cheatsheet

#### Basics

1. Load *platform.js* to shim missing platform features
2. Load components with `<link rel="components" href="<path to component file>.html>`
3. Use component tags in HTML.

		<!DOCTYPE html>
		<html>
		  <head>
		    <script src="../platform/platform.js"></script>
			<link rel="components" href="../components/g-menu-item.html">
		  </head>
		  <body>
			<g-menu-item src="images/email.svg">Email Link</g-menu-item>
	      </body>
		</html>

#### Component Links

Links (`<link rel="components" href="<path to component file>.html>`) can be used to collated dependencies.

For example:

*app-components.html*

	<!-- load some components -->
    <link rel="components" href="../toolkit/components/g-toolbar.html">
    <link rel="components" href="../toolkit/components/g-menu-button.html">
    <link rel="components" href="../toolkit/components/g-menu-item.html">
	<!-- can load stylesheets and scripts here also -->
	<link rel="stylesheet" href="my-app-styles.css">
	<script src="my-app.js">

*index.html*

	<!DOCTYPE html>
	<html>
	  <head>
	    <script src="../platform/platform.js"></script>
		<link rel="components" href="app-components.html">
	  </head>
	...
	</html>