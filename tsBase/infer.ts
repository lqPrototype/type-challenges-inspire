// äºãinfer

const foo = (): string => {
  return "ð";
};

// å½æ°è¿ååæ°
type CustormReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

// string
type FooReturnType = CustormReturnType<typeof foo>;

// å½æ°åæ°
type CustormParameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

// æé å½æ°
type CustormConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never;

// instance
type CustormInstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any;
