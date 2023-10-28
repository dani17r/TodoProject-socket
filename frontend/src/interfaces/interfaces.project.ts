import type {
  PaginateI,
  ObjectI,
  QueryI,
} from "@interfaces/interfaces.generals";

export interface PermissionsI {
  st: boolean;
  d: boolean;
  m: boolean;
  u: boolean;
  r: boolean;
  c: boolean;
  s: boolean;
}

export interface GroupI {
  permissions: PermissionsI;
  _id: string;
  email: string;
}

export interface ProjectI {
  description: string;
  createdAt: string;
  updatedAt: string;
  _author: string;
  title: string;
  _id: string;
  share: {
    public: {
      password: string | null;
      permissions: PermissionsI;
      status: boolean;
    };
    private: {
      password: string | null;
      status: boolean;
      group: GroupI[];
    };
  };
}

export type SelectProjectT =
  | ObjectI<
      ThisType<Pick<ProjectI, "_id" | "title" | "description"> | ProjectI>
    >
  | ProjectI;

export interface FormsI {
  basic: Pick<ProjectI, "title" | "description">;
  inter: Pick<ProjectI, "title" | "description" | "_author">;
  full: ProjectI;
}

export interface Shared {
  title: string;
  description: string;
  author: {
    email: string;
    fullname: string;
  };
  permisions: PermissionsI;
  _id: string;
}

export interface StateI {
  lifecicles: {
    mounted: boolean;
    broadcast: boolean;
  };
  projects: {
    paginate?: PaginateI;
    data: ProjectI[];
  };
  project: ProjectI | null;
  shared: Shared[] | null;
  query: QueryI;
  loading: {
    val: boolean,
    enable: () => boolean
    disable: () => boolean
  };
}
