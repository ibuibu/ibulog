---
title: "macでrmを「ゴミ箱に入れる」に変える"
date: "2022-01-16"
icon: "🗑️"
---


（語り尽くされたテーマで今更だけど)

タイトルの内容で検索すると一番ヒットする`rmtrash`が、Homebrewでインストールできなくなっていた。
[https://github.com/Homebrew/homebrew-core/pull/65438](https://github.com/Homebrew/homebrew-core/pull/65438)

<br />

ので、代替手段として、`trash`をインストールした。

[https://hasseg.org/trash/](https://hasseg.org/trash/)

<br />

`.zshrc`にaliasを追加

```shell
alias rm="trash -F"
```

-Fを付けておくと、シャコン！って音がなるようになるので、ゴミ箱に入れた感が高まる。

