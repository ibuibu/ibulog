---
title: "TypeScript + webpackのプロジェクトを一撃でセットアップする"
date: "2021-08-26"
icon: "👊"
tags: ["TypeScript"]
---

以下はさっと TS でコードを書きたいときにプロジェクトを一撃で作ってくれるシェルスクリプト。

プロジェクト名を引数に与えて実行すれば、index.html + main.js なザ・シンプルなプロジェクトを一撃で立ち上げてくれる。

実はこれ半年前ぐらいに作ったものだったのだが、最近ちょっとアップデートした。

```shell
#!/bin/bash

if [ $# != 1 ]; then
    echo 'The argument must be one (project name)'
    exit 1
fi

mkdir $1
cd $1
mkdir src

npm init -y
npm i -D webpack webpack-cli typescript ts-loader html-loader html-webpack-plugin

git init

num=`grep -n test package.json | sed -e 's/:.*//g'`
sed -i '' ${num}d package.json
sed -i '' "${num}i\\
\ \ \ \ \"watch\": \"webpack -w\"
" package.json
sed -i '' "${num}i\\
\ \ \ \ \"build\": \"webpack\",
" package.json

cat << EOS > tsconfig.json
{
  "compilerOptions": {
    "sourceMap": true,
    "target": "es5",
    "module": "es2015",
    "moduleResolution": "node",
  }
}
EOS

cat << EOS > webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ],
  },
  resolve: {
    extensions: [
      '.ts', '.js',
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
EOS

cat << EOS > .gitignore
node_modules
package-lock.json
dist
EOS

cat << EOS > ./src/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
</body>
</html>
EOS

cat << EOS > ./src/main.ts
console.log('Hello world');
EOS

```

最近アップデートした箇所というのは、`html-loader`と`html-webpack-plugin`を使って、index.html を src フォルダ内で管理できるようにしたところ。

以前は dist フォルダに index.html を格納していた。main.js しか読まないからええやろ、と思っていたが、dist を GitHub にアップするのは非常にキモことに気がついたので、修正を図った。

一見、src/index.html は script タグで main.js を読んでないが大丈夫？って思うが、先のプラグインが勝手に script タグを以下のように追加してくれる。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- ここな -->
    <script defer src="main.js"></script>
  </head>
  <body></body>
</html>
```

恥ずかしながら`defer`なる呪文を知らなかったため、head タグ内じゃだめだろと思ってしまったが、調べてみて納得した。

![https://html.spec.whatwg.org/images/asyncdefer.svg](https://html.spec.whatwg.org/images/asyncdefer.svg)

[https://html.spec.whatwg.org/multipage/scripting.html#attr-script-async](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-async)

文字通り HTML パースを待ってから JS を実行してくれるようだ。これがナウい script タグの書き方なのか。。
