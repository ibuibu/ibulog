---
title: "ホスティングサービス（Netlify, Vercel, Firebase Hosting）の比べてみて"
date: "2022-02-01"
icon: "⏫"
tags: ["Hosting"]
---

Netlify, Vercel, Firebase Hostingをそれぞれ何度か使ってみて、いろいろ感じたことがあるので、雑にメモする。

## Netlify

### 👍
- 使いやすい。index.htmlをドラッグ&ドロップでホスティングできるのはすごい。
- 多くのオプション機能がある。Formsや最近だとFunctionsまである。

### 👎
- CDNが国内にないので、遅い。
- Basic認証は、有料プランじゃないとできない。

## Firebase Hosting

### 👍
- CDNが国内にあるので、速い。
- SPAのBasic認証をやろうと思えば、Cloud Functions for Firebaseを使えばできる。が、Blaze（従量課金）プランにする必要がある。（でも無料枠がある）

### 👎
- 使いにくい。CLIでの作業がメインなので、GUIでの操作ができない。
- PR契機でホスティングするにはGitHub Actionsが必要なので、.githubフォルダがソースにも必要になる。
- `firebase deploy`コマンドが確認無しで走るので、オペミスが怖い。
- カスタムドメインに、eTLD+1の所有権が無いと設定できない。例えば、`hoge.fuga.example.co.jp`は設定できない。

## Vercel

### 👍
- CDNが国内にあるので、速い。
- GUIもかなり使いやすい。Netlifyと遜色ない。

### 👎
- GitHub Organizationのリポジトリと連携するには、無料プランじゃできない。


ので、私は基本的にVercel推しです。

