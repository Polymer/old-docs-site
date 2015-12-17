---
layout: default
type: guide
shortname: Docs
title: Unit tests
subtitle: Developer guide
---

{% include toc.html %}

## Note on `<seed-element>`

This guide makes use of an element called `<seed-element>`, which is a real
boilerplate Polymer element. `<seed-element>` is just used for example, it 
is not related to unit tests.

`<seed-element>` is actually already set up to use `wct`, so check out the
[repository](https://github.com/PolymerElements/seed-element) for an example 
of a simple, complete element with `wct` support.

## Quick start

This section teaches you how to set up unit tests for `<seed-element>`, create
a simple test, and then run that test. This is the workflow to follow when
setting up unit tests for your own element. 

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

{% highlight html %}
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="../../webcomponentsjs/webcomponents-lite.js"></script>
    <script src="../../web-component-tester/browser.js"></script>
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
{% endhighlight %}

1.  Go to the base directory of your element and run your tests.

        wct

    `wct` automatically searches for a directory named `test` and runs any
    tests it finds in there. You can store your tests in other directories,
    but you'll need to specify the path to the tests when you run `wct`.

        wct path/to/tests

## Control which tests are run

You can define an explicit index to control which tests are run.

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
      ]);
    </script>
  </body>
</html>
{% endhighlight %}

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

Pass `done` argument to test function. This is a signal to Mocha that
the following test is asynchronous.

Perform the asynch operation. 

Call `done()` at the end of the test which enables Mocha to wrap up the test
and move on.

## Test Shadow DOM

Use 'dom=shadow’ query string.

{% highlight javascript %}
WCT.loadSuites([
  'basic-test.html’,
  'Basic-test.html?dom=shadow'
]);
{% endhighlight %}

## Learn more



[selenium]: https://code.google.com/p/selenium/issues/detail?id=7933#c23
[workaround-example]: https://youtu.be/YBNBr9ECXLo?t=74
[wct-polycast]: https://youtu.be/YBNBr9ECXLo
