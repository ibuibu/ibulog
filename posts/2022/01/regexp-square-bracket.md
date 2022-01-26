---
title: "Javascriptの正規表現で\" ] \"を指定する"
date: "2022-01-26"
icon: "🔲"
tags: ["RegExp"]
---

どうしても`"]"`を文字クラス（`[]`）内に含めたいときは三重バックスラッシュエスケープをかませばいける。

```js
// node
> const r = new RegExp("[\\\]]")
r.test("]")
true
> r.test("a")
false
```

ちなみにJavascriptだと、`"]"`以外の基本的な記号はすべてエスケープが不要なようだ。

```js
// node
> const r = new RegExp("!\[@#$%^&*()+_|=:;\"/?.><,`~{}]+$")
> r.test("![@#$%^&*()+_|=:;\"/?.><,`~{}")
true
```

