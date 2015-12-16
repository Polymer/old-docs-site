---
layout: default
type: guide
shortname: Docs
title: Unit tests
subtitle: Developer guide
---

{% include toc.html %}

## Note on code samples

The code samples in this guide refer to seed-element, which is a 

## Set up

Install Web Component Tester.

    npm -g install web-component-tester

On Mac OS X you need to [manually install][selenium] the latest Safari 
extension for Selenium. See the 
[Web Component Tester Polycast][workaround-example] for 
a demonstration.

Create a directory for your tests. The default name is `test`.

    mkdir test

Define your test suites in `test/index.html`.

<html>
  <head>
    <script src=”webcomponentsjs/web-components-lite.js”></script>
    <script src=”web-component-tester/browser.js”></script>
  </head>
  <body>
    <script>
      WCT.loadSuites([
        ‘basic-test.html’
      ]);
    </script>
  </body>
</html>

From here you can implement your test suites as [HTML documents](#html) or
[scripts](#js).

## Test suites as HTML documents

<html>
  <head>
    <!-- import these if you want to execute as standalone test -->
    <script src=”webcomponentsjs/web-components-lite.js”></script>
    <script src=”web-component-tester/browser.js”></script>
    <!-- import the element to test -->
    <link rel="import" href="../seed-element.html">
  </head>
  <body>
    <!-- use the document to set up test fixtures -->
    <seed-element>
      <h1>Hello, Tests!</h1>
    </seed-element>
    <script>
      var el = document.querySelector('seed-element');
      suite('<seed-element>', function () {
        test('defines the "author" property', function () {
          assert.equal(el.author.name, 'Dimitri Glazkov');
        });
      });
    </script>
  </body>
</html>

### Test fixtures

Takes whatever is inside of its template and stamps out a brand new instance
of that content for each unit test. Ensures that each unit test gets a clean
slate version of the template to prevent accidentally shared states between
test suites.

To use a test fixture, create a reference to the test fixture template 
(or an element within the test fixture element), and then call `setup()` 
within your test suite. 

<test-fixture id="fixture">
  <template>
    <seed-element>Hello, Tests!</seed-element>
  </template>
</test-fixture>

<script>
  suite('<seed-element>`, function() {
    var el;
    setup(function() {
      el = fixture('fixture');
    });
  });
</script>

## Test Shadow DOM

Use ‘dom=shadow’ query string.
WCT.loadSuites([
  ‘basic-test.html’,
  ‘Basic-test.html?dom=shadow’
]);

## Learn more



[selenium]: https://code.google.com/p/selenium/issues/detail?id=7933#c23
[workaround-example]: https://youtu.be/YBNBr9ECXLo?t=74
[wct-polycast]: https://youtu.be/YBNBr9ECXLo
