---
title: "Next.js + TypeScriptでGoogle Analyticsを導入する"
date: "2021-08-30"
icon: "📈"
tags: ["Next.js", "Google Analytics"]
---

Next.js と Typescript で GA を導入する方法を記す。

まず、React で GA を導入する方法を調べると、まず引っかかるのは`react-ga`というパッケージだった。しかし、`react-ga`は 2020 年 10 月に出た Google Analytics 4(GA4)という最新のバージョンに対応していないとのこと。

GA4 は以下のメリットがあるらしい。

1. ウェブとアプリを横断的に計測できる
2. Google の機械学習モデルを活用した予測機能の導入
3. プライバシー重視のデータ収集

ということで、GA4 を導入する場合は、従来のクライアントライブラリである`analytics.js`ではなく、[gstag.js](https://semlabo.com/seo/blog/google_analytics4/)を導入しないといけないことがわかった。(`react-ga`は analytics.js ベース)

`gstag.js`ベースのパッケージとして以下 2 つが見つかったが、どちらも 100star 以下だったので、採用は見送った。

- [https://github.com/unrealmanu/ga-4-react](https://github.com/unrealmanu/ga-4-react)
- [https://github.com/PriceRunner/react-ga4](https://github.com/PriceRunner/react-ga4)

Next.js 公式リポジトリに[サンプルコード](https://github.com/vercel/next.js/tree/canary/examples/with-google-analytics)があり、これに基づいた日本語記事のサイトがいくつかあったので、参考にさせていただいて実装した。

SSG の本ブログもこの方法で計測できた。

### 必要な型定義ファイルをインストール

```shell
npm i -D @types/gtag.js
```

### GA の ID を env ファイルで定義

```js
// .env
NEXT_PUBLIC_GA_ID=UA-********-**
```

なお、UA-から始まるユニバーサル アナリティクス プロパティだけでなく、GA4 の測定 ID（「G-XXXXXXXX」）でも動く。

参考 [https://support.google.com/analytics/answer/9310895?hl=ja](https://support.google.com/analytics/answer/9310895?hl=ja)

`NEXT_PUBLIC_`を接頭辞につけると、Node.js だけでなくブラウザにも渡すことができる。

参考 [https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser)

この環境変数は、忘れずにホスティングサービスにも設定する。

### 関数を定義

```ts
// lib/gtag.ts

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

https: export const pageview = (url: string): void => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};
```

こちらは単にページビューのイベントを送信する関数。

なお、公式サンプルには任意の event 用の関数も定義されているが、使わない場合は割愛する。

### gtag.js の埋め込み

```ts
// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "lib/gtag";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          {GA_TRACKING_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
        `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

`_document.tsx`はすべてのページで適用されるテンプレートとなる。

参考 [https://nextjs.org/docs/advanced-features/custom-document](https://nextjs.org/docs/advanced-features/custom-document)

これを変更して全ページの head タグに gtag.js を埋め込んでいる。

### ページ遷移時のイベントの実装

```ts
// /src/pages/_app.tsx

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from "../../lib/gtag";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}
```

router の`routeChangeComplete`イベント発火時に先程定義した`pageview`関数を実行するようセットして完了。

---

参考

- [https://fwywd.com/tech/next-ga-pv](https://fwywd.com/tech/next-ga-pv)

- [https://github.com/vercel/next.js/tree/canary/examples/with-google-analytics](https://github.com/vercel/next.js/tree/canary/examples/with-google-analytics)

- [https://semlabo.com/seo/blog/google_analytics4/](https://semlabo.com/seo/blog/google_analytics4/)
