---
title: 対応ブラウザについて
---

<!-- toc -->

Polymer 2.x は全ての主要ブラウザにおいて _最新と1つ前のバージョンで_ 動作します: Safari 9、IE 11以上、また最新のChrome、Firefox、Edgee.

##  対応状況

Polymerライブラリは、[WebコンポーネントAPI](http://webcomponents.org/articles/why-web-components/)における最上位の軽量レイヤーです。Polymerによって使用されるいくつかの機能は、（まだ）すべてのブラウザでネイティブにサポートされていません。幅広いWebコンポーネントのサポートのために、Polymerは [webcomponents.org](http://webcomponents.org) の [ポリフィル]((https://github.com/webcomponents/webcomponentsjs) を使用します。これは軽量で、うまく動作し、Polymerが必要とする機能をサポートします。

このポリフィルによって、Polymerは次のブラウザで動作します。：

<style>
td:not(.feature-title),th {
  text-align: center;
}
td.native {
  background-color: green;
  color: white;
}
td.partial {
  background-color: #2dd42d;
  color: white;
}
td.polyfill {
  background-color: darkorange;
  color: black;
}
</style>

<table>
<thead>
  <tr><th></th><th>Chrome</th><th>Firefox</th><th>IE&nbsp;11+/<br>Edge</th><th>Opera</th><th>Safari 9+</th><th>Chrome
 <br>(Android)</th><th>Safari<br>(iOS&nbsp;9+)</th></tr>
</thead>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/template/">Template</a></td>
  <td class="native">Native</td>
  <td class="native">Native</td>
  <td class="partial">部分的</td>
  <td class="native">Native</td>
  <td class="native">Native</td>
  <td class="native">Native</td>
  <td class="native">Native</td>
</tr>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/imports/">HTML Imports</a></td>
  <td class="native">Native</td>
  <td class="polyfill">Polyfill</td>
  <td class="polyfill">Polyfill</td>
  <td class="native">Native</td>
  <td class="polyfill">Polyfill</td>
  <td class="native">Native</td>
  <td class="polyfill">Polyfill</td>
</tr>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/customelements/">Custom Elements</a></td>
  <td class="native">Native</td>
  <td class="polyfill">Polyfill</td>
  <td class="polyfill">Polyfill</td>
  <td class="native">Native</td>
  <td class="partial">部分的</td>
  <td class="native">Native</td>
  <td class="partial">部分的</td>
</tr>
<tr>
  <td class="feature-title"><a href="http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/">Shadow DOM</a></td>
  <td class="native">Native</td>
  <td class="polyfill">Polyfill</td>
  <td class="polyfill">Polyfill</td>
  <td class="native">Native</td>
  <td class="partial">部分的</td>
  <td class="native">Native</td>
  <td class="partial">部分的</td>
</tr>
</table>

注意:

-   Templates はEdgeではサポートされていますが、IEではされていません。
-   SafariはCustom Elementsのサポートを10.3から開始しています。
-   SafariはShadow DOMのサポートを10.2から開始していますが、10.3でもいくつか問題が残っています。
-   古いバージョンのAndroidブラウザはいくつか動作に問題があるでしょう。問題を発見したら[イシュー](https://github.com/polymer/polymer/issues)として報告してください。
    Chrome for Androidはサポートされています。

さらに詳しい情報は[Polyfills](polyfills)を参照してください。

## ES6

Polymer 2.x は EcmaScript 2015 (ES6)を使用します。次のブラウザは、Polymerに必要なすべてのES6の機能をサポートしています。

-   Chrome もしくは Chromium の49以上
-   Opera 36以上
-   Safari もしくは Mobile Safari 10以上
-   Edge 15.15063以上
-   Firefox 51以上

他のブラウザでは、ES5にコンパイルする必要があります。

さらに詳しい情報は[ES6からES5へのコンパイル](es6)を参照してください。