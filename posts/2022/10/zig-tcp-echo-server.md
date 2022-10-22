---
title: "ZigでTCP Echoサーバを作ってみた"
date: "2022-10-22"
icon: "⚡"
tags: ["Zig"]
---

最近よく話題に上がるZig言語を使って、TCP Echoサーバを作ってみた。

<script src="https://gist.github.com/ibuibu/888b08c429bc9f39b96b08cd6446bf23.js"></script>

本当は前に作った[Rust製STUNサーバ](https://github.com/ibuibu/rust-stun)のZig実装を作ろうと、UDPサーバを作りたかったのだが、[std.net](https://github.com/ziglang/zig/blob/master/lib/std/net.zig)パッケージにはTCPしか実装されていなかったので、とりあえずTCPサーバだけ作ってみた。

新しい言語なので、TCPサーバの作り方どころか文字列から数値へのキャスト方法すらググってもまともにヒットせず、[ドキュメント](https://ziglang.org/documentation/master/)を見ても書いていなかったりで、なかなかに苦労した。

また、エディタ周りもまだ環境が整っていない印象。neovimのcoc.nvimで、ZigのLSPのzlsを利用する`coc-zig`をインストールしてみたのだが、変数のカーソルホバーで型が表示されなかったり、関数説明に文字色が付いていなかったり、で書きにくくてしょうがなかった。VSCodeもチラ見したが同じような状況ぽいのでLSPがまだ貧弱なのかと思う。

書き味としては、型名や関数定義等の記法がRustっぽいが、例外処理があるので素直に書けてかなりシンプルに書ける。deferなどgoっぽさも漂っていた。

今後に期待したい。
