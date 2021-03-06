---
title: "PostCSS-Nestedã®å°å¥"
date: "2021-08-23"
icon: "ð­"
tags: ["PostCSS"]
---

Tailwind CSS ã§ãjavascript ã§ markdown ã HTML åããéãHTML ãæªç¢ºå®ãªãã CSS ãæ¸ãè¾¼ããªãã¦å°ã£ãã

ä»¥ä¸ã®ããã«.article ã¯ã©ã¹ãä½ãããã®å­è¦ç´ ããã¹ã¦å®ç¾©ããããã§ãèª­ã¿è¾¼ã div è¦ç´ ã«é©ç¨ããã°è¯ããã¨ãããã£ãã

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

ãã ãCSS ã«.article ããã¹ã¦è¨è¼ããªãã¨ãããªããããéå¸¸ã«åé·ã ãSASS ã®ããã«ãã¹ããããã

èª¿ã¹ãã¨ãã©ãã[PostCSS-Nested](https://github.com/postcss/postcss-nested)ãå°å¥ããã°ããã¹ãè¨æ³ãå¯è½ã¨ãªããã¨ãããã£ãã

ã¡ãªã¿ã«ãå§å¦¹ãã©ã°ã¤ã³ã§[PostCSS-Nesting](https://github.com/csstools/postcss-nesting)ãªããã®ãããããã¡ãã¯[æ¬å®¶ CSS Nesting Moduleï¼èæ¡ï¼](https://triple-underscore.github.io/css-nesting-ja.html)ã®è¨æ³ã«æºãã¦ããã

ä»åã¯ãç°¡æ½ã« SASS ã£ã½ãæ¸ãã PostCSS-Nested ãé¸ãã ã

### å°å¥æ¹æ³

1. ã¤ã³ã¹ãã¼ã«ããï¼PostCSS ãã¤ã³ã¹ãã¼ã«ããã¦ããåæï¼

```shell
npm i -D postcss-nested
```

2. `postcss.config.js`ã«ä»¥ä¸ã®ããã« plugin ãè¿½å ãã

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

ããã ãã§ OKã

### ä½¿ãæ¹

ä»¥ä¸ã®ããã«ãã¹ããã§ããã

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
