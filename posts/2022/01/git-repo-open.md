---
title: "GitHubをブラウザで開くコマンド"
date: "2022-01-22"
icon: "🛫"
---

いままで、githubのブラウザを開くために、`GitHub CLI`の以下コマンドを利用していた。

```shell
gh repo view --web
```

これを`gh alias`で`gh open`として登録して使っていた。

が、どうも最近、APIの速度が落ちたせいなのか、動作が遅い。

ので、シンプルな実装のコマンドを作った。

```shell
function gho() {
  url=$(git config --get remote.origin.url | sed -e 's/github.com:/github.com\//' -e 's/^git@/https:\/\//g')
  open "${url}"
}
```

HTTPSではなくSSHでクローンしたリポジトリでも利用できるよう、sedでremoteのURLを整形している。

`open`コマンドはMAC用なので、OSによってここは変える必要がある。

ちなみに、私は`ghq`でリポジトリを管理しているので、`fzf`と組み合わせて、どこからでも選択式にブラウザを開けるよう、こんなコマンドも作った。

```shell
function grr() {
  pushd $(ghq root)/github.com/$(ghq list | cut -d "/" -f 2,3 | sort | fzf)
  gho
  popd
}
```
