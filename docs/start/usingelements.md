---
layout: default
type: start
navgroup: start
shortname: Start
title: Using elements
subtitle: Polymer from the outside
---

{% include toc.html %}

If HTML was reinvented tomorrow, it would provide more features and greater capability and than today's built-in elements. For example, imagine you're building a photobooth app to capture snapshots, display thumbnails, and cycle through recent photos. If HTML provided the `<camera>`, `<carousel>`, or `<tabs>` element, you wouldn't think twice about using them. You'd accept the functionality and start declaring a ton of markup!

Fortunately, [Custom Elements](/platform/custom-elements.html) pave a path to {{site.project_title}}'s, "[Everything is an element](/docs/start/everything.html)". Embracing the mantra means web apps become a large collection of well-defined, reusable components. You create applications by assembling custom elements together, either ones provided by {{site.project_title}}, [ones you create](/getting-started.html) yourself, or third-party elements.

## Custom elements are just elements

The first thing to get your head around is that **custom elements are no different than
standard HTML elements**. Take an HTML `<select>`. It can be declared:

    <select selected="0">
      <option>Hello World</option>
    </select>

or instantiated in JavaScript:

    var s = document.createElement('select');
    s.innerHTML = '<option>Hello World</option>';

One can attach event listeners, access properties, or call its methods:

    <script>
      s.addEventListener('change', function(e) {
        alert(this.selectedIndex == 0);
      });
    </script>

Guess what? **The same tricks apply to custom elements**. Our `<polymer-selector>` element is a close relative of `<select>`:

    <polymer-selector selected="0">
      <div>Item 1</div>
      <div>Item 2</div>
    </polymer-selector>

    <script>
      var ps = document.querySelector('polymer-selector');
      ps.addEventListener('polymer-select', function(e) {
        alert(e.selectedIndex == 0);
      });
    </script>

The major difference is that custom elements give authors a tool for defining new tags
with custom API functionality (i.e. attributes, properties, methods, events).

## Non-visual elements

There are plenty of standard HTML elements that don't render, but it can be surprising to consider invisible custom elements. `<polymer-ajax>` is an example of a non-visual custom element. It provides XHR utilities and does useful work without actually showing up on the screen.

Another is `<polymer-layout>`.

is But the page is just blank, what happened? Well, polymer-layout is an example of a invisible element: an element that does useful work without actually showing up on the screen. 

To make our page actually display something, we need to provide some nodes for polymer-layout to lay out.

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

##  Visible Elements

Let's add some more interesting stuff. We'll add a toolbar with some buttons on it. I happen to know some elements that can do that (dna-toolbar,dna-icon-button). Let’s install those the usual way:

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

## Installing elements {#install}

The first step in using an element (or a set of elements) is to install it locally into your app using [Bower](http://bower.io). As your application grows in complexity, you'll be using more and more elements. Bower is an ideal tool for managing and versioning those dependencies.

### Installing single elements {#installsingle}

Elements can be installed a la carte as needed. For example, to download `<polymer-ajax>`, install it using the shorthand to the element's [Github project](https://github.com/polymer/polymer-ajax):

    bower install --save Polymer/polymer-ajax

Running this command adds a `bower_components/` folder and fills it with `<polymer-ajax>`:

    yourapp/
      bower_components/
        platform/
        polymer/
        polymer-ajax/

Don't worry about the other dependencies


Using the `--save` flag  adds {{site.project_title}} as `<polymer-ajax>` to your app's `bower.json`:

    {
      "name": "your-app",
      "version": "0.0.0",
      "dependencies": {
        "polymer-ajax": "Polymer/polymer-ajax#~0.1.4"
      }
    }

**Note** If your project does not yet have a `bower.json`, create one by running `bower init`.
{: .alert .alert-info }

### Installing an element set {#installset}

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


## Moar Components

Let's say I've decided I want to make a full-bleed application. In other words, instead of a long scrolling page, I want to divide the page into sections, like toolbars and lists. As it turns out, making HTML content fit a viewport is not as simple as one might think. Once you know the right CSS, it's not too hard, but the world can be simplified with components. Turns out, the `<polymer-layout>` element helps with page layout.

    bower install Polymer/polymer-layout

Bower automatically installs the polymer-layout component, and some code it shares with other elements: the polymer shared library.

    yourapp/
      bower_components/
        platform/
        polymer/
        polymer-layout/

Don't worry about polymer or other dependencies. Bower installs them automatically, and the import system loads them automatically.

Finally, a custom element `<polymer-layout>` is our first custom element. From the Bower perspective, a custom element is a type of component, this is why we called it a component above. But from the HTML perspective it's more specifically an element.
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




## Interoperability {#interop}

Because custom elements are fundamentally HTML elements, by nature, they work well with each other. echnology that understands DOM (every framework on the planet). That means custom elements already works with frameworks like Angular, Ember, jQuery, &lt;insert framework here>.

Right now, most browsers do not implement custom elements natively so full compatibility is unrealistic. Support is smiluated through the [platform.js](docs/start/platform.html) polyfills. But for the most part, things do Just Work with the polyfills. Ultimately all compatibility issues go away when custom elements is implemented directly in browsers. 

The custom elements we've used so far come from {{site.project_title}}'s set and are built using [{{site.project_title}} core](/docs/polymer/polymer.html). But here's where things get interesting. **That doesn't matter**.

Because custom elements are just like regular elements, it doesn't matter what kind of technology is used to implement their internals. Different kinds of elements from different vendors can all coexist and together in the same page!

For example, Mozilla offers a series of custom elements called x-tags (see also: Brick). I can use x-tags with my other elements and I can mix and match them. As a general rule, it doesn't matter how an element was constructed.
Different vendors will produce elements of varying quality, differing payloads, and so on. But because elements can inter-operate, we can shop around for the best fit for any particular problem we need to solve.
While it's true you can typically save bytes by using multiple elements that share resources (e.g. all x-tags share one x-tag-core library), you can in general use elements from various sources without having to choose something like a framework.
But I Like My Framework
Cool, keep rocking your framework. If your framework works with DOM, it works with custom elements. See the Prove It section above.

