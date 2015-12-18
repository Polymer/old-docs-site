---
layout: default
type: guide
shortname: Docs
title: Unit tests
subtitle: Developer guide
---

<link rel="import" href="../../components/google-youtube/google-youtube.html">

{% include toc.html %}

Web Component Tester is a browser-based testing environment for Polymer
elements. 

## Note on `<seed-element>`

This guide makes use of an element called `<seed-element>`, which is a real
boilerplate Polymer element. `<seed-element>` is just used for example, it 
is not related to unit tests.

`<seed-element>` is actually already set up to use `wct`, so check out the
[repository](https://github.com/PolymerElements/seed-element) for an example 
of a simple, complete element with `wct` support.

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

### Test fixtures {#test-fixtures}

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

## Learn more

[Web Component Tester README](https://github.com/Polymer/web-component-tester/blob/master/README.md)
[Unit Testing with Web Component Tester (Polycast #36)][wct-polycast]
[Testing Web Components (Polymer Summit 2015)](https://www.youtube.com/watch?v=kX2INPJY4Y4)

[selenium]: https://code.google.com/p/selenium/issues/detail?id=7933#c23
[workaround-example]: https://youtu.be/YBNBr9ECXLo?t=74
[wct-polycast]: https://youtu.be/YBNBr9ECXLo
