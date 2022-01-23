---
title: "git checkoutをfzfでいい感じにする"
date: "2022-01-23"
icon: "🌵"
tags: ["Git"]
---

いつも`git checkout`するときは zsh の補完で branch を選択していたが、まあまあ使いにくいので、[GitHub CLI の extension](https://github.com/mislav/gh-branch)を使ってみたのだが、ものすごく遅い。やっぱり GitHub CLI は遅い。。

ので、自分で fzf を使ったコマンドを作った。

出来栄えはこんな感じ。

![gb](https://i.imgur.com/6RoeINq.png)

コマンドはこれ。

```shell
function gb() {
  branches=$(git branch --all --format="%(refname:short)%09%(authordate:relative)%09%(authorname)" | grep -v HEAD)
  branch=$(echo "$branches" | column -ts "$(printf '\t')" | fzf)
  git checkout $(echo "$branch" | awk '{print $1}' )
}
```

こだわりポイントは以下２点。

- format オプションで、最終更新がどれくらい前だったかと、更新者を出力
- column コマンドで縦を揃えてキレイに出力

ちなみに column コマンドの`-s`オプションで Tab を指定しようとしたが、Mac だと`printf`で Tab を出力してやらないとうまくいかなかった。
