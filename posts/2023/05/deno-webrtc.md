---
title: "DenoでWeb会議システムのスケルトンを作った"
date: "2023-05-09"
icon: "🦖"
tags: ["Deno"]
---

そろそろ育休が終わるので、リハビリがてらWebRTCに触れようと思い、DenoでWeb会議システムのスケルトンを作った。

[GitHub](https://github.com/ibuibu/deno_webrtc_skeleton)

[Demo](https://deno-websocket-skeleton.deno.dev/)

これのミソは下記の３点。

- Deno Deployをするだけで誰でも速攻で構築できる。
- 超シンプルなファイル構成。全部で3ファイルしかなく、フロント、サーバのjsはそれぞれ100行ちょっとしかない。
- サードパーティパッケージを用いていない。

シグナリングサーバは、Denoに標準装備されたWebSocket APIで書いた。

これを思いついたのは、Zennの記事でDeno DeployがWebSocketを使えると知ったのがきっかけ。

Deno Deployはリクエスト制限が100K/dayまであるようなので、じゃんじゃん使っても余裕そう。

