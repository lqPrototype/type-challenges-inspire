// 四、分布式条件类型 Distributive Conditional Types

// 4.1 裸露

// "string" | "function"
type T1 = TypeName<string | (() => void)>; //分发：TypeName<string> | TypeName<function>

// "string" | "object"
type T2 = TypeName<string | string[]>;

// "object"
type T3 = TypeName<string[] | number[]>;

// 4.2 包裹

type Wrapped<T> = [T] extends [boolean] ? "Y" : "N";

// "N"
type NotDistributed = Wrapped<number | boolean>; // [number | boolean] extends [boolean]
