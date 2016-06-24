---
title: Step 3. Add an element
subtitle: "Build an app with App Toolbox"
---

<!-- toc -->

Now that you've added a new view to your application, you can start building
out the details of that view.

One of the appeals of the web component approach to web development 
is the ecosystem. Rather than building everything in your app from scratch,
you can find and use off-the-shelf elements that suit your needs. Two examples
of places you can find reusable components are the 
[Polymer Element Catalog][catalog] (elements built by the Polymer team) and 
[customelements.io][ceio] (elements built by the web components community). 

In this tutorial you install a third-party component and use it in the new
page that you created in the last step. The element that you're going to 
install is called `paper-slider`. It's a simple UI subcomponent that lets you 
drag a slider bar. 

## Install a third-party component

Usually, when working with third-party components, you'd need to browse the
catalogs and find one that suits your needs, and then get the command for
installing the element from the element's page on the catalog. For example,
you can see the command for installing `paper-slider ` on the left-hand side
of its [documentation page][paper-slider]. This tutorial is just going to 
give you the command directly.

1. Run this command from your project root directory to install your new
   element. 

       bower install --save PolymerElements/paper-slider

The `--save` flag instructs Bower to update `bower.json` to include this 
element as a dependency of the app.
{.alert .alert-info}

## Add the element to your page

The third-party element is installed now, but you're not using it yet.

1.  Inside of `src/my-new-view.html`, import `paper-slider.html` below 
    the existing import for `polymer.html`. 

    ```
    <link rel="import" href="../bower_components/polymer/polymer.html">
    <link rel="import" href="../bower_components/paper-slider/paper-slider.html">
    ```

1.  Declare your new element at the bottom of the template for `my-new-view`.

    ```
    <h1>New view</h1>
    <paper-slider min="-100" max="100" value="50"></paper-slider>
    ```

All set! If you open up your new page now, you can play with your slider. 

![Example of page with slider](/images/1.0/toolbox/app-drawer-template-slider.png)

## Next steps

You've initialized an app from a template, created a page from scratch, and
used a third-party element in your app. For the last step in this tutorial, 
learn how to deploy your app to the web. 

<a class="blue-button"
    href="deploy">Next step: Deploy</a>

[bower]: http://bower.io/
[catalog]: https://elements.polymer-project.org/
[paper-slider]: https://elements.polymer-project.org/elements/paper-slider
[ceio]: https://customelements.io/
