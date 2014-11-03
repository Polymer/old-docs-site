---
layout: default
type: core
navgroup: docs
shortname: Articles
title: "Unit Testing Polymer Elements"
subtitle: Authoring Unit Tests for your elements

article:
  author: addyosmani
  published: 2014-20-09
  polymer_version: 0.4.2
  description: Authoring Unit Tests for your elements
tags:
- testing
- tests
- unit testing
---

{% include authorship.html %}

{% include toc.html %}

# Unit Testing Polymer Elements

**Writing tests feels great**. When you've written a new Polymer element and verified it works as expected you know the API you're shipping is rock solid. You see ticks in your test runner and all your tests pass. BOOM! You've just written some of the most reliable code ever.

Okay, not quite, but you need tests because you're not Chuck Norris. Chuck Norris' unit tests pass before he's even written any code. In this guide, we'll walk through some tips for writing unit tests for your own elements using [web-component-tester](https://github.com/Polymer/web-component-tester). We'll cover testing conventions, assertion styles and a quick tutorial.

## Quick Start

Our boilerplate for new Polymer elements, [`<seed-element>`](https://github.com/PolymerLabs/seed-element), contains everything you need to start writing unit tests for your element. To fetch it and install all the dependencies you’ll need, run the following commands in the terminal:

	$ mkdir development
	$ git clone git://github.com/PolymerLabs/seed-element.git
	$ cd seed-element
	$ bower install
  $ npm install -g web-component-tester
	$ cd ..
  $ # Finally, run wct where `test` is the directory your tests are in
	$ wct test

The WCT (web-component-tester) tool will run your tests in multiple browsers at once. You should hopefully see something that looks like:

<img src="change me" alt="Test runner displaying a single test passing for seed-element"/>

You can then start authoring new tests in the `test` directory and look at a [sample test](https://github.com/PolymerLabs/seed-element/blob/master/test/basic-test.html) we've written for you. Continue reading to learn about our recommended way to structure and author your tests.

## web-component-tester

The Polymer team created [web-component-tester](https://github.com/Polymer/web-component-tester) to make testing a breeze. It uses some familiar tools for unit testing elements - namely, [Mocha](http://visionmedia.github.io/mocha/) and [Chai](http://chaijs.com/). Using Mocha as our testing framework allows us to write tests that support development and integration without the need for workarounds.

### Mocha

Mocha is a flexible, feature-rich testing framework that runs in both node and the browser. It makes asynchronous testing simple and allows for accurate reporting while mapping uncaught exceptions to the correct tests cases. There are [quite](https://github.com/nelsonic/learn-mocha) [a](http://blog.codeship.io/2014/01/22/testing-frontend-javascript-code-using-mocha-chai-and-sinon.html) [few](http://developers.lyst.com/javascript/testing/2014/03/03/javascript-unit-testing/) online guides available in case you're new to the tool.

The only real piece missing from Mocha are helpers for performing assertions against your code. That's where Chai comes in.

### Chai

Chai supports a lot of the assertion styles you might want to use (expect, assert, should). The real difference in these styles is their readability and you’ll likely pick a style that fits in with your or your teams own preferences. The Chai [docs](http://chaijs.com/guide/styles/) explain their assertion styles in more detail.

Out of the box, web-component-tester also includes [Lodash](https://lodash.com/) to repeat fewer things and [Async](https://github.com/caolan/async) to keep your sanity.

### Why create a new tool?

Great question. When working with Web Components, we regularly find ourselves wanting to write tests within .html sources. A large number of tests require that you write HTML and we wanted something more convenient than two files per suite - your fixtures and tests. We also wanted a test runner that didn't have configuration hooks for running server-executable code to allow for environments like [Travis CI](https://travis-ci.org/). 

We considered both [Karma](http://karma-runner.github.io/0.12/index.html) and [Protractor](https://github.com/angular/protractor) while evaluating our tooling options. Karma unfortunately didn't support [WebDriver](http://docs.seleniumhq.org/projects/webdriver/) commands outside of lauching and lacked first-class support for .html sources (without the use of iframes! and gnarly workarounds). Protractor had a similar JS-centriv view of the world and focused more on integration style testing rather than unit style testing. As we felt quite strongly about 

Ultimately, having considered the options we found it more efficient to build WCT rather than modify these tools outright.

## Unit test helpers

### WCT-specific helpers

WCT includes a number of helpful utilities meant to ease testing Web Components. These include `flush()` and `testImmediate()`.

`flush()` triggers a flush of any pending events and observations, ensuring that notification callbacks are dispatched after they have been processed.

`testImmediate()` allows you to run your test at declaration time before Mocha has begun tests. It's handy when you need to test document initialization. `testImmediate(name, testFn)` accepts a test name and test function. If an argument is accepted to `testFn`, the test will be treated as async, similar to Mocha tests.

Note that with `testImmediate()`, should any errors be thrown asynchronously cannot be tied to your test. If you wish to catch them and pass them to the `done` event instead, a [safeStep()](https://github.com/Polymer/web-component-tester/blob/master/browser/environment/helpers.js#L19) utility is available to help. 

### Mocha helpers

Mocha also supports some useful, but less well-known [helpers](https://github.com/mochajs/mocha/blob/master/lib/interfaces/tdd.js) which we've found incredibly useful when writing tests for Polymer elements. These include:

* `test.skip` - skip a pending test case
* `suite.skip` - skip a pending test suite
* `test.only` - an exclusive test case
* `suite.only` - an exclusive test suite
* `suiteSetup` and `suiteTeardown`

## Polymer’s testing conventions

Each test tests the component’s DOM, templates, Shadow DOM and API. You don’t have to use this convention if it doesn’t match your tastes.

Typically, we write many assertions inside of a single large test. This is on purpose as we find this approach keeps our tests relatively clean. That said, as we include many assertions in one test, it can be challenging to know where your failures are. We recommend including a message in each assertion to assist with this.

**Note:** Our approach allows us to author and run tests that include HTML quite easily, but comes at the cost of speed. If you don’t care about running lots of tests constantly, our approach works quite well for testing Polymer elements.

### `.js` Suites

web-component-tester test suites can either be `.js` sources, which run in the context of your text index. For example, `test/awesome-tests.js`:


    suite('AwesomeLib', function() {
      test('is awesome', function() {
        assert.isTrue(AwesomeLib.awesome);
      });
    });


### `.html` Suites

Or, you can write tests in separate `.html` documents. For example, `test/awesomest-tests.html`:

    <!doctype html>
    <html>
    <head>
      <meta charset="UTF-8">
      <script src="../../web-component-tester/browser.js"></script>
      <link rel="import" href="../awesome-element.html">
    </head>
    <body>
      <awesome-element id="fixture"></awesome-element>
      <script>
        suite('<awesome-element>', function() {
          test('is awesomest', function() {
            assert.isTrue(document.getElementById('fixture').awesomest);
          });
        });
      </script>
    </body>
    </html>


## Structuring tests as HTML pages

We prefer to run entire HTML pages (e.g pages containing elements) as individual tests in a suite. In the same way your Web Components are used in HTML, it's convenient to set up and test your elements in the same sort of environment.

To create a new HTML test page:

1. Create a new HTML file in the tests directory (e.g core-selector-basic-test.html). You can use our `<seed-element>` [unit test boilerplate](https://github.com/PolymerLabs/seed-element/blob/master/test/basic-test.html) as a starting point. It already references the relevant web-component-tester dependencies you'll need.

2. Author your tests in the file you created (e.g in `core-selector-basic-test.html`). Some tips are available in the tutorial later on on how to test attributes and events.

3. The WCT test runner creates an implicit suite for the entire test file. This means you can have any number of top level `test`s as you would like. That said, you can optionally define a new suite for a set of tests around a new element too. For the my-tabs element, this might look as follows:


    suite('<my-tabs>', function() {
      // ...
    });

4. Finally, add your test to the `test/index.html` file's `loadSuites` list. This would look as follows:

    // Load and run all tests (.html, .js) as one suite:
    WCT.loadSuites([
     'core-selector-basic-test.html',
    ]);

That's it. In general, you should now be able to run `wct test` and see any tests defined in the suite running.

## Assertion styles

We can quickly compare the differences in assertion styles using an existing element as an example. Let’s take `<core-selection>`, which is used for making a list of items selectable. In our HTML, let’s assume we’ve added core-selection as follows:

	<core-selection></core-selection>

And then somewhere else in our application, we’re listened out for events being emitted from this element once an item has been selected in it. The event in question is "core-select".

A simple assertion test using an assert-style test for this could be written as follows:

	var selector = document.querySelector(‘core-selection’);
	selector.addEventListener(‘core-select’, function(event) {

	   // with an assert style
	   assert.equal(event.detail.item, ‘(item)’);

	   // or an expect style
	   expect(event.detail.item).to.equal(‘(item)’);

	   // or should style
	   event.detail.item.should.equal(‘(item)’);
	   done();
	});

	selector.select(‘(item)’);


Chai supports all of the above assertion styles but we’re going to use the first option ("assert style") for the sake of simplicity.

**Note:** If you wish to use one of the other assertion styles, including `expect`, these are made available by [default](https://github.com/Polymer/web-component-tester/blob/master/browser/environment/chai.js#L12). If however you want to use Chai's `should` assertion styles, you will need to set this up manually.

## Tutorial

In this tutorial, we're going to add an existing Polymer element, [`<core-selector>`](http://www.polymer-project.org/docs/elements/core-elements.html#core-selector) to a fresh `<seed-element>` project as a feature. We're then going to write tests for it.

`core-selector` is an element that manages a list of elements that can be selected. It happens to build on the `core-selection` element we used in the last section. Go go composability!.

**Note:** we generally recommend that tests for individual elements live alongside the source for those elements. This is why the `<seed-element>` boilerplate includes a [test](https://github.com/PolymerLabs/seed-element/tree/master/test) directory by default.

### Step 1: Install the element

First, get `<seed-element>` setup in a new `development` directory (if you haven't already in the Quick Start):

	# Create a new directory to work in
	$ mkdir development

	# Move into the development directory
	$ cd development

	# Get the latest version of seed-element
	$ git clone git://github.com/PolymerLabs/seed-element.git

	# Move into the seed-element directory
	$ cd seed-element

	# Install the seed-element dependencies
	$ bower install

  # Install web-component-tester globally
  $ npm install -g web-component-tester


You can then install `<core-selector>` beside into your `<seed-element>` project as follows:

	$ bower install Polymer/core-selector --save

**Note:** You can learn more about our recommendations for dependency paths when working with `<seed-element>` in our [reusable elements guide](http://www.polymer-project.org/docs/start/reusableelements.html).

### Step 2: Write your first test file

We begin writing our first test with a new HTML file in the "tests" directory of `<seed-element>` which we’ll call core-selector-tests.html. This will contain the tests and a few dependencies for running them. For our new test, we will need:

* The Web Component polyfills ([webcomponents.js](https://github.com/Polymer/webcomponentsjs))

* web-component-tester

* An import for our element (core-selector)

We can repurpose the existing "basic-test.html" file for this purpose. Let’s rename it to “core-selector-tests.html” and customize it for `<core-selector>`:

    <script src="../../webcomponentsjs/webcomponents.js"></script>
    <script src="../../web-component-tester/browser.js"></script>

    <!-- Step 1: import the element to test -->
    <link rel="import" href="../seed-element.html">
  </head>
  <body>

    <!-- You use the document as a place to set up your fixtures. -->
    <seed-element></seed-element>


### Step 3: Writing test assertions for attributes

So back to core-selector-tests.html - let’s flesh out our `<core-selector>` to include some real items:

	<core-selector id="selector1" valueattr=”id”>
	  <div id=“item1”>Item 1</div>
	  <div id=“item2”>Item 2</div>
	  <div id=“item3”>Item 3</div>
	</core-selector>

Give it an ID so we can easily reference it amongst other instances on the page.

Next, we'll query the DOM for the "selector1" element we just included included:

<script>
  var s = document.querySelector('#selector1');

  suite('<core-selector>', function() {

    // ..

  });
</script>

We can now begin testing our element.

First, we define a test in the suite for our core-selector-tests.html file as follows:

    suite('<core-selector>', function() {
      test('our first test', function() {
          // ...
      });
    });

Let’s test that nothing is by default selected (i.e that our current selection is `null`). We can replace `our first test` label with the more descriptive `nothing is selected by default` while we're at it:

  test('nothing is selected by default', function(done) {
    assert.equal(s.selected, null);
  });

**Note:** You can include a `done();` statement at the very end of your assertions. This is an optional callback that is useful for testing work that is asynchronous. Next, run `wct test` to ensure everything is working as expected.

Next, add the core-selector-tests.html file we've started work on to `test/index.html`. We can use the `loadSuites()` method to achieve this so that it is run with all of our other tests:

    <script>
      WCT.loadSuites([
        'core-selector-tests.html'
      ]);
    </script>

We can now run the `wct test` command to execute the tests written above. If all goes well your tests should be green. Great.

<img src="/articles/images/unit-testing-elements/image_1.png" alt=""/>

How about testing if an attribute is the default value we expect it to be? `<core-selector>` supports a multi attribute in case you want to support multiple items being selectable. Let’s add this before `done();` along with our other assertions:

    test('if an attribute is the default value expected', function() {
      assert.isFalse(s.multi);
    });

So far, so good.

As `<core-selector>` has a property items representing the current list of items defined as children, we can also test to make sure it understands that we have 3 items at the moment.

  test('if an attribute is the default value expected', function() {
    assert.equal(s.items.length, 3);
  });

`<core-selector>` by default uses a specific CSS class to highlight when an item is selected. It’s called `core-selected` (big surprise!). A user can override this class by setting the custom `selectedClass` attribute on this element. Let’s test to make sure the right class (default) is set.

  test('if the correct class is used on selection', function() {
    assert.equal(s.selectedClass, ‘core-selected’);
  });

### Step 4: Writing test assertions for events

What about testing events? A simple event supported by `<core-selector>` that we can test is the "core-select" event. It’s fired every time a different item in a list is selected.

First, setup a counter that will be incremented each time the `core-select event is fired:

	var selectEventCounter = 0;

If this is the case two properties - `s.selectedItem` and `e.detail.item` (returned by the event) should be the same. Hooking this up to the "core-select" event, we get:

    test('if core-select is fired each time a different item in a list is selected', function() {
      s.addEventListener(‘core-select’, function(e) {
          if (e.detail.isSelected){
              selectEventCounter++;
              assert.equal(e.detail.item, s.selectedItem);
            }
      });
    });

Great. Now to set the `selected` item in the list to "2" we can write:

    test('if core-select is fired each time a different item in a list is selected', function() {
      // ...
      s.selected = 2;
    });

Which will trigger the "core-select" event to be fired.

**Note:** In Polymer’s unit tests, just to ensure that all of our bindings are correctly getting updated when we dynamically change values in this way, we can call `flush()`:

	flush();

`flush()`, as we covered earlier, allows us to asynchronously dirty check pending objects are observed and ensures notification callbacks are dispatched accordingly. It also triggers a flush of any pending events.

This is only needed for browsers that don’t support `Object.observe()` natively. At present, this represents all browsers except Chrome and Opera. A synchronous alternative is `[element].deliverChanges()`.

As we can see, when we run `wct test` once again we’re still all green:

![](/articles/images/unit-testing-elements/image_3.png)

Finally, let’s check that the selected item has the correct CSS class (the "core-selected" class) and the `selectedItem` attribute, which returns the currently selected item, are both the value we would expect. A timeout is used here to allow sufficient time for controls to render:


    test('if the selected item has the correct CSS class', function() {
      setTimeout(function() {

          // check the expected number of core-select events
          // have been fired
          assert.equal(selectEventCounter, 1);

          // check the core-selected class is contained in the
          // classList for the selected item
          assert.isTrue(s.children[2].classList.contains('core-selected'));

          // check the selectedItem attribute value is equal to
          // the child we set it to
          assert.equal(s.selectedItem, s.children[2]);

          done();

      }, 50);
    });

And of course, we then run `wct test` to ensure everything runs as expected.

**Note:** You may want to test outside usage of your element as part of `polymer-ready`. Code written outside of `test` functions will execute immediately, including `suite` functions such as the one above. By default, WCT will wait until `polymer-ready` has completed to run your tests to ensure everything behaves as expected. However, you may not have upgraded elements outside of them. For scenarious like this, the [testImmedate](https://github.com/Polymer/web-component-tester/blob/master/browser/environment/helpers.js#L41) helper is useful for running tests before `polymer-ready`. 

**That’s it!** We now have some simple assertion tests to test the attributes and events for a Polymer element work as expected. For a more complete reference to how we’ve gone about unit testing some of our elements, including `<core-selector>`, take a look at [`<core-tests>`](https://github.com/Polymer/core-tests).

**Note:** While not covered in this guide, the WCT tool has Gulp and Grunt integration as well as support for testing both local and remote browsers. For detailed information on how to use these features, see the WCT [documentation](https://github.com/Polymer/web-component-tester).

## Conclusion

**Go forth and write tests!** They can be simple and powerful.

Remember, testing Web Components isn’t vastly different to unit testing the JavaScript components you build everyday. Many of the same best practices apply. You’re still working with events, objects and an API.

The beauty of sticking with Mocha and Chai is tests can execute equally well in both the browser and continuous integration.

Thanks for reading and do let us know if you have any questions about unit testing your elements!

## More Unit Test Samples

If you are looking for an example of a real-world element using web-component-tester to author and run tests, checkout the tests for the [google-map](https://github.com/GoogleWebComponents/google-map/tree/master/test) element.



