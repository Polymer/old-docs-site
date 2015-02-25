---
layout: default
type: guide
shortname: Docs
title: Advanced topics
subtitle: Data-binding
---

<style>
pre strong {
  color: #000;
}
</style>

{% include toc.html %}


This section covers advanced topics that you don’t need to understand to get data binding working in a {{site.project_title}} application.

## How data binding works

It may be easiest to understand what data binding is, by first understanding what data binding is not -- it doesn’t work like traditional template systems.

In a traditional AJAX application, templating works by replacing innerHTML for some container element. Where the container contains a non-trivial DOM subtree, this has two drawbacks:

Replacing the existing child nodes destroys the transient state of the DOM nodes, such as event listeners and form input values.
The entire set of nodes is destroyed and recreated, even if only a few values change.

In contrast, {{site.project_title}} data binding **makes the smallest changes to the DOM necessary**. The DOM nodes representing a template instance are maintained as long as the corresponding model data is in place.

Consider the following DOM, which represents a template and the template instances it manages:

{% raw %}
    <table>
      <template repeat="{{item in items}}">
        <tr><td>{{item.name}}</td><td>{{item.count}}</td></tr>
      </template>
      <tr><td> Bass </td><td> 7 </td></tr>
      <tr><td> Catfish </td><td> 8 </td></tr>
      <tr><td> Trout </td><td> 0 </td></tr>
    </table>
{% endraw %}

If you re-sort the array by `item.count`, {{site.project_title}} simply swaps the order of the corresponding DOM subtrees. No nodes are created or destroyed, and the only mutation is the re-ordering of two nodes (in bold):

{% raw %}
<pre>
&lt;table>
  &lt;template repeat="{{item in items}}">
    &lt;tr>&lt;td> {{item.name}} &lt;/td>&lt;td> {{item.count}} &lt;/td>&lt;/tr>
  &lt;/template>
   <span class="nocode"><strong>&lt;tr>&lt;td> Catfish &lt;/td>&lt;td> 8 &lt;/td>&lt;/tr>
  &lt;tr>&lt;td> Bass &lt;/td>&lt;td> 7 &lt;/td>&lt;/tr></strong></span>
  &lt;tr>&lt;td> Trout &lt;/td>&lt;td> 0 &lt;/td>&lt;/tr>
&lt;/table>
</pre>
{% endraw %}

If you change `item.count` for one of the objects, the only thing that changes in the DOM tree is the binding value (in bold):

{% raw %}
<pre>
&lt;table>
  &lt;template repeat="{{item in items}}">
    &lt;tr>&lt;td> {{item.name}} &lt;/td>&lt;td> {{item.count}} &lt;/td>&lt;/tr>
  &lt;/template>
  &lt;tr>&lt;td> Catfish &lt;/td>&lt;td> 8 &lt;/td>&lt;/tr>
  &lt;tr>&lt;td> Bass &lt;/td>&lt;td> 7 &lt;/td>&lt;/tr>
  &lt;tr>&lt;td> Trout &lt;/td>&lt;td><span class="nocode"><strong> 2 </strong></span>&lt;/td>&lt;/tr>
&lt;/table>
</pre>
{% endraw %}


### How data binding tracks template instances

When a template generates one or more instances, it inserts the instances immediately after itself. So
the template itself serves as a marker for where the first instance starts. For each template
instance, the template keeps track of the terminating node in the template instance. For the simple
case, the terminating node is a clone of the last node in the template itself.

The following diagram represents the DOM for a template and its instances:

{% raw %}
<pre>
  &lt;template repeat="{{item in myList}}">
    &lt;img>
    &lt;span>{{item.name}}&lt;/span>
  &lt;/template>
  &lt;img>
  &lt;span>foo&lt;/span>   <span class="nocode" style="color: red"><em>⇐ terminating node in template instance</em></span>
  &lt;img>
  &lt;span>bar&lt;/span>   <span class="nocode" style="color: red"><em>⇐ terminating node in template instance</em></span>
  &lt;img>
  &lt;span>baz&lt;/span>   <span class="nocode" style="color: red"><em>⇐ terminating node in template instance</em></span>
</pre>
{% endraw %}

All sibling nodes (and their children) following the template node up to and including the first
terminating node make up the  DOM for the first template instance. Each subsequent template instance
is identified the same way.

If the objects in the myList array are moved or deleted, the template can move or remove the
corresponding DOM nodes.

In the case of nested templates, identifying the terminating node is somewhat more complicated.
Consider the following templates:

{% raw %}
    <template repeat="{{user in users}}">
      <p>{{user.name}}</p>
      <template repeat="{{alias in user.aliases}}">
         <p>a.k.a. {{alias}}</p>
      </template>
    </template>
{% endraw %}

In this case, the last node in the outer template is the inner template. However, when the template
instances are created, the inner template generates its own instances. (In the following example,
whitespace is added around the template instances for readability.)

{% raw %}
<pre class="prettyprint">
&lt;template repeat="{{user in users}}">
  &lt;p>{{user.name}}&lt;/p>
  &lt;template repeat="{{alias in user.aliases}}">
     &lt;p>a.k.a. {{alias}}&lt;/p>
  &lt;/template>
&lt;/template>

&lt;p>Bob&lt;/p>              <span class="nocode" style="color: red"><em>⇐ start of 1st outer template instance</em></span>
&lt;template repeat="{{alias in user.aliases}}">
  &lt;p>a.k.a. {{alias}}&lt;/p>
&lt;/template>

&lt;p>a.k.a. Lefty&lt;/p>     <span class="nocode" style="color: red"><em>⇐ 1st inner template instance</em></span>

&lt;p>a.k.a. Mr. Clean&lt;/p> <span class="nocode" style="color: red"><em>⇐ 2nd inner template instance</em></span>
                         <span class="nocode" style="color: red"><em> (terminating node for outer template instance)</em></span>


&lt;p>Elaine&lt;/p>           <span class="nocode" style="color: red"><em>⇐ start of 2nd outer template instance</em></span>
&lt;template repeat="{{alias in user.aliases}}">
  &lt;p>a.k.a. {{alias}}&lt;/p>
&lt;/template>

&lt;p>a.k.a. The Wiz&lt;/p>    <span class="nocode" style="color: red"><em>⇐ 1st inner template instance</em></span>
                          <span class="nocode" style="color: red"><em> (terminating node for outer template instance)</em></span>
</pre>
{% endraw %}

In this case, note that the terminating node of the outer instance is the same as the terminating
node of the last inner instance.

### Mutating template-generated DOM nodes

In general, **you shouldn’t need to manually mutate the DOM nodes generated by template bindings** &mdash;
you can do most things you need to do simply by setting up bindings and mutating the model object.

If you _do_ need to mutate the DOM nodes generated by a template, it is safe to do so as long as you
don't remove the terminating node of a template instance. The easiest way to do this is to wrap the
template contents in a container element:

{% raw %}
    <template repeat="{{item in listItems}}">
      <section on-click={{rowSelected}}>
        <h2>{{item.title}}</h2>
        <p>{{item.text}}</p>
      </section>
    </template>
{% endraw %}

In this case, the outer <section> will serve as the terminating node for each template instance. You
can mutate the DOM nodes inside each <section> as long as you don’t remove the <section> node
itself. For example, the rowSelected event handler invoked when a section is clicked could do
something like this:

{% raw %}
    rowSelected: function(e, detail, sender) {
      var blinkTag = document.createElement('blink-tag');
      blinkTag.textContent = 'BREAKING NEWS';
      sender.insertBefore(blinkTag, sender.querySelector('p'));
    }
{% endraw %}

**Note:** In practice, it would be easier and cleaner to set a value on the model and use a conditional
template. This example just demonstrates how the data binding system handles mutation.
{: .alert .alert-info }


Clicking on a row results in a DOM change like this (whitespace added for readability):

{% raw %}
    <template repeat="{{item in listItems}}">
      <section on-click={{rowSelected}}>
        <h2>{{item.title}}</h2>
        <p>{{item.text}}</p>
      </section>
    </template>

    <section>
      <h2>Bigfoot spotted in lower Haight!</h2>
      <p>Police cite, release famous urban legend.</p>
    </section>

    <section>
      <h2>Shadow DOM lands in all major browsers</h2>
      <blink-tag>BREAKING NEWS</blink-tag>
      <p>Cheering crowds greet announcement.</p>
    </section>
{% endraw %}

Because the template identifies each instance by the terminating node, changes to the
instance’s state persist even if the template has to reorder its instances:

{% raw %}
    <template repeat="{{item in listItems}}">
      <section on-click={{rowSelected}}>
        <h2>{{item.title}}</h2>
        <p>{{item.text}}</p>
      </section>
    </template>

    <section>
      <h2>Shadow DOM lands in all major browsers</h2>
      <blink-tag>BREAKING NEWS</blink-tag>
      <p>Cheering crowds greet announcement.</p>
    </section>

    <section>
      <h2>Bigfoot spotted in lower Haight!</h2>
      <p>Police cite, release famous urban legend.</p>
    </section>
{% endraw %}


Of course, if you change one of the values that’s bound, it will be overwritten the next time the
underlying model data changes. The two-way data binding only registers DOM changes to input elements
-- not imperative changes to arbitrary DOM nodes.

## Using data binding outside of a {{site.project_title}} element {#bindingoutside}

This {{site.project_title}} data binding works  _inside_ a {{site.project_title}} element. If you
want to use data binding elsewhere, there are two options:

*   If you're using {{site.project_title}}, use an [auto-binding template](#autobinding)
    to take advantage of data binding without creating a new custom element.

*   If you _aren't_ using the rest of {{site.project_title}}, use the
    [Template Binding](template.html) library directly. The template binding library is
    used internally by {{site.project_title}}, and can be used directly, with or without the rest of
    {{site.project_title}}. (Note that if you use template binding by itself, you cannot use {{site.project_title}}
    expressions.)

**Note:** Earlier versions of {{site.project_title}} included an element called `<polymer-body>`.
If you were using `<polymer-body>` previously, the closest substitute is an auto-binding template.
{: .alert .alert-info }

### Using the auto-binding template element {#autobinding}

The `auto-binding` element is a {{site.project_title}} custom element that extends the standard
`<template>` element. You can use it when you want to use {{site.project_title}} data
binding in a page without having to create a custom element just for this purpose. Auto-binding
templates support a subset of the features available when you create your own custom element:

- Full-featured data binding, with {{site.project_title}} expressions.
- [Declarative event mapping](polymer.html#declarative-event-mapping).
- [Automatic node finding](polymer.html#automatic-node-finding).

For an auto-binding template, the data model is on the template itself. For example, to use data
binding at the top level of a page:

<demo-tabs selected="0" bottom>
  <demo-tab heading="index.html">
{% highlight html %}
{% include_external /samples/databinding/auto-binding.html doc-sample version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <div class="result">
    {% include_external /samples/databinding/auto-binding.html runnable-sample version_prefix:0.5 %}
  </div>
</demo-tabs>

The auto-binding template inserts the instances it creates immediately after
itself in the DOM tree (_not_ in its shadow DOM). In this case, the quotes are
inserted as children of the `body` element.

After adding the instances, the auto-binding template fires the `template-bound`
event:

    template.addEventListener('template-bound', function() {
      // template has been stamped.
    });

The `auto-binding` template is currently included automatically when you load the
{{site.project_title}} library.

## Inserting data-bound HTML {#boundhtml}

The {{site.project_title}} data binding escapes any HTML in the bound data.
This avoids many potential security pitfalls with including arbitrary HTML.

However, for those special cases where you need to add HTML dynamically, {{site.project_title}}
elements provide the `injectBoundHTML` instance method. `injectBoundHTML` replaces
the contents of a target element with an arbitrary block of HTML. Any data binding
expressions in the HTML are bound to the element.

For example, in the following example, a message is injected into the `message_area` `<div>`.

Changing the `message` property changes the data displayed in the `message_area`.

{%raw%}
    <polymer-element name="my-element">
      <template>
        <div id="message_area"></div>
      </template>
      <script>
        Polymer({
          message: 'hi there',
          ready: function() {
            this.injectBoundHTML('<b>{{message}}</b>', this.$.message_area);
          }
        });
      </script>
    </polymer-element>
{%endraw%}

Note that the rules for data binding using `injectBoundHTML` are the same as the rules for
standard data binding. For example, if `message` contains HTML, the HTML is escaped.
