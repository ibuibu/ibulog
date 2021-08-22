---
title: "Tailwind CSSでwidth等に固定値を使う方法"
date: "2021-08-21"
icon: "💨"
---

例えば、こんなふうに固定値を指定することができる。

```html
<div class="w-[762px]"></div>
```

数値のところに単位（px）を付けて、`[]`で括る。

なお、使用する際には、Tailwind CSSをJust in time（jit） モードにする必要がある。

jitモードにするには、`tailwind.config.js`に１行追加する。

```javascript
// tailwind.config.js
module.exports = {
  mode: "jit",
};
```

参考

[https://tailwindcss.com/docs/just-in-time-mode#arbitrary-value-support](https://tailwindcss.com/docs/just-in-time-mode#arbitrary-value-support)
