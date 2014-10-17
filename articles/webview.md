---
layout: default
type: core
navgroup: docs
shortname: Articles
title: "Using Polymer in a WebView"
subtitle: How to setup Polymer in an Android WebView app

article: true
#draft: true
description: How to building a mobile Polymer app that runs in a WebView.
published: 2014-10-20
#updated: 2014-10-20
author: ebidel
polymer_version: 0.4.2

tags:
- WebView
- android
- app
- spa
- cordova
- hybrid
---

<style>
#download-button {
  background: #259b24;
  color: #fff;
  font-size: 18px;
  fill: #fff;
}
#download-button:hover {
  background: #0a7e07;
}
#download-button::shadow #ripple {
  color: #fff;
}
</style>

{% include authorship.html %}

{% include toc.html %}

## Introduction

**Important** - This article assumes you are familiar with creating a WebView app on Android. If you're not familiar with WebView development, check out the excellent guides on the Android documentation, [Getting Started: WebView-based Applications for Web Developers](https://developer.chrome.com/multidevice/webview/gettingstarted) and [WebView for Android Overview](https://developer.chrome.com/multidevice/webview/overview).
{: .alert .alert-info }

Many developers ask us if {{site.project_title}} can be used inside a WebView.
The answer is, **of course**! Using {{site.project_title}} in a WebView is no different than creating a normal web app that runs inside a WebView. However, in some cases it's not immediately obvious how to structure an app or get things setup for WebView development. This guide walks you through starting a new Android WebView project and tweaking it to work with {{site.project_title}}. If you want to also target iOS, see the suggestions under [Writing one app across Web, Android 4.0+, and iOS](#oneapp).

## Getting started

Before you start, **develop a standalone web app first**. Leave out the fancy WebView stuff until the end. Why?

- The Android Emulator is painfully slow to debug and test.
- The emulator's [hardware acceleration](http://developer.android.com/tools/devices/emulator.html#acceleration) cannot be enabled for WebView apps.
- It's much faster to iterate using your normal tools and workflow. 
- The DevTools [remote USB debugging](https://developer.chrome.com/devtools/docs/remote-debugging) is second to none.

Once sharp edges are ironed out, dive into WebView-fying and uploading it to Google Play.

### The Android WebView starter kit

<p layout horizontal center-justified>
  <a href="#">
    <paper-button id="download-button" raised><core-icon icon="file-download"></core-icon>Download the WebView Starter</paper-button>
  </a>
</p>

The WebView starter .zip provides an example Android Studio project to get you up and running. It contains a basic mobile web app that uses _some_ of {{site.project_title}}'s [core](/docs/elements/core-elements.html) and [material design](/docs/elements/material.html) [paper elements](/docs/elements/paper-elements.html). You should be able load it directly onto an device running Android L or the emulator to see it in action. More on minimum Android/SDK versions, later.

## Minimum Android and SDK versions

To gain native browser support for all of the web component APIs (HTML Imports, Custom elements, `<template>`, Shadow DOM), you need Chrome 36+. That's why it's important to target **Android L (SDK version 21)**, where **Chrome 37.0.0.0** is the default WebView. Targeting pre-Android L means you'll be need {{site.project_title}}'s polyfills and won't see the awesome performance benefits of native browser support.

**Note** {{site.project_title}} does work under Android 4.4.3+, but it will use the polyfills. KitKat ships with a Chromium-based WebView, but it is version 33.0.0.0.
{: .alert .alert-info }

To install/update Android SDK, run the SDK manager in Android Studio:

<img src="images/webview/sdkmanager.png" style="width:500px">

then download the L packages (API 21):

<img src="images/webview/sdkinstall.png" style="width:500px">

### Supporting older versions of Android {#oldandroid}

{{site.project_title}} does not support the legacy Android Browser, which means the default WebView in older versions of Android (< 4.4.3) will not work.

If you need to support older versions of Android, try [Crosswalk](https://crosswalk-project.org). It's basically a tool that brings the new Chromium webview to Android 4.0+. One downside is that the entire Chromium runtime gets bundled with your application. According to the [Crosswalk FAQ](https://crosswalk-project.org/#documentation/about/faq), this means 24KB web app can balloon into 19.63MB after it's packaged. The tradeoff is something to consider.

## Recommended app structure

The files that power your WebView should be entirely within the project's `src/main/assets` folder. Android reserves this directory for raw files that your app needs access to. It's perfect for static web files.

Inside of the `assets` folder, it's generally recommended to create a `www` folder to stash your web app. This folder is also where installed element dependences (e.g. `bower_components`) will go.

### Using Bower to install elements

**Tip** If you're not familiar with Bower, see
[Installing elements](/docs/start/getting-the-code.html#installing-components).
{: .alert .alert-success }

Create a `bower.json` file in `src/main/assets/www` that lists your element dependencies. In this case, we'll just pull in all the paper and core elements:

In `src/main/assets/www`, create **bower.json**:

    {
      "name": "PolymerWebView",
      ...
      "dependencies": {
        "core-elements": "Polymer/core-elements#~{{site.latest_version}}",
        "paper-elements": "Polymer/paper-elements#~{{site.latest_version}}"
      }
    }

Run `bower install` in the `www` directory to populate the `bower_components` folder.

### Using HTML Imports

Create `src/main/assets/www/elements.html`, an [HTML Import](/platform/html-imports.html) that in turn, includes all of the element imports your app will use:

    <link rel="import" href="bower_components/core-drawer-panel/core-drawer-panel.html">
    <link rel="import" href="bower_components/core-toolbar/core-toolbar.html">
    <link rel="import" href="bower_components/core-icons/core-icons.html">
    ...

### Main page setup

Create your main page app as `src/main/assets/www/index.html` and use an HTML Import to load `elements.html`:

    <!doctype html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <!-- Note: platform.js is only needed in non-Chrome 36 browsers. It's included here for portability. -->
      <script src="bower_components/platform/platform.js"></script>
      <link rel="import" href="elements.html">
      ...
    </head>
    <body unresolved fullbleed>
      ...
    </body>
    </html>

It's worth noting that platform.js is not needed in WebViews powered by Chromium 36+. However, if you're creating an app for multiple platforms, it's still recommended to include the polyfills for portability.

When all is said and done, your final folder structure should look something like this:

<img src="images/webview/folders.png">

## Configuring app permissions

Now that you have the Android L installed and app structure in place, it's time to set some app permissions and select the correct version of the SDK.

In `AndroidManifest.xml`, set the minimum and target SDK versions to Android L (or an earlier version if you're relying on the polyfills or Crosswalk). If your app needs access remote resources (e.g. images, multimedia, JSON endpoints), also request the `android.permission.INTERNET` permission.

**AndroidManifest.xml**:

<pre>
&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;manifest ...&gt;

  <b>&lt;uses-sdk
      android:minSdkVersion=&quot;android-L&quot;
      android:targetSdkVersion=&quot;L&quot; /&gt;</b>

  <b>&lt;uses-permission android:name=&quot;android.permission.INTERNET&quot; /&gt;</b>

  &lt;application ...&gt;
      ...
&lt;/manifest&gt;
</pre>

### Tweaking the WebView settings

Out of the box, the WebView disables some features that {{site.project_title}} needs. You can enable them by changing the WebView's `WebSettings`:

- JavaScript!
- Access to `file://` so HTML Imports can be loaded off `file://` URLs.
- Local links/redirects act on the WebView (and do not open in the browser).

In **MainActivity.java**, enable the following on your [`WebSettings`](http://developer.android.com/reference/android/webkit/WebSettings.html) object:

<pre>
public class MyActivity extends Activity {

  private WebView mWebView;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_my);

    mWebView = (WebView) findViewById(R.id.activity_main_webview);

    WebSettings webSettings = mWebView.getSettings();

    // Enable Javascript.
    <b>webSettings.setJavaScriptEnabled(true);</b>

    // Enable HTML Imports to be loaded from file://.
    <b>webSettings.setAllowFileAccessFromFileURLs(true);</b>

    // Ensure local links/redirects in WebView, not the browser.
    mWebView.setWebViewClient(new MyAppWebViewClient());
  }
}
</pre>

**Tip** Other useful WebSettings can be found in the <a href="https://github.com/GoogleChrome/chromium-webview-samples/blob/master/jsinterface-example/src/com/google/chrome/android/example/jsinterface/MainActivity.java#L193" target="_blank">chromium-webview-samples</a>.
{: .alert .alert-success }

If you see the following runtime error in logcat, it's from HTML Imports not having access to `file://`. Be sure you're calling `setAllowFileAccessFromFileURLs(true)` when setting up the Activity:

> "Imported resource from origin 'file://' has been blocked from loading by Cross-Origin Resource Sharing policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.", source: file:///android_asset/www/index.html

## Loading the main page

Congrats! Your app is built and chillaxing in `src/main/assets/www`. There are a couple of more finishing touches.

First, override `shouldOverrideUrlLoading()` so non-local links open in the browser rather than the WebView. In **MyAppWebViewClient.java**:

    public class MyAppWebViewClient extends WebViewClient {
      @Override
      public boolean shouldOverrideUrlLoading(WebView view, String url) {

        // Handle local URLs.
        if (Uri.parse(url).getHost().length() == 0) {
            return false;
        }

        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        view.getContext().startActivity(intent);
        return true;
      }
    }

Lastly, load index.html from the filesystem. In **MainActivity.java**:

<pre>
public class MyActivity extends Activity {

  private WebView mWebView;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_my);

    mWebView = (WebView) findViewById(R.id.activity_main_webview);

    WebSettings webSettings = mWebView.getSettings();

    // Enable Javascript.
    webSettings.setJavaScriptEnabled(true);

    // Enable HTML Imports to be loaded from file://.
    webSettings.setAllowFileAccessFromFileURLs(true);

    // Load main page into webview.
    <b>mWebView.loadUrl("file:///android_asset/www/index.html");</b>

    // Ensure local links/redirects in WebView, not the browser.
    mWebView.setWebViewClient(new MyAppWebViewClient());
  }
}
</pre>

## Other tips &amp; tricks

1. Include the `fullbleed` and `unresolved` attributes on `<body>`:

        <body unresolved fullbleed>

   The [`fullbleed`](/docs/polymer/layout-attrs.html) attribute removes `<body>` margins and maximizes its height to the viewport. The [`unresolved` attribute](/docs/polymer/styling.html#fouc-prevention) minimizes FOUC.

2. Use [Vulcanize](/articles/concatenating-web-components.html) to crush your HTML Imports into a single import. Doing so can reduce page load time. I recommend running Vulcanize with the `--csp --inline --strip` flags.

3. Only load the platform.js polyfills if you're targeting releases prior to Android L, *and* you're not using Crosswalk.

4. Use `on-tap` event instead of `on-click` handlers when capturing user interactions. Click handlers introduce 300ms delay to user interactions. `on-tap` uses [polymer-gestures](/docs/polymer/touch.html) touch library and circumvents the delay.

5. Set a mobile viewport! 

        <meta name="viewport" content="width=device-width, initial-scale=1">

6. To use [DevTools remote debugging](https://developer.chrome.com/devtools/docs/remote-debugging) on your WebView, enable it:

        // Enable remote debugging via chrome://inspect
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

### Writing one app across Web, Android 4.0+, and iOS. {#oneapp}

If you want to target both Android _and_ iOS, your best option is [Cordova](http://cordova.apache.org/). However, out of the box, Cordova won't get you the Chromium 36 WebView on older Android devices. 

For maximum platform reach, try the [Chrome Apps for mobile](https://github.com/MobileChromeApps/mobile-chrome-apps) project. It uses Cordova and [Crosswalk](https://crosswalk-project.org) to bring your mobile web app to Web, Android 4.0+, and iOS. [Matt Gaunt](https://twitter.com/gauntface) also has a [nice Gulp worfklow](https://gauntface.com/blog/2014/07/16/building-mobile-cordova-apps-with-web-starter-kit) that you can integrate without much hassle.

## Additional resources

Android

- [Getting Started: WebView-based Applications for Web Developers](https://developer.chrome.com/multidevice/webview/gettingstarted)
- [WebView for Android Overvieww](https://developer.chrome.com/multidevice/webview/overview)
- [Building Web Apps in WebView](http://developer.android.com/guide/webapps/webview.html)

iOS 8

- [WKWebView reference](https://developer.apple.com/library/ios/documentation/WebKit/Reference/WKWebView_Ref/index.html) - iOS8's new WebView. Use it! It can be [~20% faster](http://developer.telerik.com/featured/why-ios-8s-wkwebview-is-a-big-deal-for-hybrid-development/) than the old `UIWebView`.

Tools

- [Chrome Apps for mobile](https://github.com/MobileChromeApps/mobile-chrome-apps) documentation
- [Crosswalk](https://crosswalk-project.org/) project
- [Cordova](http://cordova.apache.org/) - hybrid Android/iOS solution

{% include disqus.html %}
