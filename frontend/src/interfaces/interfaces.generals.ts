// internal libraries
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

/*eslint no-unused-vars: ["error", { "args": "none" }]*/
export interface CallbacksI<T = unknown> {
  actions?: (value?: T) => void;
  error?: (err: NotifyErrorI) => void;
}

export interface QueryI {
  fields_search: string;
  without: boolean;
  search: string;
  fields: string;
  limit: number;
  sort: string;
  pag: number;
}
export interface PaginateI {
  totalPaginate: number;
  currentPag: number;
  totalPag: number;
  total: number;
  limit: number;
}

export interface ObjectI<T> {
  [key: string]: T;
}

export type ObjBoolean = {
  [key: string]: boolean;
};

export interface NotifyErrorI {
  message: string;
  field?: string;
}

export interface NotifyI {
  message: string;
  field: string;
}

/*eslint no-unused-vars: ["error", { "args": "none" }]*/
export interface MiddlewareI {
  to: RouteLocationNormalized;
  from: RouteLocationNormalized;
  next: NavigationGuardNext;

  function: (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => void;
}

/*eslint no-unused-vars: ["error", { "args": "none" }]*/
export type ValidsT = {
  min: (fieldName: string, fieldValue: string, min: string) => string;
  max: (fieldName: string, fieldValue: string, max: string) => string;
  empty: (fieldName: string, fieldValue: string) => string;
  num: (fieldName: string, fieldValue: string) => string;
  email: (fieldName: string, fieldValue: string) => string;
};
