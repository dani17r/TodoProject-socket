import type { NotifyI } from "@interfaces/interfaces.generals";

/*eslint no-unused-vars: ["error", { "args": "none" }]*/
export interface CallbacksMiddlI {
  actions: (value: StatusMiddlI) => void;
  error: () => void;
}

interface StatusMiddlI {
  user: UserI | null;
  isSession: boolean;
}

export interface SessionI {
  browser: string;
  status: boolean;
  start: number;
  token: string;
  ip: string;
}

export interface LoginI {
  notify: NotifyI;
  token: string;
  user: UserI;
}

export interface FormsI {
  login: Pick<UserI, "email" | "password">;
  register: Pick<UserI, "email" | "password" | "fullname">;
}

export interface UserI {
  password: string;
  fullname: string;
  createdAt: Date;
  updateAt: Date;
  email: string;
  _id: string;
}

export interface StateI {
  lifecicles: {
    mounted: boolean;
  };
  current: UserI | null;
}
