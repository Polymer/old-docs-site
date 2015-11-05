---
layout: default
type: start
shortname: Start
title: Create a new page
subtitle: Polymer Starter Kit
---

{% include toc.html %}

This Polymer Starter Kit tutorial teaches you how to:

*   Create a new menu item in the navigation menu.
*   Create content for a new page.
*   Route traffic to your new page.

This guide assumes you have already completed the [Set up guide](setting-up.html).

## Serve the app locally

1.  `cd` to the base directory of your project.

1.  Start the local development server.

        gulp serve

The local development server opens the application in your default
web browser. As you modify your application, the server detects the
modifications, re-builds the application, and reloads your browser
automatically. There is no need to re-load the browser or the application.

## Create a navigation menu item

1.  Open `app/index.html` in a text editor.

1.  Find the navigation menu. The beginning of it is diplayed in the code
    snippet below.

{% highlight html %}
...
<!-- Drawer Content -->
<paper-menu class="list" attr-for-selected="data-route" selected="{{route}}" on-iron-select="onMenuSelect">
  <a data-route="home" href="/">
    <iron-icon icon="home"></iron-icon>
    <span>Home</span>
  </a>
...
{% endhighlight %}

Each navigation menu item consists of an anchor element (`<a>`) with two 
children: `<iron-icon>` and `<span>`.

*   `<iron-icon>` displays a single icon. 
*   `<span>` displays the text next to the icon.
   
1.  Add the following new navigation item to the bottom of the menu.

{% highlight html %}
<a data-route="books" href="/books">
  <iron-icon icon="book"></iron-icon>
  <span>Books</span>
</a>
{% endhighlight %}

Your menu should now look like the code below (some code has been omitted).

{% highlight html %}
...
<!-- Drawer Content -->
<paper-menu class="list" attr-for-selected="data-route" selected="{{route}}" on-iron-select="onMenuSelect">
  <a data-route="home" href="/">
    <iron-icon icon="home"></iron-icon>
    <span>Home</span>
  </a>
  ...
  <a data-route="contact" href="/contact">
    <iron-icon icon="mail"></iron-icon>
    <span>Contact</span>
  </a>
  <a data-route="books" href="/books">
    <iron-icon icon="book"></iron-icon>
    <span>Books</span>
  </a>
</paper-menu>
...
{% endhighlight %}

If you view the app now, you should see your new item in the navigation
menu, but the link does not point to a valid page yet. Proceed to the 
next section to do that now.

<!-- image with new nav item -->

## Add content

In the previous section you added a navigation menu item to enable the 
user to navigate to a new page. Now, you add the content for that new page.

1.  Open `app/index.html` in a text editor and find the main content. 
    The beginning of the main content section is provided in the code 
    snippet below (some code omitted for brevity).

{% highlight html %}
<div class="content">
  <iron-pages attr-for-selected="data-route" selected="{{route}}">

    <section data-route="home">
      <paper-material elevation="1">
        <my-greeting></my-greeting>

        <p class="paper-font-subhead">You now have:</p>
        <my-list></my-list>
        ...
      </paper-material>
    </section>

    <section data-route="users">
      <paper-material elevation="1">
        <h2 class="paper-font-display2">Users</h2>
        <p>This is the users section</p>
        <a href="/users/Rob">Rob</a>
      </paper-material>
    </section>
    ...
{% endhighlight %}

*   Each page of the application is a `<section>` element. 
*   The `data-route` attribute is an identifier for the routing system. 
    You'll set that up for your new page in the next section.
*   The `<paper-material>` element creates a card which floats on top of the
    main content area. All text, images, and other content should always
    be contained within one of these cards.
*   The `elevation` attribute determines how high the card appears to visually
    float above the main content area. Experiment by setting it to values 
    between `0` and `1` to see for yourself.

1.  Add the following content to the bottom of the main section area.

{% highlight html %}
<section data-route="books">
  <paper-material elevation="1">
    <p>Hello, World!</p>
  </paper-material>
</section>
{% endhighlight %}

Your code should now look like the code snippet below (some code omitted).

{% highlight html %}
...
<!-- Main Content -->
<div class="content">
  <iron-pages attr-for-selected="data-route" selected="{{route}}">
    ...
    <section data-route="contact">
      <paper-material elevation="1">
        <h2 class="paper-font-display2">Contact</h2>
        <p>This is the contact section</p>
      </paper-material>
    </section>

    <section data-route="books">
      <paper-material elevation="1">
        <p>Hello, World!</p>
      </paper-material>
    </section>

  </iron-pages>
</div>
...
{% endhighlight %}

You now have content to link your new navigation item to, but the routing
system for the Polymer Starter Kit is not quite set up properly yet. Proceed
to the next section to link your navigation item to your new content.

## Route traffic to the new content

In this last tutorial, you make a minor modification to the routing system
so that when a user clicks on the new "Books" navigation menu item, they 
get routed properly to your new page.

1.  Open `app/elements/routing.html` in a text editor and add the 
    following code near the bottom of the script, just above the 
    page rule for `/`.

{% highlight javascript %}
page('/books', function () {
  app.route = 'books';
});
{% endhighlight %}

Your script should now look like the code snippet below (some code omitted).

{% highlight javascript %}
...
page('/', function () {
  app.route = 'home';
});
...
page('/contact', function () {
  app.route = 'contact';
});
page('/books', function () {
  app.route = 'books';
});
// add #! before urls
page({
  hashbang: true
});
...
{% endhighlight %}
