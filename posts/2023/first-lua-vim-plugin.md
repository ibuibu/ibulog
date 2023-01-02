---
title: "初めてのNeovim用Lua製プラグインを作った"
date: "2023-01-02"
icon: "🌖"
tags: ["Lua", "Vim"]
---

育休に入ってまとまった時間が取れたので、Neovimの設定をオーバーホールした。具体的には、init.vimをinit.luaにすると同時に、プラグインも極力Lua製のものに刷新した。

で、お世話になっていた[shareline.vim](https://github.com/koizuss/shareline.vim)というプラグインが簡易な作りのvim script製だったので、Luaプラグインを作るいい機会と捉えて自分でLua版を作ることにした。

で、できたのがこれ。

[https://github.com/ibuibu/shareline.nvim](https://github.com/ibuibu/shareline.nvim)

ノーマルモードかヴィジュアルモードで実行すれば、該当行のGitHubのURLがクリップボードにコピーされるというもの。

作りとしてはエラーハンドリングもしていないし、リポジトリサービスはGitHubを使っていることが前提になっていて、とても雑。

また機会があればもっと凝ったものを作ってみたい。
