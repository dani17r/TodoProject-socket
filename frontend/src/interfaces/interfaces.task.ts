import type {
  NotifyErrorI,
  ObjectI,
  QueryI,
} from "@interfaces/interfaces.generals";

/*eslint no-unused-vars: ["error", { "args": "none" }]*/
export interface CallbacksI {
  actions?: () => void;
  error?: (err: NotifyErrorI) => void;
}

export interface TaskI {
  createdAt: string;
  updatedAt: string;
  _project: string;
  position: number;
  select: boolean;
  content: string;
  _autor: string;
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
  inter: Pick<TaskI, "name" | "position" | "_autor" | "_project">;
  full: TaskI;
}

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
}

export interface OnChangeDroggableI {
  moved: {
    newIndex: number;
    oldIndex: number;
  };
}
