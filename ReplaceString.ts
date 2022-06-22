type replaced = ReplaceString<"types are fun!", "fun", "awesome">; // expected to be 'types are awesome!'

type ReplaceString<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer A}${From}${infer B}` ? `${A}${To}${B}` : S;
