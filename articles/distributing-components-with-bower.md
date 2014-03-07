---
layout: default
type: core
navgroup: docs
shortname: Articles
title: "Distributing Components With Bower"
subtitle: How to package your elements for broader sharing 

article:
  author: addyosmani
  published: 2014-03-07
  #updated: 2013-12-06
  polymer_version: 0.2.0
  description: How to package your elements for broader sharing
tags:
- distributing
- packages
- tooling
- bower
---

{% include authorship.html %}

{% include toc.html %}

You can use [Bower](http://bower.io) to package and distribute {{site.project_title}} elements. Packages can contain arbitrary HTML, CSS and JavaScript and are flexible to accommodate most types of project structures. In order for a Bower package to be considered valid:

* There must be a valid manifest JSON (bower.json) in the current working directory. 
* Your package should use [semver](http://semver.org/) Git tags. 
* Your package must be available at a Git endpoint (e.g., GitHub); remember to push your Git tags!

On the topic of package naming, the Bower registry does not have authentication or user management at this point in time. Package names are thus on a first come, first served basis. Think of it like a URL shortener.

## Packaging a {{site.project_title}} element

### 1. Create a manifest

You can use `bower init` to generate a valid bower.json manifest to lock down your project's dependencies. Let’s generate a package for a fictional {{site.project_title}} element called `polymer-demo`:

    bower init

  [?] name: polymer-demo
  [?] version: 0.0.1
  [?] description: An awesome {{site.project_title}} element
  [?] main file: 
  [?] keywords: {{site.project_title}}, web-components
  [?] authors: John Smith
  [?] license: MIT
  [?] homepage: https://github.com/johnsmith/polymer-demo
  [?] set currently installed components as dependencies? No
  [?] add commonly ignored files to ignore list? Yes
  [?] would you like to mark this package as private which prevents it from being accidentally published to the registry? No


This will produce a bower.json file containing something like:

  {
    name: 'polymer-demo',
    version: '0.0.1',
    authors: [
      'John Smith '
    ],
    description: 'An awesome {{site.project_title}} element.',
    keywords: [
      '{{site.project_title}}',
                ‘web-components’
    ],
    license: 'MIT',
    homepage: 'https://github.com/johnsmith/polymer-demo',
    ignore: [
      '**/.*',
      'node_modules',
      'bower_components',
      'test',
      'tests'
    ]
  }

**Note**: by including the ‘web-components’ keyword in your bower.json file, this will allow Web Component enthusiasts to easily find your element on Bower.io outside of searches for ‘{{site.project_title}}’ itself.

### 2. Including other dependencies

Next, you will want to install platform.js (the Web Component polyfills) and polymer.html so that your {{site.project_title}} elements can consume them. This can be done by running the following one-liner: 

  bower install --save polymer

We pass the `--save` flag to Bower so that a reference to the dependencies listed can be added to your bower.json file automatically. This enables you to check-in your bower.json file so that others can run `bower install` to get any of the project’s dependencies.

When you run the above line, Bower clones the package's Git repositories, caches the package and then copies the package to our current project's bower_components directory (Bower will create this if it doesn't exist). This directory can be customized using a [.bowerrc](https://github.com/bower/bower#custom-install-directory) file.

  {
    "name": "polymer-demo",
    // ...
    "dependencies": {
      "polymer": "{{site.project_title}}/polymer",
                "platform": "{{site.project_title}}/platform"
    }
  }

An alternative to running the above `bower install` line is adding a reference to {{site.project_title}} and platform.js manually in the generated bower.json file.

### 3. Reference dependencies

We recommend custom {{site.project_title}} elements maintain {{site.project_title}} in the root directory and reference them it as follows:

{% raw %}
<link rel="import" href="../polymer/polymer.html">
<polymer-element name="polymer-demo">
 <!- ... -->
{% endraw %}

As {{site.project_title}} is listed as a dependency in bower.json, it gets installed alongside your component in the user’s `bower_components` folder. This means that any {{site.project_title}} element you create can import `polymer.html` from a relative path.

### 4. Register your package on Bower

Once you are happy with your package, register it using the `bower register` command:

    bower register [app name] [git endpoint]

For our fictional {{site.project_title}} element, this would be:

    bower register polymer-demo git://github.com/johnsmith/polymer-demo.git

    Registering a package will make it visible and installable via the registry.
    Proceed (y/n)? y
    registered polymer-demo to git://github.com/johnsmith/polymer-demo.git

Your element should now be available on the [bower registry](http://bower.io/search) and should be discoverable when a user uses the `bower search` command. In the case of `polymer-demo`, a user can now install the element for their own use with:

    $ bower install polymer-demo --save

## FAQ

### What is Bower?

[Bower](http://bower.io), it is a package manager for the web which offers a generic, unopinionated solution to the problem of front-end package and dependency management. It is {{site.project_title}}'s package management solution of choice for sharing your own elements with the community.

### How do I install Bower?

Bower depends on [Node](http://nodejs.com) and [npm](http://npmjs.org) and is generally used via the command-line. 

You can download and install Node from nodejs.org. npm comes bundled with each binary package, so when you install Node, npm should automatically be installed at the same time. You’ll also need to have Git installed, as Bower uses Git endpoints to locate packages. If you don’t have Git installed, you can download it from git-scm.com/downloads. 

You can then install Bower using npm:

    npm install -g bower

Note: The -g in the above command means Bower will be installed globally, meaning we can run it from anywhere in any project directory.

### What commands does Bower support?

To display help information about the commands available for installing, uninstalling, listing and updating packages, run bower with the --help flag:

  bower --help

You can get help about a specific command by passing the name of the command to help:

  bower help list

To list what packages you have installed in the current project, pass the `list` command to bower:

  bower list

This won’t display any information until a package has been installed, but we can do this with the `install` command:

  bower install {{site.project_title}}/platform 

Uninstalling packages is just as easy as installing them. In this case, we use the bower uninstall command.

  bower uninstall {{site.project_title}}/platform


{% include disqus.html %}
