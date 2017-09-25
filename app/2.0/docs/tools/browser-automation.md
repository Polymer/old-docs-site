---
title: Test your Polymer app with a browser automation tool

---

<!-- toc -->

Many app developers use browser automation tools such as WebDriver.io and Selenium to help with end-to-end testing. 

Without shadow DOM, you can use [the `querySelector` method](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) to access an element from the DOM, such as a button, in order to simulate a user action such as a click. However, if the button in question is encapsulated inside shadow DOM, it is out of scope of `querySelector` and will not be accessible.

You may still want to perform end-to-end testing of your Polymer application with a browser automation tool. 

[Chad Killingsworth has written a gist](https://gist.github.com/ChadKillingsworth/d4cb3d30b9d7fbc3fd0af93c2a133a53) with code for a custom WebDriver.io command to retrieve elements from inside shadow DOM. 

Refer to the [WebDriver.io documentation on custom commands](http://webdriver.io/guide/usage/customcommands.html) for instructions on how to set up and use a custom command. 
