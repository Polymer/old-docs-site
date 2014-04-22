---
layout: default
type: core
navgroup: docs
shortname: Docs
title: Advanced topics
---

{% include toc.html %}


This section covers advanced topics that you don’t need to understand to get data binding working in a {{site.project_title}} application.

## How data binding works

It may be easiest to understand data binding is by understanding what data binding is not -- it doesn’t work like traditional template systems.

In a traditional AJAX application, templating works by replacing innerHTML for some container element. Where the container contains a non-trivial DOM subtree, this has two drawbacks:

Replacing the existing child nodes destroys the transient state of the DOM nodes, such as event listeners and form input values.
The entire set of nodes is destroyed and recreated, even if only a few values change.

In contrast, {{site.project_title}} data binding **makes the smallest changes to the DOM necessary**. The DOM nodes representing a template instance are maintained as long as the corresponding model data is in place.

Consider the following DOM, which represents a template and the template instances it manages: 

{% raw %}
    <table>
        <template repeat="{{items}}">
          <tr><td> {{item.name}} </td><td> {{item.count}} </td></tr>
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
    &lt;template repeat="{{items}}">
      &lt;tr>&lt;td> {{item.name}} &lt;/td>&lt;td> {{item.count}} &lt;/td>&lt;/tr>
    &lt;/template>
   <strong>&lt;tr>&lt;td> Catfish &lt;/td>&lt;td> 8 &lt;/td>&lt;/tr> 
   &lt;tr>&lt;td> Bass &lt;/td>&lt;td> 7 &lt;/td>&lt;/tr></strong>  
   &lt;tr>&lt;td> Trout &lt;/td>&lt;td> 0 &lt;/td>&lt;/tr>   
&lt;/table>
</pre>
{% endraw %}

If you change `item.count` for one of the objects, the only thing that changes in the DOM tree is the binding value (in bold):

{% raw %}
<pre>
&lt;table>
    &lt;template repeat="{{items}}">
      &lt;tr>&lt;td> {{item.name}} &lt;/td>&lt;td> {{item.count}} &lt;/td>&lt;/tr>
    &lt;/template>
   &lt;tr>&lt;td> Catfish &lt;/td>&lt;td> 8 &lt;/td>&lt;/tr> 
   &lt;tr>&lt;td> Bass &lt;/td>&lt;td> 7 &lt;/td>&lt;/tr>  
   &lt;tr>&lt;td> Trout &lt;/td>&lt;td><strong> 2 </strong>&lt;/td>&lt;/tr>   
&lt;/table>
</pre>
{% endraw %}


### How data binding tracks template instances

When a template generates one or more instances, it inserts the instances immediate after itself. So
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
      <template repeat="{{alias is user.aliases}}">
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
  &lt;template repeat="{{alias is user.aliases}}">
     &lt;p>a.k.a. {{alias}}&lt;/p>
  &lt;/template>
&lt;/template>

&lt;p>Bob&lt;/p>              <span class="nocode" style="color: red"><em>⇐ start of 1st outer template instance</em></span>
&lt;template repeat="{{alias is user.aliases}}">
  &lt;p>a.k.a. {{alias}}&lt;/p>
&lt;/template>

&lt;p>a.k.a. Lefty&lt;/p>     <span class="nocode" style="color: red"><em>⇐ 1st inner template instance</em></span>

&lt;p>a.k.a. Mr. Clean&lt;/p> <span class="nocode" style="color: red"><em>⇐ 2nd inner template instance</em></span>
                         <span class="nocode" style="color: red"><em> (terminating node for outer template instance)</em></span>


&lt;p>Elaine&lt;/p>           <span class="nocode" style="color: red"><em>⇐ start of 2nd outer template instance</em></span>
&lt;template repeat="{{alias is user.aliases}}">
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
      <section>
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
      <section>
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

## Using data binding outside of a {{site.project_title}} element

This {{site.project_title}} data binding works  _inside_ a {{site.project_title}} element. If you
want to use data binding elsewhere, there are two options:

*   Make it a {{site.project_title}} element. If you just want to use data binding in a document’s 
    `<body>` element, you can use the `<polymer-body>` element, a {{site.project_title}} element that 
    extends `<body>`.

*   Use the [Template Binding](templates.html) library directly. The template binding library is 
    used internally by {{site.project_title}}, and can be used directly, with or without the rest of    
    {{site.project_title}}.

### Using the {{site.project_title}} body element

The `<polymer-body>` element is a {{site.project_title}} custom element that extends the standard
`<body>` element. You can use it when you want to use {{site.project_title}} features like data
binding in a document without having to create a custom element just for this purpose. For example,
to use data binding at the top level of a document:

{% raw %}
    <body is="polymer-body" unresolved>

      <!-- render data set -->
      <template repeat="{{quotes}}">
        <h3>{{quote}}</h3>
        - <em>{{attribution}}</em>
      </template>

      <script>
        window.model = {
          quotes: [{ 
            attribution: "Plautus", 
            quote: "Let deeds match words."
          }, { 
            attribution: "Groucho Marx", 
            quote: "Time flies like an arrow. Fruit flies like a banana."
          }]
        };
      </script>
    </body>
{% endraw %}

A few things to note: since the `<polymer-body>` element doesn’t have its own model data, you need
to make the model data available to the template by adding a `model` property on `window`. The
`<polymer-body>` element looks for the `window.model` property and gives it special treatment.

The `<polymer-body>` element is currently included automatically when you load the
{{site.project_title}} library.

