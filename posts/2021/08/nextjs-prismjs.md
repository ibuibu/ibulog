---
title: "Next.jsでmarkdownのコードブロックをPrismJSでシンタックスハイライトする"
date: "2021-08-22"
icon: "🔆"
tags: ["Next.js"]
---

本ブログを作成する際に実施した内容。



1. 以下をインストール

- [prismJS](https://prismjs.com/)
- prismJS の型定義ファイル
- [babel-plugin-prismjs](https://www.npmjs.com/package/babel-plugin-prismjs)

```shell
npm i prismjs
npm i -D @types/prismjs babel-plugin-prismjs
```

2. `.babelrc.js`を作成。ここで必要な language を追加したり、テーマを変更できる。

```javascript
module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "prismjs",
      {
        languages: ["javascript", "css", "html", "bash"],
        plugins: ["line-numbers", "show-language"],
        theme: "okaidia",
        css: true,
      },
    ],
  ],
};
```

3. 実装。useEffectを使って、レンダリング後にハイライトを適用。

```javascript
import Prism from "prismjs";

const Component = ({ post }) => {
  useEffect(() => {
    Prism.highlightAll();
  });
  return (
    <div
      dangerouslySetInnerHTML={{ __html: post.content }}
    />
  );
};
```

参考

[https://frendly.dev/posts/using-prism-js-in-next-js](https://frendly.dev/posts/using-prism-js-in-next-js)