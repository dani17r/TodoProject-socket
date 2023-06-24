import { QueryI } from "@modules/interfaces";
import { Document } from "mongoose";

export interface PermissionsI {
  st: Boolean;
  d: Boolean;
  m: Boolean;
  u: Boolean;
  r: Boolean;
  c: Boolean;
  s: Boolean;
}

export interface GroupI {
  permissions: PermissionsI;
  _id: String;
  email: String;
}

export interface ProjectI extends Document {
  description: string;
  createdAt: string;
  updatedAt: string;
  _author: string;
  title: string;
  _id: string;
  share: {
    public?: {
      password: String | null;
      permissions: PermissionsI;
      status: false;
    };
    private?: {
      password: String | null;
      group: GroupI[];
      status: false;
    };
  } | null;
}

export interface AllDataI {
  query: QueryI;
  _author: string;
}
export interface OneDataI {
  _id: string;
}

export interface DeleteProject {
  _id: string;
  _author: string;
  query: QueryI;
}
