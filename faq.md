---
layout: default
title: FAQ
---

{% include alpha.html %}

*Don't see an answer to your question on here? Ask on the [mailing list](/discuss.html)!*

## {{site.project_title}} 

#### Which browsers does {{site.project_title}} support?

{{site.project_title}} aims to support [evergreen browsers](http://www.yetihq.com/blog/evergreen-web-browser/). After all, we're trying to simulate the future, and as someone once said, "You're headed for trouble if all you do is stare in the rear-view mirror." In practice, this means we support the most recent versions of Chrome, Safari, Internet Explorer, and Firefox. Some pieces of {{site.project_title}} may support more browsers if it doesn't require too much extra effort.

See our [Browser Compatibility](/compatibility.html) page for more information.

## Web Components

#### How do I package a bunch of custom elements together?

Use a custom build step that flattens/concatenates everything into a single file,
then uses [HTML Imports](/platform/html-imports.html) (`<link ref="import">`) to 
bring that file into your app. 

Similarly, you could write a build step that inlines any custom element definition directly into your main app. 

#### Crawlers understand custom elements? How does SEO work?

They don't. However, search engines have been dealing with heavy AJAX
based application for some time now. Moving away from JS and being more declarative
is a good thing and will generally make things better.
