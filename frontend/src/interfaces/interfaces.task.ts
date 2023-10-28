import type { ObjectI, QueryI } from "@interfaces/interfaces.generals";

export interface TaskI {
  createdAt: string;
  updatedAt: string;
  _project: string;
  position: number;
  select: boolean;
  content: string;
  _author: string;
  trash: boolean;
  done: boolean;
  name: string;
  _id: string;
}

export type SelectTaskT =
  | ObjectI<
      ThisType<Pick<TaskI, "_id" | "name" | "position" | "content"> | TaskI>
    >
  | TaskI;

export interface FormsI {
  basic: Pick<TaskI, "name" | "position">;
  inter: Pick<TaskI, "name" | "position" | "_author" | "_project">;
  full: TaskI;
}

export type TaskPositionI = Pick<TaskI, "_id" | "position">[];

export interface StateI {
  lifecicles: {
    mounted: boolean;
  };
  tasks: {
    data: TaskI[];
    trash: TaskI[];
  };
  query: QueryI;
  project_id: string;
  loading: {
    val: boolean;
    enable: () => boolean;
    disable: () => boolean;
  };
}

export interface OnChangeDroggableI {
  moved: {
    newIndex: number;
    oldIndex: number;
  };
}
