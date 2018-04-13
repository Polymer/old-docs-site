---
title: Create an element project with the Polymer CLI
---

<!-- toc -->

<div>
{% include 'outdated.html' %}
</div>

This section shows you how to start an element project.

1.  Create a directory for your element project. For projects with a single element,
    it's common to name the project directory to match the element name.

    <pre><code>mkdir <var>my-el</var> && cd <var>my-el</var></code></pre>

    Where <code><var>my-el</var></code> is the name of the element you're
    creating.

1.  Initialize your element. Polymer CLI asks you a few questions as it sets up your element
    project.

        polymer init

1.  Select `polymer-2-element`.

1.  Enter a name for your element.

    The [custom elements
    specification](https://www.w3.org/TR/2016/WD-custom-elements-20160226/#concepts) requires the
    element name to contain a dash.
    {.alert .alert-info}

1.  Enter a description of the element.

At this point, Polymer CLI generates files and directories for your element, and installs your 
project's dependencies.

## Element project layout

After the initialization process Polymer CLI generates the following files and directories.

*   `bower.json`. Configuration file for Bower.
*   `bower_components/`. Project dependencies. See [Manage dependencies](#dependencies).
*   `demo/index.html`. Demo of <code><var>my-el</var></code>`.html`.
*   `index.html`. Automatically-generated API reference.
*   <code><var>my-el</var></code>`.html`. Element source code.
*   `test/`<code><var>my-el</var></code>`_test.html`. Unit tests for
    the element.

## Manage dependencies and HTML imports {#dependencies}

### Use Bower to manage dependencies

Polymer CLI uses [Bower](http://bower.io) for dependency management.

Dependencies are stored in the `bower_components` directory. You should never manually alter the
contents of this directory.

Use the Bower CLI to manage dependencies.

To download a dependency to `bower_components/` (the `--save` flag saves the new 
dependency to `bower.json`):

    bower install --save PolymerElements/iron-ajax

To remove the dependency from `bower_components` and `bower.json`:

    bower uninstall PolymerElements/iron-ajax

### Import dependencies as relative URLs

When importing dependencies inside your element, you should always use a relative URL *as if the 
dependency is a sibling of your project.*

```
<!-- from a top-level 'some-element.html' -->
<link rel="import" href="../polymer/polymer.html">
<link rel="import" href="../paper-elements/paper-button.html">
```

#### Why use relative URLs?

Suppose that you ran Polymer CLI to generate an element project. Your element is named `my-el`. 
You look inside `my-el.html` and see that Polymer has been imported like so:

    <link rel="import" href="../polymer/polymer.html">

This path doesn't make sense. Relative to `my-el.html`, Polymer is actually located at 
`bower_components/polymer/polymer.html`. Whereas the HTML import above is referencing a location 
*outside* of your element project. What's going on?

Bower installs dependencies in a flat dependency tree, like so:

    bower_components/
      polymer/
        polymer.html
      my-el/
        my-el.html
      other-el/
        other-el.html

This works well on the application-level. All elements are siblings, so they can all reliably 
import each other using relative paths like `../polymer/polymer.html`. This is why Polymer CLI 
uses relative paths when initializing your element project.

However, one problem with this approach is that this structure does not actually match the layout 
in your element project. Your element project is actually laid out like so:

    bower_components/
      polymer/
        polymer.html
    my-el.html

Polymer CLI handles this by remapping paths. When you run `polymer serve`, all elements in 
`bower_components` are remapped to appear to be in sibling directories relative to `my-el`. The 
current element is served from the made-up path of <code>/components/<var>bower name</var></code>, 
where <code><var>bower name</var></code> is the `name` field from your element project's 
`bower.json` file.