---
layout: default
type: core
navgroup: docs
shortname: Docs
title: 数据绑定概述
subtitle: 数据绑定
---

{% include toc.html %}


{{site.project_title}} 支持双向的数据绑定。数据绑定通过扩展 HTML 和 DOM API 来支持应用的 UI (DOM) 及其底层数据 (数据模型) 之前的有效分离。更新数据模型会反映在 DOM 上，而 DOM 上的用户输入会立即赋值到数据模型上。

对于 {{site.project_title}} elements 来说，**数据模型始终就是 element 本身**。比如想想这个简单的 element：

{% raw %}
    <polymer-element name="name-tag">
      <template>
        这是一个 <b>{{owner}}</b> 的 name-tag element。
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

这里的 `owner` 属性就是 `name-tag` element 的数据模型。如果你更新了 `owner` 属性：

    document.querySelector('name-tag').owner = 'June';

你就改变了这个 tag 的内容：

这是一个 **June** 的 name-tag element。



## The `<template>` element {#template}

HTML Template element 允许你声明一段惰性 HTML，即可以稍后被克隆使用。`<template>` element 的内容是_隐藏着_的——即它们无法在浏览器里被渲染，也无法通过 `querySelector` 被获取；并且是_不活跃_——即它们不会导致资源加载或脚本执行。

在 {{site.project_title}} 中，templates 具有两个特殊的目的：

*   在一个 {{site.project_title}} element 声明中，第一个 (顶级的) `<template>` element 是用来定义 custom element 的 shadow DOM 的。

*   在一个 {{site.project_title}} element 里，你可以使用带有动态渲染数据绑定内容的 templates。

**注意：** `<template>` element 是一个 HTML 标准里的新 element。在 {{site.project_title}} _之外_使用 tempaltes 的更多信息请移步至 HTML5Rocks 上的 [HTML 的新标签 Template](http://www.html5rocks.com/tutorials/webcomponents/template/)。
{: .alert .alert-info }

## 带有数据绑定的 templates

Templates 自身是很有用的。{{site.project_title}} 为 templates 增加了声明式、双向数据绑定。数据绑定让你以 template 的_数据模型_的方式赋值或绑定一个 JavaScript 对象。一个绑定好的 template 能够：

*   维护一个 template 内容 (一个 _template 实例_) 的单独拷贝。Template 实例会被作为一个源 template 的兄弟插入到 DOM 树中。

*   为数组里的项目维护 _一套 template 实例_，每个实例都绑定到了数组中各自的项目上。

*   在每组 template 实例的 DOM 结点和数据模型之间维护双向_绑定_。

为了弄清楚它的工作原理，这里有一个 {{site.project_title}} element 使用数据绑定的例子：

{%raw%}
    <polymer-element name="greeting-tag">
      <!-- 最外面的 template 定义了 element 的 shadow DOM -->
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
            // 植入 element 的数据模型 (数组 salutations)
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


如 [Element 声明](polymer.html#element-declaration)中展示的，通常这个 custom element 包含一个外层的 `<template>` element 来定义其 shadow DOM。

在其 template 里，有另一个 template，它包含了包裹着双 mustache 符号 {%raw%}`{{`&nbsp;`}}`{%endraw%} 的表达式：

{%raw%}
    <template repeat="{{s in salutations}}">
      <li>{{s.what}}: <input type="text" value="{{s.who}}"></li>
    </template>
{%endraw%}

这个 template 会发生什么？

*  该 {%raw%}`repeat="{{s in salutations}}"`{%endraw%} 告诉 template 为 `salutations` 数组中的 element 生成一个 DOM 片段 (或实例)。

*   template 的内容定义了每个示例的展现。在这个例子中，它包括了一个子结点带有一个文本节点和一个 `<input>` 的 `<li>`。

*   表达式 {%raw%}`{{s.what}}`{%endraw%} 和 {%raw%}`{{s.who}}`{%endraw%} 创造了数组 `salutations` 中对象的数据绑定。

{%raw%}`{{`&nbsp;`}}`{%endraw%} 中的值是 <em>{{site.project_title}} 表达式</em>。在本章节的例子中，表达式是 JavaScript 对象 (如 `salutations`) 或路径 (如 `salutations.who`)。(表达式也可以包含字面量的值和一些操作符——更多细节参见[表达式](#expressions)。)

当你创建一个 `<greeting-tag>` element 时，它会初始化 `salutations` 数组：

    this.salutations = [
      {what: 'Hello', who: 'World'},
      {what: 'Goodbye', who: 'DOM APIs'},
      {what: 'Hello', who: 'Declarative'},
      {what: 'Goodbye', who: 'Imperative'}
    ];

注意这只是 JavaScript 数据：**无需把你的数据导入特殊的可监视对象中**。数组 `this.salutations` 被视为该 template 的_数据模型_。

当你创建或修改数据模型时 template 会被及时的设置。结果如图所示：

![截图](/images/databinding/example-1.png)

这是 DOM 的样子：

![截图](/images/databinding/example-1-dom.png)

你可以看到 template 紧随其文档的位置立刻创建了四个实例。


## 动态的双向数据绑定

和服务端的 templating 不同，{{site.project_title}} 的数据绑定是_动态_的。如果你改变了数据模型里的值，DOM 会监视其变化并进行相应的更新。下面的例子添加了一个更新数据模型的方法。按下按钮，你就可以看到数据模型立即反应在了 DOM 上。

{% include samples/databinding/greeting-tag.html %}

其实 DOM 不只是监视数据模型里的数据。当你绑定了一个采集用户输入的 DOM element 时，它会把采集到的值_推送_回数据模型。

![截图](/images/databinding/input-to-model.png)

**注意：**当数据模型里的数据改变时，你可以使用[变化观察者和监视代码块](polymer.html#observeprops)来触发自定义行为。
{: .alert .alert-info }

最后，来看看当你添加或删除 `salutations` 数组里的项目时会发生什么：

![截图](/images/databinding/update-model-array.png)

这里的 `repeat` 特性确保了数组的每个项目都对应了一个实例。我们从 `salutations` 的中间移除了两个 element，并在这里插入了一个实例。`<template>` 移除了那两个相应的实例并在原地创建了一个新的作为回应。

看懂了吗？数据绑定允许你_直接用_包含_数据去哪儿_以及_控制文档结构_指令的信息的 HTML 撰写你的 HTML——一切依赖你提供的数据。

## 事件处理和数据绑定

我们很容易通过[声明式事件映射](polymer.html#declarative-event-mapping)添加带有数据绑定的事件句柄 (on-_event_ 句柄)：

{%raw%}
    <template>
      <ul>
        <template repeat="{{s in stories}}">
          <li on-click={{selectStory}}>{{s.headline}}</li>
        </template>
      </ul>
    </template>
{%endraw%}

通常，你希望可以标识带有数据模型的事件并以此生成 template 实例，不论是更新数据模型还是访问一段并没有通过 template 渲染的数据。

你可以从事件的 `target.templateInstance.model` 属性中获取数据模型。任何你可以在 template 访问的标识符都可以作为 `.model` 对象的属性。

比如，这里的 `selectStory` 方法可以被看做：

    selectStory: function(e, detail, sender) {
      var story = e.target.templateInstance.model.s;
      console.log("Clicked " + story.headline);
      this.loadStory(story.id); // 访问数据模型中未被渲染的数据
    }

继续看：

<a href="/docs/polymer/binding-types.html">
  <paper-button icon="arrow-forward" label="绑定的类型" raisedButton></paper-button>
</a>

<a href="/docs/polymer/expressions.html">
  <paper-button icon="arrow-forward" label="表达式" raisedButton></paper-button>
</a>
