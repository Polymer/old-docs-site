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

### {{site.project_title}} 可用于发布产品了吗? {#readiness}

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

没关系。类似 {{site.project_title}} 这种基于组件的库最爽的地方就是，你可以轻易的使用第三方类库来混用和支配元素，并且你如果你只是想使用我们提供的一些元素可不必使用任何我们提供的数据绑定语法。

<!-- {: style="clear:both"} -->

### {{site.project_title}} 都支持哪些浏览器? {#browsersupport}

{{site.project_title}} 目标是支持 [evergreen browsers](http://www.yetihq.com/blog/evergreen-web-browser/). 毕竟, 我们是在模拟未来, 正如某人所说,  "如果你总盯着后视镜那你前方肯定有麻烦了". 在实践过程中, 这意味着我们支持以下浏览器的最新版, Chrome,  Safari,  Internet Explorer,  和 Firefox. Chrome 36 是首个原生支持了全部 {{site.project_title}} 依赖的全部平台特性的浏览器。

注意, 这是比其他框架所支持的浏览器还要少一些的.例如,  {{site.project_title}} 只支持IE10+. {{site.project_title}} 有些部分如果不过多考虑扩展性可能会支持更多浏览器--如果发现未支持的浏览器上有bug, 请报给我们.绝大多数东西无需过多工作也能支持IE9;哪部分有bug请随意报上来.IE8由于其对DOM支持不足因此没法兼容. 

更多资料请参考我们的 [浏览器兼容性](/resources/compatibility.html) 页面。


### 其他浏览器什么时候能原生支持这些API? {#nativesupport}

我们的<a href="/images/architecture-diagram.svg" target="_blank">架构图</a>里基础层是基于最新的Web标准的.任何层的需求度会随着浏览器原生支持度的增加而逐渐减少直至最终消失。事实上，Chrome 36 是首个原生支持了全部 {{site.project_title}} 依赖的全部平台特性的浏览器。很难说什么时候每个浏览器都原生支持这些特性, 但开发者的呼声越高被支持就越快. 

### 移动这块你们是什么打算? {#onmobile}

我们的核心目标之一就是让{{site.project_title}}在移动设备的支持上得到一等公民般的待遇。可以试试我们其中一个简单的 app [Topeka](/apps/topeka/)，直接了解目前的现状。


### 单页面我如何实现路由呢? {#spa}

通过结合数据绑定， [core-scaffold](/docs/elements/core-elements.html#core-scaffold), [core-pages](/docs/elements/core-elements.html#core-pages)/[core-animated-pages](/docs/elements/core-elements.html#core-animated-pages), 和 [`<flatiron-director>`](https://github.com/PolymerLabs/flatiron-director) (路由用的 element), 你可以轻轻松松制作一个深度耦合的单页面应用SPA。

这里有个 [demo](http://polymer-change.appspot.com/demos/spa.html) ，源码在这 [source](https://github.com/ebidel/polymer-change/blob/master/demos/spa.html).

### 为什么与x-tags扯上关系? {#xtags}

[x-tags](http://x-tags.org/) 是Mozilla正在开发的一个很酷的项目,  它也不直接隶属于{{site.project_title}}. 不过, {{site.project_title}} 和 x-tags 两者都基于最新的Custom Elements标准, 这意味着两者的组件默认即是相互兼容的.Google 和 Mozilla 都为Custom Element 规范提供polyfill. X-Tag两者都支持, 因此你能在{{site.project_title}} 的组件上沿用X-Tag.我们正积极的为它们和组件集合的最大兼容性而作努力.

#### {{site.project_title}} 与Twitter的 Bootstrap 或者 Adobe的 Topcoat究竟区别在哪? {#uiframeworks}

Bootstrap 和 Topcoat 都是很强大的 CSS/UI 库. 我们对{{site.project_title}}的定位不同. 我们最终打算为惊艳四座的UI 组件构建一系列的标准, {{site.project_title}}是完全系统而整体的, 有助于有兴趣的开发者基于 Web Components 技术打造Web 应用. {{site.project_title}}也扩展了更多额外增强的API 以满足当今的Web应用.

### {Angular JS | Closure | Google Web Toolkit}与这个项目有关联吗? {#frameworks}

没关联. {{site.project_title}} 与已有的东西非常的不同. {{site.project_title}} 是首个得益于 Web Components 的新库。  Web Components 的到来将极大的改变 web 开发，我们已为 {{site.project_title}} 光明的未来感到激动不已。

### polymer.dart 为何被 {{site.project_title}} 扯上关系了? {#dart}

polymer.dart 是Dart团队为 {{site.project_title}} 创建而维护的一部分.Dart团队正在与{{site.project_title}}团队合作确保polymer.dart组件和polyfill都完全与{{site.project_title}}兼容. 

### 源码挂在CDN上吗?

{{site.project_title}} 在 [cdnjs](http://cdnjs.com/) 有一份维护，可以通过以下URL加载:

    <script src="//cdnjs.cloudflare.com/ajax/libs/polymer/{{site.latest_version}}/platform.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/polymer/{{site.latest_version}}/polymer.js"></script>

以下理由是我们推荐你使用 Bower 而不是 CDN:

- CDN上并没有挂载 polymer.html 这样你的 elements 就失去了导入它的这一功能.
- 还有很多的 elements 没有挂载在CDN上，所以要想在你的项目中导入它们将变得非常的棘手。
- 你将无法 [通过 Vulcanize 合并你的代码](/articles/concatenating-web-components.html).

### 我看到一堆XHR的连接请求。干嘛用的? {#xhrrequests}

polyfill目前所受到的一个限制是 {{site.project_title}} 带耦合性的通过XHR模拟HTML Import. 我们正在测试改进打包系统和生成步骤来减少网络请求.当此API被浏览器原生支持, 一切还会照常工作的. 资源将会被正常的加载, 也会得益于并行加载和缓存策略等. 

你可以使用 [Vulcanize](/articles/concatenating-web-components.html), 这个构建工具可以将一堆 elements 合并一个页面里。

### 你们关注性能吗? {#performancestuff}

我们真心的想使整个Web平台都得到60fps的流畅度.这么说吧,  我们还没有按基准对所有polyfill进行过测试--毕竟, 我们还处于初级阶段! 如果你有兴趣帮助我们进行统计,  [请随时告诉我们](/discuss.html).

别忘了我们的库是会随着时间而消逝的! {{site.project_title}} 也会随着浏览器逐渐的以原生实现而变得好,  更强, 更快.

### platform.js 为什么这么大 (~163KB)? {#filesize}

压缩和gzip后 platform.js 仅有 ~44KB (对比 JQuery 1.10 是 32KB). 记住，占空间的大部分是polyfills；这些代码会在浏览器提供原生API后被移除的。

{{site.project_title}} 同样被设计成照单点菜。例如，如果你只对 Custom Elements 有兴趣，就使用 custom elements 的 polyfill。
如果你只想要 Shadow DOM 就用它的 polyfill。platform.js 仅是个快捷套餐，方便照单全收的开发者引入制作基于 {{site.project_title}} 的应用程序。

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
这也是个目标，允许用户精确使用所需的同时没有额外的负担。除了细粒化，高层的 components 可能由低层的 components 组装而成，
Bower 允许我们更容易的管理依赖关系。

### 我的 components 发布后成了同一个名称的不同`id`的标记。 {#multipleids}

{{site.project_title}} 很努力的去模拟原生 Shadow DOM，出现`id`相同的节点还是会被再包装。

不过呢，当使用 {{site.project_title}} 时，你应该避免使用 DOM-层级的id引用。因为当 Shadow DOM 是基于 polyfill 时可能无法正确的解析此 `id`。

## 数据绑定(Data-binding)

### 我尝试使用数据绑定的方式渲染 HTML 时 {{site.project_title}} 却把内容给转义了。 {#setinnerHTML}

{{site.project_title}} 在使用数据绑定时是会预防非转义的HTML，否则会出现 XSS 攻击的漏洞。 替代方案是, 你可以使用 [属性变更监听者](/docs/polymer/polymer.html#change-watchers) 和 [全自动节点查找](/docs/polymer/polymer.html#automatic-node-finding) 来设置节点的 `.innerHTML` :

    <div id="div"></div>

    dataChanged: function() {
      this.$.div.innerHTML = this.data;
    }

当使用 `<template repeat>` 时, 类似的方案可以参看这里的建议 [stackoverflow.com/a/22311788](http://stackoverflow.com/a/22311788).

### 我如何使用数据绑定来循环输出一个 `<option>` 或者 `<tr>`? {#option-tr}

在增强了HTML的 `<template>` 出现之前, 某些 elements 像 `<select>`, `<table>`, 和 [其实这些](https://github.com/Polymer/TemplateBinding/blob/master/src/TemplateBinding.js#L141:L153) 都有特殊的解析规则以防止除`<option>` 和 `<tr>` 以外的其他子节点分别作为他们的子节点.
由于这些历史遗留的规则，不支持 `<template>` 的浏览器会将无法识别的 elements 放到内容的外面并且与内容同级，包括 `<template>` 本身。

例如, 如果浏览器不支持 `<template>` 以下的代码将无效:

    <!-- 浏览器不支持 <template> 将无效. -->
    <table>
      {%raw%}<template repeat="{{tr in rows}}">{%endraw%}
        <tr><td>...</td></tr>
      </template>
    </table>

`<template repeat>` 将被吊到外边同级显示:

    <!-- 不支持的浏览器将 <template> 节点作为同级显示. -->
    {%raw%}<template repeat="{{tr in rows}}">{%endraw%}
      <tr><td>...</td></tr>
    </template>
    <table>
      ...
    </table>

对于 **不支持 `<template>` 的浏览器**, [TemplateBinding](/docs/polymer/template.html) [prollyfill](http://prollyfill.org/) 支持使用 `template`  属性直接循环输出 `<option>` 和 `<tr>` :

    <table>
      {%raw%}<tr template repeat="{{tr in rows}}">{%endraw%}
        <td>Hello</td>
      </tr>
    </table>

另一个使用 `<select>`/`<option>` 的例子:

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

如果你的用户使用的是不支持 `<template>` 的浏览器, 则在这些 [特殊 elements](https://github.com/Polymer/TemplateBinding/blob/master/src/TemplateBinding.js#L117) 上使用 `template` 属性.

**注意:** 支持 `<template>` 的浏览器允许 `<select>` 和 `<table>` 元素有其他类型的子节点.如查你确认你的用户使用的浏览器支持 `<template>`，你可以直接这么写:

    <table>
      {%raw%}<template repeat="{{tr in rows}}">{%endraw%}
        <tr>
          <td>Hello</td>
        </tr>
      </template>
    </table>

### 在一个 `<template repeat>` 里我如何访问指定的 model? {#templateinstancemodel}

例如, 在一个 `on-*` 处理器上, 你可以如此访问指定的 model 实例: `e.target.templateInstance.model.<property>`:

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

## 在一个 `<svg>` 元素里能使用  `<template>` 吗? {#templateinsvg}

当然能，参看实例 [demo](http://jsbin.com/EXOWUFu/60/edit).

{%raw%}
    <svg>
      <template repeat="{{l in lights}}">
        <circle cx="100" cy="{{l.cy}}" r="50" fill="{{l.selectedColor}}"/>
      </template>
    </svg>
{%endraw%}

它的行为与不支持 template 的浏览器类似，内容并不是惰性的。如，脚本还是会执行。

### 数据变更时传播速度有多快? {#dirtychecking}

如果 `Object.observe()` 是可用的，数据在每个任务处理完都会立即更新。
当不支持 `Object.observe()` 时, {{site.project_title}} 使用 polyfill ([observe-js](https://github.com/Polymer/observe-js)) 通过每125毫秒轮询整个系统的方式检测并传播数据的更新。

除了等待下次轮询的触发，另一个手动执行的更新的方式是执行 `Platform.flush()`。**你需要手动执行 `Platform.flush()` 的需求会非常的罕见.**

注意: 当平台原生就支持 `Object.observe()` , `Platform.flush()` 将啥也不干.

## Web Components

### 我如何将某个分支的 custom elements 打包到一起? {#packaging}

使用自定义构建步骤将全部所需压缩进一个文件里，然后通过 [HTML Imports](/platform/html-imports.html) (`<link rel="import">`) 将文件导入你的 app 里。

同样的，你要以单独写一个构建步骤将任何 custom element 的定义直接内嵌到你的 app 里。我们已经成功将此想法试验到一个叫 [Vulcanizer](/resources/tooling-strategy.html#vulcanize-build-tool) 的工具上了。

### 网络爬虫能识别 custom elements 吗? SEO 怎么办? {#seo}

由于 Polymer 使用了 polyfills，搜索引擎对待基于 Polymer 的应用程序与对待基于 javascript 的应用程序没有任何区别。
[事实上，Google 的网络爬虫是能识别重度javascript的应用程序的](http://googlewebmastercentral.blogspot.com/2014/05/understanding-web-pages-better.html)。
展望未来，有理由断定随着 Shadow DOM 的普及，搜索引擎也会像过去支持其他web技术一样的支持识别 Shadow DOM 的。

### 有没有一个 components 存档处供我去把玩? {#registry}

在 [http://customelements.io](http://customelements.io), 你可以找到很多第三方的 components 同时你也可以贡献上你的。

### 我在使用 `<link rel="import">` 引入外链文件时报错是为什么? {#externalfiles}

非常遗憾的是，这是 HTML Import 本身限制的，polyfill 也遵循了。polyfill 通过 XHR 加载资源。如果这些资源没有[开启CORs](http://www.html5rocks.com/tutorials/cors/) 那将会加载失败。

{%comment%}
### 我如何在我的 custom element 里使用 web fonts 或者 CSS Animations? {#fontsanimations}

参看 "[Making styles global](/docs/polymer/styling.html#making-styles-global)".
{%endcomment%}

### 为什么我的 element 的 `.clientWidth/clientHeight` 属性值都是 0? {#clientDimenstions}

默认情况下, Custom Elements是 `display: inline`.解决办法是通过`:host`规则给你的 element 默认应用上`display: block`样式.

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

### 我如何访问 `<content>` 里的 DOM? {#accessContentDOM}

对于 `<content>`, 你可以通过遍历 `content.getDistributedNodes()` 来获得插入点上的节点列表。

在 {{site.project_title}}里, 调用这个方法的最佳时机是在 [`attached()` 回调时](/docs/polymer/polymer.html#lifecyclemethods) ，那样你就能保证那个节点已经在 DOM 树里了。

别忘了你是可以正常取到元素的子节点的DOM的(i.e. `this.children`, 或其他途径). 
此方式手段区别在于这是整个被*潜在*分配节点的集合;而不是实际被分配的.

### 为何 element 在 created/ready 时返回的孩子节点(light DOM - 非Shadow DOM)是0个? {#zerochildren}

由于 element 更新存在细微的时差问题, 在 `created()`, `ready()`, 或者 `attached()` 方法上访问 element 的子节点(light dom)其实是错误的. 
当这些方法被触发时, element 无法保证已经在 DOM 里或者已经生成了子节点了，{{site.project_title}} 会在 element 的 `<template>` 调用 `TemplateBinding.createInstance()` 来创建它的 Shadow DOM。
这个流程在依次创建和绑定 template 上的 elements。

最快能访问一个 element 的子节点是在 `domReady()`回调时. 这时候 element 已经在 DOM 里了,有父节点和(可能的)子节点。
要监听子节点, [使用 mutation observer](#mutationlightdom).

### 何时才是访问 一个 element 的父节点的最快的最佳时机? {#parentnode}

`attached()` 回调时即是访问 一个 element 的父节点的最快的最佳时机。
那种方式，你能保证 element 已经在 DOM 里了，并且它的父节点已经被更新好了。

使用 `attached()` 和 `this.async()` 来确保你是下一次更新之后作操作的 (e.g. DOM 已构建完成):

    attached: function() {
      this.async(function() {
        // this.parentNode 已经更新就绪
      });
    }

另一个更加快捷的方式就是使用 {{site.project_title}} 提供的
`domReady()` 回调来做同样的事情:

    domReady: function() {
      // same
    }

### 我如何监听子节点(light DOM)的更新? {#mutationlightdom}

要想知道子节点被添加还是被删除，使用 Mutation Observer 来监听。
{{site.project_title}} 为每个元素实现了 `onMutation` 回调，可以用来监听单独一个DOM的变化：

    ready: function() {
      // 单独监听变化.
      this.onMutation(this, this.childrenUpdated);
    },
    childrenUpdated: function(observer, mutations) {
      mutations.forEach(function(record) {
        console.log(record.addedNodes);
      }.bind(this));
    }

要监听其他类型的变化，在 `ready()` 里自定义你自己的 `MutationObserver`:

    ready: function() {
      var observer = new MutationObserver(function(mutations) {
        ...
      }.bind(this));
      observer.observe(this, {childList: true, attributes: true});
    }

### 我能使用`constructor` 属性却不污染全局命名空间吗? {#constructorattr}

根据设计,  `constructor` 以constructor为命名空间的方式注册到了`window`下. 如果你不想这样, 这里有两个选择:

1. 不使用`constructor` 属性, 换用 `document.createElement()`.
2. 使用 `document.register()` 包装 constructor，放到另一个命名空间里返回。

### Shadow DOM 兼容辅助技术和读屏工具吗? {#accessibility}

**注意:** Steve Faulkner 不久前 [写过一篇好文](http://blog.paciellogroup.com/2012/07/notes-on-web-components-aria/) 发现是兼容的。同时请参看最近 Marcy Sutton's 写的 "[Accessibility and the Shadow DOM](http://substantial.com/blog/2014/02/05/accessibility-and-the-shadow-dom/)".

比较普遍的错误概念是 Shadow DOM 无法兼容辅助技术，实际上 Shadow DOM 是可以被遍历的，并且每个 Shadow DOM 节点都有一个 `shadowRoot` 属性指向它的 shadow document。
大多数辅助技术都是直接接入至浏览器的 rendering tree 的，所以能读到完整的 composed tree

实际上，如果你查看某个使用 Shadow DOM 原生 HTML 元素,如 `<input type="date">`, 你会注意到 aria 属性在它的结构树里:

![](/images/ariashadowdom.jpg)

其他类型的辅助技术工具，如 [Chromevox](http://www.chromevox.com/) 未来 [需要更新](https://code.google.com/p/chromium/issues/detail?id=96373) 来学会如何遍历 Shadow DOM.
无障碍专家正在进行的一个讨论是如何将 Shadow DOM 和读屏工具融合 ，及与搜索引擎，看似这是可以展望在今后将会发生的事情了。

### 我如何在 {{site.project_title}} element 里访问一个 `activeElement`? {#activeelement}

Shadow Roots 有它们自己的 `activeElement`, 你可以在内部通过 `shadowRoot.activeElement` 访问.

### 为什么DevTools里无法(在输入时)自动完成拼写补充我的 element 的 属性/方法 名? {#autocomplete}

这属于 Shadow DOM 的 polyfill 的处理问题。它会在元素的 DOM 结构外面包了一层仅将标准的 DOM API (e.g. `querySelector`) 暴露出来。
{{site.project_title}} 在这些外层包装上设置属性, 而不是实际的 DOM 对象上. 
由于 DevTools 只认实际的 DOM, 所以你的元素的属性无法被在工具里看到了.

**提示:** 在控制台输入 `wrap($0)` 可以选中某个节点. 你将会获得到外包节点及 {{site.project_title}} 添加的所有好东西。
你还能用 `unwrap()` 来获得其他的。
{: .alert .alert-info }

在原生的 Shadow DOM 里不会有这个问题。 属性在控制台里能自动完成拼写补充。

### custom elements 在 `<template>` 里有怎样的行为? {#intemplate}

Custom elements 在 templates 里类似于 `<script>` 且是友好--惰性的. 他们的不同之处在于被注册后 elements 并不会被更新。更新 `<template>` 里的一个 elements 会造成性能的不利后果.


---

*特别感谢GitHub 用户 md_5 慷慨的贡献了{{site.project_title}} 原名.*

