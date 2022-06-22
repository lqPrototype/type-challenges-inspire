type trimmed = Trim<"  Hello World  ">; // expected to be 'Hello World'

type Trim<T extends string> = TrimOmitLeft<TrimOmitRight<T>>;

type TrimOmitLeft<T extends string> = T extends ` ${infer R}`
  ? TrimOmitLeft<R>
  : T;
type TrimOmitRight<T extends string> = T extends `${infer R} `
  ? TrimOmitRight<R>
  : T;

//   type Trim<T extends string> =  T extends ` ${infer R}` | `${infer R} ` ? Trim<R> : T
