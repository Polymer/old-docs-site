---
subtitle: ボックスには何が入っているか？
title: Polymer App Toolbox
---

Polymer App Toolboxは、Polymerを使用して[Progressive Web Apps(PWA)](https://developers.google.com/web/progressive-web-apps/)を構築するためのコンポーネントやツール、テンプレートのコレクションです。App Toolboxの機能は以下の通りです。：

-   PolymerとWebコンポーネントを利用したコンポーネント指向のアーキテクチャ
-   [`<app-layout>`](https://www.webcomponents.org/element/PolymerElements/app-layout)コンポーネントを利用したレスポンシブルデザイン
-   [`<app-route>`](https://www.webcomponents.org/element/PolymerElements/app-route)エレメントを使用したモジュラールーティング
-   [`<app-localize-behavior>`](https://www.webcomponents.org/element/PolymerElements/app-localize-behavior)によるローカリゼーション
-   [`<app-storage>`](https://www.webcomponents.org/element/PolymerElements/app-storage)エレメントによるローカルストレージの簡易なサポート
-   Service Workerを使った、オフラインキャッシュによる[Progressive Enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement)
-   ビルドツールは複数のアプリケーション配信手段をサポートしており、サーバープッシュを使うHTTP/2向けにはunbundledファイルを配信し、HTTP/1向けにはbundledファイルを配信します。

これらコンポーネントのいずれか一つを個別に使用することも、それらを併用してフル機能のProgressive Web Apps(PWA)を構築することもできます。最も重要なのは、各コンポーネントが付加的(additive)であることです。シンプルなアプリであれば、`app-layout`だけで十分かもしれません。アプリが複雑化するにつれ、必要に応じてルーティング、オフラインキャッシュ、ハイパフォーマンスな配信方法を追加することができます。

**ハイブリッド互換** Toolboxのエレメントと機能には、Polymer 1とPolymer 2の両方で利用可能なハイブリッド版が用意されています。2.0リリース候補(RC)を使う場合は、エレメントの`2.0-preview`ブランチを使用してください。
{.alert .alert-info}

これらのコンポーネントの実際の動作を体感したい場合は、次のいずれかのデモアプリケーションを試してみてください。：

-   [Shop](https://shop.polymer-project.org/)：Shopは、ツールボックスを使用して構築された、フル機能を備えたECのPWAデモです。ビルド方法は、[Case study: the Shop app](case-study)を読んでください。

-   [News](https://news.polymer-project.org/)：NewsはShopのようなフル機能のPWAのデモですが、コンテンツの配信に焦点を当てています。ビルド方法は、[Case study: the News app](news-case-study)を読んでください。

App Toolboxの利用を開始するには、[App Toolboxでアプリを構築](/2.0/start/toolbox/set-up)を参照してください。

または、[レスポンシブアプリのレイアウト](app-layout)を読んでみてください。

<a href="/2.0/start/toolbox/set-up" class="blue-button">Build an app
</a>

<a href="app-layout" class="blue-button">Responsive app layout
</a>
