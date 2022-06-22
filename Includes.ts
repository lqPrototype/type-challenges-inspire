type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`

// type isPillarMen = Includes<"Kars" | "Esidisi" | "Wamuu" | "Santana", "Dio">;
// type Includes<T, K> = K extends T ? true : false;

// T[number] 每一项
// type Includes<T extends any[], K> = K extends T[number] ? true : false;

// type isPillarMenBug = Includes<[boolean], false>; // true

// true extends boolean : true
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type Includes<T extends any[], K> = T extends [infer F, ...infer Rest]
  ? Equal<F, K> extends true
    ? true
    : Includes<Rest, K>
  : false;
