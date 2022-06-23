// 二、索引类型

function tspPickSingleValue(obj, key) {
  return obj[key];
}

interface foo {
  a: number;
  b: string;
}

type A = keyof foo; // "a" | "b"

function pickSingleValue0<T>(obj: T, key: keyof T) {
  return obj[key];
}

function pickSingleValue1<T>(obj: T, key: keyof T): T[keyof T] {
  return obj[key];
}

function pickSingleValue2<T extends object, U extends keyof T>(
  obj: T,
  key: U
): T[U] {
  return obj[key];
}

function pickMu<T extends object, U extends keyof T>(
  obj: T,
  keys: U[]
): T[U][] {
  return keys.map((key) => obj[key]);
}

const ll = pickMu({ name: true, age: 2, type: "1" }, ["name"]);
