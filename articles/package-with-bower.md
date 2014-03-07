---
layout: default
title: "Package Components Using Bower"
subtitle: How to package your custom elements for broader sharing

article:
  author: addyosmani
  published: 2014-01-22
  polymer_version: 0.1.3
  description: How to package components using Bower.
tags:
- concatenation
- optimization
- tooling
- build
---

{% include authorship.html %}

{% include toc.html %}

[Bower](http://bower.io) is a package manager for the web which offers a generic, unopinionated solution to the problem of front-end package management. It is {{site.project_title}}'s package management solution of choice for sharing your own elements with the community.

Bower depends on [Node](http://nodejs.com) and [npm](http://npmjs.org). It's installed globally using npm:

    npm install -g bower

## Package requirements

In order for a Bower package to be considered valid:

* There must be a valid manifest JSON in the current working directory. 
* Your package should use semver Git tags. 
* Your package must be available at a Git endpoint (e.g., GitHub); remember to push your Git tags!

The Bower registry does not have authentication or user management at this point in time. It's on a first come, first served basis. Think of it like a URL shortener.

### Create a manifest

You can use `bower init` to generate a valid bower.json manifest to lock down your project's dependencies:

    bower init

	[?] name: polymer-ajax
	[?] version: 0.0.1
	[?] description: An awesome {{site.project_title}} AJAX element.
	[?] main file: 
	[?] keywords: {{site.project_title}}
	[?] authors: John Smith
	[?] license: MIT
	[?] homepage: https://github.com/polymer/polymer-ajax
	[?] set currently installed components as dependencies? No
	[?] add commonly ignored files to ignore list? Yes
	[?] would you like to mark this package as private which prevents it from being accidentally published to the registry? No

It will produce a bower.json file containing something like:

	{
	  name: 'polymer-ajax',
	  version: '0.0.1',
	  authors: [
	    'John Smith '
	  ],
	  description: 'An awesome {{site.project_title}} AJAX element.',
	  keywords: [
	    '{{site.project_title}}'
	  ],
	  license: 'MIT',
	  homepage: 'https://github.com/polymer/polymer-ajax',
	  ignore: [
	    '**/.*',
	    'node_modules',
	    'bower_components',
	    'test',
	    'tests'
	  ]
	}

Next, add a reference to {{site.project_title}} itself in the generated bower.json file:

	{
	  "name": "polymer-ajax",
	  // ...
	  "dependencies": {
	    "polymer": "Polymer/polymer#~0.1.3"
	  }
	}

Many of the existing `<polymer-*>` elements maintain the {{site.project_title}} in the root directory and reference them as follows:

{% raw %}
<link rel="import" href="../polymer/polymer.html">
<polymer-element name="poylmer-ajax">
 <!- ... -->
{% endraw %}

As {{site.project_title}} gets installed with the rest of our dependencies using Bower, it will end up in the `components` or `bower_components` directory meaning we do not need to include the complete path to our Bower components in the path.

### Register your package

Once you are happy with your package, it can be registered using the `bower register` command:

    bower register [app name] [git endpoint]

For example:

    $ bower register {{site.project_title}}/polymer-ajax git://github.com/polymer/polymer-ajax.git

    Registering a package will make it visible and installable via the registry.
    Proceed (y/n)? y
    registered {{site.project_title}}/polymer-ajax to git://github.com/polymer/polymer-ajax.git

Your element should now be available on the Bower registry.

In the case of `polymer-ajax`, a user could then install it by running:

    $ bower install {{site.project_title}}/polymer-ajax --save-dev

Note that in the case of {{site.project_title}}, we've opted to register our elements with the naming scheme {{site.project_title}}/polymer-element-name, however you will most likely just want to register your element with a single word for the shortened package name (e.g `bower register polymer-unicorn ...`).

{% include disqus.html %}
