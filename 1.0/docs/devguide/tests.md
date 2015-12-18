---
layout: default
type: guide
shortname: Docs
title: Unit tests
subtitle: Developer guide
---

{% include toc.html %}

Use Web Component Tester (`wct`) to unit test your Polymer elements. 

`wct` is an end-to-end testing environment built by the Polymer core team. It
enables you to test your elements locally, against all of your installed
browsers, or remotely, via Sauce Labs. `wct` is composed of the following
tools:

* Mocha for test framework, complete with support for BDD and TDD.
* Chai for assertions. 
* Async asynchronous unit tests.
* Sinon for spies, stubs, and mocks.
* Selenium for running tests against multiple browsers. 

https://youtu.be/YBNBr9ECXLo

## Quick start

This section teaches you how to set up unit tests for `<seed-element>`, create
a simple test, and then run that test. Follow the workflow outlined in this
section when setting up unit tests for your own element. 

1.  Install Web Component Tester globally so that you can run it from 
    the command line.

        npm -g install web-component-tester

    On Mac OS X you need to [manually install][selenium] the latest Safari 
    extension for Selenium. See the 
    [Web Component Tester Polycast][workaround-example] for 
    a demonstration.

1.  `cd` to the base directory of the element.

1.  (Optional) Install and save `wct` locally as a bower component so that your 
    tests can always import the `wct` runtime.

        bower install --save Polymer/web-component-tester

    The global `wct` that you installed earlier actually serves its own 
    copy of the `wct` runtime (`browser.js`) whenever it encounters any URL
    that ends with `web-component-tester/browser.js`. Installing it locally
    is just a precaution. 

1.  Create a directory for the tests. 

        mkdir test

    When you run `wct` with no arguments, it automatically searches for
    a directory named `test` and runs any tests it finds in there. You
    can use another name for your directory, but you'll need to specify
    the path to the directory when you run `wct` (`wct path/to/tests`).

1.  Create a test.

        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <script src="../bower_components/webcomponentsjs/webcomponents-lite.js"></script>
            <script src="../bower_components//web-component-tester/browser.js"></script>
            <!-- import the element to test -->
            <link rel="import" href="../seed-element.html">
          </head>
          <body>
            <!-- use the document as a place to set up your fixtures -->
            <test-fixture id="seed-element-fixture">
              <template>
                <seed-element>
                  <h2>seed-element</h2>
                </seed-element>
              </template>
            </test-fixture>
            <script>
              suite('<seed-element>', function() {
                var myEl;
                setup(function() {
                  myEl = fixture('seed-element-fixture');
                });
                test('defines the "author" property', function() {
                  assert.equal(myEl.author.name, 'Dimitri Glazkov');
                });
              });
            </script>
          </body>
        </html>

1.  Go to the base directory of your element and run your tests.

        wct

    ![output from successful wct unit test run](/1.0/images/wct-output.png)

    `wct` automatically finds all of the browsers on your system and runs
    your tests against each one.

## Stubs

Replace element default implementations with custom methods. Useful for
catching side effects  

Don't have to use it directly on an element reference. You can override
an implementation for all elements of a given type. 

    setup(function() {
      stub('paper-button', {
        click: function() {
          console.log('paper-button.click called');
        }
      });
    });

## Replace elements

Use `replace()` to substitute tags.

    setup(function() {
      replace('paper-button').with('fake-paper-button');
    });

For example, using the sample `replace()` above and the element below:

    <dom-module id='x-el'>
      <template>
        <paper-button id="pb">button</paper-button>
      </template>
    </dom-module>

At test runtime, the content template would be stamped out as:

    <dom-module id='x-el'>
      <template>
        <fake-paper-button id="pb">button</fake-paper-button>
      </template>
    </dom-module>

The attributes and content of the element are preserved, but the tag
is replaced with the specified stub tag.

Because the method is called within `setup()`, all of the changes are 
reverted at the end of each test.

## AJAX

https://www.youtube.com/watch?v=_9qARcdCAn4 

`wct` includes [Sinon](http://sinonjs.org/), which enables you to mock XHR
requests and create fake servers. 

Below is an example of a simple XHR unit test suite for 
[`<iron-ajax>`](https://elements.polymer-project.org/elements/iron-ajax).
Check out Sinon's documentation for more in-depth examples. 

{% highlight html %}
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" 
        content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
  <script src="../../webcomponentsjs/webcomponents-lite.js"></script>
  <script src="../../web-component-tester/browser.js"></script>
  <!-- import the element -->
  <link rel="import" href="../bower_components/iron-ajax/iron-ajax.html">
</head>
<body>
  <!-- create test fixture template -->
  <test-fixture id="simple-get">
    <template>
      <iron-ajax url="/responds_to_get_with_json"></iron-ajax>
    </template>
  </test-fixture>
  <script>
    suite('<iron-ajax>', function() {
      var ajax;
      var request;
      var server;
      var responseHeaders = {
        json: { 'Content-Type': 'application/json' }
      };
      setup(function() {
        server = sinon.fakeServer.create();
        server.respondWith(
          'GET',
          /\/responds_to_get_with_json.*/, [
            200,
            responseHeaders.json,
            '{"success":true}'
          ]
        );
      });
      teardown(function() {
        server.restore();
      });
      suite('when making simple GET requests for JSON', function() {
        setup(function() {
          // get fresh instance of iron-ajax before every test
          ajax = fixture('simple-get');
        });
        test('has sane defaults that love you', function() {
          request = ajax.generateRequest();
          server.respond();
          expect(request.response).to.be.ok;
          expect(request.response).to.be.an('object');
          expect(request.response.success).to.be.equal(true);
        });
        test('has the correct xhr method', function() {
          request = ajax.generateRequest();
          expect(request.xhr.method).to.be.equal('GET');
        });
      });
    });
  </script>
</body>
</html>
{% endhighlight %}

## Test indexes

Use a test index to run a subset of suites.

{% highlight html %}
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <script src=”../bower_components/webcomponentsjs/web-components-lite.js”></script>
    <script src=”../bower_components/web-component-tester/browser.js”></script>
  </head>
  <body>
    <script>
      WCT.loadSuites([
        'basic.html',
        'async.html'
      ]);
    </script>
  </body>
</html>
{% endhighlight %}

You can also use test indexes to configure your tests via query strings
when `wct` loads them. See [Test Shadow DOM](#shadow-dom) for an example.

## Test fixtures {#test-fixtures}

Test fixtures enable you to define a template of content and copy a clean,
new instance of that content into each test suite. Use test fixtures to
minimize the amount of shared state between test suites. 

To use a test fixture:

*   Define the test fixture template and give it an ID.
*   Define a variable in your test script to reference the template.
*   Instantiate a new instance of the fixture in your `setup()` method.

{% highlight html %}
<test-fixture id="seed-element-fixture">
  <template>
    <seed-element>
      <h2>seed-element</h2>
    </seed-element>
  </template>
</test-fixture>

<script>
  suite('<seed-element>', function() {
    var myEl;
    setup(function() {
      myEl = fixture('seed-element-fixture');
    });
    test('defines the "author" property', function() {
      assert.equal(myEl.author.name, 'Dimitri Glazkov');
    });
  });
</script>
{% endhighlight %}

## Asynchronous tests

To create an asynchronous test, pass `done` as an argument to the test function
and then call `done()` when the test is complete. The `done` argument is a
signal to Mocha that the test is asynchronous. When Mocha runs the tests it 
waits until it encounters the `done()` call, and eventually times out if it 
does not encounter it. 

    test('defines the "author" property', function(done) {
      setTimeout(function() {
        assert.equal(myEl.author.name, 'Dimitri Glazkov');
        done();
      }, 1000);
    });

## Test Shadow DOM {#shadow-dom}

To test out how a test suite behaves when the browser runs native
Shadow DOM, create a [test index](#test-indexes) and pass `dom=shadow` as 
a query string when `wct` loads your test suites.

{% highlight javascript %}
WCT.loadSuites([
  'basic-test.html',
  'basic-test.html?dom=shadow'
]);
{% endhighlight %}

Within your tests, you can access Shadow DOM elements using Polymer's DOM 
API.

    test('click sets isWaiting to true', function() {
      Polymer.dom(myEl.root).querySelector('button').click();
      assert(myEl.isWaiting, true);
    });
    
## Learn more

*   Check out [`<seed-element>`][seed-element]
    for an example of a basic boilerplate element with support for `wct`.

*   [Web Component Tester README][wct-readme].

*   [Web Component Tester Polycast][wct-polycast].

*   [Testing AJAX with Web Component Tester Polycast][ajax-polycast].

[seed-element]: https://github.com/PolymerElements/seed-element
[wct-readme]: https://github.com/Polymer/web-component-tester/blob/master/README.md
[selenium]: https://code.google.com/p/selenium/issues/detail?id=7933#c23
[workaround-example]: https://youtu.be/YBNBr9ECXLo?t=74
[wct-polycast]: https://youtu.be/YBNBr9ECXLo
[ajax-polycast]: https://www.youtube.com/watch?v=_9qARcdCAn4
