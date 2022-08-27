---
title: "npm7系（未満?）でChakra UIを利用するとビルドに失敗する"
date: "2022-04-16"
icon: "🥵"
tags: ["ChakraUI"]
---

Viteを利用しているプロジェクトにChakra UIを入れてみて、`npm run build`を叩いてみると、以下のようなエラーが発生した。

```shell
> tsc && vite build

node_modules/@chakra-ui/menu/dist/declarations/src/use-menu.d.ts:480:50 - error TS2694: Namespace '"/<OMITTED>/node_modules/csstype/index".Property' has no exported member 'ColorAdjust'.

480         colorAdjust?: import("csstype").Property.ColorAdjust | undefined;
                                                     ~~~~~~~~~~~

node_modules/@chakra-ui/menu/dist/declarations/src/use-menu.d.ts:986:61 - error TS2694: Namespace '"/<OMITTED>/node_modules/csstype/index".Property' has no exported member 'ColorAdjust'.

986         WebkitPrintColorAdjust?: import("csstype").Property.ColorAdjust | undefined;
                                                                ~~~~~~~~~~~

```

issueを探すと、ドンピシャなものが発見できた。

[https://github.com/chakra-ui/chakra-ui/issues/5714](https://github.com/chakra-ui/chakra-ui/issues/5714)

この解決方法の通り、npmのversion 8.3以上で`overrides`を使って`csstype`のversionを固定しないとイケないとのことだったのだが、自分の環境のnpmが7系だったので、以下でアップデートした。

```shell
npm install -g npm
```

それで`node_modules`と`package-lock.json`を削除して`npm i`するだけで直ってしまった。

なぜかはわからないが、7系のnpmだと`package-lock.json`を読む限り、`csstype`が`0.3.11`が入ってしまっていたが、8系でやり直すと`0.3.9`に統一されていた。

ちゃんと調べていないので理由はわからないが、8系じゃないと`chakra-ui`の`package.json`の`csstype`のバージョンが解釈されていなかったものと思われる。

ということで、7系のnpmを使うとこのエラーにハマる人がいるかもしれないので、書き残しておく。とりあえず、npmのversionを上げれば直る。

