---
layout: default
title: Introduction
---

Toolkitchen is a new type of library for the web, designed to leverage the existing browser infrastructure to provide the encapsulation and extendability currently only available in JavaScript libraries.

<p>The Toolkitchen project comprises two primary efforts:</p>

<ul>
    <li>A set of core platform features, including <a href="https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html">Shadow DOM</a>, <a href="https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/index.html">Custom Elements</a> and <a href="http://mdv.googlecode.com/git/docs/design_intro.html">Model Driven Views</a>.</li> Initially, these core features will be enabled with a set of polyfills and shims.
    <li>A next-generation web application framework built upon these core technologies called the <strong><em>Toolkit</em></strong>.</li>
</ul>

<p>As browsers begin to implement these features natively (Chrome 25 will support Shadow DOM, for example), this platform layer will be removed leaving the core Toolkit .</p>

<p>
<img src="images/architecture.png" alt="Image">
</p>
<h2>
Guiding principles
</h2>
<p>
The overall aim of the toolkit is to manage complexity. It does this through two main principles:
</p>
<p>
<strong>Everything is a component</strong>—Encapsulation is the key to creating scalable, maintainable applications. All Toolkit resources are components, even ones that are non-visual. To construct an app, a developer creates new components, or uses ones the Toolkit provides, and assembles them together. Focusing on individual, composable building blocks allows developers to "think locally" about their application, reducing complexity. With this divide-and-conquer approach, applications can simultaneously be simple and arbitrarily complicated.</p>
</p>
<p>
<strong>Extreme pragmatism</strong>—Developers should write the <em>minimum</em> amount of code possible to create their application. Anything repetitive should be re-factored into a component, handled by the Toolkit itself, or added into the browser platform itself. The Toolkit provides simple syntax without reducing features, and avoids boilerplate wherever possible.
</p>

<h3>
Shadow DOM shim
</h3>
<p>
Shadow DOM is designed to provide encapsulation by hiding subtrees under shadow roots. Currently, Toolkit platform uses a shim to implement <a href="https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html">Shadow DOM</a> features. Unfortunately, as implemented in the shim, the visible DOM in inspector represents <em>rendered</em> DOM. In other words, there is a lot of complexity visible in DOM inspector that would be hidden under a native Shadow DOM implementation. For more information, see <a href="shadow-dom-shim.html">About the Shadow DOM shim</a>.
</p>
<p class="alert">
<strong>Note</strong>: Although Chrome 25 has native support for Shadow DOM, Toolkit only supports the shim at this time.
</p>
<h3>
Component scripts
</h3>
<p>
Toolkit platform shims the <a href="https://dvcs.w3.org/hg/webcomponents/raw-file/tip/explainer/index.html#external-custom-elements-and-decorators">Custom DOM Element Loader</a> . In order for component code to be debuggable at run-time, scripts embedded in components are injected into <code>&lt;head&gt;</code> in the main document. Tools that support <a href="http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/">source maps</a> (such as <a href="https://www.google.com/intl/en/chrome/browser/canary.html">Chrome Canary</a>) will identify these scripts as belonging to their source components.
</p>
<h3>
Toolkit and g-component
</h3>
<p>
All Toolkit components depend on <code>src/g-component.html</code> which provides the <a href="components.html">Toolkit sugaring layer</a>. However, an application can load <code>platform.js</code> and take advantage of the Custom Element and Shadow DOM support directly. For examples of this, see the <strong>toolkitchen/projects/CustomElementPlayground/</strong> folder for examples.
</p>
