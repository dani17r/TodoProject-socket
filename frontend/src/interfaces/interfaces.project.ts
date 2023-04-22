import type {
  PaginateI,
  ObjectI,
  QueryI,
} from "@interfaces/interfaces.generals";

export interface ProjectI {
  description: string;
  createdAt: string;
  updatedAt: string;
  _autor: string;
  title: string;
  _id: string;
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
  query: QueryI;
}
