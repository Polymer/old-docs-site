---
layout: default
type: guide
shortname: Docs
title: Unit tests
subtitle: Developer guide
---

{% include toc.html %}

## Quick start

1.  Install Web Component Tester globally so that you can run it from 
    the command line.

        npm -g install web-component-tester

    On Mac OS X you need to [manually install][selenium] the latest Safari 
    extension for Selenium. See the 
    [Web Component Tester Polycast][workaround-example] for 
    a demonstration.

1.  `cd` to the base directory of your element.

1.  Now, install and save `wct` locally as a bower component so that your 
    tests can import the `wct` runtime.

        bower install --save Polymer/web-component-tester

1.  Create a directory for your tests. The default name is `test`.

        mkdir test

1.  Define your tests in your new `test` directory.

{% highlight html %}
<html>
  <head>
    <script src=”webcomponentsjs/web-components-lite.js”></script>
    <script src=”web-component-tester/browser.js”></script>
    <!-- import the element to test -->
    <link rel="import" href="../x-el.html">
  </head>
  <body>
    <!-- create an instance of the test -->
    <x-el></x-el>
    <script>
      var el = document.querySelector('x-el');
      suite('x-el basic test suite', function () {
        test('name equals "John"', function () {
          assert.equal(el.name, 'John');
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

Define an index.

Define your test suites in `test/index.html`.

{% highlight html %}
<html>
  <head>
    <script src=”../bower_components/webcomponentsjs/web-components-lite.js”></script>
    <!-- wct runtime -->
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

Implement your test suite as an HTML document:

Or as a script:

From here you can implement your test suites as [HTML documents](#html) or
[scripts](#js).

## Test suites as HTML documents (recommended) {#html}

Example: 

{% highlight html %}
<!-- x-el.html -->
<dom-module id="x-el">
  <script>
    Polymer({
      is: 'x-el',
      properties: {
        name: {
          type: String,
          value: 'John'
        }
      }
  </script>
</dom-module>

<!-- test/basic.html -->
<html>
  <head>
    <!-- import these if you want to execute as standalone test -->
    <script src=”webcomponentsjs/web-components-lite.js”></script>
    <script src=”web-component-tester/browser.js”></script>
    <!-- import the element to test -->
    <link rel="import" href="../x-el.html">
  </head>
  <body>
    <x-el></x-el>
    <script>
      var el = document.querySelector('x-el');
      suite('x-el basic test suite', function () {
        test('name equals "John"', function () {
          assert.equal(el.name, 'John');
        });
      });
    </script>
  </body>
</html>
{% endhighlight %}

### Test fixtures

Test fixtures enable you to define a template of content and copy a clean,
new instance of that content into each test suite. Use test fixtures to
minimize the amount of shared state between test suites. 

To use a test fixture:

*   Define the test fixture template and give it an ID.
*   Define a variable in your test suite to reference the template.
*   Instantiate a new instance of the template in your `setup()` method.

Example: 

<test-fixture id="fixture">
  <template>
    <seed-element>Hello, Tests!</seed-element>
  </template>
</test-fixture>

<script>
  suite('<seed-element>`, function() {
    var el;
    // runs before every unit test
    setup(function() {
      el = fixture('fixture');
    });
  });
</script>

## Asynchronous tests

Pass `done` argument to test function. This is a signal to Mocha that
the following test is asynchronous.

Perform the asynch operation. 

Call `done()` at the end of the test which enables Mocha to wrap up the test
and move on.

## Test Shadow DOM

Use 'dom=shadow’ query string.
WCT.loadSuites([
  'basic-test.html’,
  'Basic-test.html?dom=shadow'
]);

## Learn more



[selenium]: https://code.google.com/p/selenium/issues/detail?id=7933#c23
[workaround-example]: https://youtu.be/YBNBr9ECXLo?t=74
[wct-polycast]: https://youtu.be/YBNBr9ECXLo
