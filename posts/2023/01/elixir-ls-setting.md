---
title: "elixir-lsの設定"
date: "2023-01-06"
icon: "💧"
tags: ["Elixir", "Vim"]
---

Elixirに入門しようと思いたち、VimにLSPを導入するためにmason.nvimでelixir-lsをインストールした。

しかし、.exsファイルを開くと、こんなエラーが表示された。

```
Error detected while processing BufReadPost Autocommands for "*":
Error executing lua callback: ...ocal/Cellar/neovim/0.8.1/share/nvim/runtime/filetype.lua:22: Error executing lua: ...ocal/Cellar/neovim/0.8.1/share/nvim/runtime/filetype.lua:23: Vim(append):[lspconfig] cmd not defined for
 "elixirls". Manually set cmd in the setup {} call according to server_configurations.md, see :help lspconfig-index.
stack traceback:
        [C]: in function 'nvim_cmd'
        ...ocal/Cellar/neovim/0.8.1/share/nvim/runtime/filetype.lua:23: in function <...ocal/Cellar/neovim/0.8.1/share/nvim/runtime/filetype.lua:22>
        [C]: in function 'nvim_buf_call'
        ...ocal/Cellar/neovim/0.8.1/share/nvim/runtime/filetype.lua:22: in function <...ocal/Cellar/neovim/0.8.1/share/nvim/runtime/filetype.lua:11>
stack traceback:
        [C]: in function 'nvim_buf_call'
        ...ocal/Cellar/neovim/0.8.1/share/nvim/runtime/filetype.lua:22: in function <...ocal/Cellar/neovim/0.8.1/share/nvim/runtime/filetype.lua:11>
```

[nvim-lsp-configのドキュメント](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#elixirls)を確認すると、elixir-lsにはcmdが設定されていないので、設定が必要とのこと。

なので、以下の通りmasonの設定の関数内でpathを設定すると、エラーが解消された。


```lua
require('mason-lspconfig').setup_handlers({ function(server)
  local opt = {
    capabilities = require('cmp_nvim_lsp').default_capabilities(
      vim.lsp.protocol.make_client_capabilities()
    )
  }

  if server == "elixirls" then
    opt.cmd = { "/Users/hirokiibuka/.local/share/nvim/mason/packages/elixir-ls/language_server.sh" }
  end

  require('lspconfig')[server].setup(opt)
end })

```
