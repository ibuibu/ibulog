---
title: "RustでSTUNサーバを作った"
date: "2022-10-17"
icon: "🦀"
tags: ["Rust", "WebRTC"]
---

Rust で STUN サーバを作った。

[https://github.com/ibuibu/rust-stun](https://github.com/ibuibu/rust-stun)

以下、経緯と作り方と感想。

## 経緯

最近、なんとなく CPU やコンパイラなど低レイヤの勉強をゆるくやっており、その流れでネットワークプログラミングの勉強もしたくなった。どうせやるなら新しいプログラミング言語で勉強しようということで、気になっていた Rust で書くことにした。

適当に本を探すと、Kindle Unlimited で[Rust で始めるネットワークプログラミング](https://www.amazon.co.jp/Rust%E3%81%A7%E5%A7%8B%E3%82%81%E3%82%8B%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0-%E5%B0%8F%E9%87%8E-%E8%BC%9D%E4%B9%9F-ebook/dp/B07SW2GXVF)というバッチリの書籍を見つけた。パパっと写経して、速攻で TCP/UDP サーバ&クライアントが作れた。

で、UDP サーバが作れたということは、これを改造して STUN サーバを作れるぞ、と思いついた。以前読んだこの[ブログ](https://sublimer.hatenablog.com/entry/2021/12/12/000000)を思い出し、参考にして取り掛かることにした。

## 作り方

STUN サーバがやっていることはとても単純で、リクエストが規約に沿っているか、STUNのリクエストかどうかの2点をチェックし、ok だったらリクエスト元 IP アドレスを規約に沿って返却するだけである。

ブログ記事の案内どおり、RFC 原文を読みつつ、[googleのtricle ICEのサンプルサイト](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/)を動かした際に送受信される STUN パケットを wireshark でキャプチャし、自身のサーバが同じ値を返せるようにしていった。ブログ記事では TURN サーバの実装まで踏み込んでいるが、とりあえず STUN だけ実装したい場合は、STUN属性 は xor-mapped-address のみで、後半のfingerprint云々は不要だ。

STUN 実装におけるテストの方法としては、まずローカルでリクエストチェック部分をテストするだけならば、記事にある通り nc コマンドを使うのが手っ取り早い。 ローカルでレスポンスのテストをする場合は、coturn付属の[turnutils_uclient](https://github.com/coturn/coturn/wiki/turnutils_uclient) を使うのがよい。ちなみに、先のtricle ICEのサンプルサイトで`stun:localhost:<port>`を指定してみても動かない（srflxの経路が取得できない）。これはブラウザがlocalhostを経路として認めてないせいと思われる。

つまり、ちゃんとブラウザでのテストをしたかったらローカルじゃ無理である。 なので筆者は適当にGCEにVMを立てて、private ipでSTUNサーバを立ち上げ、FWでUDPで指定ポートを許可し、`/etc/hosts`に`hoge-turn.com`という適当なドメインと外部IPを記載して試してみて、ようやく正常性確認できて安堵したのであった。

## 感想

Rustを初めて書いてみたのだが、とにかく型が硬いので、キャスティング処理に四苦八苦した。コンパイラのおせっかい感がすごいのでサクッとトイアプリを作るには辛い言語だという印象を受けた。

また、bitやbyte配列をいじる低レイヤを初めて書いたので、とても新鮮な体験だった。一部文字列で処理してしまっている部分があるので、時間があったらbit配列に直したりしてキレイにしたい。
