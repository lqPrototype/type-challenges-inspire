interface ReadOnly2Todo {
  title: string;
  description: string;
  completed: boolean;
}

const readOnly2Todo: MyReadonly2<ReadOnly2Todo, "title" | "description"> = {
  title: "Hey",
  description: "foobar",
  completed: false,
};

readOnly2Todo.title = "Hello"; // Error: cannot reassign a readonly property
readOnly2Todo.description = "barFoo"; // Error: cannot reassign a readonly property
readOnly2Todo.completed = true; // OK

type MyReadonly2<T, K extends keyof T> = Readonly<Pick<T, K>> & Omit<T, K>;
