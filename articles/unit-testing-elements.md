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
  polymer_version: 0.4.0
  description: Authoring Unit Tests for your elements
tags:
- testing
- tests
- unit testing
---

{% include authorship.html %}

{% include toc.html %}

# Unit Testing Polymer Elements

**Writing tests feels great**. When you've written a new Polymer element and verified it works as expected you know the API you're shipping is rock solid. You see ticks in your test runner and all your tests pass. BOOM! You've just written some of the more reliable code ever. 

Okay, not quite, but you need tests because you're not Chuck Norris. Chuck Norris' unit tests pass before he's even written any code. In this guide, we'll walk through some tips for writing unit tests for your own elements using [Mocha](http://visionmedia.github.io/mocha/) and [Chai](http://chaijs.com). We'll cover testing conventions, assertion styles and a quick tutorial.

## Quick Start

Our boilerplate for new Polymer elements, [`<seed-element>`](https://github.com/PolymerLabs/seed-element), contains everything you need to start writing unit tests for your element. To fetch it and install all the dependencies you’ll need, run the following commands in the terminal:

	$ mkdir development
	$ git clone git://github.com/PolymerLabs/seed-element.git
	$ cd seed-element
	$ bower install
	$ cd ..
	$ python -m SimpleHTTPServer 9000

With the server running, load [http://localhost:9000/seed-element/tests/index.html](http://localhost:9000/seed-element/tests/index.html) in a browser to run the tests included. You should hopefully see something that looks like:

![](/articles/images/unit-testing-elements/image_0.png)

You can then start authoring new tests in the `tests` directory and look at a [sample test](https://github.com/PolymerLabs/seed-element/blob/master/tests/seed-element-basic.html) we've written for you. Continue reading to learn about our recommended way to structure and author your tests.

## What do we use?

The Polymer team currently uses some familiar tools for unit testing elements - namely, [Mocha](http://visionmedia.github.io/mocha/) and [Chai](http://chaijs.com/). Using Mocha as our testing framework allows us to write tests that support development and integration without the need for workarounds.

Mocha (as you probably know) was designed to be flexible and needs a few extra pieces in order to make it complete. Perhaps the most important extra piece we use is a JavaScript assertion library called Chai. 

Chai supports a lot of the assertion styles you might want to use (expect, assert, should). The real difference in these styles is their readability and you’ll likely pick a style that fits in with your or your teams own preferences.

## Polymer’s testing conventions

Our only deviation from a standard Mocha/Chai with [Karma](http://karma-runner.github.io/0.12/index.html) setup is the ability to run entire HTML pages (e.g pages containing elements) as individual tests in a suite (and Karma supports suites structured in this way).

For example, our official tests for core-selector and core-collapse (a collapsible widget) are defined in individual HTML pages:

* [core-selector-basic.html](https://github.com/Polymer/core-tests/blob/master/tests/core-selector-basic.html) (basic tests)

* [core-selector-multi.html](https://github.com/Polymer/core-tests/blob/master/tests/core-selector-multi.html) (tests for multiple selection)

* [core-collapse.html](https://github.com/Polymer/core-tests/blob/master/tests/core-collapse.html)

Each test tests the component’s DOM, templates, Shadow DOM and API. You don’t have to use this convention if it doesn’t match your tastes. 

Typically, we write many assertions inside of a single large test. This is on purpose as we find this approach keeps our tests relatively clean. That said, as we include many assertions in one test, it can be challenging to know where your failures are. We recommend including a message in each assertion to assist with this. 

**Note:** Our approach allows us to author and run tests that include HTML quite easily, but comes at the cost of speed. If you don’t care about running lots of tests constantly, our approach works quite well for testing Polymer elements. 


## Structuring tests as HTML pages

We run entire HTML pages (e.g pages containing elements) as individual tests in a suite.

To create a new HTML test page:

1. Create a new HTML file in the tests directory (e.g core-selector-basic-test.html). You can use our `<seed-element>` [unit test boilerplate](https://github.com/PolymerLabs/seed-element/blob/master/tests/seed-element-basic.html) as a starting point. It already references the relevant Mocha, Chai and tooling dependencies you'll need.

2. Author your tests in the file you created (e.g in `core-selector-basic-test.html`). Some tips are available on how to test attributes and events.

3. `tests/tests.html` takes care of running individual tests. You will want to define a new `htmlSuite()` for a set of tests around a new element and then individual `htmlTest()`s for running each test file. For the my-tabs element, this might look as follows:


		htmlSuite('my-tabs', function() {
		   htmlTest('tests/core-selector-basic-test.html');
		   htmlTest('tests/core-selector-accessibility-test.html');
		});


That's it. In general, you should now be able to run `python -m SimpleHTTPServer 9000`, open up your browser and run your tests from [http://localhost:9000/tests/index.html](http://localhost:9000/tests/index.html).

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

**Note:** If you wish to use one of the other assertion styles, you will need to set it up manually as we currently default to [chai.assert](https://github.com/Polymer/polymer-test-tools/blob/master/tools.html#L13).

## Tutorial

### Step 1: Install the element

Let’s try to follow this workflow to create tests for [`<core-selector>`](http://www.polymer-project.org/docs/elements/core-elements.html#core-selector), an existing element that allows you to select items on a list. 

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


You can then install `<core-selector>` beside into your `<seed-element>` project as follows:


	$ bower install Polymer/core-selector --save

**Note:** You can learn more about our recommendations for dependency paths when working with `<seed-element>` in our [reusable elements guide](http://www.polymer-project.org/docs/start/reusableelements.html).

### Step 2: Write your first test file

We begin writing our first test with a new HTML file in the "tests" directory of `<seed-element>` which we’ll call core-selector-tests.html. This will contain the tests and a few dependencies for running them. For our new test, we will need:

* Polymer’s platform.js 

* Mocha and Chai

* An import for our element (core-selector)

* A little helper for running HTML tests

We can repurpose the existing "seed-element-basic.html" file for this purpose. Let’s rename it to “core-selector-tests.html” and customize it for `<core-selector>`:

	  <script src="../../platform/platform.js"></script>

	  <!-- Mocha, Chai and some HTML test helpers-->
	  <link rel="import" href="../../polymer-test-tools/tools.html">
	  <script src="../../polymer-test-tools/htmltest.js"></script>

	  <!-- Step 1: import the element to test -->
	  <link rel="import" href="../../core-selector/core-selector.html">
	</head>

	<body>

	  <!-- Step 2: include the element to test -->
	  <core-selector></core-selector>

There's nothing too crazy going on here. [htmltest](https://github.com/Polymer/core-tests/blob/master/tests/tools/htmltest.js) just references a little helper for styling output and working with the test suite. Mocha and Chai are of course references to those dependencies and then you have your core-selector element.

`<seed-element>` includes a test runner and a file for executing our tests in suites to achieve that. You shouldn’t have to edit tests/index.html, but we will want to update tests.html.

In our tests.html `script` block, we can define a new suite of HTML tests for `<core-selector>` using the `htmlSuite()` method. We can then run them using `htmlTest()`, passing in the location of our test file "core-selector-tests.html":

	htmlSuite('core-selector', function() {
	    htmlTest('core-selector-tests.html');  
	});

For the sake of demonstration, if you had multiple tests you wanted to run inside a `htmlSuite()` they might look a little like this:

	htmlSuite('core-selector', function() {
	   htmlTest('core-selector-tests.html');
	   htmlTest('core-selector-activate-event.html');
	   htmlTest('core-selector-multi.html');
	});

Great. That's it!. Fire up a local server (e.g using `python -m SimpleHTTPServer 9000`) and you should be able to run your tests by navigating to [http://localhost:9000/tests/index.html](http://localhost:9000/tests/index.html).

### Step 3: Writing test assertions for attributes

So back to core-selector-tests.html - let’s flesh out our `<core-selector>` to include some real items:

	<core-selector id="selector1" valueattr=”id”>
	  <div id=“item1”>Item 1</div>
	  <div id=“item2”>Item 2</div>
	  <div id=“item3”>Item 3</div>
	</core-selector>

Give it an ID so we can easily reference it amongst other instances on the page. 

To define the actual tests for our element after Polymer is ready. Do this by specifying them inside the polymer-ready event inside a `<script>` tag:

	document.addEventListener(‘polymer-ready’, function() {
	  // …
	});

Next, we'll query the DOM for the "selector1" element we just included included:

	var s = document.querySelector(‘#selector1’);

We can now begin testing our element. Let’s test that nothing is by default selected (i.e that our current selection is null).

	assert.equal(s.selected, null);

Include a `done();` statement at the very end of your assertions. This is an optional callback that is useful for testing work that is asynchronous. Next, fire up seed-element/tests/index.html on a local server to check everything is working as expected:

![](/articles/images/unit-testing-elements/image_1.png)

If all goes well your tests should be green. Great. 

How about testing if an attribute is the default value we expect it to be? `<core-selector>` supports a multi attribute in case you want to support multiple items being selectable. Let’s add this before `done();` along with our other assertions:

	assert.isFalse(s.multi);

![](/articles/images/unit-testing-elements/image_2.png)

So far, so good.

As `<core-selector>` has a property items representing the current list of items defined as children, we can also test to make sure it understands that we have 3 items at the moment.

	assert.equal(s.items.length, 3);

`<core-selector>` by default uses a specific CSS class to highlight when an item is selected. It’s called `core-selected` (big surprise!). A user can override this class by setting the custom `selectedClass` attribute on this element. Let’s test to make sure the right class (default) is set.

	assert.equal(s.selectedClass, ‘core-selected’);


### Step 4: Writing test assertions for events

What about testing events? A simple event supported by `<core-selector>` that we can test is the "core-select" event. It’s fired every time a different item in a list is selected.

First, setup a counter that will be incremented each time the `core-select event is fired:

	var selectEventCounter = 0;

If this is the case two properties - `s.selectedItem` and `e.detail.item` (returned by the event) should be the same. Hooking this up to the "core-select" event, we get:

	s.addEventListener(‘core-select’, function(e) {
	    if (e.detail.isSelected){
	        selectEventCounter++;
	        assert.equal(e.detail.item, s.selectedItem);
	      }
	});


Great. Now to set the `selected` item in the list to "2" we can write:

	s.selected = 2;

Which will trigger the "core-select" event to be fired. 

**Note:** In Polymer’s unit tests, just to ensure that all of our bindings are correctly getting updated when we dynamically change values in this way, we can call `Platform.flush()`:

	Platform.flush();

This is only needed for browsers that don’t support `Object.observe()` natively. At present, this represents all browsers except Chrome and Opera. A synchronous alternative is `[element].deliverChanges()`.

As we can see, we’re still all green:

![](/articles/images/unit-testing-elements/image_3.png)

Finally, let’s check that the selected item has the correct CSS class (the "core-selected" class) and the `selectedItem` attribute, which returns the currently selected item, are both the value we would expect. A timeout is used here to allow sufficient time for controls to render:

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

**Note:** Move the done(); function from executing in the body of your `polymer-ready` event to the body of our timeout so that it doesn’t run until our tests have completed.

**That’s it!** We now have some simple assertion tests to test the attributes and events for a Polymer element work as expected. For a more complete reference to how we’ve gone about unit testing some of our elements, including `<core-selector>`, take a look at [`<core-tests>`](https://github.com/Polymer/core-tests).

## Conclusion

**Go forth and write tests!** They can be simple and powerful. 

Remember, testing Web Components isn’t vastly different to unit testing the JavaScript components you build everyday. Many of the same best practices apply. You’re still working with events, objects and an API. 

The beauty of sticking with Mocha and Chai is tests can execute equally well in both the browser and continuous integration.

Thanks for reading and do let us know if you have any questions about unit testing your elements!

## Resources

### Additional Tests

You can find some of the official tests used by the Polymer team in our [`<core-tests>`](https://github.com/Polymer/core-tests) repository. Some of the tests that may be of interest include:

* Tests for [`<core-collapse>`](https://github.com/Polymer/core-tests/blob/master/tests/core-collapse.html)

* Tests for [`<core-localstorage>`](https://github.com/Polymer/core-tests/blob/master/tests/core-localstorage.html)

* Tests for [`<core-ajax>`](https://github.com/Polymer/core-tests/blob/master/tests/core-ajax.html)

### Karma (Optional)

Support for integrating the Karma test runner into our sample `<seed-element>` is currently being explored, but is not yet available. Until this is complete, you can check out this [Karma](https://github.com/robdodson/polymer-karma-test) test project which demonstrates how to test multiple Polymer elements using it.

The only real difference is that the project assumes tests are authored directly in JavaScript, meaning dynamically having to create new instances of elements vs. defining them in markup. If you prefer to work in script, this test project might be of interest. 




