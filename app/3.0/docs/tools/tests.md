---
title: Test your elements
---

<!-- toc -->

<div>
{% include 'outdated.html' %}
</div>

This guide shows you the basics of using Polymer CLI to run unit tests, and
how to accomplish various tasks and scenarios using the Web Component Tester
library (the underlying library that powers Polymer CLI's testing tools).

**Update your tools for 2.0.** For testing with 2.0, make sure you have the latest
version of the Polymer CLI.
{.alert .alert-info}

## Overview

Polymer CLI is an all-in-one command-line interface that covers the vast majority of
Polymer development tasks, including unit testing. The underlying library
that powers Polymer CLI's unit testing tools is called Web Component Tester.

Web Component Tester is an end-to-end testing environment built by the Polymer
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

## Quick start {#quick-start}

For demonstration purposes, this guide shows you how to install Polymer CLI
and initialize an element project. You'll then use this project to learn how
to add and run unit tests.


1.  Install Polymer CLI. Follow the directions in
    [Install Polymer CLI](polymer-cli#install) to get started.

1.  [Create an element project](polymer-cli#element). This guide assumes that
    your element project directory and your element are both named `my-el`.

1.  `cd` to the base directory of your project.

1.  Run `ls`.

    You'll see that your element project contains a
    directory called `test`. This is where all of your unit tests should be
    stored.

    When you run `polymer test`, Web Component Tester automatically
    searches for a `test` directory and runs any tests it finds in there. If
    you use another directory name, you'll need to specify it when you run
    `polymer test`.
    {.alert .alert-info}

1.  Open up `test/my-el_test.html` to see an example of a basic unit test.

1.  Run the test.

        polymer test

    Web Component Tester automatically finds all of the browsers on your
    system and runs your tests against each one. To run your
    tests against a single browser, use the `-l` (or `--local`)
    argument:

        polymer test -l chrome

If you receive errors about testing on Safari, see [Set up testing on Safari](#safari).

### Run tests interactively

You can also run your tests in the browser. This allows you to use the
browser's DevTools to inspect or debug your unit tests.

For example, using Polymer CLI and the example element project created
in [Quick start](#quick-start) above, first you would start your server:

    polymer serve

And then, to run the basic `my-el_test.html` unit test in the browser, you
would open a web browser and go to the following URL:

    localhost:8080/components/my-el/test/my-el_test.html

## Creating tests

Now that you've got the basics down of using Polymer CLI to run tests, it's
time to start creating them.

This section of the doc shows you how to accomplish various tasks or scenarios
while implementing your unit tests.

### Asynchronous tests {#async}

To create an asynchronous test, pass `done` as an argument to the test function
and then call `done()` when the test is complete. The `done` argument is a
signal to Mocha that the test is asynchronous. When Mocha runs the test,
it waits until the test code invokes the `done()` callback. If the `done()`
callback isn't invoked, the test eventually times out and Mocha reports the test
as a failure.

my-el.html {.caption}

```js
fireEvent() {
  this.dispatchEvent(new CustomEvent('test-event', {detail: 'tested!'}));
}
```

my-el_test.html {.caption}

```js
test('fires an event', function(done) {
  myEl.addEventListener('test-event', function(event) {
    assert.equal(event.detail, 'tested!');
    done();
  });
  myEl.fireEvent();
});
```

### Prevent shared state with test fixtures {#test-fixtures}

Test fixtures enable you to define a template of content and copy a clean,
new instance of that content into each test suite. Use test fixtures to
minimize the amount of shared state between test suites.

To use a test fixture:

*   Define the test fixture template and give it an ID.
*   Define a variable in your test script to reference the template.
*   Instantiate a new instance of the fixture in your `setup()` method.

```html
<test-fixture id="my-el-fixture">
  <template>
    <my-el prop1="test value">
    </my-el>
  </template>
</test-fixture>

<script>
  suite('<my-el>', function() {
    var myEl;
    setup(function() {
      myEl = fixture('my-el-fixture');
    });
    test('sets the "prop1" property from markup', function() {
      assert.equal(myEl.prop1, 'test value');
    });
  });
</script>
```

### Create stub methods

Stubs enable you to replace default implementations with custom methods. This
is useful for catching side effects.

```
setup(function() {
  stub('paper-button', {
    click: function() {
      console.log('paper-button.click called');
    }
  });
});
```

You don't have to use stubs directly on individual elements. You can override
the implementation for all elements of a given type.

### Create stub elements

Use [stub elements](http://stackoverflow.com/questions/463278/what-is-a-stub)
to test elements in isolation. For example, if one of your tests
depends on another element to return data, rather than importing the other
(possibly unstable) element into your tests, you can implement a stub of the
other element that always returns consistent data.

Use `replace()` to create stub elements.

```js
setup(function() {
  replace('paper-button').with('fake-paper-button');
});
```

For example, using the sample `replace()` above and the element below:

```
<dom-module id='x-el'>
  <template>
    <paper-button id="pb">button</paper-button>
  </template>
</dom-module>
```

At test runtime, the content template would be stamped out as:

```
<dom-module id='x-el'>
  <template>
    <fake-paper-button id="pb">button</fake-paper-button>
  </template>
</dom-module>
```

The attributes and content of the element are preserved, but the tag
is replaced with the specified stub tag.

Because the method is called within `setup()`, all of the changes are
reverted at the end of each test.

### AJAX

<google-youtube video-id="_9qARcdCAn4" autoplay="0"
                rel="0" fluid></google-youtube>

Web Component Tester includes [Sinon](http://sinonjs.org/), which enables you to mock XHR
requests and create fake servers.

Below is an example of a simple XHR unit test suite for
[`<iron-ajax>`](https://www.webcomponents.org/element/PolymerElements/iron-ajax).
Check out Sinon's documentation for more in-depth examples.

```
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
```

**Note:** The example above uses Chai's [`expect`](http://chaijs.com/api/bdd/)
assertion style.
{ .alert .alert-info }

### Run a set of tests {#test-sets}

To run a set of tests, create an HTML file and call `loadSuites()`. When
running Web Component Tester, specify the path to the HTML file as the first argument
(for example, `wct test/my-test-set.html`.

```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <script src=”../bower_components/webcomponentsjs/webcomponents-lite.js”></script>
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
```

The argument to `loadSuites()` should be an array of strings. Each string
should be a relative URL to a test suite. You can configure your tests
using query strings in the URLs. See [Test shadow DOM](#shadow-dom)
for an example.

### Hybrid elements: test local DOM

For hybrid elements, use Polymer's [DOM API](/1.0/docs/devguide/local-dom#dom-api)
to access and modify local DOM children.

```js
test('click sets isWaiting to true', function() {
  myEl.$$('button').click();
  assert(myEl.isWaiting, true);
});
```

**Note:** `myEl.$$('button')` returns the first `button` element encountered
in the local DOM of `myEl`.
{ .alert .alert-info }

#### Test DOM mutations

Always wrap your test in `flush` if your element template contains a [template
repeater (`dom-repeat`)](/{{{polymer_version_dir}}}/docs/devguide/templates#dom-repeat) or
[conditional template (`dom-if`)](/{{{polymer_version_dir}}}/docs/devguide/templates#dom-if),
or if your test involves shadow DOM mutation. The teshady DOM polyfill lazily performs these
operations in some cases for performance. `flush` ensures that asynchronous
changes have taken place. The test function should take one argument, `done`,
to indicate that it is [asynchronous](#async), and it should call
`done()` at the end of `flush`.

```
suite('my-list tests', function() {
  var list, listItems;
  setup(function() {
    list = fixture('basic');
  });
  test('Item lengths should be equal', function(done) {
    list.items = [
      'Responsive Web App boilerplate',
      'Unit testing with Web Component Tester',
      'Offline support with the Platinum Service Worker Elements'
    ];
    // Data bindings will stamp out new DOM asynchronously
    // so wait to check for updates
    flush(function() {
      listItems = list.shadowRoot.querySelectorAll('li');
      assert.equal(list.items.length, listItems.length);
      done();
    });
  });
)};
```

#### Test with polyfills {#shady-dom}

To test out how a test suite behaves when the browser runs the polyfill,
create a [test set](#test-sets) and pass options in your
a query string when Web Component Tester loads your test suites.

```js
WCT.loadSuites([
  'basic-test.html',
  'basic-test.html?wc-ce&wc-shadydom&wc-shimcssproperties'
]);
```

This sample runs `basic-test.html` twice, once using native APIs (where the browser supports them),
and once using using all of the polyfills.

### Automated testing in the cloud

It's important to get a good testing setup in place for your project as
early as possible. Using services like Travis for continuous integration,
and Sauce Labs for cross-browser testing means you can be confident that
changes you push to your project will work well on different platforms and
devices. For guidance on setting up these tools check out the Polycast below.

<google-youtube video-id="afy_EEq_4Go" autoplay="0"
                rel="0" fluid></google-youtube>

## Set up testing on Safari {#safari}

Safari 10 has built-in support for testing, but it must be manually enabled. Safari 9 may require
a you to install a browser extension.

To enable testing on Safari 10:

1.  If you don't see the **Develop** menu in the Safari menu bar, enable it:

    1.  Select **Safari > Preferences**, then click the **Advanced** tab.
    2.  Check the **Show Develop menu** checkbox.

2.  Select **Develop > Allow Remote Automation** in the menu bar.

3.  You may need to authorize `safaridriver` to launch the `webdriverd` service which hosts the
    local web server. To do this, start `safaridriver` once manually:

        /usr/bin/safaridriver

    Complete the authentication prompt.

More information:
[WebDriver support in Safari 10](https://webkit.org/blog/6900/webdriver-support-in-safari-10/)

To enable testing on Safari 9:

1.  Download the legacy SafariDriver extension for Selenium [(`SafariDriver.safariextz`)][safaridriver].
2.  Double-click the extension to install it in Safari.
3.  Exit Safari.


More information:

-   [Selenium SafariDriver page][selenium]. Note
    that the link for the SafariDriver on this page is unhelpful.

## Learn more

Polymer Summit 2015 video on testing:

<google-youtube video-id="kX2INPJY4Y4" autoplay="0"
                rel="0" fluid></google-youtube>

The [Web Component Tester README][wct-readme] has more in-depth information
about Web Component Tester usage.

[wct-readme]: https://github.com/Polymer/web-component-tester/blob/master/README.md
[selenium]: https://github.com/SeleniumHQ/selenium/wiki/SafariDriver#getting-started
[safaridriver]: http://selenium-release.storage.googleapis.com/2.48/SafariDriver.safariextz
[workaround-example]: https://youtu.be/YBNBr9ECXLo?t=74
[wct-polycast]: https://youtu.be/YBNBr9ECXLo
[ajax-polycast]: https://www.youtube.com/watch?v=_9qARcdCAn4
