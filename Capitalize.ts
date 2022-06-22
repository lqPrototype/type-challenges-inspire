type capitalized = Capitalize<"hello world">; // expected to be 'Hello world'

type MyCapitalize<T extends string> = T extends `${infer F}${infer U}`
  ? `${Uppercase<F>}${U}`
  : T;
