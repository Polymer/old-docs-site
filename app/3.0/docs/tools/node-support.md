---
title: Polymer Tools Node.js Support Policy
---

<!-- toc -->

<div>
{% include 'outdated.html' %}
</div>

Polymer tools must support a wide range of developers, using a variety of operating systems, toolchains, and possibly corporate and IT support policies. To help our users plan ahead and understand what environments we support, this document details our guidelines and process for supporting versions of Node.js.

This support policy tries to balance the desire to support as many environments as possible with the cost of that support. The JavaScript and Node.js ecosystems have been moving at a very fast pace recently, delivering considerable speed and productivity benefits. We want to take advantage of these benefits to deliver better tools more quickly, but at the same time recognize it can be difficult or imprudent for users to keep up with this pace of change.

Luckily, Node has developed a clear release and long term support plan which we can base our support policy on. In developing this plan, we've made the assumption that our tools are run at development time, not in production, and developer environments are usually easier to update than production environments.

## What versions of Node.js do we support?

We support all "Current" and "Active LTS" releases of Node.js according to the [Node.js Long Term Support Release Schedule](https://github.com/nodejs/LTS#lts-schedule), but **not** "Maintenance" releases.

This means we will support from two to three semver major versions of Node.js, depending on where we are in the Node LTS schedule. Currently we support 6.x and 7.x.

## What package managers and which versions do we support?

We support both the [NPM](http://www.npmjs.com) and [Yarn](http://yarnpkg.com) package managers.

Yarn should be drop-in compatible with npm, as it [uses the same package.json format as npm and can install the same packages from the npm registry](https://yarnpkg.com/lang/en/docs/migrating-from-npm/). 

We support npm v3 and newer. If you don't have v3 or newer installed, you can upgrade npm by running `npm i -g npm`.

## What operating systems do we support?

We support Windows 10, Linux and macOS (née OS X).

## What does "support" mean? How do we guarantee it?

"Support" for an environment means we test in it, and will fix any issues specific to it. We ensure support for environments via continuous integration.

We run tests for our tools libraries on Travis CI, which covers Ubuntu Linux and Node.js v6. We also run the Polymer CLI tests, which cover most of the libraries, on Appveyor, which covers Windows 10.

We will be increasing coverage of libraries on Appveyor Windows environments and Travis macOS environments over time.

## How does support end?

When we end support for an environment we will do so with a major version change so that legacy environments can depend on the old version. We will update CI configurations to stop testing on unsupported environments.

Unsupported environments will not necessarily stop working right away, but we will eventually use features that are only supported in newer environments.
