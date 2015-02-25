---
layout: default
type: guide
shortname: Docs
title: Data binding overview
subtitle: Data-binding
---

{% include toc.html %}

{{site.project_title}} supports two-way data binding.  Data binding extends HTML and the DOM APIs to support a sensible separation between the UI (DOM) of an application and its underlying data (model). Updates to the model are reflected in the DOM and user input into the DOM is immediately assigned to the model.

For {{site.project_title}} elements, **the model is always the element itself**. For example, consider a simple element:

{% raw %}
    <polymer-element name="name-tag">
      <template>
        This is <b>{{owner}}</b>'s name-tag element.
      </template>
      <script>
        Polymer('name-tag', {
          // initialize the element's model
          ready: function() {
            this.owner = 'Rafael';
          }
        });
      </script>
    </polymer-element>
{% endraw %}

Here the `owner` property is the model for the `name-tag` element. If you update the `owner` property:

    document.querySelector('name-tag').owner = 'June';

You change the contents of the tag:

This is **June**'s name-tag element.

## The `<template>` element {#template}

The HTML Template element allows you to declare chunks of inert HTML that can be cloned and used at some later point. The contents of the `<template>` element are _hidden_ in the sense that they aren't rendered in the browser and can't be retrieved by `querySelector`; and _inactive_ in the sense that they don't cause resources to be loaded or scripts to be run.

In {{site.project_title}}, templates have two special purposes:

*   In a {{site.project_title}} element declaration, the first (top-level) `<template>` element is used
    to define the custom element's shadow DOM.

*   Inside a {{site.project_title}} element, you can use templates with data binding to render dynamic
   content.

**Note:** The `<template>` element is a new element in the HTML standard. For information on using templates
_outside_ of {{site.project_title}}, see [HTML's New  Template Tag](http://www.html5rocks.com/tutorials/webcomponents/template/)
on HTML5Rocks.
{: .alert .alert-info }

## Templates with data binding

Templates by themselves are useful. {{site.project_title}} adds declarative, two-way data
binding to templates. Data binding lets you assign, or bind, a JavaScript object as the template’s _data model_.  A bound template can:

*   Maintain a single copy of the template’s contents (a _template instance_). The template
    instance is inserted in the DOM tree as a sibling of the original template.

*   Maintain  a _set of template instances_ for each item in an array, where each instance is
    bound to an item in the array.

*   Maintain two-way _bindings_ inside each template instance between values in DOM nodes
     and the model data bound to the instance.

To see how this works, here's an example {{site.project_title}} element that uses data binding:

{%raw%}
    <polymer-element name="greeting-tag">
      <!-- outermost template defines the element's shadow DOM -->
      <template>
        <ul>
          <template repeat="{{s in salutations}}">
            <li>{{s.what}}: <input type="text" value="{{s.who}}"></li>
          </template>
        </ul>
      </template>
      <script>
        Polymer('greeting-tag', {
          ready: function() {
            // populate the element’s data model
            // (the salutations array)
            this.salutations = [
              {what: 'Hello', who: 'World'},
              {what: 'GoodBye', who: 'DOM APIs'},
              {what: 'Hello', who: 'Declarative'},
              {what: 'GoodBye', who: 'Imperative'}
            ];
          }
        });
      </script>
    </polymer-element>
{%endraw%}


As usual, this custom element includes an outer `<template>` element to define its shadow DOM, as shown in [Element declaration](polymer.html#element-declaration).

Inside that template, there's a second template that contains
expressions surrounded by double-mustache {%raw%}`{{`&nbsp;`}}`{%endraw%} symbols:

{%raw%}
    <template repeat="{{s in salutations}}">
      <li>{{s.what}}: <input type="text" value="{{s.who}}"></li>
    </template>
{%endraw%}

What's going on in this template?

* The {%raw%}`repeat="{{s in salutations}}"`{%endraw%} tells the template to
  generate a DOM fragment (or instance) for each element in the `salutations` array.

*  The contents of the template define what each instance looks like.
   In this case, it contains a `<li>` with a text node and an `<input>` as its children.

*  The expressions {%raw%}`{{s.what}}`{%endraw%} and {%raw%}`{{s.who}}`{%endraw%} create
   data bindings to objects in the `salutations` array.

The values inside the {%raw%}`{{`&nbsp;`}}`{%endraw%} are <em>{{site.project_title}} expressions</em>. In the examples in this section, the expressions are either  JavaScript objects (like `salutations`) or paths (like `salutations.who`). (Expressions can also include literal values and some operators --
see [Expressions](#expressions) for details.)

When you create a `<greeting-tag>` element, it initializes the `salutations` array:

    this.salutations = [
      {what: 'Hello', who: 'World'},
      {what: 'Goodbye', who: 'DOM APIs'},
      {what: 'Hello', who: 'Declarative'},
      {what: 'Goodbye', who: 'Imperative'}
    ];

Notice that this is just JavaScript data: **there's no need to import your data into special observable objects**. The `this.salutations` array serves as the _model_ for the template.

The template is set in motion when you create or modify the model. Here's the result:

![ScreenShot](/images/databinding/example-1.png)

and here's what the DOM looks like:

![ScreenShot](/images/databinding/example-1-dom.png)

You can see that the template created four instances immediately following its position in the document.

## Dynamic, two-way data binding

Unlike server-side templating, {{site.project_title}} data binding is _dynamic_. If you change a value in the model, the DOM observes the change and updates accordingly. The following sample adds a method to update the model. Press the button, and you can see the model data instantly reflected in
the DOM.

<link rel="import" href="../../samples/databinding/greeting-tag.html">

<demo-tabs selected="1" bottom>
  <demo-tab heading="greeting-tag.html">
{% highlight html %}
{% include_external /samples/databinding/greeting-tag.html version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="greeting-tag.js">
{% highlight html %}
{% include_external /samples/databinding/greeting-tag.js version_prefix:0.5 %}
{% endhighlight %}
  </demo-tab>
  <demo-tab heading="index.html">
{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <script src="webcomponents.min.js"></script>
    <link rel="import" href="greeting-tag.html">
  </head>
  <body>
    <greeting-tag></greeting-tag>
  </body>
</html>
{% endhighlight %}
  </demo-tab>
  <div class="result">
    <greeting-tag></greeting-tag>
  </div>
</demo-tabs>

However, the DOM doesn't just observe data in the model. When you bind a DOM element that collects user input, it _pushes_ the collected value into the model.

![ScreenShot](/images/databinding/input-to-model.png)

**Note:** You can use [change watchers and observe blocks](polymer.html#observeprops) to trigger
custom behavior when the model data changes.
{: .alert .alert-info }

Lastly, see what happens when you add and remove items from the `salutations` array:

![ScreenShot](/images/databinding/update-model-array.png)

The `repeat` attribute ensures there is one instance for each item in the
array. We removed two elements from the middle of `salutations` and inserted one in their place. The
`<template>` responded by removing the two corresponding instances and creating a new one in the right location.

Getting the idea? Data binding allows you author your HTML _using_ HTML which contains information about
_where data goes_ and directives which _control the document's structure_ -- all depending on the data you provide it.

## Event handling and data binding

With data binding, it's easy to add event handlers using the
[declarative event mapping](polymer.html#declarative-event-mapping) (on-_event_ handlers):

{%raw%}
    <template>
      <ul>
        <template repeat="{{s in stories}}">
          <li on-click="{{selectStory}}">{{s.headline}}</li>
        </template>
      </ul>
    </template>
{%endraw%}

Often, you'll want to identify the event with the model data used to generate
the template instance, either to update the model data or to access a piece
of data that isn't rendered by the template.

You can get the model data from the event's `target.templateInstance.model`
property. Any identifiers that you could access inside the template are
available as properties on the `.model` object.

For example, the  `selectStory` method might look like this:

    selectStory: function(e, detail, sender) {
      var story = e.target.templateInstance.model.s;
      console.log("Clicked " + story.headline);
      this.loadStory(story.id); // accessing non-rendered data from the model
    }

Continue on to:

<a href="binding-types.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Types of bindings</paper-button>
</a>

<a href="expressions.html">
  <paper-button raised><core-icon icon="arrow-forward"></core-icon>Expressions</paper-button>
</a>
