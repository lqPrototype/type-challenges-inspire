// 三、条件类型 Conditional Types

function pickSingleValue<T extends object, U extends keyof T>(
  obj: T,
  key: U
): T[U] {
  return obj[key];
}

type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object";
