interface ReadonlyTodo {
  title: string;
  description: string;
}

const readonlyTodo: Readonly<ReadonlyTodo> = {
  title: "Hey",
  description: "foobar",
};

readonlyTodo.title = "Hello"; // Error: cannot reassign a readonly property
readonlyTodo.description = "barFoo"; // Error: cannot reassign a readonly property

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
