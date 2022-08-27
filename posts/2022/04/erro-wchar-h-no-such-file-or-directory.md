---
title: "Macでfatal error: wchar.h: No such file or directory の修正"
date: "2022-08-27"
icon: "😢"
tags: ["C++"]
---

久しぶりに競プロでもやろうと思い、gccでコンパイルを実行すると以下のようなエラーが出力された。

```shell
In file included from /usr/local/Cellar/gcc/12.1.0/include/c++/12/bits/postypes.h:40,
                 from /usr/local/Cellar/gcc/12.1.0/include/c++/12/iosfwd:40,
                 from /usr/local/Cellar/gcc/12.1.0/include/c++/12/ios:38,
                 from /usr/local/Cellar/gcc/12.1.0/include/c++/12/ostream:38,
                 from /usr/local/Cellar/gcc/12.1.0/include/c++/12/iostream:39,
                 from a.cpp:1:
/usr/local/Cellar/gcc/12.1.0/include/c++/12/cwchar:44:10: fatal error: wchar.h: No such file or directory
   44 | #include <wchar.h>
      |          ^~~~~~~~~
```

どうもMacのOSをアップデートしたことで環境が壊れたぽい。

gccが参照するインクルードのpathを確認すると、`/Library/Developer/CommandLineTools/SDKs/MacOSX12.sdk`であった。
```shell
❯ g++ -v

Using built-in specs.
COLLECT_GCC=g++
COLLECT_LTO_WRAPPER=/usr/local/Cellar/gcc/12.1.0/bin/../libexec/gcc/x86_64-apple-darwin21/12/lto-wrapper
Target: x86_64-apple-darwin21
Configured with: ../configure --prefix=/usr/local/opt/gcc --libdir=/usr/local/opt/gcc/lib/gcc/current --disable-nls --enable-checking=release --with-gcc-major-version-only --enable-languages=c,c++,objc,obj-c++,fortran --program-suffix=-12 --with-gmp=/usr/local/opt/gmp --with-mpfr=/usr/local/opt/mpfr --with-mpc=/usr/local/opt/libmpc --with-isl=/usr/local/opt/isl --with-zstd=/usr/local/opt/zstd --with-pkgversion='Homebrew GCC 12.1.0' --with-bugurl=https://github.com/Homebrew/homebrew-core/issues --with-system-zlib --build=x86_64-apple-darwin21 --with-sysroot=/Library/Developer/CommandLineTools/SDKs/MacOSX12.sdk
Thread model: posix
Supported LTO compression algorithms: zlib zstd
gcc version 12.1.0 (Homebrew GCC 12.1.0)
```

だがしかし、そのpathをlsしてみてもなにもない。

SDKのpathを下記コマンドで調べてみる。

```shell
❯ xcrun --show-sdk-path

/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk
```

環境変数SDKROOTにこのpathを設定することで、gccがインクルードのpathを正しく認識するらしい。

ということで、`.zshrc`に下記を追記することで、gccのエラーを解消できた。

```shell
export SDKROOT="$(xcrun --show-sdk-path)"
```

