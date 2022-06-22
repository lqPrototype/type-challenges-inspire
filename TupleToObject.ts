const tuple = ["tesla", "model 3", "model X", "model Y", "model P"] as const;
// const tuple: readonly ["tesla", "model 3", "model X", "model Y", "model P"]

// expected
// {
//     tesla: 'tesla',
//     'model 3': 'model 3',
//     'model X': 'model X',
//     'model Y': 'model Y'
// }
type result = TupleToObject<typeof tuple>;

type TupleLen<T extends readonly any[]> = T["length"];

type tupleLength = TupleLen<typeof tuple>; //5

type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: K;
};
