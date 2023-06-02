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
  _user: string;
}

export interface ProjectI {
  description: string;
  createdAt: string;
  updatedAt: string;
  _autor: string;
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
  inter: Pick<ProjectI, "title" | "description" | "_autor">;
  full: ProjectI;
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
  query: QueryI;
}
