import { QueryI } from "@modules/interfaces";
import { Document } from "mongoose";

export interface TaskI extends Document {
  createdAt?: string;
  updatedAt?: string;
  _project: string;
  select?: boolean;
  content?: string;
  position: number;
  trash?: boolean;
  _author: string;
  done?: boolean;
  name: string;
  _id?: string;
}

export interface AllResI {
  query: QueryI;
  _project: string;
}
export interface DeleteResI {
_project: string;
query: QueryI;
  _id?: string;
}
export interface TrashResI {
  _project: string;
  query: QueryI;
  _ids: string;
}
export interface CreateResI {
  form: TaskI;
  query: QueryI;
}
