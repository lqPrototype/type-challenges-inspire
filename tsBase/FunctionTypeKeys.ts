// 七、{[K in keyof T]: ... }[keyof T]

export type FunctTypeKeys<T extends object> = {
  [K in keyof T]-?: T[K] extends Function ? K : never;
}[keyof T];

interface IWithFuncKeys {
  a: string;
  b: number;
  c: boolean;
  d: () => void;
}

type WTFIsThis<T extends object> = {
  [K in keyof T]-?: T[K] extends Function ? K : never;
};

type UseIt1 = WTFIsThis<IWithFuncKeys>;

// type UseIt1 = {
//     a: never;
//     b: never;
//     c: never;
//     d: "d";
// }

// never类型的值不会出现在联合类型中
type UseIt2 = UseIt1[keyof UseIt1];

// 扩展

type WTFAMI1 = {} extends { prop: number } ? "Y" : "N";
type WTFAMI2 = {} extends { prop?: number } ? "Y" : "N";

// {} extends Pick<T, K>
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];
