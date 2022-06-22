interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;

const pickTodo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

type MyPick<T, K extends keyof T = keyof T> = {
  [P in K]: T[P];
};
