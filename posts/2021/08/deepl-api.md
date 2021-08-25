---
title: "DeepL APIで翻訳CLIを作った"
date: "2021-08-25"
icon: "🔠"
---

毎日のように DeepL を使っているが、ブラウザでお気に入りをクリックしてペーストして・・・という一連の作業が大変面倒くさいことに気づいた。

DeepL API を使って、CLI でできるようにした。

## やり方

まず[DeepL API のページ](https://www.deepl.com/pro?cta=menu-login-signup)へ行き、DeepL Pro に無料登録する。

そしてアカウントページへ行き、API キーをゲットする。

シェルスクリプトでこんな感じのコードを書いて出来上がり。

<script src="https://gist.github.com/ibuibu/ad5e2517e29faeb550d8d7cf96fecd1b.js"></script>

実行後に Enter ２回押せば、API から翻訳後文章を取得して標準出力する。

複数行の文章を貼り付けられるように、改行が２連続で来たら API 問い合わせを実行する仕組みにした。

ちなみに`pbcopy`は Mac のクリップボードにコピーするコマンド。
