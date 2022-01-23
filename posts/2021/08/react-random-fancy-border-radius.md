---
title: "Reactコンポーネントをnpmパッケージ公開した"
date: "2021-08-27"
icon: "🎁"
tags: ["React"]
---

最近作った某サイトで使用したデザインを、React コンポーネント化してみた。

[npm](https://www.npmjs.com/package/react-random-fancy-border-radius)

[GitHub](https://github.com/ibuibu/react-random-fancy-border-radius)

![output](https://user-images.githubusercontent.com/5201487/131143733-441d4343-fc5d-40ec-bb50-42442b72b977.gif)

こんな感じで、画像をレンダリング毎にランダムにフワッとした不思議な形で表示するもの。

作りとしては、以下のサイトの機構を基にして、CSS の border-radius の値をレンダリング毎にランダムにしただけの超カンタンな代物。

[https://github.com/9elements/fancy-border-radius](https://github.com/9elements/fancy-border-radius)

npm パッケージの公開の仕方がわかって勉強になった。
