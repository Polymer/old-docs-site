---
layout: default
type: start
shortname: Start
title: Creating an element
subtitle: Polymer Starter Kit
---

## Creating an element

This tutorial teaches you how to build and use a custom element. The element 
you create searches for and displays books based on a user's
query. When the user types a query into a text field and hits Enter, 
your element sends the query to the Google Books web service, and then parses 
and displays the top book results for that query.

This tutorial builds off of the [Creating a page tutorial](creating-a-page.html),
so you need to complete that first.

### Creating a bare-minimum Polymer element

You are going to build your element in three iterations. For the first iteration,
you create a bare-minimum Polymer element.

1. Create a new directory at `app/elements/my-books-feed`.

1. Create a new file at `app/elements/my-books-feed/my-books-feed.html` and
   create your bare-minimum element with the code below. 

{% highlight html %}
<dom-module id="my-books-feed">
  <style></style>
  <template>
    <h2>Search Google Books</h2>
  </template>
  <script>
Polymer({
  is: 'my-books-feed',
  properties: {},
  ready: function() {
    console.log('my-books-feed element ready');
  },
});
  </script>
</dom-module>
{% endhighlight %}

1. Test out your new element by including it in the application content
   area. Open `app/index.html` and modify the `books` section which 
   you created in the [Creating a page](creating-a-page.html) tutorial.
   After you are complete the `section` should look like the code
   snippet below.

{% highlight html %}
<section data-route="books">
  <paper-material elevation="1">
    <my-books-feed></my-books-feed>
  </paper-material>
</section>
{% endhighlight %}

If you build and view the site, you expect to see `Search Google Books`
displayed on the page. But it is not showing up. Why?

The reason is that your element has not been imported into the application.
The element is unknown to your browser, which results in undefined behavior.

1. Import your element by adding the following line to the bottom of 
   `app/elements/elements.html`.

{% highlight html %}
<link rel="import" href="my-book-feed/my-book-feed.html">
{% endhighlight %}

If you build and preview the site now, you should see your element showing
up properly.

### Adding a text field and implementing input behavior

In this next iteration of your `my-books-field` element, you add a 
text field. When the user types text into the field, the text 
is automatically displayed in a `p` tag. When the user hits Enter,
the text is logged to the console. 

1. Edit `app/elements/my-books-feed/my-books-feed.html` so that it 
   matches the code below. Code that has not been modified has been
   omitted.

{% highlight html %}
...
  <template>
    <iron-a11y-keys id="a11y" target="[[target]]" keys="enter"
                    on-keys-pressed="onEnter"></iron-a11y-keys>
    <h2>Search Google Books</h2>
    <paper-input id="input" placeholder="Enter a title or author..."
                 value="{{query::input}}"></paper-input>
    <p>{{query}}</p> <!-- temporary, for demonstration only -->
  </template>
  <script>
Polymer({
  is: 'my-books-feed',
  properties: {
    query: {
      type: String,
      notify: true,
    },
    target: {
      type: Object,
      value: function() {
        return this.$.input;
      }
    },
  },
  ready: function() {
    console.log('my-books-feed ready');
  },
  onEnter: function() {
    console.log(this.query);
  },
...
{% endhighlight %}

If you try to build and preview the site, the changes won't display 
properly. That's because you have not imported `iron-a11y-keys` and
`paper-input` into your application. In general, for every new element
that you use in your application, you need to make sure that it has been
imported into `app/elements/elements.html`.

1. Open up `app/elements/elements.html` and import `iron-a11y-keys` (that's
   the number 1, not the letter l) and `paper-input`. Group them so that
   `iron-a11y-keys` is with the rest of the Iron elements, and `paper-input`
   is with the Paper elements.

       ...
       <link rel="import" href="../bower_components/iron-a11y-keys/iron-a11y-keys.html">
       ...
       <link rel="import" href="../bower_components/paper-input/paper-input.html">


If you build and preview the site now, everything should be working. Type
some text into the text field. Hit enter and your input should be logged
to your browser console. Notice how the value of the `p` element updates 
with every keystroke.

#### How it all works

Here's an overview of how all of the changes you just made work.

`paper-input` is the text field. This is another ready-to-use
third-party element. Notice the `paper` prefix again. Can you guess
what that means? Right, it's another Material Design element.

* `value="{{query::input}}" means "set the `query` property to the user
  input." The value of `query` gets updated with each keystroke. You
  saw this in action in the `p` element below the text field.

`iron-a11y-keys` handles key input for `paper-input`.

* The `target` attribute specifies which element the `iron-a11y-keys`
  element should be associated to. In this case, it's the value of 
  the property called `target`. And what does `target` evaluate to? Look
  at `properties`. The `value` of `target` is `this.$.input`, which is
  just Polymer's query selector syntax. When you give an ID to an 
  HTML element, you can access it at `this.$.name` where `name` is
  the ID of the HTML element.
* The `keys` attribute specifies which keys trigger the action. Remember that the 
  `iron-a11y-keys` element has been associated to `paper-input`. So
  when the text field is in focus and the user hits the Enter key, the
  event is triggered.
* `on-keys-pressed` specifies the action to take. We've connected
  the event to the `onEnter` method. Right now, `onEnter` just prints
  the value of the user input to the browser console.

### Connecting your element to the Google Books web service

For the last iteration, you take the user's input, feed it as
a query to Google Books, and then display the top results.

1. Update `app/elements/my-books-feed/my-books-feed.html` to 
   match the code below. The element's code is provided in full.

{% highlight javascript %}
<dom-module id="my-books-feed">
  <style></style>
  <template>
    <iron-a11y-keys id="a11y" target="[[target]]" keys="enter"
                    on-keys-pressed="onEnter"></iron-a11y-keys>
    <!-- handles requests to Google Books web service -->
    <iron-ajax id="ajax"
               url="https://www.googleapis.com/books/v1/volumes"
               handle-as="json"
               last-response="{{data}}"></iron-ajax>
    <h2>Search Google Books</h2>
    <paper-input id="input" placeholder="Enter a title or author..."
                 value="{{query::input}}"></paper-input>
    <!-- dom-repeat iterates over array and applies template to each element -->
    <template is="dom-repeat" items="[[data.items]]">
      <h3>[[item.volumeInfo.title]]</h3>
      <p><em>By <span>[[item.volumeInfo.authors.0]]</span></em></p>
      <a href="[[item.accessInfo.webReaderLink]]" target="_blank">
        <img src="[[item.volumeInfo.imageLinks.thumbnail]]"></img>
      </a>
      <p>[[item.volumeInfo.description]]</p>
    </template>
  </template>
  <script>
  Polymer({
    is: 'my-books-feed',
    properties: {
      query: {
        type: String,
        notify: true,
      },
      target: {
        type: Object,
        value: function() {
          return this.$.input;
        }
      },
    },
    ready: function() {
      this.data = {};
    },
    onEnter: function() {
      var ajax = this.$.ajax;
      ajax.params = {'q':this.query};
      ajax.generateRequest();
    },
  });
  </script>
</dom-module>
{% endhighlight %}

You are using a new element, called `iron-ajax`. So, you need to import
it, just like you needed to import `paper-input` and `iron-a11y-keys`.

1. Open `app/elements/elements.html` and import `iron-ajax`. Group it 
   so that it is with the rest of the `iron` elements.

       <link rel="import" href="../bower_components/iron-ajax/iron-ajax.html">

Your new element is all set! 

#### How it all works

Here's an overview of how this last iteration of changes work.

`iron-ajax` handles the web service request.

* `url` is the URL to the web service endpoint.
* `last-response` specifies where to store the content of the last response.
  In this case the response is passed to a property called `data`. If you
  look in the `ready` method of your element you see that `data` is just
  initialized to an empty object.
* When the `paper-input` text field is in focus and the user hits the
  Enter key, the `onEnter` method is called, like before. But now `onEnter`
  sets `params.q` to the value of `query`. 
* `params` is an `iron-ajax` property, this is where you set request parameters.
  The *content* of `params` is entirely dependent on your web service. For
  instance, `q` just happens to be the key for queries in the Google Books API.
  So, if `params.q` is set to `JavaScript`, `iron-ajax` constructs the request
  URL as `https://googleapis.com/books/v1/volumes?q=JavaScript`.
* Finally, the `generateRequest` method (in `onEnter`) initiates the actual
  request. Tip: you can also set the `auto` attribute in `iron-ajax` and 
  to make it automatically send a request whenever its `url` 
  attribute or `params` property changes.
* `iron-ajax` converts the response to nested JavaScript objects. For example,
  if you set the `iron-ajax` attribute `last-response` to `data` and the 
  response is `{'book':{'title':'Dune'}}`, you can access the title at 
  `data.book.title`.

That's how the web service request is handled. The last component 
is parsing and displaying the response data? The key here is the 
`dom-repeat` template, displayed again below for your convenience.

{% highlight html %}
    ...
    <template is="dom-repeat" items="[[data.items]]">
      <h3>[[item.volumeInfo.title]]</h3>
      <p><em>By <span>[[item.volumeInfo.authors.0]]</span></em></p>
      <a href="[[item.accessInfo.webReaderLink]]" target="_blank">
        <img src="[[item.volumeInfo.imageLinks.thumbnail]]"></img>
      </a>
      <p>[[item.volumeInfo.description]]</p>
    </template>
    ...
{% endhighlight %}

* A `dom-repeat` template applies its template for each item that it 
  encounters in the array specified in the `items` attribute. In this case, 
  it is iterating over `data.items`. Recall that `data` is where you instructed 
  `iron-ajax` to store the last response.
* The `items` object in `data.items` has no meaning outside of this particular
  web service. This just happens to be the structure of the
  Google Books response. Click on the following URL to see an example response: 
  [https://googleapis.com/books/v1/volumes?q=JavaScript](https://googleapis.com/books/v1/volumes?q=JavaScript)
* Within the template, the current item in the set can be accessed 
  at `item`. This is a Polymer property that is available in all `dom-repeat`
  templates. In your element, `item.volumeInfo.title` is equivalent to
  `data.items[i].volumeInfo.title` where `i` is the index of the
  current item. Tip: you can access the index of the current item within
  the `dom-repeat` template using the Polymer property `index`.
