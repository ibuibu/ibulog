---
title: "ViteでOGP画像の設定方法"
date: "2022-04-05"
icon: "⚡"
tags: ["Vite"]
---

Viteで静的な画像を取り扱う場合は、通常`assets`ディレクトリを用意し、画像を格納する。

これをimportステートメントを書いて利用するのだが、画像のファイル名が`/assets/hoge.599ed363.png`のようにハッシュ化されてしまう。

よって、OGP画像などファイル名をハッシュ化したくない場合には、publicリポジトリを用意し、この中に配置する。

こうすると、`URL/画像.png`でアクセス可能となるので、以下のようにmetaタグを用意すればよい。

```html
<meta property="og:image" content="https://example.com/ogp.png">
```

[参考: Vite - 静的アセットの取り扱い(publicディレクトリ)](https://ja.vitejs.dev/guide/assets.html#public-%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA)
