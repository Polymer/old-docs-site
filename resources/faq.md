---
layout: default
type: resources
navgroup: resources
shortname: Resources
title: FAQ
---

{% include alpha.html %}

*没找到你问题的答案? 请到[邮件清单](/discuss.html)提问!*

{% include toc.html %}

## {{site.project_title}}

### 为什么我要关注这个项目? {#why}

{{site.project_title}} 是个极具开创性的库，用它来创建高端大气上档次的 web 应用程序将变得前所未有的简单和快速。{{site.project_title}} 是基于被称为 Web Components 的一系列全新强大的 web 平台而建立的。
 Web Components 给 web 平台带来了史无前例的可封装性，易共用性，和易应用性。这极大的提高了开发者的生产力。

### {{site.project_title}} 可用于发布产品是吗? {#readiness}

{{site.project_title}} 目前仍处理 "开发者预览版"。 尽管如此，还是有很多人成功在已发布的产品中使用上了目前的 {{site.project_title}}. 
虽然好多东西都还不稳定，我们依然鼓励开发者帮助我们将 {{site.project_title}} 尽快带出实验阶段。

### {{site.project_title}} 为何跟 material design 扯上了关系? {#materialdesign}

{{site.project_title}} 是 material design 在 web 平台的实现. {{site.project_title}} 团队与 material design 设计团队合作非常的紧密。 事实上, {{site.project_title}} 在 material design 的研发阶段扮演着关键性的角色: 它被用于快速原型化和重现设计的概念. 此 material design 组件依然处于生产阶段, 不过在未来几个月内就会成熟。

### 我一定要使用 {{site.project_title}} Designer 吗? {#designer}
非也! [{{site.project_title}} Designer](/tools/designer/) 主要是个使得了解一个 app 的原型更加容易的工具。它完全是可选的，不过我们已经发现有开发者在使用了，并且它已经完成他们开发流程中不可或缺的部分。

### 我不喜欢你们的{组件 | 数据绑定的语法 | 外观}! {#dislike}

<!--
<figure id="architecture-diagram" style="float:right">
  <iframe src="/images/architecture-diagram.svg?{{'now' | date: "%Y%m%d"}}" style="width:150px;"></iframe>
  <figcaption>Architectural Diagram</figcaption>
</figure> -->

没关系。类似 {{site.project_title}} 这种基于组件的库最爽的地方就是，你可以轻易的使用第三方类库来混用和支配元素，并且你如果你只是想使用我们提供的一些元素可不必使用的任何我们提供数据绑定语法。

<!-- {: style="clear:both"} -->

### {{site.project_title}} 都支持哪些浏览器? {#browsersupport}

{{site.project_title}} 目标是支持 [evergreen browsers](http://www.yetihq.com/blog/evergreen-web-browser/). 毕竟, 我们是在模拟未来, 正如某人所说,  "如果你总盯着后视镜那你前方肯定有麻烦了". 在实践过程中, 这意味着我们支持以下浏览器的最新版, Chrome,  Safari,  Internet Explorer,  和 Firefox. Chrome 36 是首个原生支持了全部 {{site.project_title}} 依赖的全部平台特性的浏览器。

注意, 这是比其他框架所支持的浏览器还要少一些的.例如,  {{site.project_title}} 只支持IE10+. {{site.project_title}} 有些部分如果不过多考虑扩展性可能会支持更多浏览器--如果发现未支持的浏览器上有bug, 请报给我们.绝大多数东西无需过多工作也能支持IE9;哪部分有bug请随意报上来.IE8由于其对DOM支持不足因此没法兼容. 

更多资料请参考我们的 [浏览器兼容性](/resources/compatibility.html) 页面。


### 他浏览器什么时候能原生支持这些API? {#nativesupport}

我们的<a href="/images/architecture-diagram.svg" target="_blank">架构图</a>里基础层是基于最新的Web标准的.任何层的需求度会随着浏览器原生支持度的增加而逐渐减少直至最终消失。事实上，Chrome 36 是首个原生支持了全部 {{site.project_title}} 依赖的全部平台特性的浏览器。很难说什么时候每个浏览器都原生支持这些特性, 但开发者的呼声越高被支持就越快. 

### 移动这块你们是什么打算? {#onmobile}

我们的核心目标之一就是让{{site.project_title}}在移动设备的支持上得到一等公民般的待遇。可以试试我们其中一个简单的 app [Topeka](/apps/topeka/)，直接了解目前的现状。


### 单页面我如何实现路由呢? {#spa}

通过结合数据绑定， [core-scaffold](/docs/elements/core-elements.html#core-scaffold), [core-pages](/docs/elements/core-elements.html#core-pages)/[core-animated-pages](/docs/elements/core-elements.html#core-animated-pages), 和 [`<flatiron-director>`](https://github.com/PolymerLabs/flatiron-director) (路由用的 element), 你可以轻轻松松制作一个深度耦合的单页面应用SPA。

这里有个 [demo](http://polymer-change.appspot.com/demos/spa.html) ，源码在这 [source](https://github.com/ebidel/polymer-change/blob/master/demos/spa.html).

### 为什么与x-tags扯上关系? {#xtags}

[x-tags](http://x-tags.org/) 是Mozilla正在开发的一个很酷的项目,  它也不直接隶属于{{site.project_title}}. 不过, {{site.project_title}} 和 x-tags 两者者基于最新的Custom Elements标准, 这意味着两者的组件默认即是相互兼容的.Google 和 Mozilla 都为Custom Element 规范提供polyfill. X-Tag两者都支持, 因此你能在{{site.project_title}} 的组件上沿用X-Tag.我们正积极的为它们和组件集合的最大兼容性而作努力.

#### {{site.project_title}} 与Twitter的 Bootstrap 或者 Adobe的 Topcoat究竟区别在哪? {#uiframeworks}

Bootstrap 和 Topcoat 都是很强大的 CSS/UI 库. 我们对{{site.project_title}}的定位不同. 我们最终打算为惊艳四座的UI 组件构建一系列的标准, {{site.project_title}}是完全系统而整体的, 有助于有兴趣的开发者基于Web 组件技术打造Web 应用. {{site.project_title}}也扩展了更多额外增强的API 以满足当今的Web应用.

### {Angular JS | Closure | Google Web Toolkit}与这个项目有关联吗? {#frameworks}

没关系. {{site.project_title}} 与已有的东西非常的不同. {{site.project_title}} 是首个得益于 Web Components 的新库。  Web Components 的到来将极大的改变 web 开发，我们已为 {{site.project_title}} 光明的未来感到激动不已。

### polymer.dart为何被{{site.project_title}}扯上关系了? {#dart}

polymer.dart 是Dart团队为 {{site.project_title}} 创建而维护的一部分.Dart团队正在与{{site.project_title}}团队合作确保polymer.dart组件和polyfill都完全与{{site.project_title}}兼容. 

### 源码挂在CDN上吗?

{{site.project_title}} 被维护在 [cdnjs](http://cdnjs.com/) 有一份维护，可以通过以下URL加载:

    <script src="//cdnjs.cloudflare.com/ajax/libs/polymer/{{site.latest_version}}/platform.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/polymer/{{site.latest_version}}/polymer.js"></script>

以下理由是我们推荐你使用 Bower 而不是 CDN:

- CDN上并没有挂载 polymer.html 这样你的 elements 就失去了导入它的这一功能.
- 还有很多的 elements 没有挂载在CDN上，所以要想在你的项目中导入它们将变得非常的棘手。
- 你将无法 [通过 Vulcanize 合并你的代码](/articles/concatenating-web-components.html).

### 我看到一堆XHR的连接请求。干嘛用的? {#xhrrequests}

polyfill目前所受到的一个限制是{{site.project_title}}带耦合性的通过XHR模拟HTML Import. 我们正在测试改进打包系统和生成步骤来减少网络请求.当此API被浏览器原生支持, 一切还会照常工作的. 资源将会被正常的加载, 也会得益于并行加载和缓存策略等. 

你可以使用 [Vulcanize](/articles/concatenating-web-components.html), 这个构建工具可以将一堆 elements 合并一个页面里。

### 你们关注性能吗? {#performancestuff}

我们真心的想使整个Web平台都得到60fps的流畅度.这么说吧,  我们还没有按基准对所有polyfill进行过测试--毕竟, 我们还处于初级阶段! 如果你有兴趣帮助我们进行统计,  [请随时告诉我们](/discuss.html).

别忘了我们的库是会随着时间而流逝的! {{site.project_title}}也会随着浏览器逐渐的以原生实现而变得好,  更强, 更快.

### platform.js 为什么这么大 (~163KB)? {#filesize}

压缩和gzip后 platform.js 仅有 ~44KB (对比 JQuery 1.10 是 32KB). 记住，占空间的大部分是polyfills；这些代码会在浏览器提供原生API后被移除的。

{{site.project_title}} 同样被设计成照单点菜。例如，如果你只对 Custom Elements 有兴趣，就使用 custom elements 的 polyfill。
如果你只想要 Shadow DOM 就用它的 polyfill。platform.js 仅是个快捷套餐，方便照单全收的开发者引制作基于 {{site.project_title}} 的应用程序。

### {{site.project_title}} 兼容 Chrome Apps 吗? {#chromeapp}
必须的. 这里有个 [ Polymer Chrome App 的例子](https://github.com/PolymerLabs/polymerchromeapp) 供你参考。需要重视的是 Chrome Apps 有严格的 [内容安全策略 - Content Security Policy (CSP)](http://www.html5rocks.com/tutorials/security/content-security-policy/) ，这直接限制了内联脚本 elements 的使用. 
要应对 CSP 的限制，这里有个实例使用了 [Vulcanize](/articles/concatenating-web-components.html) 构建工具 (Grunt 插件用法 [grunt-vulcanize](https://github.com/Polymer/grunt-vulcanize)) 来将内联脚本 elements 转换成外链文件的方式。请务必详看 [FAQ 的 Content Security Policy 章节](#csp) 和 README里的实例项目中的 [处理 CSP](https://github.com/PolymerLabs/polymerchromeapp#dealing-with-csp) 章节。

### {{site.project_title}} 支持内容安全策略 - Content Security Policy (CSP) 吗? {#csp}

支持的. 使用了 `platform.js` 且 [使用脚本外链的形式创建 elements ](/docs/polymer/polymer.html#altregistration), 则 {{site.project_title}} 支持 [CSP](http://www.html5rocks.com/tutorials/security/content-security-policy/). 
如果你偏好将 element 的脚本内联到 `<polymer-element>`，我们推荐你使用 [Vulcanize](/resources/tooling-strategy.html#vulcanize-build-tool) 并且执行命令时带上 `--csp` 参数.

某些特殊的场景下，{{site.project_title}} 是不支持 CSP的。这是由于 [HTML Imports](/platform/html-imports.html) 是通过 XHR 的方式给 polyfill 实现的，
这反而由于把字符串当成 JavaScript 执行而且导致不支持 CSP。因此，如果你导入一个有内联脚本的文件，那就是失败。此问题在浏览器原生支持 HTML Imports (参看 Blink 的 [crbug.com/240592](http://crbug.com/240592) bug 跟踪) 后将不存在。

### 我怎样才能参与贡献? {#contributing}

我们很乐意听到你的评论和建议. [报bug](https://github.com/polymer/polymer/issues/new) 或者转到[邮件清单](/discuss.html) 打声招呼"hi"--我们不会咬你的! 如果你想
贡献代码, 参看[贡献者的指南](https://github.com/polymer/polymer/blob/master/CONTRIBUTING.md).

### 哪里才是报bug的最佳地方? {#filebugs}

我们有很多不同的demo, 平台, 类库的仓库. 如果你明确知道问题出在哪, 请有针对的就地报bug, 要不然就在项目通用的地方报[{{site.project_title}}](https://github.com/polymer/polymer/issues/new).

### 我如何组织 JavaScript 的依赖关系以防止出现 X 库 的1000次拷贝? {#loadlibs}

通常情况下是无法保证即公用又不出现重复的。不过，如果你的 components 库依赖了另外一个库，你可以导入加载那个库的 "library.html" 文件。
[HTML Imports](/platform/html-imports.html) 会依据它的完整路径来避免重复导入。

如果多库之间需要共享依赖关系，那它们则需要遵循同个体系。
使用功能检测，或者认同同个CDN上的同个 'jquery.html' 的公共的路径，等。

### 你们测试的方式是有哪些?

{{site.project_title}} 使用 Chromium 的持续构建设施测试整个系统及每个 polyfill，分别进行。参看 [构建状态页面](/build/).

### 我如何校验属性的值? {#validateinput}

校验输入的一个途径是使用一个 `*Changed` 事件处理器来监听属性的变更, 不过要分清 "set value" 和 "validated value":

    <polymer-element name="x-foo" attributes="color">
      <template>
        Do you like the color <span style="color:{%raw%}{{validColor}}{%endraw%}">{{validColor}}</span>?
      </template>
      <script>
        Polymer('x-foo', {
          color: 'red',
          colorChanged: function(inOld) {
            if (this.color.match(/red|orange|yellow/)) {
              this.validColor = this.color;
            } else {
              alert("The color wasn't a hot!");
            }
          }
        });
      </script>
    </polymer-element>

    <x-foo color="orange"></x-foo>

### 一个 element 能 `继承` 自一个以上的 element 或者实现多重继承吗? {#multipleextends}

比如 `<polymer-element name="my-element" extends="foo bar">`.

不支持. 但是 {{site.project_title}} 以后可能会支持混淆似的语法。

### 我不喜欢包管理工具，我能直接下载 {{site.project_title}} 的zip包吗? {#bower}

{{site.project_title}} 分成很多的块。创建一个一步到位的包会显示非常的臃肿。如何你实在想要一个 zip包，可以直接从Github上提供的连接下载。
不过某些场景下，你还是无法获得所需要的依赖，得挨个去下载。

Web components 和 {{site.project_title}} 是有意细粒化的。
这也是个目标，允许用户精确使用所需的同时没有额外的负担。除了细粒化，高层的 components 可能由 低层的 components 组件而成，
Bower 允许我们更容易的管理依赖关系。

### 我的 components 发布后是同一个名称的不同id的标记。 {#multipleids}

{{site.project_title}} tries hard to mimic native Shadow DOM, in that nodes with the same
`id`s will still be encapsulated.

However, you should avoid using DOM-level id referencing (e.g. `<label for>`) when using {{site.project_title}}. The `id` may not resolve correctly when under the Shadow DOM polyfill.

## Data-binding

### I'm trying to render HTML using data-binding but {{site.project_title}} escapes the content. {#setinnerHTML}

{{site.project_title}} does not stamp unescaped HTML via data-binding because it becomes a vulnerability for XSS attacks. Instead, you can use a [property changed watcher](/docs/polymer/polymer.html#change-watchers) and [automatic node finding](/docs/polymer/polymer.html#automatic-node-finding) to set the `.innerHTML` of an node:

    <div id="div"></div>

    dataChanged: function() {
      this.$.div.innerHTML = this.data;
    }

When using `<template repeat>`, a similar approach can be taken as suggested in [stackoverflow.com/a/22311788](http://stackoverflow.com/a/22311788).

### How do I use data-binding to repeat an `<option>` or `<tr>`? {#option-tr}

Until the addition of HTML `<template>`, certain elements like `<select>`, `<table>`, and [others](https://github.com/Polymer/TemplateBinding/blob/master/src/TemplateBinding.js#L141:L153) had special parser rules to prevent anything other than `<option>` and `<tr>` from being their children, respectively. Because of these legacy rules, browsers that don't support `<template>` will lift unexpected elements out of context and make them siblings, including `<template>` itself!

For example, the following won't work correctly in browsers that don't support `<template>`:

    <!-- Won't work in browsers that don't support <template>. -->
    <table>
      {%raw%}<template repeat="{{tr in rows}}">{%endraw%}
        <tr><td>...</td></tr>
      </template>
    </table>

The `<template repeat>` is hoisted out and rendered as a sibling:

    <!-- Unsupported browsers make the child <template> a sibling. -->
    {%raw%}<template repeat="{{tr in rows}}">{%endraw%}
      <tr><td>...</td></tr>
    </template>
    <table>
      ...
    </table>

For **browsers that don't support `<template>`**, the [TemplateBinding](/docs/polymer/template.html) [prollyfill](http://prollyfill.org/) has the ability to repeat `<option>` and `<tr>` directly using the `template` attribute:

    <table>
      {%raw%}<tr template repeat="{{tr in rows}}">{%endraw%}
        <td>Hello</td>
      </tr>
    </table>

Another example using`<select>`/`<option>`:

    <polymer-element name="my-select">
      <template>
        <select>
          {%raw%}<option template repeat="{{options}}">{{}}</option>{%endraw%}
        </select>
      </template>
      <script>
        Polymer('my-select', {
          ready: function() { this.options = []; }
        });
      </script>
    </polymer-element>
    <script>
      var select = document.createElement('my-select');
      select.options = ['One', 'Two', 'Three'];
    </script>

If your users are using browsers that don't support `<template>`, use the `template`
attribute on these [special elements](https://github.com/Polymer/TemplateBinding/blob/master/src/TemplateBinding.js#L117).

**Note:** browsers with native support for `<template>` allow it to be a child
of elements `<select>` and `<table>`. If you know your users are using a browser
with support, write your repeaters like this:

    <table>
      {%raw%}<template repeat="{{tr in rows}}">{%endraw%}
        <tr>
          <td>Hello</td>
        </tr>
      </template>
    </table>

### How can I access the current named model instance that in a `<template repeat>`? {#templateinstancemodel}

For example, in a `on-*` handler, you can access the named model instance using: `e.target.templateInstance.model.<property>`:

{%raw%}
    <polymer-element name="x-foo">
      <template>
        <template repeat="{{user in users}}">
          <div on-click="{{clickHandler}}">{{user.name}}</div>
        </template>
      </template>
      <script>
        Polymer('x-foo', {
          clickHandler: function(e, detail, sender) {
            console.log(sender.templateInstance.model.user.name);
          }
        });
      </script>
    </polymer-element>
{%endraw%}

## Can I use `<template>` inside an `<svg>` element? {#templateinsvg}

Sure can. Here's a [demo](http://jsbin.com/EXOWUFu/60/edit).

{%raw%}
    <svg>
      <template repeat="{{l in lights}}">
        <circle cx="100" cy="{{l.cy}}" r="50" fill="{{l.selectedColor}}"/>
      </template>
    </svg>
{%endraw%}

The behavior is similar to templates in non-template browsers in that their content is not inert. For example, scripts will run.

### How quickly are data changes propagated? {#dirtychecking}

If `Object.observe()` is available, data changes happen ~immediately at end of a microtask.
When `Object.observe()` is not supported, {{site.project_title}} uses its polyfill ([observe-js](https://github.com/Polymer/observe-js)) to poll and propagate data-changes throughout the system every 125ms.

Instead of waiting for the next poll interval, one can manually schedule an update
by calling `Platform.flush()`. **There are very few cases where you need to call `Platform.flush()` directly.**

Note: on platforms that support `Object.observe()` natively, `Platform.flush()` does nothing.

## Web Components

### How do I package a bunch of custom elements together? {#packaging}

Use a custom build step that flattens/concatenates everything into a single file,
then use [HTML Imports](/platform/html-imports.html) (`<link rel="import">`) to
bring that file into your app.

Similarly, you could write a build step that inlines any custom element definition
directly into your main app. We've experimented with this basic idea in a
tool we call [Vulcanizer](/resources/tooling-strategy.html#vulcanize-build-tool).

### Crawlers understand custom elements? How does SEO work? {#seo}

Because Polymer makes use of polyfills, search engines should treat Polymer-based applications no differently than they do other javascript-based web apps. [In fact, Google's crawler understands JavaScript heavy applications](http://googlewebmastercentral.blogspot.com/2014/05/understanding-web-pages-better.html). Going forward, it is a reasonable assumption that as use of native Shadow DOM increases, search engine providers will try to adapt to understand it, just as they have adapted to other new web technologies in the past.

### Is there a registry of components I can play with? {#registry}

At [http://customelements.io](http://customelements.io), you can find a growing registry of third party components and contribute yours too.

### I get errors when trying to use  `<link rel="import">` with external files. {#externalfiles}

Unfortunately, this is a limitation of the HTML Import spec and the polyfill follows suit. The polyfill uses XHR to pull down external imports. These will fail if they are not [CORs-enabled](http://www.html5rocks.com/tutorials/cors/).

{%comment%}
### How can I use web fonts or CSS Animations in my custom element? {#fontsanimations}

See "[Making styles global](/docs/polymer/styling.html#making-styles-global)".
{%endcomment%}

### Why does my element claim its `.clientWidth/clientHeight` is 0? {#clientDimenstions}

By default, customs elements are `display: inline`. The fix is to give your element
a default style of `display: block` using `:host`.

    <polymer-element name="my-element">
      <template>
        <style>
          :host { * { display: block; } }
        </style>
        ...
      </template>
      ...
    </polymer-element>
    <script>
    window.addEventListener('polymer-ready', function(e) {
      var element = document.querySelector('my-element');
      // element.clientWidth/clientHeight won't be 0.
    });
    </script>

### How do I access the DOM in a `<content>`? {#accessContentDOM}

For a `<content>`, you can iterate through `content.getDistributedNodes()`
to get the list of nodes distributed at the insertion point.

In {{site.project_title}}, the best place to call this method is in the [`attached()` callback](/docs/polymer/polymer.html#lifecyclemethods) so you're guaranteed that the element is in the DOM tree.

Also remember that you can access the light DOM as the element's normal children
(i.e. `this.children`, or other accessors). The difference with this approach
is that it's the entire set of *potentially* distributed nodes; not those actually distributed.

### Why do elements report zero (light DOM) children at created/ready time? {#zerochildren}

Because of subtle timing issues on element upgrades, it's generally a mistake to attempt to reference an element's children (light dom) in the `created()`, `ready()`, or `attached()` method. When these methods are fired, the element is not guaranteed to be in the DOM or have children. In addition, {{site.project_title}} calls `TemplateBinding.createInstance()` on an element's `<template>` to create its Shadow DOM. This process creates and binds elements in the template one by one.

The best time to take a first look at an element's children is in `domReady()`. This is when the element is in the DOM, has a parent, its possibly children. To observe changes
to light DOM children, [setup a mutation observer](#mutationlightdom).

### When is the best time to access an element's parent node? {#parentnode}

The `attached()` callback is the best time to access an element's parent.
That way, you're guaranteed that the element is in DOM and its parent has been upgraded.

Use the `attached()` and `this.async()` to ensure you're in the next quantum of time (e.g. the DOM has been constructed):

    attached: function() {
      this.async(function() {
        // this.parentNode is upgraded
      });
    }

To manage this dance with more convenience, {{site.project_title}} provides
`domReady()` to do the same thing:

    domReady: function() {
      // same
    }

### How do I monitor changes to light dom children? {#mutationlightdom}

To know when light DOM children are added or removed, setup a Mutation Observer to do so. {{site.project_title}} puts a `onMutation` callback on every element which can be used to
observe a single DOM mutation:

    ready: function() {
      // Observe a single mutation.
      this.onMutation(this, this.childrenUpdated);
    },
    childrenUpdated: function(observer, mutations) {
      mutations.forEach(function(record) {
        console.log(record.addedNodes);
      }.bind(this));
    }

To observe other types of changes, setup your own `MutationObserver` in `ready()`:

    ready: function() {
      var observer = new MutationObserver(function(mutations) {
        ...
      }.bind(this));
      observer.observe(this, {childList: true, attributes: true});
    }

### Can I use the `constructor` attribute without polluting the global namespace? {#constructorattr}

By design, `constructor` puts the constructor's name on `window`. If you don't want
this, there are two options:

1. Don't use the `constructor` attribute. Use `document.createElement()` instead.
2. Use `document.register()` and wrap the constructor it returns in a namespace.

### Does Shadow DOM play nicely with assistive technologies and screen readers? {#accessibility}

**Note:** Steve Faulkner had a [nice writeup](http://blog.paciellogroup.com/2012/07/notes-on-web-components-aria/) on this topic a while back and found that it does. See also Marcy Sutton's more recent "[Accessibility and the Shadow DOM](http://substantial.com/blog/2014/02/05/accessibility-and-the-shadow-dom/)".

A common mis-conception is that the Shadow DOM doesn't play nicely with assistive technologies. The reality is that the Shadow DOM can in fact be traversed and any node with Shadow DOM has a `shadowRoot` property which points to it's shadow document. Most assistive technologies hook directly into the browsers rendering tree, so they just see the fully composed tree.

In fact, if you inspect one of the native HTML elements that use Shadow DOM, `<input type="date">` for example, you'll notice aria attributes inside the tree:

![](/images/ariashadowdom.jpg)

Other types of assistive tools like [Chromevox](http://www.chromevox.com/) will [need to be updated](https://code.google.com/p/chromium/issues/detail?id=96373) to learn how to traverse the Shadow DOM.
There's an ongoing discussion with accessibility experts on how best to integrate Shadow DOM with screen readers and search engines and further progress in this area is likely to come in the future.

### How do I access the `activeElement` inside a {{site.project_title}} element? {#activeelement}

Shadow Roots have their own `activeElement`, which you can access internally as
`shadowRoot.activeElement`.

### Why don't my element's properties/methods autocomplete in the DevTools? {#autocomplete}

This is an artifact of the Shadow DOM polyfill. It creates wrappers around DOM elements
and exposes only the standard DOM APIs (e.g. `querySelector`) on those wrappers. {{site.project_title}} sets up properties on these wrapper objects, not on the actual DOM object. Since the DevTools
only knows about the actual DOM, your element properties won't be seen by the tools.

**Tip:** select a node in the inspector can type `wrap($0)` into the console. You'll
get the wrapped node with all the {{site.project_title}} goodies attached. You can also
use `unwrap()` if you need to go the other direction.
{: .alert .alert-info }

Under native Shadow DOM this isn't an issue. Properties will auto complete in the console.

### What is the behavior of custom elements in a `<template>`? {#intemplate}

Custom elements in templates are like `<script>` and friends--inert. Their definitions are registered but the elements are not upgraded. Upgrading elements in a `<template>` would be a performance penalty.


---

*Special thanks go to GitHub user md_5 who generously donated the {{site.project_title}} organization name.*
