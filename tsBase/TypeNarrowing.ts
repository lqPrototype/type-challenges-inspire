// 一、收窄类型

// 类型守卫： is in instanceof

//  联合类型收窄类型：type numOrStrType = number | string;

export const isString = (arg: unknown): boolean => typeof arg === "string";

function useIt(numOrStr: number | string) {
  if (isString(numOrStr)) {
    console.log(numOrStr.length);
  }
}

// export const isString = (arg: unknown): arg is string =>
//   typeof arg === "string";

export type Falsy = false | "" | 0 | null | undefined;

export const isFalsy = (val: unknown): val is Falsy => !val;

interface ILogInUserProps {
  isLogin: boolean;
  name: string;
}

interface IUnLoginUserProps {
  isLogin: boolean;
  from: string;
}

type UserProps = ILogInUserProps | IUnLoginUserProps;

function getUserInfo(user: UserProps): string {
  return "name" in user ? user.name : user.from;
}

const getUserInfoReturn = getUserInfo({ isLogin: true, name: "lq" });
