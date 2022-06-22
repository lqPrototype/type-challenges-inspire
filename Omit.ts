interface OmitTodo {
  title: string;
  description: string;
  completed: boolean;
}

type OmitTodoPreview = MyOmit<OmitTodo, "description" | "title">;

const todo: OmitTodoPreview = {
  completed: false,
};

type MyOmit<T, K extends keyof T> = {
  [P in MyExclude<keyof T, K>]: T[P];
};

//type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
