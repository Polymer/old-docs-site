---
title: App storage
---

<!-- toc -->

`app-storage`関連のエレメントは、アプリ内のデータを管理するための新しいツール群を提供します。初期ツールには、アプリをFirebaseやPouchDBを可能にするエレメントが含まれています。

## Firebaseとの統合

Firebase 3.0.0 SDKは、`app-storage`で構築された新しいFirebaseエレメントのセットをサポートしており、[PolymerFire](https://github.com/Firebase/PolymerFire)と呼ばれています。これらのエレメントは、Firebase SDKと垣根のない統合を提供し、アプリ初期化時のユーザ認証、データベースアクセスのような処理をこれまで以上に簡単なものにしてくれます。
### オフラインデータのミラーリング

[`<app-indexeddb-mirror>`](https://www.webcomponents.org/element/PolymerElements/app-storage/app-indexeddb-mirror)エレメントは、Firebaseのようなデータベースに読み取り専用のミラー機能を提供します。これにより、接続可能なネットワークがない場合でも、ユーザーは自身の個人データにアクセスできます。

Firebaseには、ユーザがアプリケーションの利用中に突然トンネルを通過した場合など、ネットワーク接続の一時的な切断から回復する能力もあります。ネットワークに再接続するとすぐ、Firebaseはサーバとの連携と更新を継続します。しかしFirebaseやその他の人気のストレージを使用したレイヤがうまく処理できないケースは他にもあります。例えば、ユーザーがオフライ環境でアプリ起動したような場合です。

## PouchDBエレメント

Polymerの[app-pouchdb](https://www.webcomponents.org/element/PolymerElements/app-pouchdb)コンポーネントに含まれるエレメントは、PouchDBのドキュメントへのアクセス、データベースへのクエリ、ローカルデータベースとリモートデータベース間の同期、さらにはリモートのCouchDBインスタンスを使ったユーザー認証などにも利用できます。PouchDBはローカルのIndexedDBデータベースとデータを自動的に同期させるので、プログレッシブウェブアプリ(PWA)にオフライン優先のデータアクセス機能を追加することは容易なことではありません。
