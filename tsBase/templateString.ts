// 九、模板字面量类型

export type SizeRecord<Size extends string> = `${Size}-Record`;

// "Small-Record"
type SmallSizeRecord = SizeRecord<"Small">;
// "Middle-Record"
type MiddleSizeRecord = SizeRecord<"Middle">;
// "Huge-Record"
type HugeSizeRecord = SizeRecord<"Huge">;

// "Small-Record" | "Middle-Record" | "Huge-Record"
type UnionSizeRecord = SizeRecord<"Small" | "Middle" | "Huge">;

//重点： "Small-Record" | "Small-Report" | "Middle-Record" | "Middle-Report" | "Huge-Record" | "Huge-Report"
type SizeRecordOrReport = `${"Small" | "Middle" | "Huge"}-${
  | "Record"
  | "Report"}`;

type ExtractMember<Str extends string> =
  Str extends `[${infer Member1}, ${infer Member2}, ${infer Member3}]`
    ? [Member1, Member2, Member3]
    : unknown;

// ["1", "2", "3"]
type Tmp = ExtractMember<"[1, 2, 3]">;
