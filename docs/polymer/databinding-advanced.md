---
layout: default
type: core
navgroup: docs
shortname: Docs
title: 高阶话题
subtitle: 数据绑定
---

<style>
pre strong {
  color: #000;
}
</style>

{% include toc.html %}


未来在一个 {{site.project_title}} 应用中绑定数据，本章涵盖的一些你不需必要理解的高阶话题。

## 数据绑定如何工作

最易于理解数据绑定的方式可能就是首先要理解数据绑定不是什么——它有别于传统模板系统的工作原理。

在传统的 AJAX 应用中，模板的工作原理就是替换一些容器 element 的 innerHTML。容器包含了一个小的 DOM 子树，这样有两个缺点：

替换已存在的子结点破坏了 DOM 结点的短暂状态，比如事件收听者和表单的输入值。整套结点都被销毁或重建，即便只有一小部分值变化。

相反，{{site.project_title}} 数据绑定**将 DOM 的改动最小化**。重现了 template 实例的 DOM 结点会和相应的数据模型一直持续下去。

考虑下面的 DOM，其展现了一个 template 及其管理的 template 实例：

{% raw %}
    <table>
        <template repeat="{{item in items}}">
          <tr><td> {{item.name}} </td><td> {{item.count}} </td></tr>
        </template>
       <tr><td> Bass </td><td> 7 </td></tr>  
       <tr><td> Catfish </td><td> 8 </td></tr> 
       <tr><td> Trout </td><td> 0 </td></tr>   
    </table>
{% endraw %}

如果你按 `item.count` 顺序重排数组，{{site.project_title}} 只会单纯的调换相应的 DOM 子树的位置。不会创建或销毁任何结点，唯一的变化是改变了两个结点的排序 (加粗的部分)：

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

如果你改变了一个对象的 `item.count`，唯一的变化是改变了绑定该值的 DOM 树发生变化 (加粗的部分)：

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


### 数据绑定如何跟踪 template 实例

当一个 template 生成一个或多个实例时，这些实例立即插入会在其身后。所以 template 本身就是第一个实例开始的标记。对每个 template 实例来说，template 对其最终的结点保持跟踪。在单个的例子里，终止结点是 template 本身的最后一个结点的克隆。

下面的图展示了一个 template 及其实例的 DOM：

{% raw %}
<pre>
    &lt;template repeat="{{item in myList}}">
       &lt;img>
      &lt;span>{{item.name}}&lt;/span>
    &lt;/template>                  
    &lt;img>
    &lt;span>foo&lt;/span>   <span class="nocode" style="color: red"><em>⇐ template 实例的终止结点</em></span>
    &lt;img>
    &lt;span>bar&lt;/span>   <span class="nocode" style="color: red"><em>⇐ template 实例的终止结点</em></span>
    &lt;img>
    &lt;span>baz&lt;/span>   <span class="nocode" style="color: red"><em>⇐ template 实例的终止结点</em></span>
</pre>
{% endraw %}

所有 template 结点内且包含了第一终止结点的兄弟结点 (及其子结点) 组成了第一个 template 实例的 DOM。每个后面的 template 实例也是同样的辨识方式。

如果 myList 数组内的对象被移动或删除，template 可以移动或删除相应的 DOM 结点。

在嵌套的 templates 情况下，识别终止结点是一件更复杂的事情。考虑下面的 templates：

{% raw %}
    <template repeat="{{user in users}}">
      <p>{{user.name}}</p>
      <template repeat="{{alias in user.aliases}}">
         <p>a.k.a. {{alias}}</p>
      </template>
    </template>
{% endraw %}

在这个例子中，最外层 template 最后的结点是内层的 template。当 template 实例被创建时，内层 template 生成他自己的实例。(在下面的例子中，空格被添加到了 template 实例的周围以确保可读性。)

{% raw %}
<pre class="prettyprint">
&lt;template repeat="{{user in users}}">
  &lt;p>{{user.name}}&lt;/p>
  &lt;template repeat="{{alias in user.aliases}}">
     &lt;p>a.k.a. {{alias}}&lt;/p>
  &lt;/template>
&lt;/template>

&lt;p>Bob&lt;/p>              <span class="nocode" style="color: red"><em>⇐ 开始第 1 个最外层的 template 实例</em></span>
&lt;template repeat="{{alias in user.aliases}}">
  &lt;p>a.k.a. {{alias}}&lt;/p>
&lt;/template>

&lt;p>a.k.a. Lefty&lt;/p>     <span class="nocode" style="color: red"><em>⇐ 第 1 个内层 template 实例</em></span>

&lt;p>a.k.a. Mr. Clean&lt;/p> <span class="nocode" style="color: red"><em>⇐ 第 2 个内层 template 实例</em></span>
                         <span class="nocode" style="color: red"><em> (最外层 template 实例的终止结点)</em></span>


&lt;p>Elaine&lt;/p>           <span class="nocode" style="color: red"><em>⇐ 开始第 2 个最外层的 template 实例</em></span>
&lt;template repeat="{{alias in user.aliases}}">
  &lt;p>a.k.a. {{alias}}&lt;/p>
&lt;/template>

&lt;p>a.k.a. The Wiz&lt;/p>    <span class="nocode" style="color: red"><em>⇐ 第 1 个内层 template 实例</em></span>
                          <span class="nocode" style="color: red"><em> (最外层 template 实例的终止结点)</em></span>
</pre>
{% endraw %}

在这个例子中，注意最外层实例的终止结点和最后一个内层实例的终止结点是相同的。

### 改变 template 生成的 DOM 结点

通常**你犯不着手动改变由 template 绑定生成的 DOM 结点**——你可以通过简单的绑定设置和数据模型对象修改完成几乎所有的事情。

如果你_确实_需要改变由 template 生成的 DOM 结点，安全的方法是不要移除 template 实例的终止结点。最简单的方式就是把 template 的内容用一个容器 element 包裹一下：

{% raw %}
    <template repeat="{{item in listItems}}">
      <section on-click={{rowSelected}}>
        <h2>{{item.title}}</h2>
        <p>{{item.text}}</p>
      </section>
    </template>
{% endraw %}

这样，外层的 <section> 会在每个 template 实例中充当终止结点的角色。你可以改变每个 <section> 里面的 DOM 结点直到 <section> 结点自身被移除。例如，当一个 section 被点击时，被调用的 rowSelected 事件句柄可以做这样的事情：

{% raw %}
    rowSelected: function(e, detail, sender) {
      var blinkTag = document.createElement('blink-tag');
      blinkTag.textContent = 'BREAKING NEWS';
      sender.insertBefore(blinkTag, sender.querySelector('p'));
    }
{% endraw %}

**注意：**在实践中，在数据模型上设置一个值或使用条件性 template 比这样做更容易也更清晰。这个例子只是用于演示数据绑定系统处理变化的方式。
{: .alert .alert-info }


点击行的 DOM 变化如下 (增加了空格以确保可读性)：

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

因为 template 通过终止结点识别了每个实例，实例状态的变化是持续的，哪怕其实例被重新排序：

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


当然，如果你改变了其绑定的一个值，它会在下一次底层数据变化的时候被重写。双向数据绑定只注册 input elements 的 DOM 改变——而不是改变任意 DOM 结点。

## 在 {{site.project_title}} element 外使用数据绑定 {#bindingoutside}

{{site.project_title}} 数据绑定在一个 {{site.project_title}} element _内部_可以正常工作。如果你想在其它地方使用数据绑定，有两种可选的办法：

*   如果你使用了 {{site.project_title}}，通过一个[自动绑定的 template](#autobinding) 来创建一个带有数据绑定的 custom element。

*   如果你不使用 {{site.project_title}} 别的部分，可直接使用 [template 绑定](/docs/polymer/template.html)库。Template 绑定库被用在 {{site.project_title}} 内部，也可以脱离 {{site.project_title}} 的其它部分直接使用。(注意如果你自行使用 template 绑定，你就无法使用 {{site.project_title}} 表达式了。)

**注意：**早期的 {{site.project_title}} 版本包含了一个 element 名叫 `<polymer-body>`。如果你想使用早期的 `<polymer-body>`，最接近的替代方案就是自动绑定 template。
{: .alert .alert-info }

### 使用自动绑定 template element {#autobinding}

`auto-binding` element 是一个扩展自标准的 `<template>` element 的 {{site.project_title}} custom element。你可以在需要使用 {{site.project_title}} 数据绑定但没必要创建一个 custom element 的时候用到它。自动绑定 template 支持当你创建你自己的 custom element 时可用的特征的一个子集：

-   带有 {{site.project_title}} 表达式的全功能数据绑定
-   [声明式事件映射](polymer.html#declarative-event-mapping).
-   [自动化定位结点](/polymer/polymer.html#automatic-node-finding). 

对于一个自动绑定的 template，其数据模型在 template 本身之上。例如，在页面的定级使用数据绑定：

{% include samples/databinding/auto-binding.html %} 

自动绑定 template 插入在其 DOM 树之后立即创建的实例 (_不在_ shadow DOM 中)。这时，quote 被作为 `body` element 的子元素被插入。

添加实例之后，自动绑定 template 触发 `template-bound` 事件。

目前当你载入 {{site.project_title}} 库时，`auto-binding` element 是自动包含的。

