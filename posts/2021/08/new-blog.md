---
title: "ブログを新しくした"
date: "2021-08-20"
icon: "👋"
tags: ["雑記"]
---

なんとなく気分でブログを新しくした。Next.js製。

[前のブログ](https://awesome-nightingale-e9e443.netlify.app)は気分が乗らず更新しなくなってしまった。たぶん原因は３つ。

- ヘッドレスCMSのContentful経由で記事を取得する作りにしたのだが、Contentfulの書き味が悪く、なかなか書く気になれなかった。
- サムネイル画像を記事ごとに用意するのがダルかった。
- Nuxt.jsで作ったが、最近はVueに触れてないせいで、作りを変えようにもVueを書く気になれなかった。

そこで、夏休みの間のJavaScriptのリハビリがてら、ブログを新調した。今度のブログに求める要素は以下の通り。

- SSRではなくSSG。ローカルで好きなエディタで記事を書きたい。
- 記事の画像なしも寂しいので、Zenn.devのパクリで絵文字を添えたい。
- 最近はReactしか書かないので、Reactのフレームワークを使いたい。

ReactのSSGフレームワークといえば、Gatsby.jsが候補の筆頭に挙がる。実は最近仕事と趣味でGatsby.jsを使ったブログを作ってみたことはあった。が、いくつか不満に感じる部分があった。

- ビルドが遅い
- ブラックボックスな部分が多い
- プラグインの挙動に悩まされる

Next.jsで書きたいなあと思っていたときに、すてきなブログに出会った。

[https://miyaoka.dev/](https://miyaoka.dev/)

コードを見て、すごく洗練されていてシンプルで、学びが多そうな予感がした。

こちらを参考にさせてもらって、getStaticProps等のNext.jsのSSG用関数の使い方を勉強しながら、5日ぐらいかかって完成した。

まだまだ、基礎的な部分しか出来上がっていないが、これから少しずつ育てていきたい。

コードはこちら。

[https://github.com/ibuibu/ibulog](https://github.com/ibuibu/ibulog)


