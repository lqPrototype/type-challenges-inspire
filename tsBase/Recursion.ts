// 六、递归

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
// -readonly ： 去除只读修饰符
export type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

// 全部为不可读
export type DeepImmutable<T> = {
  +readonly [P in keyof T]: T[P] extends object ? DeepImmutable<T[P]> : T[P];
};

// -? :去除可选修饰符
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object | undefined ? DeepRequired<T[P]> : T[P];
};
