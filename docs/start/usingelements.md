---
layout: default
type: start
navgroup: start
shortname: Start
title: Using elements
subtitle: Getting started
---

{% include toc.html %}

If HTML was reinvented tomorrow, it would provide more features and greater capability and than today's built-in elements. For example, imagine you're building a photobooth app to capture snapshots, display thumbnails, and cycle through recent photos. If HTML provided the `<camera>`, `<carousel>`, or `<tabs>` element, you wouldn't think twice about (re)using them. You'd accept the functionality by declaring the tags in markup. 

[Custom Elements](/platform/custom-elements.html) pave a path to {{site.project_title}}'s mantra, "[Everything is an element](/docs/start/everything.html)". Embracing it means web apps become a large collection of well-defined, reusable components. You create applications by assembling custom elements together, either ones provided by {{site.project_title}}, [ones you create](/getting-started.html) yourself, or third-party elements.

## Custom elements are elements

At the basic level Custom Elements work just like standard HTML elements. Take an HTML `<button>`. You can declare it:

    <button>Hello World<button>

Instantiate it in JavaScript:

    var b = document.createElement('button');
    b.textContent = 'Hello World';
    document.body.appendChild(b);

Even attach event listeners or call methods:

    <button>Hello World<button> 

    <script>
      var b = document.querySelector('button');
      b.addEventListener('click', function(e) {
        alert('Sup!');
      });
    </script>

Guess what? All the same tricks apply custom elements.

    <custom-button>Hello New World</custom-button>

    <script>
      var cb = document.createElement('custom-button');
      cb.textContent = 'Hello Hello World';
      document.body.appendChild(cb);
    </script>

*Custom elements are just elements*. They're like any other in HTML. The difference
is that 


As in this example, all custom element names contain a dash ("-") character. The dash lets everybody know this is a custom element and prevents custom element names from colliding with native element names. Custom elements take attributes and fire events, just like regular elements:

    <button id="helloButton" onclick="alert('hello');">Hello World<button> 

so

    <custom-button id="helloButton" onclick="alert('hello');">Hello New World</custom-button>

Now, I made up `<custom-button>` for this example, putting that tag into an HTML document will just create a plain unknown element. There will be real examples in a bit.

### Interoperability {#interop}

Because custom elements are simply elements, custom elements by nature work with each other, and with any technology that already works with elements.

This is **important**, so let me say it again: custom elements can in general be treated as any other element. That means that custom elements as a concept simply already works with AngularJS, Ember, jQuery or any other technology framework you use.

Right now, most browsers do not implement custom elements natively so full compatibility is unrealistic. Support is smiluated through the [platform.js](docs/start/platform.html) polyfills. But for the most part, things do Just Work with the polyfills. Ultimately all compatibility issues go away when custom elements is implemented directly in browsers. 

The custom elements we've used so far come from {{site.project_title}}'s set and are built using [{{site.project_title}} core](/docs/polymer/polymer.html). But here's where things get interesting.

**That doesn't matter.**

Because custom elements are just like regular elements, it doesn't matter what kind of technology is used to implement their internals. Different kinds of elements from different vendors can all coexist and together in the same page!

For example, Mozilla offers a series of custom elements called x-tags (see also: Brick). I can use x-tags with my other elements and I can mix and match them. As a general rule, it doesn't matter how an element was constructed.
Different vendors will produce elements of varying quality, differing payloads, and so on. But because elements can inter-operate, we can shop around for the best fit for any particular problem we need to solve.
While it's true you can typically save bytes by using multiple elements that share resources (e.g. all x-tags share one x-tag-core library), you can in general use elements from various sources without having to choose something like a framework.
But I Like My Framework
Cool, keep rocking your framework. If your framework works with DOM, it works with custom elements. See the Prove It section above.


## Installing elements {#install}

The first step in using an element (or a set of elements) is to install locally into your app using [Bower](http://bower.io). Bower is a front-end package manager that makes installing and versioning dependencies very straightforward. As your application grows in complexity, you'll be using more and more elements. Bower is  an ideal tool for managing those dependencies.

### Installing individual elements {#installsingle}

Elements can also be installed individually as needed. For example, to download `<polymer-ajax>`, install it using the shorthand to the element's [Github project](https://github.com/polymer/polymer-ajax):

    bower install --save Polymer/polymer-ajax

Running this command adds a `bower_components/` folder and fills it `<polymer-ajax>` and its dependencies (platform.js polyfills and polymer.js core). 

The `--save` flag  adds {{site.project_title}} as a dependency in your app's `bower.json` file:

```
{
  "name": "your-app",
  "version": "0.0.0",
  "dependencies": {
    "polymer-ajax": "Polymer/polymer-ajax#~0.1.4"
  }
}
```
If your project does not yet have a `bower.json`, create one by running `bower init`.

### Element set {#install}

The {{site.project_title}} elements contain a set of visual and non-visual components. The non-visual elements are perform common tasks like layout, AJAX, signaling, and storage.


Each set can be downloaded separately:

    bower install --save polymer-elements
    bower install --save polymer-ui-elements

#### Using elements {#using}

To use elements in your app, include an import to load the new dependency.



{%raw%}
    
{%endraw%}

### 3. Create an app {#creatapp}

Lastly, create an `index.html` that imports your new element. Include `platform.js`
to load polyfills for the native APIs. **Be sure to include this file before any code that touches the DOM.**

Here's the full example:

    <!DOCTYPE html>
    <html>
      <head>
        <script src="bower_components/platform/platform.js"></script>
        <link rel="import" href="../bower_components/polymer-ajax/polymer-ajax.html">
      </head>
      <body>
        <!-- 3. Declare the element by its tag. -->
        <polymer-ajax url="http://example.com/json" auto response="{{resp}}"></polymer-ajax>

        <script>
          <polymer-ajax url="http://gdata.youtube.com/feeds/api/videos/" 
                        params='{"alt":"json", "q":"chrome"}"
                        handleAs="json"
                        on-polymer-response="{{handleResponse}}"
                        auto>
          </polymer-ajax>
        </script>
      </body>
    </html>

**Note:** You must run your app from a web server for the [HTML Imports](/platform/html-imports.html)
polyfill to work properly. This requirement goes away when the API is available natively.
{: .alert .alert-info }

Your final directory structure should look something like this:

    yourapp/
      bower_components/
        platform/
        polymer/
        polymer-ajax/
      index.html

Now that you've got the basic setup, it's time to start using the features!

## Where to go from here?

Learn how to create your own {{site.project_title}} elements <LINK>


----


## What is Platform?

Much of the custom element universe is brand new and ahead of most browser implementations. The platform layer collects various polyfills and glue code to allow the high-level constructions to work on evergreen browsers today. See here [links] for additional support information.
Best practice is to load platform.js as the first script tag in your document head.

    <!doctype html>
      <html>
      <head>
        <title>Project</title>
        <script src="bower_components/platform/platform.js"></script>
      </head>
      <body>
        ...
      </body>
    </html>

## Moar Components

Let's say I've decided I want to make a full-bleed application. In other words, instead of a long scrolling page, I want to divide the page into sections, like toolbars and lists. As it turns out, making HTML content fit a viewport is not as simple as one might think. Once you know the right CSS, it's not too hard, but I'm going to simplify my world with components.
How to discover and evaluate components is an important topic that is covered elsewhere. For now, I'm going to skip that part and concentrate on the nuts and bolts. For example, I happen to know that the polymer-layout component can help me with my desired page layout, so I'm going to grab it.

    bower install Polymer/polymer-layout

Bower automatically installs the polymer-layout component, and some code it shares with other elements: the polymer shared library.

    yourapp/
      bower_components/
        platform/
        polymer/
        polymer-layout/

Don't worry about polymer or other dependencies. Bower installs them automatically, and the import system loads them automatically.
Finally, A custom element
polymer-layout is our first custom element. From the Bower perspective, a custom element is a type of component, this is why we called it a component above. But from the HTML perspective it's more specifically an element.
You use a custom element like any other element, which is like this:

    <custom-element></custom-element>

However, before you use a custom element on your page, you have to import it. Let’s import polymer-layout.

    <!doctype html>
    <html>
    <head>
        <title>Project</title>
        <script src="components/platform/platform.js"></script>
        <link rel="import" href="components/polymer-layout.html">
    ....

    <link rel="import"> is a new standard loading mechanism. It is supported natively on some browsers, and on others it's simulated by code in platform.js. In any case, this link tag makes our polymer-layout element ready to use.
    [links to HTMLImports info]
    <!doctype html>
    <html>
    <head>
        <title>Project</title>
        <script src="components/platform/platform.js"></script>
        <link rel="import" href="components/polymer-layout/polymer-layout.html">
    </head>
    <body>
      <polymer-layout></polymer-layout>
    </body>
    </html>

Invisible Elements

Great, we used a custom element! But the page is just blank, what happened? Well, polymer-layout is an example of a invisible element: an element that does useful work without actually showing up on the screen. There are plenty of standard elements that don’t render, but it can be surprising to consider invisible custom elements. To make our page actually display something, we need to provide some nodes for polymer-layout to lay out.

    <!doctype html>
    <html>
    <head>
        <title>Project</title>
        <script src="components/platform/platform.js"></script>
        <link rel="import" href="components/polymer-layout/polymer-layout.html">
    </head>
    <body>
        <polymer-layout></polymer-layout>
        <div flex style="background: #333; border: 2px solid black;"></div>
    </body>
    </html>

There, now I've added an dark gray box, and we can see that it fills the viewport. Notice the flex attribute on the div. This is a custom attribute that tells polymer-layout to make the div fit the viewport and adapt as the viewport changes.
Visible Elements
Let’s add some more interesting stuff. I want to add a toolbar with some buttons on it. I happen to know some elements that can do that (dna-toolbar,dna-icon-button). Let’s install those the usual way:

    /www/project/
    $ bower install polymer/dna-toolbar#master

    /www/project/
    $ bower install polymer/dna-icon-button#master

Now I can add these to my page, just like I did for layout.

    <!doctype html>
    <html>
    <head>
        <title>Project</title>
        <script src="components/platform/platform.js"></script>
        <link rel="import" href="components/polymer-layout/polymer-layout.html">
        <link rel="import" href="components/dna-toolbar/dna-toolbar.html">
        <link rel="import" href="components/dna-icon-button/dna-icon-button.html">
    </head>
    <body>
        <polymer-layout vertical></polymer-layout>
        <dna-toolbar>
            <dna-icon-button icon="menu"></dna-icon-button>
            <dna-icon-button icon="settings"></dna-icon-button>
        </dna-toolbar>
        <div flex style="background: #333; border: 2px solid black;"></div>
    </body>
    </html>

Now we really have the start of an application.
Important: make sure you added the vertical attribute to polymer-layout, which otherwise defaults to horizontal layout.

## Custom Elements Are Just Like Elements

Let's make the buttons do something. Even though these buttons are custom elements, they share the same DOM features as any other elements. For example, we can listen for click events on them using addEventListener. The event handlers below aren’t very interesting, but we want to start simple.

  <!doctype html>
  ...
  <body>
      <polymer-layout vertical></polymer-layout>
      <dna-toolbar>
          <dna-icon-button icon="menu"></dna-icon-button>
          <dna-icon-button icon="settings"></dna-icon-button>
      </dna-toolbar>
      <div flex style="background: #333; border: 2px solid black;"></div>
      <script>
          document.querySelector('[icon="menu"]').addEventListener('click', function() {
              alert("sorry, no menu");
          });
          document.querySelector('[icon="settings"]').addEventListener('click', function() {
              alert("sorry, no settings");
          });
      </script>
  </body>
  </html>


