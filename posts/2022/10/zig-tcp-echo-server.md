---
title: "ZigでTCP Echoサーバを作ってみた"
date: "2022-10-22"
icon: "⚡"
tags: ["Zig"]
---

最近よく話題に上がるZig言語を使って、TCP Echoサーバを作ってみた。

```zig
const std = @import("std");
const net = std.net;

pub fn main() anyerror!void {
    var server = net.StreamServer.init(.{});
    defer server.close();

    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    const allocator = gpa.allocator();

    const args = try std.process.argsAlloc(allocator);
    defer std.process.argsFree(allocator, args);

    if (args.len != 3) {
        std.debug.print("Invalid arguments.", .{});
        std.os.exit(1);
    }

    const address = args[1];
    const port: u16 = try std.fmt.parseInt(u16, args[2], 10);

    const address_port = try net.Address.resolveIp(address, port);
    try server.listen(address_port);

    while (true) {
        var conn = try server.accept();
        defer conn.stream.close();

        var recv_data = try conn.stream.reader().readAllAlloc(allocator, std.math.maxInt(usize));
        std.debug.print("{s}", .{recv_data});

        try conn.stream.writer().print("{s}", .{recv_data});
    }
}
```

本当は前に作った[Rust製STUNサーバ](https://github.com/ibuibu/rust-stun)のZig実装を作ろうと、UDPサーバを作りたかったのだが、[std.net](https://github.com/ziglang/zig/blob/master/lib/std/net.zig)パッケージにはTCPしか実装されていなかったので、とりあえずTCPサーバだけ作ってみた。

新しい言語なので、TCPサーバの作り方どころか文字列から数値へのキャスト方法すらググってもまともにヒットせず、[ドキュメント](https://ziglang.org/documentation/master/)を見ても書いていなかったりで、なかなかに苦労した。

また、エディタ周りもまだ環境が整っていない印象。neovimのcoc.nvimで、ZigのLSPのzlsを利用する`coc-zig`をインストールしてみたのだが、変数のカーソルホバーで型が表示されなかったり、関数説明に文字色が付いていなかったり、で書きにくくてしょうがなかった。VSCodeもチラ見したが同じような状況ぽいのでLSPがまだ貧弱なのかと思う。

書き味としては、型名や関数定義等の記法がRustっぽいが、例外処理があるので素直に書けてかなりシンプルに書ける。deferなどgoっぽさも漂っていた。

今後に期待したい。
