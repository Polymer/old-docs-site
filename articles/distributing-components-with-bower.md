---
layout: default
type: guide
shortname: Articles
title: "Distributing Components With Bower"
subtitle: How to package your elements for broader sharing

article:
  author: addyosmani
  published: 2014-03-07
  updated: 2014-06-16
  polymer_version: 0.2.0
  description: How to package your elements for broader sharing
tags:
- distributing
- packages
- tooling
- bower
---

{% include authorship.html %}

{% include not-an-intro.html %}

{% include toc.html %}


## Package requirements {#requirements}

You can use [Bower](http://bower.io) to package and distribute {{site.project_title}} elements. Packages can contain arbitrary HTML, CSS and JavaScript and are flexible enough to accommodate most types of project structures. In order for a Bower package to be considered valid:

* Your package must have a valid manifest JSON ([bower.json](http://bower.io/#defining-a-package)) in the root of the project.
* Your package must be available at a Git endpoint (for example, hosted on GitHub).
* Bower package versions are identified using [semantic version numbers](http://semver.org/) (e.g 1.2.1).
* To identify a package version in Git, you must create and push a Git tag with the corresponding version number (e.g 1.2.1).

We will walk through creating a valid bower.json file and publishing a package with the required semantic versioning shortly.

**Note:** On the topic of package naming, the Bower registry does not have authentication or user management at this point in time. Package names are thus on a first come, first served basis. Think of it like a URL shortener.

## Packaging a {{site.project_title}} element {#packaging}

### 1. Create a manifest {#create-manifest}

Run `bower init` to generate a valid bower.json manifest to lock down your project's dependencies. When run it will ask you a number of questions about your package. Let’s generate a package for a fictional {{site.project_title}} element called `polymer-demo`:

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
        'web-components'
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

**Note:** by including the ‘web-components’ keyword in your bower.json file, Web Component enthusiasts can discover your element on [bower.io](http://bower.io/search) outside of searches for ‘{{site.project_title}}’ itself.

### 2. Adding the Polymer dependencies {#add-dependencies}

Next, you will want to install webcomponents.js (the Web Component polyfills) and polymer.html so that your {{site.project_title}} elements can consume them. This can be done by running the following one-liner:

    bower install --save polymer

We pass the `--save` flag to Bower so that a reference to the dependencies listed can be added to your bower.json file automatically. This enables you to check-in your bower.json file so that others can run `bower install` to get any of the project’s dependencies.

    {
      "name": "polymer-demo",
      // ...
      "dependencies": {
        "polymer": "{{site.project_title}}/polymer",
        "platform": "{{site.project_title}}/platform"
      }
    }

When you run `bower install`, Bower clones the package's Git repositories, caches the package and then copies the package to our current project's bower_components directory (Bower will create this if it doesn't exist). This directory can be customized using a [.bowerrc](https://github.com/bower/bower#custom-install-directory) file.

An alternative to running the above `bower install` line is adding a reference to {{site.project_title}} and webcomponents.js manually in the generated bower.json file.

### 3. Referencing dependencies {#reference-dependencies}


We recommend custom {{site.project_title}} elements live in the same folder as your other components. That way, when your element is installed by another user, it references paths relative to the element’s install location (typically bower_components):

{% raw %}
    <link rel="import" href="../polymer/polymer.html">
    <link rel="import" href="../core-toolbar/core-toolbar.html">

    <polymer-element name="polymer-demo">
     <!- ... -->
{% endraw %}

When elements list {{site.project_title}} as a dependencies, it will be installed along-side and the element and paths will just work.

### 4. Register your package on Bower {#register}

Once you are happy with your package, tag the release with a semver version matching your bower.json file. For example:

    git tag -a 1.2.1 -m "Tagging 1.2.1"

You can then register your package on Bower using the `bower register` command:

    bower register [app name] [git endpoint]

For our fictional {{site.project_title}} element, this would be:

    bower register polymer-demo git://github.com/johnsmith/polymer-demo.git

    Registering a package will make it visible and installable via the registry.
    Proceed (y/n)? y
    registered polymer-demo to git://github.com/johnsmith/polymer-demo.git

Your element should now be available on the [bower registry](http://bower.io/search) and should be discoverable when a user uses the `bower search` command. In the case of `polymer-demo`, a user can now install the element for their own use with:

    bower install polymer-demo --save


## FAQ {#faq}

### What is Bower? {#bower-summary}

[Bower](http://bower.io), it is a package manager for the web which offers a generic, unopinionated solution to the problem of front-end package and dependency management. It is {{site.project_title}}'s package management solution of choice for sharing your own elements with the community.

### How do I install Bower? {#bower-install}

Bower depends on [Node](http://nodejs.com) and [npm](http://npmjs.org) and is generally used via the command-line.

You can download and install Node from [nodejs.org](http://nodejs.org). npm comes bundled with each binary package, so when you install Node, npm should automatically be installed at the same time. You’ll also need to have Git installed, as Bower uses Git endpoints to locate packages. If you don’t have Git installed, you can download it from [http://git-scm.com/downloads](git-scm.com/downloads).

You can then install Bower using npm:

    npm install -g bower

**Note:** The `-g` in the above command means Bower is installed globally, meaning you can run it from anywhere in any project directory.

### What commands does Bower support? {#bower-commands}

To display help information about the commands available for installing, uninstalling, listing and updating packages, run bower with the `--help` flag:

    bower --help

You can get help about a specific command by passing the name of the command to `help`:

    bower help list

To list what packages you have installed in the current project, pass the `list` command to bower:

    bower list

This won’t display any information until a package has been installed, but you can do this with the `install` command:

    bower install {{site.project_title}}/platform

Uninstalling packages is just as easy as installing them. In this case we use the `bower uninstall` command.

    bower uninstall {{site.project_title}}/platform

