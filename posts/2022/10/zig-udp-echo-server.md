---
title: "ZigでUDP Echoサーバを作ってみた"
date: "2022-10-23"
icon: "⚡"
tags: ["Zig"]
---

昨日に続き、今度はUDP版のEchoサーバを作った。

[ibuibu/zig-udp-echo-server](https://github.com/ibuibu/zig-udp-echo-server)

std.netにUDP実装が無かったため、[zig-network](https://github.com/MasterQ32/zig-network)パッケージを利用した。

最初、README通りにexampleを動かそうとしてみたが、どうも開発途中のmasterブランチのZigに合わせて作っているようで、最新版の0.9.1でもビルドすらうまく通らなかった。

とりあえず[ziglearnのBuild System](https://ziglearn.org/chapter-3/)を読んでパッケージインポートの仕方を学び、その通りに動かしてみると一応exampleのTCP Echoサーバが動いた。

インポートはパッケージマネージャを利用したかったのだが、まだ乱立中でデファクトスタンダードが無いようだったので諦めた。手動インポートの場合はbuild.zigを書き換え、`git submodule add`する必要があり面倒。どれでもいいので早く覇権を取っていただきたい。

exampleにはUDPのEchoサーバが無かったので、C言語での実装を思い出しながら雰囲気で改造すると動いた。

