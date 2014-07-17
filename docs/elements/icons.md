---
layout: default
type: elements
navgroup: elements
shortname: Elements
title: Using core icons
subtitle: Guide
---

{% include toc.html %}

{{site.project_title}}'s Core Elements provide utility components
for working with individual icons and icon sets.

It includes a standard collection of SVG icons (styleable using CSS) as well as elements to
create your own icon sets in SVG or bitmap, if needed.

## Installation

This article describes the usage of four components: `core-icon`,
`core-icons`, `core-iconset` and `core-iconset-svg`.
You can install them using Bower:

    bower install Polymer/core-icon
    bower install Polymer/core-icons
    bower install Polymer/core-iconset
    bower install Polymer/core-iconset-svg

The rest of this article assumes the components are
installed in the `bower_components` directory.


## Basic usage: core-icon

The simplest way of using {{site.project_title}} icons is the `core-icon` element.
To use it, import *core-icon.html* and declare an icon in your html:

    <link rel="import" href="/bower_components/core-icon/core-icon.html">

    <core-icon src="http://www.polymer-project.org/images/icons/android.svg"></core-icon>

Produces: <core-icon src="/images/icons/android.svg"></core-icon>

The source image is scaled to fit the icon size, which defaults to 24px square, and is used as the icon element’s background.

You can control the size of the icon using the `size` attribute. Since icons are always square, the `size` specifies both the width and the height of the icon, in pixels.


    <core-icon src="/images/icons/android.svg" size="24"></core-icon>
    <core-icon src="/images/icons/android.svg" size="32"></core-icon>
    <core-icon src="/images/icons/android.svg" size="48"></core-icon>

<core-icon src="/images/icons/android.svg" size="24"></core-icon>
<core-icon src="/images/icons/android.svg" size="32"></core-icon>
<core-icon src="/images/icons/android.svg" size="48"></core-icon>

The `src` attribute works well when you want to use a single icon. However, most of the time you need more than one, so {{site.project_title}} makes it easy to work with *icon sets*.


## Using {{site.project_title}}'s built-in icon sets

If you import `core-icons`, you get access to
a whole range of predefined icon sets. To use an icon from an icon set, use the `icon` attribute instead of `src`:

    <link rel="import" href="/bower_components/core-icons/core-icons.html">

    <core-icon icon="polymer"></core-icon>

This loads the *polymer* icon from the default iconset: <core-icon icon="polymer"></core-icon>

In the *iconset* directory
of `core-icons` you can find more interesting icon sets. To use an icon from one of these icon sets, 
first import the icon set. Specify the icon as <em>iconset-name</em><b>&#8239;:&#8239;</b><em>icon-name</em>.

For example:

    <link rel="import" href="/bower_components/core-icon/core-icon.html">
    <link rel="import" href="/bower_components/core-icons/iconsets/social-icons.html">

    <core-icon icon="social:cake"></core-icon>

This loads the *cake* icon from the *social* iconset: <core-icon icon="social:cake"></core-icon>

You can browse available icon sets on the
[core-icons demo page](http://polymer.github.io/core-icons/components/core-icons/demo.html). 

## Styling with CSS

Because icons in {{site.project_title}} iconsets are SVG-based, you can control their appearance
with CSS. For example, you can set properties like `fill`, `stroke` and `stroke-width` for your icons.

    <style>
      core-icon[icon="android"] {
        fill: #9aed00;
      }
    </style>
    <core-icon icon="android" size="32"></core-icon>

<style>
  core-icon[icon="android"] {
    fill: #9aed00;
  }
</style>
Produces: <core-icon icon="android" size="32"></core-icon>

## Roll your own

The styling possibilities become even more exciting when you want to make
your own icon sets. To create a custom icon set with SVG, import and declare
`core-iconset-svg` in your html. Because SVG is just markup, you can put your
SVG icons inside the `core-iconset-svg` element as its children.

    <link rel="import" href="../bower_components/core-iconset-svg/core-iconset-svg.html">
    <core-iconset-svg id="custom-icons" iconSize="50">
      <svg>
        <defs>
          <g id="fancy-circles">
            <circle cx="25" cy="25" r="18" />
            <circle cx="12" cy="12" r="10" />
            <circle cx="35" cy="40" r="6" />
          </g>
        </defs>
      </svg>
    </core-iconset-svg>

Because the icons are defined as SVG, you can style them with CSS. Let's make
our fancy circles even more fancy by adding some color:

    <style type="text/css">
      core-icon circle {
        fill: #0b50bf;
      }
      core-icon circle:first-child {
        fill: #66bbff;
      }
      core-icon circle:last-child {
        fill: #0083ff;
      }
    </style>

Now you can display the icon using `core-icon` by referring to the `id` of the iconset and
the `id` of a particular icon, joined by a colon. For example, to display the icon
defined above use `custom-icons:fancy-circles` as `icon` attribute.

    <core-icon icon="custom-icons:fancy-circles" size="30"></core-icon>

<style type="text/css">
  core-icon circle {
    fill: #0b50bf;
  }
  core-icon circle:first-child {
    fill: #66bbff;
  }
  core-icon circle:last-child {
    fill: #0083ff;
  }
</style>
<core-iconset-svg id="custom-icons" iconSize="50">
  <svg>
    <defs>
      <g id="fancy-circles">
        <circle cx="25" cy="25" r="18" />
        <circle cx="12" cy="12" r="10" />
        <circle cx="35" cy="40" r="6" />
      </g>
    </defs>
  </svg>
</core-iconset-svg>
Tadaa! Here's how your brand new icon looks: <core-icon icon="custom-icons:fancy-circles" size="30"></core-icon>

If you prefer to work with more traditional bitmap graphics like *jpg* or *png*,
there is also an element for that: `core-iconset`.

Let's say you have a *png* file with your icons:

<a href="/components/core-iconset/my-icons.png" target="_blank">
  <img src="/components/core-iconset/my-icons.png">
</a>

You can set the `src` attribute of `core-iconset` to point to this file.
Icons are expected to be square and of the size specified
by the `iconSize` property. If the icons are arranged over multiple rows, use the `width`
attribute to specify the width of the image file. List the name of each icon in the `icons` attribute, in the same order as they appear
in the image file.

    <core-iconset id="custom-icons-png" src="/components/core-iconset/my-icons.png" width="96" iconSize="24"
      icons="location place starta stopb bus car train walk">
    </core-iconset>

Now you can refer to the icon using colon notation:

    <core-icon icon="custom-icons-png:place"></core-icon>

<core-iconset id="custom-icons-png" src="/components/core-iconset/my-icons.png" width="96" iconSize="24"
  icons="location place starta stopb bus car train walk">
</core-iconset>
Produces: <core-icon icon="custom-icons-png:place"></core-icon>

## Icons in other core components

You can use icons on their own, but also use them with other elements, such as buttons. You can use the built-in 
and custom icon sets with any `core-` or `paper-` element that has an `icon` attribute. Remember to include the 
appropriate icon set before referring to an icon, otherwise the icon will not render.

The following examples use `core-icon-button`, `core-menu-button` and `core-item` with
icons from the *default* and *av* icon sets. (The required imports for the elements and icon sets
are omitted here for brevity.)


    <core-icon-button icon="av:play-arrow"></core-icon-button>

    <core-menu-button icon="menu">
      <core-item icon="settings" label="Settings"></core-item>
    </core-menu-button>

Produces: <core-icon-button icon="av:play-arrow"></core-icon-button>
<core-menu-button icon="menu">
  <core-item icon="settings" label="Settings"></core-item>
</core-menu-button>

## Summary

You just learned how to import {{site.project_title}}'s ready-made icon sets,
display an icon using the `core-icon` element and style it with CSS. You also learned
how to create your own icon set using SVG or bitmap images and how to use icons
from other elements that support this feature.






