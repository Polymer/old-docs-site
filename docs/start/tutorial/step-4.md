---
layout: default
type: start
navgroup: docs
shortname: Start
title: "步骤 4: 画龙点睛"
subtitle: 你的第一个 Polymer 应用程序 
---

<link rel="import" href="/elements/side-by-side.html">

<link rel="stylesheet" href="tutorial.css">

<style>
.unquote-link {
  max-width: 360px;
}
.unquote-image {
  background-image: url(/images/tutorial/finished.png);
  background-size: cover;
  background-position: top;
  width: 360px;
  height: 320px;
  border: 1px solid black;
}
</style>

## 步骤 4: 画龙点睛

本章节，你将通过添加偏好按钮和将tab标签关联 `<post-list>` 来完成这个 app.

本章节，你将学到：

-   显示事件处理。
-   给 element 追加属性和方法。
-   全自动节点查找。

### 编辑 post-card.html

在你的编辑器里打开 `post-card.html` 并追加以下
<code><a href="/docs/elements/core-elements.html#core-icon-button">&lt;core-icon-button></a></code>
element：

<side-by-side>
<pre>
&lt;div class="card-header" layout horizontal center>
  &lt;content select="img">&lt;/content>
  &lt;content select="h2">&lt;/content>
&lt;/div>
<strong class="highlight nocode">
&lt;core-icon-button
  id="favicon"
  icon="favorite"
  on-tap="{%raw%}{{favoriteTapped}}{%endraw%}">
&lt;/core-icon-button>
</strong>
&lt;content>&lt;/content>
</pre>
<aside>
  <h4>要点</h4>
  <ul>
    <li>正如它的名字所称， <code>&lt;core-icon-button&gt;</code> 创建一个带有 icon 的按钮。 {{site.project_title}} 含有不少可缩放的 icon 集合。</li>
    <li><code>icon="favorite"</code> 属性是从默认 icon 集合里选择了心形 icon。</li>
    <li><code>on-tap=</code><wbr><code>"{%raw%}{{favoriteTapped}}{%endraw%}"</code> 属性指定了一个方法给 <code>post-card</code> element 上的按钮被按时调用。</li>
  </ul>
</aside>
</side-by-side>

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

追加 `favorite` 属性和方法 `favoriteTapped` 到 element 的属性里。 

<side-by-side>
<pre>
&lt;script>
<strong class="highlight nocode">   
Polymer({
  publish: {
    favorite: {
      value: false,
      reflect: true
    }
  },
  favoriteTapped: function(event, detail, sender) {
    this.favorite = !this.favorite;
    this.fire('favorite-tap');
  }
});</strong>
&lt;/script>
</pre>
  <aside>
    <ul>
      <li>这里的<code>publish</code> 对象是另一种指定公有属性的方法，
	   像步骤 3 里展示过的 <code>attributes</code> 属性。 这里的
      <code>favorite</code> 属性默认设置为 <code>false</code>, 且是 <em>reflects</em> 的, 
      意思是 <code>favorite</code> 属性在 DOM 里将随着它的值改变而被更新。</li>
      <li><code>favoriteTapped</code> 事件来用切换 <code>favorite</code> 的属性 (<code>this.favorite</code>) 状态，
       并且触发一个自定义的事件, 使用内部的 <code>fire</code> 方法。 (<code>fire</code> 是 {{site.project_title}} 为每个custom element 自动追加的工具方法中的一个方法。)</li>
    </ul>
  </aside>
</side-by-side>

以上带来的改变是，当偏好按钮被点击时，favorite属性将被更新，且关联的属性将被设定或还原。

目前，按钮被按后的状态还没有加效果。

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

添加以下的 CSS 样式给偏好按钮上样式：

<side-by-side>
<pre><strong class="highlight nocode">
core-icon-button {
  position: absolute;
  top: 3px;
  right: 3px;
  fill: #636363;
}
:host([favorite]) core-icon-button {
  fill: #da4336;
}</strong>
&lt;/style>
</pre>
  <aside>
    <ul>
      <li><code>fill</code> 属性设置了 icon 的填充色。</li>
      <li><code>:host([favorite]) core-icon-button</code> 选择器设置的是 custom element 的 <code>favorite</code> 属性被设定时的填充色。</li>
    </ul>
  </aside>
</side-by-side>

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

保存 `post-card.html`.
   
到这个点时，你刷新你的页面可以看到偏好按钮正常工作了，不过完成本 app 还有几个小步骤。

### 编辑 index.html

打开 `index.html` 修改 tab 事件，使得用户在 `<post-list>`  里切换tab标签时能切换视图：

<pre>
&lt;script>
var tabs = document.querySelector('paper-tabs');
<strong class="highlight nocode">var list = document.querySelector('post-list');

tabs.addEventListener('core-select', function() {
  list.show = tabs.selected;
});</strong>
&lt;/script>
</pre>

保存 `index.html`.

### 编辑 post-list.html

在你的编辑器里打开 `post-list.html` 。

修改创建 `<post-card>` elements 的 template 来完成偏好列表的代码：

<side-by-side>
  {% raw %}
<pre>
  &lt;template repeat="{{post in posts}}">
    <strong class="highlight nocode">
    &lt;post-card
      favorite="{{post.favorite}}"
      on-favorite-tap="{{handleFavorite}}"
      hidden?="{{show == 'favorites' && !post.favorite}}">
      </strong>
      &lt;img src="{{post.avatar}}" width="70" height="70">
      &lt;h2>{{post.username}}&lt;/h2>
      &lt;p>{{post.text}}&lt;/p>
    &lt;/post-card>
  &lt;/template>
</pre>
  {% endraw %}
  <aside>
    <ul>
      <li><code>favorite=<wbr>"{%raw%}{{post.favorite}}{%endraw%}"</code> 将卡片的 <code>favorite</code> 值绑定到 <code>&lt;post-service&gt;</code> 的数组的对应值上。</li>
      <li><code>on-favorite-tap</code> 属性设置了一个句柄给 <code>&lt;post-card&gt;</code> 触发的 <code>favorite-tap</code> 事件。</li>
      <li><code>hidden?=</code><wbr><code>"{%raw%}{{}}{%endraw%}"</code> 表达式是布尔属性特有的语法，如果表达式的值为 true 时则设置属性。 </li>
    </ul>
  </aside>
</side-by-side>

`hidden`  表达式实际上是实现了全部tab标签和偏好tab标签之间的切换工作。
`hidden` 属性是标准的 HTML5 属性。 对于不原生不支持 `hidden` 属性的浏览器，{{site.project_title}} 默认的样式包含有将 `hidden` 当作 `display: none` 的样式。

<div class="divider" layout horizontal center center-justified>
  <core-icon icon="polymer"></core-icon>
</div>

在 `post-list.html` 里给 `favorite-tap` 事件添加事件处理器：

<side-by-side>
<pre>
&lt;script>
<strong class="highlight nocode">
Polymer({
  handleFavorite: function(event, detail, sender) {
    var post = sender.templateInstance.model.post;
    this.$.service.setFavorite(post.uid, post.favorite);
  }
});
</strong>
&lt;/script>
</pre>
  <aside>
    <h4>要点</h4>
    <ul>
      <li><code>sender<wbr>.templateInstance<wbr>.model</code> model 数据的引用,用来创建 template 实例的。
      本例里，它包含有用来创建一个 <code>&lt;post-card&gt;</code> 的 <code>post</code> 对象，你才能恢复它的 ID 和
      <code>favorite</code> 的值。</li>
      <li><code>this.$.service</code> 返回的是 <code>&lt;post-service&gt;</code> element 的引用。
      一个 custom element 的 shadow DOM 里的每个有 <code>id</code> 属性的元素都会被记录进 <code>this.$</code> 字典里。这就是 <a href="/docs/polymer/polymer.html#automatic-node-finding">全自动节点查找</a>.</li>
      <li>如果这是一个真实的社交网络服务，<code>setFavorite</code> 方法将把变更持久化到服务器保存起来。不过呢，这里只是在控制台打印出一条消息日志。</li>
    </ul>
  </aside>
</side-by-side>

### 收工!

保存 `post-list.html` 刷新页面。

到此 &mdash; 你就搞定了! 运气不错的话，你的应用程序看上去就是这样的：

<figure layout vertical center>
  <a href="/samples/tutorial/finished/index.html" layout horizontal flex class="unquote-link">
    <div class="unquote-image" flex></div>
  </a>
  <figcaption>
    Click screenshot for demo
  </figcaption>
</figure>

如果你的项目看上去哪里不对劲，可以对照 `finished` 文件夹里的文件检查你的工作：

-   [`post-card.html`](https://github.com/Polymer/polymer-tutorial/blob/master/finished/post-card.html)
-   [`post-list.html`](https://github.com/Polymer/polymer-tutorial/blob/master/finished/post-list.html)
-   [`index.html`](https://github.com/Polymer/polymer-tutorial/blob/master/finished/index.html)

### 开始做你的下一个项目吧

准备好自己开发一个项目了吗? 安装一些 {{site.project_title}} components 然后开始吧！

<a href="/docs/start/getting-the-code.html#installing-components">
  <paper-button icon="arrow-forward" label="安装 components" raisedButton></paper-button>
</a>


