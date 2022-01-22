---
title: "git checkoutをfzfでいい感じにする"
date: "2022-01-23"
icon: "🌵"
---

いつも`git checkout`するときはzshの補完でbranchを選択していたが、まあまあ使いにくいので、[GitHub CLIのextension](https://github.com/mislav/gh-branch)を使ってみたのだが、ものすごく遅い。やっぱりGitHub CLIは遅い。。

ので、自分でfzfを使ったコマンドを作った。

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

- formatオプションで、最終更新がどれくらい前だったかと、更新者を出力
- columnコマンドで縦を揃えてキレイに出力

ちなみにcolumnコマンドの`-s`オプションでTabを指定しようとしたが、Macだと`printf`でTabを出力してやらないとうまくいかなかった。

