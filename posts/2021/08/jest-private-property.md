---
title: "TypeScript + Jestでプライベートプロパティの異常系テストを書く"
date: "2021-08-29"
icon: "㊙️"
---

TypeScript において、あるオブジェクトのプライベートプロパティにアクセスしたいときは、クラス自体を`as any`でキャストしてしまうという無理やりな方法で対処する。（他にいい方法があれば教えて欲しい）

```ts
class Car {
  constructor(private name: string) {}
  showName() {
    console.log(this.name);
  }
}

test("The name is correct", () => {
  const car = new Car("GMC");
  expect((car as any).name).toBe("GMC");
});
```

ちなみに、読み取りではなく書き換えを行いたい場合は、同じく`as any`を使う方法でもよいが、`Object.defineProperty`を使う方法もある。

```ts
test("The name is correct", () => {
  const car = new Car("GMC");
  // または(car as any).name = "CHEVROLET";
  Object.defineProperty(car, "name", { value: "CHEVROLET" });
  expect((car as any).name).toBe("CHEVROLET");
});
```
