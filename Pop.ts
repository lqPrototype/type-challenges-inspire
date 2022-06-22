type arr11 = ["a", "b", "c", "d"];
type arr22 = [3, 2, 1];

type re1 = Pop<arr11>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr22>; // expected to be [3, 2]

type Pop<T> = T extends [...infer Q, infer P] ? Q : never;
