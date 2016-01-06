---
layout: default
type: guide
shortname: Docs
title: Unit tests
subtitle: Developer guide
---

<link rel="import" href="../../../0.5/components/google-youtube/google-youtube.html">

{% include toc.html %}

Use Web Component Tester to unit test your Polymer elements. Web 
Component Tester is an end-to-end testing environment built by the Polymer 
team. It enables you to test your elements locally, against all of your 
installed browsers, or remotely, via Sauce Labs. It is built on top of 
popular third-party tools, including: 

*   [Mocha](https://mochajs.org/) for a test framework, complete with support 
    for BDD and TDD.
*   [Chai](http://chaijs.com/) for more assertion types that can be used with
    your Mocha tests.
*   [Sinon](http://sinonjs.org/) for spies, stubs, and mocks.
*   [Selenium](http://www.seleniumhq.org/) for running tests against 
    multiple browsers. 
*   [Accessibility Developer 
    Tools](https://github.com/GoogleChrome/accessibility-developer-tools) 
    for accessibility audits.

This guide refers to Web Component Tester as `wct`, which is its command 
line interface.

## Quick start

This section shows you how to:

*   Set up `wct`.
*   Create a unit test for 
    [`<seed-element>`](https://github.com/PolymerElements/seed-element).
*   Run the unit test.

Note that `<seed-element>` and Polymer Starter Kit come complete with 
basic test suites, so if you're starting from one of those projects, you can
skip to step 6 to run the tests.

Follow the steps below to get set up, or watch the Polycast:

<div class="yt-embed">
  <google-youtube
    videoid="YBNBr9ECXLo"
    autoplay="0"
    rel="0"
    fluid>
  </google-youtube>
</div>

1.  Install Web Component Tester globally so that you can run it from 
    the command line.

        npm install -g web-component-tester

    On Mac OS X you need to [manually install][selenium] the latest Safari 
    extension for Selenium. See the 
    [Web Component Tester Polycast][workaround-example] for 
    a demonstration.

2.  `cd` to the base directory of the element.

3.  (Optional) Install and save `wct` locally as a bower component so that your 
    tests can always import the `wct` runtime.

        bower install --save Polymer/web-component-tester

    If you installed `wct` globally, it actually serves its own 
    copy of the `wct` runtime (`browser.js`) whenever it encounters any URL
    that ends with `web-component-tester/browser.js`. Installing it locally
    is just a precaution. 

4.  Create a directory for the tests. 

        mkdir test

    When you run `wct` with no arguments, it automatically searches for
    a directory named `test` and runs any tests it finds in there. If you use
    another name for your directory, you'll need to specify
    the path to the directory when you run `wct` (`wct path/to/tests`).

5.  Create a test.

        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <script src="../bower_components/webcomponentsjs/webcomponents-lite.js"></script>
            <script src="../bower_components/web-component-tester/browser.js"></script>
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

6.  Go to the base directory of your element and run your tests.

        wct

    ![output from successful wct unit test run](/1.0/images/wct-output.png)

    `wct` automatically finds all of the browsers on your system and runs
    your tests against each one. You can use `wct -l chrome` to test Google
    Chrome only.

## Asynchronous tests {#async}

To create an asynchronous test, pass `done` as an argument to the test function
and then call `done()` when the test is complete. The `done` argument is a
signal to Mocha that the test is asynchronous. When Mocha runs the test it 
it waits until the test code invokes the `done()` callback. If the `done()`
callback isn't invoked, the test eventually times out and Mocha reports the test
as a failure.

    test('fires lasers', function(done) {
      myEl.addEventListener('seed-element-lasers', function(event) {
        assert.equal(event.detail.sound, 'Pew pew!');
        done();
      });
      myEl.fireLasers();
    });

## Prevent shared state with test fixtures {#test-fixtures}

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

## Create stub methods

Stubs enable you to replace default implementations with custom methods. This
is useful for catching side effects. 

    setup(function() {
      stub('paper-button', {
        click: function() {
          console.log('paper-button.click called');
        }
      });
    });

You don't have to use stubs directly on individual elements. You can override
the implementation for all elements of a given type. 

## Create stub elements

Use [stub elements](http://stackoverflow.com/questions/463278/what-is-a-stub) 
to test elements in isolation. For example, if one of your tests
depends on another element to return data, rather than importing the other
(possibly unstable) element into your tests, you can implement a stub of the
other element that always returns consistent data. 

Use `replace()` to create stub elements. 

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

<div class="yt-embed">
  <google-youtube
    videoid="_9qARcdCAn4"
    autoplay="0"
    rel="0"
    fluid>
  </google-youtube>
</div>

`wct` includes [Sinon](http://sinonjs.org/), which enables you to mock XHR
requests and create fake servers. 

Below is an example of a simple XHR unit test suite for 
[`<iron-ajax>`](https://elements.polymer-project.org/elements/iron-ajax).
Check out Sinon's documentation for more in-depth examples. 

{% highlight html %}
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
{% endhighlight %}

**Note:** The example above uses Chai's [`expect`](http://chaijs.com/api/bdd/) 
assertion style. 
{: .alert .alert-info }

## Run a set of tests {#test-sets}

To run a set of tests, create an HTML file and call `loadSuites()`. When
running `wct`, specify the path to the HTML file as the first argument 
(for example, `wct test/my-test-set.html`.

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

The argument to `loadSuites()` should be an array of strings. Each string
should be a relative URL to a test suite. You can configure your tests 
using query strings in the URLs. See [Test shadow DOM](#shadow-dom)
for an example.

## Test local DOM

Use Polymer's [DOM API](/1.0/docs/devguide/local-dom.html#dom-api) to access 
and modify local DOM children.

    test('click sets isWaiting to true', function() {
      myEl.$$('button').click();
      assert(myEl.isWaiting, true);
    });
   
**Note:** `myEl.$$('button')` returns the first `button` element encountered
in the local DOM of `myEl`.
{: .alert .alert-info }
 
### DOM mutations

Always wrap your test in `flush` if your element template contains a [template 
repeater (`dom-repeat`)](/1.0/docs/devguide/templates.html#dom-repeat) or
[conditional template (`dom-if`)](/1.0/docs/devguide/templates.html#dom-if),
or if your test involves a local DOM mutation. Polymer lazily performs these 
operations in some cases for performance. `flush` ensures that asynchronous 
changes have taken place. The test function should take one argument, `done`,
to indicate that it is [asynchronous](#async), and it should call
`done()` at the end of `flush`.

    test('Item lengths should be equal', function(done) {
      list.items = [
        'Responsive Web App boilerplate',
        'Iron Elements and Paper Elements',
        'End-to-end Build Tooling (including Vulcanize)',
        'Unit testing with Web Component Tester',
        'Routing with Page.js',
        'Offline support with the Platinum Service Worker Elements'
      ];
      // Data bindings will stamp out new DOM asynchronously
      // so wait to check for updates
      flush(function() {
        listItems = list.querySelectorAll('li');
        assert.equal(list.items.length, listItems.length);
        done();
      });
    });

### Test with native shadow DOM {#shadow-dom}

To test out how a test suite behaves when the browser runs native
shadow DOM, create a [test set](#test-sets) and pass `dom=shadow` as 
a query string when `wct` loads your test suites.

{% highlight javascript %}
WCT.loadSuites([
  'basic-test.html',
  'basic-test.html?dom=shadow'
]);
{% endhighlight %}

This sample runs `basic-test.html` twice, once using shady DOM and once
using native shadow DOM (if the browser supports it).

## Learn more

<div class="yt-embed">
  <google-youtube
    videoid="kX2INPJY4Y4"
    autoplay="0"
    rel="0"
    fluid>
  </google-youtube>
</div>

Check out [`<seed-element>`][seed-element]
for an example of a basic boilerplate element with support for `wct`.

The [Web Component Tester README][wct-readme] has more in-depth information
about `wct` usage. 

[seed-element]: https://github.com/PolymerElements/seed-element
[wct-readme]: https://github.com/Polymer/web-component-tester/blob/master/README.md
[selenium]: https://code.google.com/p/selenium/issues/detail?id=7933#c23
[workaround-example]: https://youtu.be/YBNBr9ECXLo?t=74
[wct-polycast]: https://youtu.be/YBNBr9ECXLo
[ajax-polycast]: https://www.youtube.com/watch?v=_9qARcdCAn4
