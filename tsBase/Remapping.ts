// 十、重映射：✨

type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;

// type LazyPerson = {
//   getName: () => string;
//   getAge: () => number;
//   getLocation: () => string;
// };
