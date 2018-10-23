---
title: "Web Components v0 deprecations"
---

In 2014, Chrome shipped early versions of the web components specifications—Custom Elements v0, Shadow DOM v0, and HTML Imports. Polymer 1.x was built on top of these v0 specs. Since then, v1 versions of the Custom Elements and Shadow DOM specs have been standardized. These v1 specs—used by Polymer 2.x and 3.x—are now shipping in Safari and Chrome, and are slated to ship this month in Firefox. 

The HTML Imports specification never was never standardized. Polymer 2.x still uses HTML Imports, but Polymer 3.x replaces them with standard JavaScript modules.

Chrome has started the process of removing these older, non-standard APIs. Chrome 70 is shipping with deprecation warnings for Custom Elements v0, Shadow DOM v0, and HTML Imports These features are scheduled to be removed in Chrome 73, shipping around March 2019. 

If you've been with the project since Polymer 1.x or 2.x, thank you! We're excited to see web components shipping widely. 

If you have existing sites using Polymer 1.x or 2.x, you'll need to make sure you're loading the polyfills, and test your sites to make sure they'll continue to work after the native features are removed. 

**If you're using the polyfills, your sites should continue to function on Chrome as they do on other browsers.**

The features being deprecated were only shipped in Chrome and other Chromium-based browsers, such as Opera. Most sites using Polymer 1.x or 2.x should already be using polyfills for the required features. 

If you're using browser sniffing to determine whether to send polyfills to the browser, you should update that logic.

**If you're using Polymer 3.x or LitElement, these changes do not affect you**.

The following sections describe the impact of this change on Polymer 1.x and 2.x sites, and how to test your sites to make sure they work correctly after the legacy features are removed.

## Impact for Polymer 1.x

Polymer 1.x sites will require the v0 polyfills to run on Chrome. Your entrypoint (for example, `index.html`) probably already has code to load the polyfills. The code may be a simple script tag, like this:

```
<script src="/bower_components/webcomponentsjs/webcomponents-lite-min.js"></script>
```

You may also have a snippet of code that conditionally loads the polyfills, as shown in [Browser compatibility](https://www.polymer-project.org/1.0/docs/browsers) in the Polymer 1.x documentation. 

If you're using browser sniffing to determine whether to send polyfills to the browser, you can remove that logic. Since the polyfills will be required on all browsers soon, you can just use the simple script tag going forward.

Since the polyfills are not perfect replacements for the native features, you may see some changes when using the polyfills. If you're already using the polyfills on other browsers, you may already be aware of these changes.

Using polyfills instead of native APIs has some performance impact, and may affect the timing of some lifecycle callbacks.

In addition, Polymer's built-in shadow DOM shim ("shady DOM") may cause visible UI changes compared to native shadow DOM. 


### Shadow DOM and Shady DOM

**The removal of Shadow DOM v0 affects only Polymer 1.x sites that have explicitly enabled native shadow DOM rendering where shadow DOM v0 is available**. By default, Polymer 1.x uses its built-in shadow DOM shim ("shady DOM") instead of native shadow DOM rendering, but many production sites may have opted-in to native shadow DOM for better performance.

For Polymer 1.x sites currently using shadow DOM rendering, there may be some performance impact on Chrome when it falls back to shady DOM rendering. In addition, there may be visible styling changes, because of limitations of the shady DOM shim built in to Polymer 1.x. These changes should make the pages displayed on Chrome more consistent with other browsers, which are already using shady DOM.

You can test shady DOM rendering out in advance by removing or commenting out the code that enables native shadow DOM. Typically, you'll have code like this in your main entrypoint file:

```
  <script>
    /* this script must run before Polymer is imported */
    window.Polymer = {
      dom: 'shadow', 
      /* ... Other settings ... */ 
    };
  </script>
```


Comment out the line that contains `dom: shadow` to restore the default behavior. If this is the 
only property being set in this settings object, you can comment out the entire script. For more details on 
global settings, see [Global settings](https://www.polymer-project.org/1.0/docs/devguide/settings) in the Polymer 1.x docs.

If you want to continue using native shadow DOM, we recommend upgrading to Polymer 2.x or 3.x, which use the standard Shadow DOM v1 APIs, which are already supported on multiple browsers.


## Impact for Polymer 2.x

Polymer 2.x uses the newer, standardized Custom Elements v1 and Shadow DOM v1 specifications, so it is not affected by those deprecations. However, it still uses HTML Imports as a loading mechanism. 

As with Polymer 1.x, you should ensure that you're loading the polyfills. Typically your entrypoint will include one of the following scripts:


<table>
  <tr>
   <td><code>webcomponents-lite.js</code>
   </td>
   <td>A single file containing all of the webcomponents related polyfills.
   </td>
  </tr>
  <tr>
   <td><code>webcomponents-loader.js</code>
   </td>
   <td>A small script that performs client-side feature detection, then loads the required polyfills.
   </td>
  </tr>
</table>


For more details, see [Polyfills](https://www.polymer-project.org/2.0/docs/polyfills) in the Polymer 2.x documentation. 


If you're using either of these polyfill scripts, your site should continue to work properly. If you're using browser sniffing to determine which polyfills to send, you should update this logic to reflect the fact that all browsers will require the HTML Imports polyfill.

Moving forward, you can remove the necessity for the HTML Imports polyfill by migrating to Polymer 3.x or LitElement, which run without polyfills on several browsers.

Note that some build processes may eliminate the need for the HTML imports polyfill, either by concatenating imports into the entrypoint, or by transforming imports into modules that can be loaded by the browser. For example, if you're using WebPack to package your code, your packaged code won't rely on HTML Imports. 


## Testing the changes

For a preview of how your app will run on Chrome 73, you can disable these features in a current build of Chrome by starting Chrome with these command-line flags:

`--disable-blink-features=ShadowDOMV0,CustomElementsV0,HTMLImports` 

For instructions on running Chrome with command-line flags, see [Run Chromium with flags](http://www.chromium.org/developers/how-tos/run-chromium-with-flags) on the Chromium web site.
