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
        this.list = []; // 初始化并暗示为数组类型。
        this.person = {}; // 初始化并暗示为对象类型。
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
- | ready | 该 `<polymer-element>` 已经完全准备好了 (如 shadow DOM 已被创建、属性监视者已设置、事件监听者已绑定等)。
attachedCallback | attached | 一个 element 的实例被插入到 DOM 中。
- | domReady | 当 element 的子元素初始化设置确保存在时被调用。这是针对其 element 的父元素或 light DOM 子元素的好时机。另一个用法是当你拥有兄弟 custom elements 的时候 (比如它们是通过 `.innerHTML` 同时写在一起的)。在 element A 可以使用 B 的 API/属性之前，element B 需要被升级。该 `domReady` 回调确保了这两个 elements 都存在。
detachedCallback | detached | 一个实例从 DOM 中被移除时。
attributeChangedCallback | attributeChanged | 一个特性被添加、移除或更改时。**注意：**为了监视[公开的属性](#published-properties)的改变，请使用 [changed watchers](#change-watchers)。
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

## 特征 {#features}

### 公开的属性

当你_公开_一个属性名时，这个属性就成为了该 element 的一个“公共的 API”。公共的属性有如下几个特征：

*   支持声明式双向数据绑定。

*   声明式初始化会使用一个与其名字匹配的 HTML 特性。

*   可选的，一个属性的当前值可以_反射_回与其名字匹配的特性中。

**注意：** 属性名是大小写敏感的，但是特姓名不是。如[特性的大小写敏感性](#attrcase)中所描述的，{{site.project_title}} 以相应的特性名匹配每个属性名。这意味着你不能仅通过区分大小写来公开两个属性 (如 `name` 和 `NAME`)。
{: .alert .alert-info }

公开一个属性的方式有两种：

*   **推荐的** - 将其名字包含在 `<polymer-element>` 的 `attributes` 特性中。
*   将其名字包含在你的原型的一个 `publish` 对象上。

比如，这里有一个 element，它使用 `attributes` 特性公开了 `foo`、`bar` 和 `baz` 这三个属性：

    <polymer-element name="x-foo" attributes="foo bar baz">
      <script>
        Polymer('x-foo');
      </script>
    </polymer-element>

而这是使用 `publish` 对象的写法：

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

注意 `baz` 属性使用了一个不同的格式，以开启[特性反射](#attrreflection)。

通常我们倾向于用 `attributes` 特性，因为它是声明式的且在 element 顶部就易于查阅所有暴露出来的属性。

在下面的情况下，你应该可可选择性的使用 `publish` 对象：

*   你的 element 有多个属性且把它们写成一行显得很笨拙。
*   你想定义属性的默认值，且追求在一处完成所有重复的工作。
*   你需要把属性的变化反射回相应的特性。

#### 默认属性值

定义在 `attributes` 里的属性会默认初始化为 `null`：

    <polymer-element name="x-foo" attributes="foo">
      <script>
        // x-foo 有一个默认值是 null 的属性 foo。
        Polymer('x-foo');
      </script>
    </polymer-element>

{{site.project_title}} 特别在 element 的原型上添加 `foo` 且值为 `null`。

你可以在 element 的 `prototype` 上提供自己明确设定的默认值：

    <polymer-element name="x-foo" attributes="bar">
      <script>
        Polymer('x-foo', {
          // x-foo 有一个默认值为 false 的 bar 属性。
          bar: false
        });
      </script>
    </polymer-element>

或者你可以使用 `publish` 属性定义整个内容：

    <polymer-element name="x-foo">
      <script>
        Polymer('x-foo', {
          publish: {
            bar: false
          }
        });
      </script>
    </polymer-element>

对于属性值是对象或数组的情况，你应该唤为在 `created` 回调时设置默认值。它会确保每个 element 的实例都有一个独立的对象被创建：

    <polymer-element name="x-default" attributes="settings">
      <script>
        Polymer('x-default', {
          created: function() {
            // 为该实例创建一个默认设置对象
            this.settings = {
              textColor: 'blue';
            };
          }
        });
      </script>
    </polymer-element>


#### 通过特性配置一个 element

特性是你的 element 用户对其声明式配置的一个非常好的方式。它们可以通过设置一个相应的特性名的初始值来自定义公开的属性。

    <x-foo name="Bob"></x-foo>

如果属性值不是一个字符串，{{site.project_title}} 尝试把特性值转换为适当的类型。

从特性到属性的连接是_单向_的。改变属性值**不会**更新特性值，除非为其属性开启了[特性反射](#attrreflection)。

**注意：**使用特性来配置一个 element 不应该和[数据绑定](databinding.html)相混淆。一个公开的属性的数据绑定是通过引用做到的，也就是说值并不会序列化或反序列化为字符串。
{: .alert .alert-info}

##### 暗示属性的类型 {#attrhinting}

当特性值被转换为属性值时，{{site.project_title}} 会尝试依据属性的默认值将其转换为正确的类型。

比如，设想一个 `x-hint` element 有一个 `count` 属性，且默认值为 `0`。

    <x-hint count="7"></x-hint>

因为 `count` 有一个 Number 的值，{{site.project_title}} 把“7”转换为了一个 Number。

如果一个属性是对象或数组，你可以使用一个双引号的 JSON 字符串配置它。比如：

    <x-name fullname='{ "first": "Bob", "last": "Dobbs" }'></x-name>

This is equivalent to setting the element's `fullname` property to an object
literal in JavaScript:
这等价于设置 element 的 `fullname` 属性为一个 JavaScript 字面量对象：

    xname.fullname = { first: 'Bob', last: 'Dobbs' };

默认值可以被设置在原型自身上、在 `publish` 对象里或 `created` 回调里。下面的 element 包含了一个不太科学的三者的结合：

    <polymer-element name="hint-element" attributes="isReady items">
      <script>
        Polymer('hint-element', {

          // 暗示 isReady 是一个 Boolean 值
          isReady: false,

          publish: {
            // 暗示 count 是一个 Number 值
            count: 0
          },

          created: function() {
            // 暗示 items 是一个数组
            this.items = [];
          }
        });
      </script>
    </polymer-element>

**重要：**对于对象或数组的属性来说，你应该总是在 `created` 回调中初始化这些属性。如果你直接在 `prototype` 上 (或者在 `publish` 对象上) 设置了默认值，你会跨越相同 element 的多个实例出现非预期的“共享状态”。
{: .alert .alert-error }

#### 特性的属性反射 {#attrreflection}

属性值可以被_反射_回相匹配的特性。比如，如果为 `name` 属性开启了反射，在一个 element 中设置 `this.name = "Joe"` 就等价于调用了 `this.setAttribute('name', 'Joe')`。Element 会更新相应的 DOM：

    <x-foo name="Joe"></x-foo>

属性反射只用于少数情况，因此它是默认关闭的。你通常只在你想基于一个特性值修饰元素的时候需要属性反射。

开启反射的方式是在 `publish` 块中定义属性，不是用非单一值的方式：

<pre>
<var>propertyName</var>: <var>defaultValue</var>
</pre>

而是通过这样的格式定义一个反射属性：

<pre>
<var>propertyName</var>: {
  <b>value:</b> <var>defaultValue</var>,
  <b>reflect:</b> <b>true</b>
}
</pre>

这个属性值会基于其数据类型被序列化为一个字符串。但一些类型会被特殊对待：

*   如果属性值是一个对象、数组或函数，则值**永远不会**被反射，无论 `reflect` 是否为 `true`。

*   如果属性值是布尔值，则其特性的行为会像一个标准的布尔特性：只有属性值为真时被反射的特性才出现。

也要注意一个特性的初始值是*不会*被反射的，因此除非你设置了不同的值，否则被反射的特性不会出现在 DOM 中。

比如：

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

在一个 `<disappearing-element>` 上设置 `hidden = true` 会导致 `hidden` 特性被设置：

    <disappearing-element hidden>Now you see me...</disappearing-element>

特性_反射_和数据绑定是区别看待的。双向数据绑定可用于公开的属性，不论它们是否被反射。考虑下面的情况：

    <my-element name="{%raw%}{{someName}}{%endraw%}"></my-element>

如果 `name` 属性_没有_被反射，则 `name` 特性总是在 DOM 里展示为 `name="{%raw%}{{someName}}{%endraw%}"`。如果 `name` _确实_被反射，其 DOM 特性反射 `someName` 的当前值。

### 数据绑定与公开的属性

公开的属性是绑定在 {{site.project_title}} elements 内部数据上的，并且可通过 `{%raw%}{{}}{%endraw%}` 被访问。这些数据绑定都是双向引用的。

比如，我们可以定义一个 `name-tag` element，它有两个公开的属性：`name` 和 `nameColor`。

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

在这个例子中，公开的属性 `name` 有一个初始值 `null`，而 `nameColor` 有一个初始值“orange”。因此，该 `<span>` 的颜色是橙色的。

更多信息请移步至[数据绑定概述](databinding.html)。

### 计算出来的属性

除了标准的公开的属性，你还可以定义基于其它属性值计算出来的属性。

计算出来的属性被定义在 element 的原型的 `computed` 对象中：

<pre class="nocode">
<b>computed: {</b>
  <var>property-name</var><b>: '</b><var>expression</var><b>'
}</b>
</pre>

每个计算出来的属性都是用一个属性名和一个 [Polymer 表达式](/docs/polymer/expressions.html)定义的。计算出来的属性的值会在任何出现在表达式中的输入值发生改变时被动态更新。

在下面的例子中，当你更新输入值 `num` 的时候，计算出来的属性 `square` 就会自动被更新。

{% include samples/computed-property.html %}

**限制：**目前，计算出来的属性并不是公开的，所以它们无法从_外部_的 element 进行数据绑定。举个例子，你无法使用 `<square-element square="{%raw%}{{value}}{%endraw%}>` 把 `square` 属性绑定到 `square-element` 上。这是[一个已知问题](https://github.com/Polymer/polymer/issues/638)。
{: .alert .alert-warning }

### 声明式的事件映射

{{site.project_title}} 支持声明式在 component 里把的事件和方法绑定起来。它使用特殊的 <code>on-<em>event</em></code> 语法开启绑定行为。

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

In this example, the `on-keypress` declaration maps the standard DOM `"keypress"` event to the `keypressHandler` method defined on the element. Similarly, a button within the element declares a `on-click` handler for click events that calls the `buttonClick` method. All of this is achieved without the need for any glue code.
在这个例子中，`on-keypress` 声明把标准的 DOM `"keypress"` 事件映射到了 element 上定义的 `keypressHandler` 方法。同理，这个 element 里的按钮声明了一个 `on-click` 句柄，就会在点击事件发生时调用 `buttonClick` 方法。这些实现都不需要任何胶水代码。

几个注意事项：

* 事件句柄特性的值是代表该 component 的一个方法名的字符串。和传统的语法不同的是，你不必在特性中放入可执行的代码。
* 传入事件句柄的参数会遵循如下规则：
  * `inEvent` 是[标准事件对象](http://www.w3.org/TR/DOM-Level-3-Events/#interface-Event)。
  * `inDetail`：`inEvent.detail` 的一种便捷形式。
  * `inSender`：一个声明该句柄的结点的引用。它和 `inEvent.target` (收到事件的最小结点) 和 `inEvent.currentTarget` (处理该事件的 component) 都是不同的，所以 {{site.project_title}} 直接提供了这个参数。

### 监视属性 {#observeprops}

#### 变化观察者 {#change-watchers}

监视你的 element 的属性变化最简单的方法就是使用变化观察者。{{site.project_title}} elements 所有的属性变化都可以通过实现一个 <code><em>propertyName</em> Changed</code> 的句柄进行观察。当被观察变化的属性值改变时，适当的变化句柄就会被自动调用。

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

在这个例子中，有两个被观察的属性，`better` 和 `best`。函数 `betterChanged` 和 `bestChanged` 会在 `better` 和 `best` 各自被改变的时候被调用。

#### 自定义属性监视者 - `observe` 代码块 {#observeblock}

有的时候一个[变化观察者](#change-watchers)并不够。为了更全面的进行属性监视，{{site.project_title}} 提供了 `observe` 代码块。

一个 `observe` 代码块自定义了一个或多个属性的属性/监视者映射。它可以用于观察嵌套对象或共享相同回调的几个属性的变化。

**例子：** - 分享一个简单的监视者

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

在这个例子中，`validate()` 会在 `foo` 或 `bar` 改变时被调用。

**例子：** - 在一个 `observe` 代码块里自动化定位结点

当 element 有一个 id 的时候，你可以在 `observe` 代码块中使用 `this.$` 来观察一个 element 上的属性。

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

**例子：** - 观察一个嵌套对象路径的变化

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

值得注意的是 **{{site.project_title}} 并没有为包含在一个 `observe` 代码块中的属性回调 <code><em>propertyName</em>Changed</code>**。取而代之的是在定义好的监视者中发生调用。

    Polymer('x-element', {
      bar: '',
      observe: {
        bar: 'validate'
      },
      barChanged: function(oldValue, newValue) {
        console.log("我不会被调用");
      },
      validate: function(oldValue, newValue) {
        console.log("换做我被调用");
      }
    });

### 自动化定位结点

{{site.project_title}} 另一个给力的功能是自动化定位结点。一个 component 的 shadow DOM 中标有 `id` 特性的结点可以被自动引用在该 component 的 `this.$` 散列表中。

**注意：**通过数据绑定动态创建的结点_无法_被添加到 `this.$` 散列表中。该散列表只包含_静态_创建的 shadow DOM 结点 (即定义在 element 外部的模板中的结点)。
{: .alert .alert-warning }

举个例子，下面这段代码定义了一个 component，其模板包含了一个 id 特性为 `nameInput` 的 `<input>` element。这个 component 就可以通过表达式 `this.$.nameInput` 找到这个 element。

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

为了定位 element 的 shadow DOM 里的其它结点，你可以创建一个带有确定 id 的容器 element，然后使用 `querySelector` 来获取子孙。举个例子，如果你的 element 的模板是下面这个样子：

    <template>
      <div id="container">
        <template if="{%raw%}{{some_condition}}{%endraw%}">
          <div id="inner">
            该内容通过数据绑定被创建
          </div>
        </template>
      </div>
    </template>

你可以在容器内这样定位：

    this.$.container.querySelector('#inner');

### 触发自定义事件 {#fire}

{{site.project_title}} core 提供了一个便捷的 `fire()` 方法传递自定义事件。实际上这是一个围绕标准的 `node.dispatchEvent(new CustomEvent(...))` 包装出来的。当你需要在一个微任务完成之后触发一个事件，请使用其异步的版本：`asyncFire()`。

例如：

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

**提示：**如果你的 element 在另一个 {{site.project_title}} element 中，你可以使用特殊的 [`on-*`](#declarative-event-mapping) 句柄来处理该事件：`<ouch-button on-ouch="{% raw %}{{myMethod}}{% endraw %}"></ouch-button>`
{: .alert .alert-success }

### 扩展其它的 elements

一个 {{site.project_title}} element 可以通过 `extends` 特性扩展其它的 element。子类会继承父类的属性和方法，也会进行数据绑定。

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

#### 覆盖一个父类的方法

当你覆盖一个被继承的方法时，你可以通过 `this.super()` 调用父类的方法，并可选的传递一个参数列表 (比如 `this.super([arg1, arg2])`)。以数组形式传递参数是为了方便你执行 `this.super(arguemnts)`。

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

在这个例子中，当用户点击 `<polymer-cooler>` element，轮到用 `this.super()` 调用父类版本时，其 `makeCoolest()` 方法被调用。其(继承自 `<polymer-cool>` 的) `praise` 属性会被设置为“coolest”。

## 内建的 element 方法 {#builtin}

{{site.project_title}} element 的原型中包含了几个顺手的方法。

### 监视 light DOM 子元素的变化 {#onMutation}

为了了解 light DOM 子元素变化的时机，你可以设置一个突变监视者，在有结点增加或移除的时候进行提示。为了让这件事更便捷，{{site.project_title}} 为每个 element 增加了一个 `onMutation()` 的回调。其第一个参数是要监视的 DOM element。第二个参数是一个传递了 `MutationObserver` 和突变记录的回调。

    this.onMutation(domElement, someCallback);

**例子** - 监视 (light DOM) 子元素的变化：

    ready: function() {
      // 监视简单的增加/移除
      this.onMutation(this, this.childrenUpdated);
    },
    childrenUpdated: function(observer, mutations) {
      // getDistributedNodes() 有了新东西

      // 重新监视
      this.onMutation(this, this.childrenUpdated);
    }

### 处理异步任务 {#asyncmethod}

{{site.project_title}} 中许多事情都是异步发生的。所有变化会召集起来并一次执行，而不是立即执行。批量变化的优化之处在于 (a) 避免了重复的工作 (b) 减少了不必要的 [FOUC](http://en.wikipedia.org/wiki/Flash_of_unstyled_content)。

[变化观察者](#change-watchers)和涉及数据绑定的情形都是适合这样的异步行为的例子。比如，条件模板在设置属性之前可以不立即渲染，因为这些渲染的变化被存了起来并一次性从 JavaScript 返回之后再运行。

为了在变化被处理之后完成这份工作，{{site.project_title}} 提供了 `async()`。它类似于 `window.setTimeout()`，但是它自动化绑定了 `this` 到正确的值，且适合 `requestAnimationFrame` 的时机。

    // async(inMethod, inArgs, inTimeout)
    this.async(function() {
      this.foo = 3;
    }, null, 1000);

    // 大概相当于：
    //setTimeout(function() {
    //  this.foo = 3;
    //}.bind(this), 1000);

第一个参数是被异步调用的一个函数或函数名的字符串。第二个参数 `inArgs` 是一个可选的传递给这个回调的对象或数组。

在属性变化伴随 DOM 改变的情况下，遵循此模式：

    Polymer('my-element', {
      propChanged: function() {
        // 如果 "prop" 的改变也改变了 DOM，
        // 则在此微任务结束之后进行更新。
        this.async(this.updateValues);
      },
      updateValues: function() {...}
    });

### 延迟工作 {#job}

有的时候你需要把一个任务延迟到触发一个事件、改变一个属性或一个用户交互之后。通常的做法是 `window.setTimeout()`：

    this.responseChanged = function() {
      if (this.timeout1) {
        clearTimeout(this.toastTimeout1);
      }
      this.timeout1 = window.setTimeout(function() {
        ...
      }, 500);
    }

然而这是一个通用的模式，而 {{site.project_title}} 提供了 `job()` 来完成相同的工作：

    this.responseChanged = function() {
      this.job('job1', function() { // 第一个参数是“job”的名字
        this.fire('done');
      }, 500);
    }

`job()` 可以在超时之前被反复的调用，但它只会作用一次。换句话说，如果 `responseChanged()` 在 250ms 后立即执行，那么 `done` 事件在 750ms 之前都不会触发。

## 高阶话题 {#additional-utilities}

### 一个 element 绑定的一生 {#bindings}

**注意：** 该章节只应用于在 JavaScript 中实例化，而不是在标记中被声明的 element。
{: .alert .alert-info }

如果你实例化了一个 element (比如 `document.createElement('x-foo')`) 并且**没有**将其添加到 DOM 中，{{site.project_title}} 会异步移除它的 {%raw%}`{{}}`{%endraw%} 绑定和 `*Changed` 方法。这会帮助我们回避内存泄露，确保 element 会被垃圾回收。

如果你希望 element 不在 `document` 里时也可以“保持活跃”，请在你创建或移除它之后立即调用 `cancelUnbindAll()`。[生命周期方法](#lifecyclemethods)是很好的做这件事的地方：

    Polymer('my-element', {
      ready: function() {
        // 哪怕我们永远不把它添加到 DOM 里，也依然确保绑定的活跃。
        this.cancelUnbindAll();
      },
      detached: function() {
        // 同样的，如果我们被添加但稍后又被移除，绑定依然是活跃的。
        this.cancelUnbindAll();
      }
    });

{{site.project_title}} 会替你把这些管理好，但是当你明确调用 `cancelUnbindAll()` (并且 element 永远不会被添加到/回 DOM 中) 时，你有责任_最终_通过 `unbindAll()/asyncUnbindAll()` 解绑这个 element，否则你的应用就可能会内存泄露。

    var el = document.createElement('my-element');
    // 需要解绑定，如果 el：
    //   1. 永远不会添加到 DOM 中
    //   2. 放入 DOM 中，但是稍后被移除
    el.unbindAll();

#### 使用 preventDispose {#preventdispose}

为了在任何时候都在被移除的情形下强制绑定，请设置 `.preventDispose`：

    Polymer('my-element', {
      preventDispose: true
    });

### 数据变化是如何被传播的 {#flush}

当 `Object.observe()` 可用时，{{site.project_title}} 里的数据变化几乎 (在一个微任务的最后) 立即发生。当它不支持的时候，{{site.project_title}} 使用了一个 polyfill ([observe-js](https://github.com/Polymer/observe-js)) 在整个系统里轮询并周期性的传播数据变化。这是通过一个叫做 `Platform.flush()` 的方法来完成的。

#### 何为 `Platform.flush()`？

`Platform.flush()` 是 {{site.project_title}} 的数据监视 polyfill [observe-js](https://github.com/Polymer/observe-js) 的一部分。它会 dirty check 所有被监视的对象并确保提醒的回调被派发。{{site.project_title}} 自动化的周期性调用 `Platform.flush()`，且这应该足够大多数应用程序的工序。尽管如此，有的时候你还是需要在应用程序的代码里手动调用 `Platform.flush()`。

**注意：** 在原生支持 `Object.observe()` 的平台中 `Platform.flush()` 什么事都不会做。
{: .alert .alert-info }

#### 我应该在什么时候调用 `Platform.flush()`？

相比等到下一次轮询，我们可以调用 `Platform.flush()` 更新取而代之。**这里有几种你需要直接调用 `Platform.flush()` 的情况。**

如果数据变化在下一个屏幕绘制之前传播是很重要的，你可能需要手动调用 `Polymer.flush()`。这里有一些特殊的例子：

1. 一个属性变化导致一个 CSS class 添加到结点中。这通常是工作正常的，但有时重要的是确保结点展示了新添加的 class 应用的样式。为此，在添加 CSS class 之后在属性变化句柄中调用 `Platform.flush()`。
2. 一个滑块 element 的撰写者想确保当用户滑动滑块的时候数据可以传播。比如一个 element 的用户可以把滑块的值绑定到一个输入框，然后期待当滑块移动时输入发生改变。为了达到这一目的，element 的撰写者在设置 element 的值之后在`ontrack` 事件句柄中调用了 `Platform.flush()`。

**注意：** {{site.project_title}} 是刻意设计为异步提醒的。`Platform.flush()` 和 `Object.observe()` (在此之后被建模) 都是异步的。因此，**`Platform.flush()` 不应该用来试图强制同步进行数据提醒**。相反，请始终之用[变化观察者](#change-watchers)来知会状态。
{: .alert .alert-info }

### {{site.project_title}} elements 如何准备自我 {#prepare}

出于性能方面的原因，如果 `<polymer-element>` 被创建在主文档之外，则它会避免准备 ShadowDOM、事件收听者和属性监听者的消耗。这一行为类似诸如 `<img>` and `<video>` 的原生 element。它们在主文档外被创建时仍处在一种半插入状态 (比如一个 `<img>` 会避免其载入 `src` 的消耗)。

{{site.project_title}} elements 在下面的情况下会自动化自我准备：

1. 当它们被创建在一个带有 `defaultView` 的 `document` 中 (主文档)
2. 当他们收到 `attached` 回调
3. 当他们被创建在另一个正在自我准备的 element 的 `shadowRoot` 里

另外，如果 `.alwaysPrepare` 属性被设置为 `true`，{{site.project_title}} elements 会自我准备，哪怕它们并不满足上述规则。

    Polymer('my-element', {
      alwaysPrepare: true
    });

**注意：** 一个 element 的 [`ready()` 生命周期回调](#lifecyclemethods) 会在一个 element 自我准备就绪知会被调用。用 `ready()` 来判断一个 element 何时自身初始化完毕。
{: .alert .alert-success }

### 决定兄弟 elements 的路径 {#resolvepath}

对于 element 重用和共享的一般的情况，HTML Imports 中的 URL 是相对于该 import 的位置的。大部分情况下浏览器都会帮你把这些打理好。

不过，JavaScript 没有本地 import 的观念。因此 {{site.project_title}} 提供了一个 `resolvePath()` 工具来转换相对于该 import 到该文档的路径。

比如：如果你知道你的 import 在一个包含资源 (比如 `x-foo.png`) 的文件夹里，你可以通过调用 `this.resolvePath('x-foo.png')` 获取一个相对于主文档的 `x-foo.png` 的路径。

可以形象的看做如下情形：

    index.html
    components/x-foo/
      x-foo.html
      x-foo.png

在一个 element 的级别上，`this` 指一个被 `index.html` 创建的 `x-foo` 实例，`this.resolvePath('x-foo.png') === 'components/x-foo/x-foo.png'`。
