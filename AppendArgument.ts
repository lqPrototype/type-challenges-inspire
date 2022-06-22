type Fn = (a: number, b: string) => number;

type ResultAppendArg = AppendArgument<Fn, boolean>;
// expected be (a: number, b: string, x: boolean) => number

type AppendArgument<F, E> = F extends (...args: infer T) => infer R
  ? (...args: [...T, E]) => R
  : F;
