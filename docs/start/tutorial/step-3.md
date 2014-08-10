---
layout: default
type: start
navgroup: docs
shortname: Start
title: "步骤 3: 使用数据绑定"
subtitle: 你的第一个 Polymer 应用程序 
---

<link rel="import" href="/elements/side-by-side.html">

<link rel="stylesheet" href="tutorial.css">


{% include toc.html %}


## 步骤 3: 使用数据绑定

一条记录看上去没问题，但 app 看起来有点不充实。本步骤里，你将从服务器加载数据并使用 Polymer 的数据绑定来渲染出一系列的卡片。

要获得数据，你将使用 `<post-service>` element 来提供 app 的初始数据。 
此 element 提供一个非常简单的 API 来模拟一个社交网络.
本小节里，你将使用 `posts` 属性, 它返回一个像这样的数组 `记录` 对象:

    {
      "uid": 2,
      "text" : "Loving this Polymer thing.",
      "username" : "Rob",
      "avatar" : "../images/avatar-02.svg",
      "favorite": false
    }

本小节，你将学到：

-   数据绑定.
-   公有的属性.

### 编辑 post-list.html

在你的编器里打开 `post-list.html`。

<side-by-side>
<pre>
&lt;link rel="import" href="../components/polymer/polymer.html">
&lt;link rel="import" href="../post-service/post-service.html">
&lt;link rel="import" href="post-card.html">

&lt;polymer-element name="post-list" attributes="show">
  &lt;template>
    &lt;style>
    :host {
      display: block;
      width: 100%;
    }
    post-card {
      margin-bottom: 30px;
    }
    &lt;/style>
    
    &lt;!-- add markup here -->
...
</pre>
  <aside>
    <h4>要点</h4>
    <ul>
      <li>文件里已经包含有 <code>&lt;post-service&gt;</code>
      element 的导入了，已经可以使用。</li>
      <li> <code>attributes="show"</code> 属性是声明一个名叫 <code>show</code> 的
      <a href="/docs/polymer/polymer.html#published-properties">
      <em>公有属性</em></a>
      </li>
    </ul>
  </aside>
</side-by-side>


<a href="/docs/polymer/polymer.html#published-properties">
<em>公有的属性</em></a> 是一个可以在标记里通过属性进行配置的属性，或者与其他属性通过数据双向(two-way)绑定进行连接。你会在后面的步骤用上 `show` 属性。

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

追加一个 `<post-service>` element 到 element 的 `<template>` 里:

<side-by-side>
<pre>
...
<strong class="highlight nocode">&lt;post-service id="service" posts="{%raw%}{{posts}}{%endraw%}">
&lt;/post-service></strong>
...
</pre>
  <aside>
  <h4>要点</h4>
    <ul>
      <li>
        <code>posts="{%raw%}{{posts}}{%endraw%}"</code> 属性将数据双向绑定添加到了 <code>&lt;post-service&gt;</code> element 和你的 custom element 之间.
      </li>
    </ul>
  </aside>
</side-by-side>

[_数据绑定_](/docs/polymer/databinding.html) 将 service element 的 `posts` 属性与一个局部属性 (这里也叫作`posts`)关联。
你在 custom element 上定义的所有方法都可以通过 `this.posts` 来访问响应的结果。

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div> 

动态渲染一个卡片列表。

添加以下的 `<div>` 和 `<template>` 标签:

<side-by-side>
{% raw %}
<pre>
...
&lt;post-service id="service" posts="{{posts}}">
&lt;/post-service>
<strong class="highlight nocode">&lt;div layout vertical center>
  &lt;template repeat="{{post in posts}}">
    &lt;post-card>
      &lt;img src="{{post.avatar}}" width="70" height="70">
      &lt;h2>{{post.username}}&lt;/h2>
      &lt;p>{{post.text}}&lt;/p>
    &lt;/post-card>
  &lt;/template>
&lt;/div></strong>
...
</pre>
{%endraw%}
<aside>
 <h4>要点</h4>
       
 <ul>
   <li>这个 <code>repeat="{%raw%}{{post in posts}}{%endraw%}"</code> 新语法，告诉 template 将 <code>posts</code> 数组里的每一项都用来新建一个实例</li>
   <li>在每个 template 实例里, 其他单独的绑定(像
   <code>{%raw%}{{post.avatar}}{%endraw%}</code>) 将被那一项里对应的值所替换。</li>
 </ul>
</aside>
</side-by-side>


### 编辑 index.html

将 `<post-list>` element 导入到 `index.html` 里。

打开 `index.html` 并为 `post-list.html` 添加导入连接。你可以直接将原生的 `post-card`的导入连接替换掉:

<pre>
...
&lt;link rel="import" href="../components/paper-tabs/paper-tabs.html">
<strong class="highlight nocode">&lt;link rel="import" href="post-list.html"></strong>
...
</pre>
    
<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

使用 `<post-list>` element.

找到上一个步骤里你添加的 `<post-card>` element 并将其替换成一个 `<post-list>`:

<pre>
...
&lt;div class="container" layout vertical center&gt;
  <strong class="highlight nocode">&lt;post-list show="all"&gt;&lt;/post-list&gt;</strong>
&lt;/div>
...
</pre>

### 测试你的工作

保存 `index.html` 文件并在浏览器里刷新它。你应该会看到这样一个卡片列表：

<div layout vertical center>
  <img class="sample" src="/images/tutorial/step-3.png">
</div>

如果哪里出了问题，可以对照 `step-3` 文件夹里的文件检查你的工作：

-   [`post-list.html`](https://github.com/Polymer/polymer-tutorial/blob/master/step-3/post-list.html)
-   [`index.html`](https://github.com/Polymer/polymer-tutorial/blob/master/step-3/index.html)

**探讨:** 打开 `post-service.html` 来瞧瞧此 component 是怎么工作的。 本质上，它使用 <code>
<a href="/docs/elements/core-elements.html#core-ajax">&lt;core-ajax&gt;</a></code> element 发起 HTTP 请求的.
{: .alert .alert-info}

### 下一步

<a href="/docs/start/tutorial/step-4.html">
  <paper-button icon="arrow-forward" label="步骤 4: 画龙点睛" raisedButton></paper-button>
</a>

