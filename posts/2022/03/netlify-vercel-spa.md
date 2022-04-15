---
title: "NetlifyとVercelでのSPA設定"
date: "2022-04-15"
icon: "🔂"
tags: ["SPA"]
---

NetlifyとVercelにデプロイしたSPAにおいて、ルート以外のページにURLから直接遷移しようとすると404エラーが起きる。

それぞれにおける回避方法は以下の通り。


### Netlify

`_redirects`ファイルをトップ階層に設置し、内容を以下の通りにする。


```shell
/*    /index.html   200
```

[参考: Netlify docs (History pushstate and single-page apps)](https://docs.netlify.com/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps)

### Vercel

`_redirects`ファイルをトップ階層に設置し、内容を以下の通りにする。

```js
{
  "routes": [{ "src": "/[^.]+", "dest": "/", "status": 200 }]
}
```

[参考: Stack Overflow - Why does react-router not works at vercel?](https://stackoverflow.com/questions/64815012/why-does-react-router-not-works-at-vercel)
