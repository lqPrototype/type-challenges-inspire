const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};
// const fn = (v: boolean): 1 | 2 => { ... }

type a = MyReturnType<typeof fn>; // should be "1 | 2"

type MyReturnType<T> = T extends (...args: any[]) => infer P ? P : never;
