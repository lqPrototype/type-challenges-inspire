type Result = Concat<[1], [2]>; // expected to be [1, 2]

type Concat<P extends any[], Q extends any[]> = [...P, ...Q];

// type Concat<P, Q> = [
//   ...(P extends any[] ? P : [P]),
//   ...(Q extends any[] ? Q : [Q])
// ];
