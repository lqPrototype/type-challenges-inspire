type replacedStringAll = ReplaceAllString<"t y p e s", " ", "">; // expected to be 'types'

type ReplaceAllString<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer A}${From}${infer B}`
  ? From extends ""
    ? `${A}${To}${B}`
    : ReplaceAllString<`${A}${To}${B}`, From, To>
  : S;
