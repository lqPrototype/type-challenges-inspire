# 目录：

- 基础泛型
- 基本类型守卫
- 分布式条件类型
- infer 关键字初试
- 基础递归
- 键名组成的联合类型
- 简单模版
- 合并、互斥泛型
- infer 协变、逆变

## 基础泛型

```typescript
// Make all properties in T optional.
type PartialLq<T> = {
  [K in keyof T]?: T[K];
};

// Required<T> - Make all properties in T required

type RequiredLq<T> = {
  [K in keyof T]: T[K];
};

// Readonly<T> - Make all properties in T readonly.

type ReadonlyLq<T> = {
  readonly [K in keyof T]: T[K];
};

// Pick<T, K> - From T, pick a set of properties whose keys are in the union K.

type PickLq<T, P extends keyof T> = {
  [K in P]: T[K];
};

// Record<K, T> - Construct a type with a set of properties K of type T.

type RecordLq<T, P> = {
  [K in keyof T]: P;
};

// Exclude<T, U> - Exclude from T those types that are assignable to U.

type ExcludeLq<T, U> = T extends U ? never : T;

// type ExcludeLqType = Exclude<'a' | 'b', 'b'>; // 'a';

// Extract<T, U> - Extract from T those types that are assignable to U.

type ExtractLq<T, U> = T extends U ? T : never;

// type ExtractLqType = ExtractLq<'a' | 'b', 'b'>; // 'b';

// NonNullable<T> - Exclude null and undefined from T

type NonNullableLq<T> = T extends null | undefined ? never : T;

// Parameters<T> - Obtain the parameters of a function type in a tuple.

type ParametersLq<T extends (...args: any) => any> = T extends (
  ...arg: infer P
) => any
  ? P
  : never;

//   ConstructorParameters<T> - Obtain the parameters of a constructor function type in a tuple.

type ConstructorParametersLq<T extends new (...args: any) => any> =
  T extends new (...arg: infer P) => any ? P : never;

// ReturnType<T> – Obtain the return type of a function type.

type ReturnTypeLq<T extends (...arg: any) => any> = T extends (
  ...arg: any
) => infer R
  ? R
  : never;

// InstanceType<T> – Obtain the instance type of a constructor function type.

type InstanceTypeLq<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any;

// Omit<T, K> – Constructs a type by picking all properties from T and then removing K.

type OmitLq<T, K extends keyof any> = PickLq<T, ExcludeLq<keyof T, K>>;

// type OmitLqType = OmitLq<'a' | 'b', 'b'>;
```

## 基本类型守卫

- 类型判断：typeof
- 实例判断：instanceof
- 属性判断：in
- 字面量相等判断：==, ===, !=, !==

```typescript
// numOrStrProp: number | string;

const isString = (arg: unknown): arg is string => typeof arg === "string";

const useIt = (numOrStr: number | string) => {
  // 这里为什么不用typeof封装函数
  if (isString(numOrStr)) {
    console.log(numOrStr.length);
  }
};

type Falsy = false | "" | 0 | null | undefined;
const isFalsy = (val: unknown): val is Falsy => !val;

// in
interface ILogInUserProps {
  isLogin: boolean;
  name: string;
}

interface IUnLoginUserProps {
  isLogin: boolean;
  from: string;
}

type IUserProps = ILogInUserProps | IUnLoginUserProps;

function getUserInfo(user: IUserProps): string {
  return "name" in user ? user.name : user.from;
}

// instanceof
class Food {}
class Big {}

function testInstanceof(input: Food | Big) {
  if (input instanceof Food) {
    //
  } else {
    //
  }
}

type Foo = "1" | "2" | "unknown";

function testValue(input: Foo) {
  if (input != "unknown") {
    //
  } else {
    //
  }
}
```

## 分布式条件类型

```typescript
type Naked<T> = T extends boolean ? "Y" : "N";
type Wrapped<T> = [T] extends [boolean] ? "Y" : "N";

// "N" | "Y"
type Distributed = Naked<number | boolean>;

// "N"
type NotDistributed = Wrapped<number | boolean>;

// 条件类型

// 排除Key
type ExcludeLq<T, U> = T extends U ? never : T; // omit 原理
// 保留Key
type Extract<T, U> = T extends U ? T : never;
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

## infer 关键字初试

```typescript
// 函数返回值
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
// 进阶
type FnReturnPromiseType<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;
// 函数入参
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
// 构造函数入参
type ConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never;
// new
type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any;
```

## 基础递归 Partial

```typescript
// 不考虑数组
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 进阶
export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;
export type PartialDeep<T> = T extends Primitive
  ? Partial<T>
  : T extends Map<infer KeyType, infer ValueType>
  ? PartialMapDeep<KeyType, ValueType>
  : T extends Set<infer ItemType>
  ? PartialSetDeep<ItemType>
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? PartialReadonlyMapDeep<KeyType, ValueType>
  : T extends ReadonlySet<infer ItemType>
  ? PartialReadonlySetDeep<ItemType>
  : T extends (...arguments: any[]) => unknown
  ? T | undefined
  : T extends object
  ? PartialObjectDeep<T>
  : unknown;

interface PartialMapDeep<KeyType, ValueType>
  extends Map<PartialDeep<KeyType>, PartialDeep<ValueType>> {}

interface PartialSetDeep<T> extends Set<PartialDeep<T>> {}

interface PartialReadonlyMapDeep<KeyType, ValueType>
  extends ReadonlyMap<PartialDeep<KeyType>, PartialDeep<ValueType>> {}

interface PartialReadonlySetDeep<T> extends ReadonlySet<PartialDeep<T>> {}

type PartialObjectDeep<ObjectType extends object> = {
  [KeyType in keyof ObjectType]?: PartialDeep<ObjectType[KeyType]>;
};
```

## { [K in keyof T]: ... }[keyof T]：键名组成的联合类型

```typescript
type FunctTypeKeys<T extends object> = {
  [K in keyof T]-?: T[K] extends Function ? K : never;
}[keyof T]; // FunctionKeys

// 变形
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
```

## 简单模版：

```typescript

    export type ShopRecord<Size extends string> = `${Shop}-Record`;
    // 字符串截取
    type CutStr<Str extends string> = Str extends `${infer Part}melon` ? Part : never;
    // "water"
    type Tmp = CutStr<"watermelon">;

    // 进阶
    type Item = 'foo' | 'bar' | 'baz' | 'waldo';
    const items = 'foo,bar,baz,waldo';
    let array: Item[];
    array = split(items, ',');

    type Split<
        S extends string,
        Delimiter extends string,
    > = S extends `${infer Head}${Delimiter}${infer Tail}`
        ? [Head, ...Split<Tail, Delimiter>]
        : S extends Delimiter
        ? []
        : [S];

    Trim<' foo '>
    //=> 'foo'
    type TrimLeft<V extends string> = V extends ` ${infer R}` ? TrimLeft<R> : V;
    type Trim<V extends string> = TrimLeft<TrimRight<V>>;

```

## 合并、互斥泛型

```typescript
// jsonObj;

type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];

type JsonObject = { [Key in string]?: JsonValue };

// merge<T, U>

type Except<ObjectType, KeysType extends keyof ObjectType> = Pick<
  ObjectType,
  Exclude<keyof ObjectType, KeysType>
>;
type Merge<T, U> = Except<T, Extract<keyof T, keyof U>> & U;

// Exclusive<T, U>

type Without<FirstType, SecondType> = {
  [KeyType in Exclude<keyof FirstType, keyof SecondType>]?: never;
};

type MergeExclusive<FirstType, SecondType> =
  | FirstType
  | SecondType extends object
  ?
      | (Without<FirstType, SecondType> & SecondType)
      | (Without<SecondType, FirstType> & FirstType)
  : FirstType | SecondType;
```

## infer 协变、逆变

```typescript
type ArrayElementType<T> = T extends (infer E)[] ? E : T;
// number
type item1 = ArrayElementType<number[]>;
// {name: string}
type item2 = ArrayElementType<{ name: string }>;
// number | string
type item3 = ArrayElementType<[number, string]>;

type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void } ? U : never;
// string & number
type T21 = Bar<{ a: (x: string) => void; b: (x: number) => void }>;

备注：协变或逆变与 infer 参数位置有关,在 TypeScript 中，对象、类、数组和函数的返回值类型都是协变关系，而函数的参数类型是逆变关系，所以 infer 位置如果在函数参数上，就会遵循逆变原则。协变(co-variant)：类型收敛,逆变(contra-variant)：类型发散。
```

## 社区工具类型

1.  [utility-types](https://github.com/piotrwitek/utility-types)
2.  [react-redux-typescript-guide](https://github.com/piotrwitek/react-redux-typescript-guide)
3.  [typesafe-actions](https://github.com/piotrwitek/typesafe-actions)
4.  [type-fest](https://github.com/sindresorhus/type-fest)
