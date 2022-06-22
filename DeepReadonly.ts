type X = {
  x: {
    a: 1;
    b: "hi";
  };
  y: "hey";
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: "hi";
  };
  readonly y: "hey";
};

type Todo = MyDeepReadonly<X>; // should be same as `Expected`

type MyDeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends Object ? MyDeepReadonly<T[K]> : T[K];
};
