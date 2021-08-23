---
title: "PostCSS-Nestedの導入"
date: "2021-08-23"
icon: "📭"
---

Tailwind CSS で、javascript で markdown を HTML 化する際、HTML が未確定なため CSS を書き込めなくて困った。

以下のように.article クラスを作り、その子要素をすべて定義したうえで、読み込む div 要素に適用すれば良いことがわかった。

```css
.article p {
  @apply text-sm;
}
.article h1 {
  @apply text-xl;
}
```

```javascript
<div
  className="${styles.article}"
  dangerouslySetInnerHTML={{ __html: content }}
/>
```

ただ、CSS に.article をすべて記載しないといけないため、非常に冗長だ。SASS のようにネストしたい。

調べると、どうも[PostCSS-Nested](https://github.com/postcss/postcss-nested)を導入すれば、ネスト記法が可能となることがわかった。

ちなみに、姉妹プラグインで[PostCSS-Nesting](https://github.com/csstools/postcss-nesting)なるものもあり、こちらは[本家 CSS Nesting Module（草案）](https://triple-underscore.github.io/css-nesting-ja.html)の記法に準じている。

今回は、簡潔に SASS っぽく書ける PostCSS-Nested を選んだ。

### 導入方法

1. インストールする（PostCSS がインストールされている前提）

```shell
npm i -D postcss-nested
```

2. `postcss.config.js`に以下のように plugin を追加する

```javascript
//postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-nested": {},
  },
};
```

これだけで OK。

### 使い方

以下のようにネストができる。

```css
.article {
  h1,
  h2,
  h3,
  h4 {
    font-family: serif;
    font-weight: bold;
  }
  h1 {
    @apply text-4xl;
  }
  h2 {
    @apply text-3xl;
  }
}
```
