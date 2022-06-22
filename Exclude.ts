type MyExcludeResult = MyExclude<"a" | "b" | "c", "a" | "c">; // b

// MyExcludeResult<"a" | "b" | "c", "a" | "c">
// 等价于
// MyExclude<'a', 'a' | 'c'> | MyExclude<'b', 'a' | 'c'> | MyExclude<'c', 'a' | 'c'>

type MyExclude<T, U> = T extends U ? never : T;
