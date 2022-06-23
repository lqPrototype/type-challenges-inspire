// 五、infer

const foo = (): string => {
  return "🏀";
};

// 函数返回参数
type CustormReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

// string
type FooReturnType = CustormReturnType<typeof foo>;

// 函数参数
type CustormParameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

// 构造函数
type CustormConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never;

// instance
type CustormInstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any;
