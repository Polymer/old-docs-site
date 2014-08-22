---
layout: default
type: core
navgroup: docs
shortname: Docs
title: API developer guide
subtitle: Guide
---

{% include toc.html %}

{{site.project_title}} _core_ 在 web components 之上提供了一层薄薄的 API。它表达了 {{site.project_title}} 的主张，并额外提供 {{site.project_title}} elements 使用的语法糖，以简化 web components 的开发。

## Element 声明

{{site.project_title}} 的核心是 [Custom Elements](/platform/custom-elements.html)。因此毫无疑问，定义一个 {{site.project_title}} element 的方式应该和定义一个标准的 Custom Element 是一样的。它们之间主要的区别在于 {{site.project_title}} elements 是通过声明式使用 `<polymer-element>` 来创建的。

    <polymer-element name="tag-name" constructor="TagName">
      <template>
        <!-- shadow DOM here -->
      </template>
      <script>Polymer('tag-name');</script>
    </polymer-element>

### 特性(Attributes)

{{site.project_title}} 为 `<polymer-element>` 储备了一些特殊的特性:

<table class="table responsive-table attributes-table">
  <tr>
    <th>特性</th><th>是否必填？</th><th>描述</th>
  </tr>
  <tr>
    <td><code>name</code></td><td><b>必填</b></td><td>为 custom element 的名字。需要包含一个“-”。</td>
  </tr>
  <tr>
    <td><code>attributes</code></td><td>选填</td><td>用于<a href="#published-properties">公开的属性 (properties)</a>。</td>
  </tr>
  <tr>
    <td><code>extends</code></td><td>选填</td><td>用于<a href="#extending-other-elements">扩展其它 elements</a>。</td>
  </tr>
  <tr>
    <td><code>noscript</code></td><td>选填</td><td>用于不需要调用 <code>Polymer()</code> 的简单的 element。请移步至<a href="#altregistration">注册 element 的其它方法</a>。</td>
  </tr>
  <tr>
    <td><code>constructor</code></td><td>选填</td><td>放到全局对象中的构造函数的名字。允许用户通过 <code>new</code> 操作 (如：<code>var tagName = new TagName()</code>) 创建你的 element 的实例。</td>
  </tr>
</table>

#### 默认特性 {#defaultattrs}

你在 `<polymer-element>` 上声明的其它特性会自动包含在每个 element 的实例中。比如：

    <polymer-element name="tag-name" class="active" mycustomattr>
      <template>...</template>
      <script>Polymer('tag-name');</script>
    </polymer-element>

当一个 `<tag-name>` 的实例被创建时，它会作为默认特性包含 `class="active" mycustomattr`：

    <tag-name class="active" mycustomattr></tag-name>

#### 特性的大小写敏感性 {#attrcase}

值得一提的是，HTMl 解析器对于特性名是*大小写不敏感*的。JavaScript 中的属性名则是*大小写敏感*的。

这意味着特性可以以你喜欢的任意形式书写，但是如果查看一个 element 的特性列表时，它们的名字都是小写的。Polymer 警惕这件事，并且将会仔细的尝试将特性匹配为属性。比如，这段代码会如我们期待的那样工作：

    <name-tag nameColor="blue" name="Blue Name"></name-tag>

事实上 `nameColor` 特性在 DOM 里是全小写的。

这也意味着下面的例子都可以正常工作：

    <name-tag NaMeCoLoR="blue" name="Blue Name"></name-tag>
    <name-tag NAMECOLOR="red" name="Red Name"></name-tag>
    <name-tag NAMEcolor="green" name="Green Name"></name-tag>

### 注册 element 的其它方法 {#altregistration}

为了方便把标记和脚本解耦，你不需要把脚本内联。{{site.project_title}} elements 可以通过引用一个外部的脚本调用 `Polymer('tag-name')` 进行创建：

    <!-- 1. 脚本在 element 定义内部被引用。 -->
    <polymer-element name="tag-name">
      <template>...</template>
      <script src="path/to/tagname.js"></script>
    </polymer-element>

    <!-- 2. 脚本在 element 定义之前执行。 -->
    <script src="path/to/tagname.js"></script>
    <polymer-element name="tag-name">
      <template>...</template>
    </polymer-element>

    <!-- 3. 没有脚本 -->
    <polymer-element name="tag-name" constructor="TagName" noscript>
      <template>
        <!-- shadow DOM here -->
      </template>
    </polymer-element>

#### 命令式注册 {#imperativeregister}

Elements 可以通过如下纯 JavaScript 的方式注册：

    <script>
      Polymer('name-tag', {nameColor: 'red'});
      var el = document.createElement('div');
      el.innerHTML = '\
        <polymer-element name="name-tag" attributes="name">\
          <template>\
            Hello <span style="color:{%raw%}{{nameColor}}{%endraw%}">{%raw%}{{name}}{%endraw%}</span>\
          </template>\
        </polymer-element>';
      // 在你将其放入 DOM 之前，custom elements polyfill 是无法用在 <polymer-element> 上的。
      document.body.appendChild(el);
    </script>

    <name-tag name="John"></name-tag>

注意你需要把 `<polymer-element>` 添加到文档中以便 Custom Elements polyfill 可以对其进行处理。

### 添加公开的属性和方法 {#propertiesmethods}

如果你希望 (可选的) 在你的 element 上定义方法/属性，请向 `Polymer()` 的第二个参数传递一个对象。这个对象用来定义该 element 的 `prototype`。

下面的例子定义了一个 `message` 属性、一个基于 ES5 getter 的 `greeting` 属性以及一个 `foo` 方法：

    <polymer-element name="tag-name">
      <template>{{greeting}}</template>
      <script>
        Polymer('tag-name', {
          message: "Hello!",
          get greeting() {
            return this.message + ' there!';
          },
          foo: function() {...}
        });
      </script>
    </polymer-element>

**注意：** 在一个 {{site.project_title}} element 里 `this` 引用了 custom element 自身。比如 `this.localName == 'tag-name'`。
{: .alert .alert-info }

**重要：** 请小心初始化的属性是对象或数组的情况。由于 `prototype` 本来就是共享的，这可能会在相同 element 的实例之间产生非预期的“共享状态”。如果你想初始化一个数组或对象，请在 `created` 回调中完成它，而不是直接定义在 `prototype` 里。

    // 正确的！
    Polymer('x-foo', {
      created: function() {
        this.list = []; // 初始化并明确数组类型。
        this.person = {}; // 初始化并明确对象类型。
      }
    });

    // 错误的。
    Polymer('x-foo', {
      list: [], // 别在 prototype 里初始化数组或对象。
      person: {}
    });

### 增加私有的或静态的变量 {#static}

如果你需要 element 中具有私有状态，请用类似匿名自调用函数的标准技术包裹你的脚本：

    <polymer-element name="tag-name">
      <template>...</template>
      <script>
        (function() {
          // 只运行一次。对于 element 来说是私有并且静态的。
          var foo_ = new Foo();

          // 会为每个被创建的 element 实例运行。
          Polymer('tag-name', {
            get foo() { return foo_; }
          });
        })();
      </script>
    </polymer-element>



### 支持全局变量 {#global}

有的时候你喜欢一次定义一个应用的全局属性，并可以在内部的所有 elements 里可用。比如，你可能想定义配置信息并引用在独立的组件内部。你可能想为所有的动画公用一个单一减缓曲线。你可能想存储我们认为是全局的诸如已登录用户的信息。

为了达到这一目的，你可以使用 [MonoState 模式](http://c2.com/cgi/wiki?MonostatePattern)。当定义一个 {{site.project_title}} element 时，定义一个闭包，包含这些变量，然后在对象的原型上提供访问器,或在构造函数里把它们复制到独立的实例中。

    <polymer-element name="app-globals">
      <script>
      (function() {
        var firstName = 'John';
        var lastName = 'Smith';

        Polymer('app-globals', {
           ready: function() {
             this.firstName = firstName;
             this.lastName = lastName;
           }
        });
      })();
      </script>
    </polymer-element>

然后如你所愿使用这些 element，并绑定数据到一个属性，你可以通过 {{site.project_title}} 的 data-binding 对这一属性进行访问：

    <polymer-element name="my-component">
      <template>
        <app-globals id="globals"></app-globals>
        <div id="firstname">{{globals.firstName}}</div>
        <div id="lastname">{{globals.lastName}}</div>
      </template>
      <script>
        Polymer('my-component', {
          ready: function() { this.globals = this.$.globals; }
         });
      </script>
    </polymer-element>

一个小小的建议可以让你在外部配置全局的值：

    <polymer-element name="app-globals" attributes="values">
      <script>
      (function() {
        var values = {};

        Polymer('app-globals', {
           ready: function() {
             this.values = values;
             for (var i = 0; i < this.attributes.length; ++i) {
               var attr = this.attributes[i];
               values[attr.nodeName] = attr.nodeValue;
             }
           }
        });
      })();
      </script>
    </polymer-element>


主页面通过传递特性进行全局配置：

    <app-globals firstName="Addy" lastName="Osmani"></app-globals>


### Element 的生命周期方法 {#lifecyclemethods}

{{site.project_title}} 对 Custom Element 的生命周期回调有最高等级的支持，为了方便起见，实现了它们的短名称。

所有的生命周期回调都是可选的：

    Polymer('tag-name', {
      created: function() { ... },
      ready: function() { ... },
      attached: function () { ... },
      domReady: function() { ... },
      detached: function() { ... },
      attributeChanged: function(attrName, oldVal, newVal) {
        //var newVal = this.getAttribute(attrName);
        console.log(attrName, 'old: ' + oldVal, 'new:', newVal);
      },
    });

下面是基于 Custom Element [规范](https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/index.html#custom-element-lifecycle)的一个生命周期方法以及 {{site.project_title}} 使用的名字的表格。

规范 | {{site.project_title}} | 调用时机
|-
createdCallback | created | 一个 element 实例被创建。
- | ready | 该 `<polymer-element>` 已经完全准备好了 (如 shadow DOM 已被创建、属性观察者已设置、事件监听者已绑定等)。
attachedCallback | attached | 一个 element 的实例被插入到 DOM 中。
- | domReady | 当 element 的子元素初始化设置确保存在时被调用。这是针对其 element 的父元素或 light DOM 子元素的好时机。另一个用法是当你拥有兄弟 custom elements 的时候 (比如它们是通过 `.innerHTML` 同时写在一起的)。在 element A 可以使用 B 的 API/属性之前，element B 需要被升级。该 `domReady` 回调确保了这两个 elements 都存在。
detachedCallback | detached | 一个实例从 DOM 中被移除时。
attributeChangedCallback | attributeChanged | 一个特性被添加、移除或更改时。**注意：**为了观察[公开的属性](#published-properties)的改变，请使用 [changed watchers](#change-watchers)。
{: .table .responsive-table .lifecycle-table }

### polymer-ready 事件 {#polymer-ready}

{{site.project_title}} 解析 element 定义并_异步_处理它们的升级。如果你在 element 可以升级之前从 DOM 里过早的获取了它，那么你会被作为一个 `HTMLUnknownElement` 来面对。{{site.project_title}} elements 也支持内联资源，比如需要加载的样式表。如果它们在渲染 element 之前还没有完全载入，就可能导致 [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content) 事件。为了避免 FOUC，{{site.project_title}} 推迟了注册 elements 直到样式表完全被加载。

为了知道 elements 何时被注册/升级且对交互准备就绪，请使用 `polymer-ready` 事件。

    <head>
      <link rel="import" href="path/to/x-foo.html">
    </head>
    <body>
      <x-foo></x-foo>
      <script>
        window.addEventListener('polymer-ready', function(e) {
          var xFoo = document.querySelector('x-foo');
          xFoo.barProperty = 'baz';
        });
      </script>
    </body>

## Features {#features}

### Published properties

When you _publish_ a property name, you're making that property part of the
element's "public API". Published properties have the following features:

*   Support for two-way, declarative data binding.

*   Declarative initialization using an HTML attribute with a matching name.

*   Optionally, the current value of a property can be _reflected_ back to an
    attribute with a matching name.

**Note:** Property names are case sensitive, but attribute names are not.
{{site.project_title}} matches each property name with the corresponding
attribute name, as described in [Attribute case sensitivity](#attrcase). This
means you can't publish two properties distinguished only by capitalization (for
example, `name` and `NAME`).
{: .alert .alert-info }

There are two ways to publish a property:

*   **Preferred** - Include its name in the `<polymer-element>`'s `attributes`
    attribute.
*   Include the name in a `publish` object on your prototype.

As an example, here's an element that publishes three public properties, `foo`,
`bar`, and `baz`, using the `attributes` attribute:

    <polymer-element name="x-foo" attributes="foo bar baz">
      <script>
        Polymer('x-foo');
      </script>
    </polymer-element>

And here's one using the `publish` object:

    <polymer-element name="x-foo">
      <script>
        Polymer('x-foo', {
          publish: {
            foo: 'I am foo!',
            bar: 5,
            baz: {
              value: false,
              reflect: true
            }
          }
        });
      </script>
    </polymer-element>

Note that the `baz` property uses a different format, to enable
[attribute reflection](#attrreflection).

Generally it's preferable to use the `attributes` attribute because it's the
declarative approach and you can easily see all of the exposed properties at the
top of the element.

You should opt for the `publish` object when any of the following is true:

*   Your element has many properties and placing them all on one line feels
    unwieldy.
*   You want to define default values for properties and prefer the DRYness of
    doing it all in one place.
*   You need to reflect changes from the property value back to the corresponding
    attribute.

#### Default property values

By default, properties defined in `attributes` are initialized to `null`:

    <polymer-element name="x-foo" attributes="foo">
      <script>
        // x-foo has a foo property with default value of null.
        Polymer('x-foo');
      </script>
    </polymer-element>

Specifically, {{site.project_title}} adds `foo` to the element's prototype with a value of `null`.

You can provide your own default values by explicitly specifying the default value on the elment's `prototype`:

    <polymer-element name="x-foo" attributes="bar">
      <script>
        Polymer('x-foo', {
          // x-foo has a bar property with default value false.
          bar: false
        });
      </script>
    </polymer-element>

Or you can define the whole thing using the `publish` property:

    <polymer-element name="x-foo">
      <script>
        Polymer('x-foo', {
          publish: {
            bar: false
          }
        });
      </script>
    </polymer-element>

For property values that are objects or arrays, you should set the default value
in the `created` callback instead. This ensures that a separate object is
created for each instance of the element:

    <polymer-element name="x-default" attributes="settings">
      <script>
        Polymer('x-default', {
          created: function() {
            // create a default settings object for this instance
            this.settings = {
              textColor: 'blue';
            };
          }
        });
      </script>
    </polymer-element>


#### Configuring an element via attributes

Attributes are a great way for users of your element to configure it,
declaratively. They can customize a published property by setting its initial
value as the attribute with the corresponding name:

    <x-foo name="Bob"></x-foo>

If the property value isn't a string, {{site.project_title}} tries to convert
the attribute value to the appropriate type.

The connection from attribute to property is _one way_. Changing the property
value does **not** update the attribute value, unless
[attribute reflection](#attrreflection) is enabled for the property.

**Note**: Configuring an element using an attribute shouldn't be confused with
[data binding](databinding.html). Data binding to a published property is
by-reference, meaning values are not serialized and deserialized to strings.
{: .alert .alert-info}

##### Hinting a property's type {#attrhinting}

When attribute values are converted to property values, {{site.project_title}}
attempts to convert the value to the correct type, depending on the default
value of the property.

For example, suppose an `x-hint` element has a `count` property that defaults to `0`.

    <x-hint count="7"></x-hint>

Since `count` has a Number value, {{site.project_title}} converts
the string "7" to a Number.

If a property takes an object or array, you can configure it using a
double-quoted JSON string. For example:

    <x-name fullname='{ "first": "Bob", "last": "Dobbs" }'></x-name>

This is equivalent to setting the element's `fullname` property to an object
literal in JavaScript:

    xname.fullname = { first: 'Bob', last: 'Dobbs' };

The default value can be set on the prototype itself, in
the `publish` object, or in the `created` callback. The following element
includes an unlikely combination of all three:

    <polymer-element name="hint-element" attributes="isReady items">
      <script>
        Polymer('hint-element', {

          // hint that isReady is a Boolean
          isReady: false,

          publish: {
            // hint that count is a Number
            count: 0
          },

          created: function() {
            // hint that items is an array
            this.items = [];
          }
        });
      </script>
    </polymer-element>

**Important:** For properties that are objects or arrays, you should always
initialize the properties in the `created` callback. If you set the default
value directly on the `prototype` (or on the `publish` object), you may run into
unexpected "shared state" across different instances of the same element.
{: .alert .alert-error }

#### Property reflection to attributes {#attrreflection}

Property values can be _reflected_ back into the matching attribute. For
example, if reflection is enabled for the `name` property, setting
`this.name = "Joe"` from within an element is equivalent to  calling
`this.setAttribute('name', 'Joe')`.  The element updates the DOM accordingly:

    <x-foo name="Joe"></x-foo>

Property reflection is only useful in a few cases, so it is off by default.
You usually only need property reflection if you want to style an element based
on an attribute value.

To enable reflection, define the property in the `publish` block.
Instead of a simple value:

<pre>
<var>propertyName</var>: <var>defaultValue</var>
</pre>

Specify a reflected property using this format:

<pre>
<var>propertyName</var>: {
  <b>value:</b> <var>defaultValue</var>,
  <b>reflect:</b> <b>true</b>
}
</pre>

The property value is serialized to a string based on its data type. A
few types get special treatment:

*   If the property value is an object, array, or function, the value is
    **never** reflected, whether or not `reflect` is `true`.

*   If the property value is boolean, the attribute behaves like a standard
    boolean attribute: the reflected attribute appears only if the value is
    truthy.

Also, note that the initial value of an attribute is **not** reflected, so the
reflected attribute does not appear in the DOM unless you set it to a different
value.

For example:

    <polymer-element name="disappearing-element">
      <script>
        Polymer('disappearing-element', {
          publish: {
            hidden: {
              value: false,
              reflect: true
            }
          }
        });
      </script>
    </polymer-element>

Setting `hidden = true` on a `<disappearing-element>` causes the `hidden`
attribute to be set:

    <disappearing-element hidden>Now you see me...</disappearing-element>

Attribute _reflection_ is separate from data binding. Two-way data binding is
available on published properties whether or not they're reflected. Consider the
following:

    <my-element name="{%raw%}{{someName}}{%endraw%}"></my-element>

If the `name` property is _not_ set to reflect, the `name` attribute always
shows up as `name="{%raw%}{{someName}}{%endraw%}"` in the DOM. If `name` _is_
set to reflect, the DOM attribute reflects the current value of `someName`.

### Data binding and published properties

Published properties are data-bound inside of {{site.project_title}} elements
and accessible via `{%raw%}{{}}{%endraw%}`. These bindings are by reference and
are two-way.

For example, we can define a `name-tag` element that publishes two properties,
`name` and `nameColor`.

    <polymer-element name="name-tag" attributes="name nameColor">
      <template>
        Hello! My name is <span style="color:{%raw%}{{nameColor}}{%endraw%}">{%raw%}{{name}}{%endraw%}</span>
      </template>
      <script>
        Polymer('name-tag', {
          nameColor: "orange"
        });
      </script>
    </polymer-element>

In this example, the published property `name` has initial value of `null` and `nameColor` has a value of "orange". Thus, the `<span>`'s color will be orange.

For more information see the [Data binding overview](databinding.html).

### Computed properties

In addition to standard published properties, you can define 
properties that are computed based on other property values.

Computed properties are defined in the `computed` object on the
element's prototype:

<pre class="nocode">
<b>computed: {</b>
  <var>property-name</var><b>: '</b><var>expression</var><b>'
}</b>
</pre>

Each computed property is defined by a property name and a 
[Polymer expression](/docs/polymer/expressions.html). The value
of the computed property is updated dynamically whenever one of 
the input values in the expression changes. 

In the following example, when you update the input value,
`num`, the computed property `square` updates automatically.

{% include samples/computed-property.html %}

**Limitations**: Currently, computed properties aren't published
so they can't be data bound from _outside_ the element. For example,
you can't bind to the `square` property on `square-element` using
 `<square-element square="{%raw%}{{value}}{%endraw%}>`. This
is [a known issue](https://github.com/Polymer/polymer/issues/638).
{: .alert .alert-warning }

### Declarative event mapping

{{site.project_title}} supports declarative binding of events to methods in the component.
It uses special <code>on-<em>event</em></code> syntax to trigger this binding behavior.

    <polymer-element name="g-cool" on-keypress="{% raw %}{{keypressHandler}}{% endraw %}">
      <template>
        <button on-click="{% raw %}{{buttonClick}}{% endraw %}"></button>
      </template>
      <script>
        Polymer('g-cool', {
          keypressHandler: function(event, detail, sender) { ...},
          buttonClick: function(event, detail, sender) { ... }
        });
      </script>
    </polymer-element>

In this example, the `on-keypress` declaration maps the standard DOM `"keypress"` event to the `keypressHandler` method defined on the element. Similarly, a button within the element
declares a `on-click` handler for click events that calls the `buttonClick` method.
All of this is achieved without the need for any glue code.

Some things to notice:

* The value of an event handler attribute is the string name of a method on the component. Unlike traditional syntax, you cannot put executable code in the attribute.
* The event handler is passed the following arguments:
  * `inEvent` is the [standard event object](http://www.w3.org/TR/DOM-Level-3-Events/#interface-Event).
  * `inDetail`: A convenience form of `inEvent.detail`.
  * `inSender`: A reference to the node that declared the handler. This is often different from `inEvent.target` (the lowest node that received the event) and `inEvent.currentTarget` (the component processing the event), so  {{site.project_title}} provides it directly.

### Observing properties {#observeprops}

#### Changed watchers {#change-watchers}

The simplest way to observe property changes on your element is to use a changed watcher.
All properties on {{site.project_title}} elements can be watched for changes by implementing a <code><em>propertyName</em>Changed</code> handler. When the value of a watched property changes, the appropriate change handler is automatically invoked.

    <polymer-element name="g-cool" attributes="better best">
      <script>
        Polymer('g-cool', {
          better: '',
          best: '',
          betterChanged: function(oldValue, newValue) {
            ...
          },
          bestChanged: function(oldValue, newValue) {
            ...
          }
        });
      </script>
    </polymer-element>

In this example, there are two watched properties, `better` and `best`. The `betterChanged` and `bestChanged` function will be called whenever `better` or `best` are modified, respectively.

#### Custom property observers - `observe` blocks {#observeblock}

Sometimes a [changed watcher](#change-watchers) is not enough. For more control over
property observation, {{site.project_title}} provides `observe` blocks.

An `observe` block defines a custom property/observer mapping for one or more properties.
It can be used to watch for changes to nested objects or share the same callback
for several properties.

**Example:** - share a single observer

    Polymer('x-element', {
      foo: '',
      bar: '',
      observe: {
        foo: 'validate',
        bar: 'validate'
      },
      ready: function() {
        this.foo = 'bar';
        this.bar = 'foo';
      },
      validate: function(oldValue, newValue) {
        ...
      },
    });

In the example, `validate()` is called whenever `foo` or `bar` changes.

**Example:** - using automatic node in an `observe` block

When an element has an id, you can use `this.$` in the `observe` block to watch
a property on that element:

    <template>
      <x-foo id="foo"></x-foo>
    </template>
    ...
    Polymer('x-element', {
      observe: {
        '$.foo.someProperty': 'fooPropertyChanged'
      },
      fooPropertyChanged: function(oldValue, newValue) {
        ...
      }
    });

**Example:** - watching for changes to a nested object path

    Polymer('x-element', {
      observe: {
        'a.b.c': 'validateSubPath'
      },
      ready: function() {
        this.a = {
          b: {
            c: 'exists'
          }
        };
      },
      validateSubPath: function(oldValue, newValue) {
        var value = Path.get('a.b.c').getValueFrom(this);
        // oldValue == undefined
        // newValue == value == this.a.b.c === 'exists'
      }
    });

It's important to note that **{{site.project_title}} does not call the <code><em>propertyName</em>Changed</code> callback for properties included in an `observe` block**. Instead, the defined observer gets called.

    Polymer('x-element', {
      bar: '',
      observe: {
        bar: 'validate'
      },
      barChanged: function(oldValue, newValue) {
        console.log("I'm not called");
      },
      validate: function(oldValue, newValue) {
        console.log("I'm called instead");
      }
    });

### Automatic node finding

Another useful feature of {{site.project_title}} is automatic node finding. 
Nodes in a component's shadow DOM that are tagged with an 
`id` attribute are automatically referenced in the component's `this.$` hash.

**Note:** Nodes created dynamically using data binding are _not_ added to the 
`this.$` hash. The hash includes only _statically_ created shadow DOM nodes 
(that is, the nodes defined in the element's outermost template).
{: .alert .alert-warning }

For example, the following defines a component whose template contains an `<input>` element whose `id` attribute is `nameInput`. The component can refer to that element with the expression `this.$.nameInput`.

    <polymer-element name="x-form">
      <template>
        <input type="text" id="nameInput">
      </template>
      <script>
        Polymer('x-form', {
          logNameValue: function() {
            console.log(this.$.nameInput.value);
          }
        });
      </script>
    </polymer-element>

To locate other nodes inside the element's shadow DOM, you can create a 
container element with a known ID and use `querySelector` to retrieve
descendants. For example, if your element's template looks like this:

    <template>
      <div id="container">
        <template if="{%raw%}{{some_condition}}{%endraw%}">
          <div id="inner">
           This content is created by data binding.
          </div>
        </template>
      </div>
    </template>

You can locate the inner container using:

    this.$.container.querySelector('#inner');

### Firing custom events {#fire}

{{site.project_title}} core provides a convenient `fire()` method for
sending custom events. Essentially, it's a wrapper around your standard `node.dispatchEvent(new CustomEvent(...))`. In cases where you need to fire an event after microtasks have completed,
use the asynchronous version: `asyncFire()`.

Example:

{% raw %}
    <polymer-element name="ouch-button">
      <template>
        <button on-click="{{onClick}}">Send hurt</button>
      </template>
      <script>
        Polymer('ouch-button', {
          onClick: function() {
            this.fire('ouch', {msg: 'That hurt!'}); // fire(inType, inDetail, inToNode)
          }
        });
      </script>
    </polymer-element>

    <ouch-button></ouch-button>

    <script>
      document.querySelector('ouch-button').addEventListener('ouch', function(e) {
        console.log(e.type, e.detail.msg); // "ouch" "That hurt!"
      });
    </script>
{% endraw %}

**Tip:** If your element is within another {{site.project_title}} element, you can
use the special [`on-*`](#declarative-event-mapping) handlers to deal with the event: `<ouch-button on-ouch="{% raw %}{{myMethod}}{% endraw %}"></ouch-button>`
{: .alert .alert-success }

### Extending other elements

A {{site.project_title}} element can extend another element by using the `extends`
attribute. The parent's properties and methods are inherited by the child element
and data-bound.

    <polymer-element name="polymer-cool">
      <template>
        You are {%raw%}{{praise}}{%endraw%} <content></content>!
      </template>
      <script>
        Polymer('polymer-cool', {
          praise: 'cool'
        });
      </script>
    </polymer-element>

    <polymer-element name="polymer-cooler" extends="polymer-cool">
      <template>
        <!-- A shadow element render's the extended
             element's shadow dom here. -->
        <shadow></shadow> <!-- "You are cool Matt" -->
      </template>
      <script>
        Polymer('polymer-cooler');
      </script>
    </polymer-element>

    <polymer-cooler>Matt</polymer-cooler>

#### Overriding a parent's methods

When you override an inherited method, you can call the parent's method with `this.super()`, and optionally pass it a list of arguments (e.g. `this.super([arg1, arg2])`). The reason the parameter is an array is so you can write `this.super(arguments)`.

{% raw %}
    <polymer-element name="polymer-cool">
      <template>
        You are {{praise}} <content></content>!
      </template>
      <script>
        Polymer('polymer-cool', {
          praise: 'cool',
          makeCoolest: function() {
            this.praise = 'the coolest';
          }
        });
      </script>
    </polymer-element>

    <polymer-element name="polymer-cooler" extends="polymer-cool"
                     on-click="{{makeCoolest}}">
      <template>
        <shadow></shadow>
      </template>
      <script>
        Polymer('polymer-cooler', {
          praise: 'cool',
          makeCoolest: function() {
            this.super(); // calls polymer-cool's makeCoolest()
          }
        });
      </script>
    </polymer-element>

    <polymer-cooler>Matt</polymer-cooler>
{% endraw %}

In this example, when the user clicks on a `<polymer-cooler>` element, its
`makeCoolest()` method is called, which in turn calls the parent's version
using `this.super()`. The `praise` property (inherited from `<polymer-cool>`) is set
to "coolest".

## Built-in element methods {#builtin}

{{site.project_title}} includes a few handy methods on your element's prototype.

### Observing changes to light DOM children {#onMutation}

To know when light DOM children change, you can setup a Mutation Observer to
be notified when nodes are added or removed. To make this more convenient, {{site.project_title}} adds an `onMutation()` callback to every element. Its first argument is the DOM element to
observe. The second argument is a callback which is passed the `MutationObserver` and the mutation records:

    this.onMutation(domElement, someCallback);

**Example** - Observe changes to (light DOM) children elements:

    ready: function() {
      // Observe a single add/remove.
      this.onMutation(this, this.childrenUpdated);
    },
    childrenUpdated: function(observer, mutations) {
      // getDistributedNodes() has new stuff.

      // Monitor again.
      this.onMutation(this, this.childrenUpdated);
    }

### Dealing with asynchronous tasks {#asyncmethod}

Many things in {{site.project_title}} happen asynchronously. Changes are gathered up
and executed all at once, instead of executing right away. Batching
changes creates an optimization that (a) prevents duplicated work and (b) reduces unwanted [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content).

[Change watchers](#change-watchers) and situations that rely on data-bindings
are examples that fit under this async behavior. For example, conditional templates may not immediately render after setting properties because changes to those renderings are saved up and performed all at once after you return from JavaScript.

To do work after changes have been processed, {{site.project_title}} provides `async()`.
It's similar to `window.setTimeout()`, but it automatically binds `this` to the correct value and is timed to `requestAnimationFrame`:

    // async(inMethod, inArgs, inTimeout)
    this.async(function() {
      this.foo = 3;
    }, null, 1000);

    // Roughly equivalent to:
    //setTimeout(function() {
    //  this.foo = 3;
    //}.bind(this), 1000);

The first argument is a function or string name for the method to call asynchronously.
The second argument, `inArgs`, is an optional object or array of arguments to
pass to the callback.

In the case of property changes that result in DOM modifications, follow this pattern:

    Polymer('my-element', {
      propChanged: function() {
        // If "prop" changing results in our DOM changing,
        // schedule an update after the new microtask.
        this.async(this.updateValues);
      },
      updateValues: function() {...}
    });

### Delaying work {#job}

Sometimes it's useful to delay a task after an event, property change, or user interaction. A common way to do this is with `window.setTimeout()`:

    this.responseChanged = function() {
      if (this.timeout1) {
        clearTimeout(this.toastTimeout1);
      }
      this.timeout1 = window.setTimeout(function() {
        ...
      }, 500);
    }

However, this is such a common pattern that {{site.project_title}} provides the `job()` utility for doing the same thing:

    this.responseChanged = function() {
      this.job('job1', function() { // first arg is the name of the "job"
        this.fire('done');
      }, 500);
    }

`job()` can be called repeatedly before the timeout but it only results in a single side-effect. In other words, if `responseChanged()` is immediately executed 250ms later, the `done` event won't fire until 750ms.

## Advanced topics {#additional-utilities}

### Life of an element's bindings {#bindings}

**Note:** The section only applies to elements that are instantiated in JavaScript, not to those
declared in markup.
{: .alert .alert-info }

If you instantiate an element (e.g. `document.createElement('x-foo')`) and do **not** add it to the DOM,
{{site.project_title}} asynchronously removes its {%raw%}`{{}}`{%endraw%} bindings and `*Changed` methods.
This helps prevent memory leaks, ensuring the element will be garbage collected.

If you want the element to "remain active" when it's not in the `document`,
call `cancelUnbindAll()` right after you create or remove it. The [lifecycle methods](#lifecyclemethods)
are a good place for this:

    Polymer('my-element', {
      ready: function() {
        // Ensure bindings remain active, even if we're never added to the DOM.
        this.cancelUnbindAll();
      },
      detached: function() {
        // Also keep bindings active if we're added, but later removed.
        this.cancelUnbindAll();
      }
    });

{{site.project_title}} typically handles this management for you, but when you
explicitly call `cancelUnbindAll()` (and the element is never added to/put back in the DOM),
it becomes your responsibility to _eventually_ unbind the element using `unbindAll()/asyncUnbindAll()`,
otherwise your application may leak memory.

    var el = document.createElement('my-element');
    // Need to unbind if el is:
    //   1. never added to the DOM
    //   2. put in the DOM, but later removed
    el.unbindAll();

#### Using preventDispose {#preventdispose}

To force bindings from being removed in call cases, set `.preventDispose`:

    Polymer('my-element', {
      preventDispose: true
    });

### How data changes are propagated {#flush}

Data changes in {{site.project_title}} happen almost immediately (at end of a microtask)
when `Object.observe()` is available. When it's not supported, {{site.project_title}} uses a polyfill ([observe-js](https://github.com/Polymer/observe-js)) to poll and periodically propagate data-changes throughout the system. This is done through a method called `Platform.flush()`.

#### What is `Platform.flush()`?

`Platform.flush()` is part of {{site.project_title}}'s data observation polyfill, [observe-js](https://github.com/Polymer/observe-js). It dirty check's all objects that have been observed and ensures notification callbacks are dispatched. {{site.project_title}} automatically calls `Platform.flush()` periodically, and this should be sufficient for most application workflows. However, there are times when you'll want to call `Platform.flush()` in application code.

**Note:** on platforms that support `Object.observe()` natively, `Platform.flush()` does nothing.
{: .alert .alert-info }

#### When should I call `Platform.flush()`?

Instead of waiting for the next poll interval, one can manually schedule an update by calling `Platform.flush()`. **There are very few cases where you need to call `Platform.flush()` directly.**

If it's important that a data change propagates before the next screen paint, you may
need to manually call `Platform.flush()`. Here are specific examples:

1. A property change results in a CSS class being added to a node. Often, this works out fine, but sometimes, it's important to make sure the node does not display without the styling from the added class applied to it. To ensure this, call `Platform.flush()` in the property change handler after adding the CSS class.
2. The author of a slider element wants to ensure that data can propagate from it as the user slides the slider. A user of the element, might, for example, bind the slider's value to an input and expect to see the input change while the slider is moving. To achieve this, the element author calls `Platform.flush()` after setting the element's value in the `ontrack` event handler.

**Note:** {{site.project_title}} is designed such that change notifications are asynchronous. Both `Platform.flush()` and `Object.observe()` (after which it's modeled) are asynchronous. Therefore, **`Platform.flush()` should not be used to try to enforce synchronous data notifications**. Instead, always use [change watchers](#change-watchers) to be informed about state.
{: .alert .alert-info }

### How {{site.project_title}} elements prepare themselves {#prepare}

For performance reasons, `<polymer-element>`s avoid the expense of preparing ShadowDOM, event listeners, and property observers if they're created outside the main document.
This behavior is similar to how native elements such as `<img>` and `<video>` behave.
They remain in a semi-inert state when created outside the main document (e.g. an `<img>` avoids the expense of loading its `src`).

{{site.project_title}} elements prepare themselves automatically in the following cases:

1. when they're created in a `document` that has a `defaultView` (the main document)
2. when they receive the `attached` callback
3. when they're created in the `shadowRoot` of another element that is preparing itself

In addition, if the `.alwaysPrepare` property is set to `true`, {{site.project_title}} elements
prepare themselves even when they do not satisfy the above rules.

    Polymer('my-element', {
      alwaysPrepare: true
    });

**Note:** an element's [`ready()` lifecycle callback](#lifecyclemethods) is called after an element has been prepared. Use `ready()` to know when an element is done initializing itself.
{: .alert .alert-success }

### Resolving paths of sibling elements {#resolvepath}

For the general case of element re-use and sharing, URLs in HTML Imports are meant to be relative to the location of the import. The majority of the time, the browser takes care of this for you.

However, JavaScript doesn't have a notion of a local import. Therefore, {{site.project_title}} provides a `resolvePath()` utility for converting paths relative to the import to paths relative to the document.

For example: If you know your import is in a folder containing a resource (e.g `x-foo.png`), you can get a path to `x-foo.png` which will work relative to the main document by calling `this.resolvePath('x-foo.png')`.

Visually, this might look like the following:

    index.html
    components/x-foo/
      x-foo.html
      x-foo.png

At an element level, where `this` refers to an instance of an `x-foo` created by `index.html`, `this.resolvePath('x-foo.png') === 'components/x-foo/x-foo.png'`.
