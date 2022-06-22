interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type UnionType = Cat | Dog;

type MyDog = LookUp<UnionType, "dog">; // expected to be `Dog`

// type LookUp<T, P> = T extends {
//   type: infer U;
// }
//   ? U extends P
//     ? T
//     : never
//   : never;

type LookUp<U extends { type: any }, T extends U["type"]> = U extends {
  type: T;
}
  ? U
  : never;
