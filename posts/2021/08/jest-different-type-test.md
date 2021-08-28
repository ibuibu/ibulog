---
title: "TypeScript + Jestで型の違う引数の異常系テストを書く"
date: "2021-08-28"
icon: "🆖"
---

TypeScriptにおいて、型チェックを内部で実行する関数について異常系のテストを書くとき、
単に違う型を渡すとコンパイルが通らないのでテストが実行できない。


例えばこんな非同期関数があるとして、

```ts
async function sampleFunc(arg: number) {
  return new Promise((resolve, reject) => {
    if (!arg || typeof arg !== 'string') {
      throw new Error('the type of arg must be string');
    }
    resolve('OK');
  })
}
```

こんなテストを書くと、

```ts
test('throw error if the type of arg is not string', async () => {;
  const dummyArg = 1;
  await expect(sampleFunc(dummyArg)).rejects.toThrow('the type of arg must be string');
});
```

当然こうなる。

```shell
error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
```

この対策としては、まず`unknown`型で定数を定義したうえで、`as`で関数の引数の型にキャストすればよい。


```ts
test('throw error if the type of arg is not string', async () => {;
  const dummyArg: unknown = 1;
  await expect(sampleFunc(dummyArg as string)).rejects.toThrow('the type of arg must be string');
});
```

これで晴れてテストを通すことができる。


