import type {
  NotifyI,
  PaginateI,
  QueryI,
} from "@interfaces/interfaces.generals";
import type { Shared } from "./interfaces.project";

/*eslint no-unused-vars: ["error", { "args": "none" }]*/
export interface CallbacksMiddlI {
  actions: (value: StatusMiddlI) => void;
  final?: () => void;
  error?: () => void;
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
  update: Pick<UserI, "email" | "fullname" | "_id" | "image"> & { file: Blob };
  register: Pick<UserI, "email" | "password" | "fullname">;
  login: Pick<UserI, "email" | "password">;
  changePassword: {
    currentPassword: string;
    newPassword: string;
    _id: string;
  };
}

export interface UserI {
  password: string;
  fullname: string;
  createdAt: Date;
  updateAt: Date;
  email: string;
  image: string;
  _id: string;
}

export interface StateI {
  lifecicles: {
    mounted: boolean;
  };
  users: {
    paginate?: PaginateI;
    data: UserI[];
  };
  user: UserI | null;
  query: QueryI;
  shared: Shared[] | null;
  loading: {
    val: boolean;
    enable: () => boolean;
    disable: () => boolean;
  };
}
