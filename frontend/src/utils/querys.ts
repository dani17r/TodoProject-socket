import type { QueryI } from "@interfaces/interfaces.generals";

export default {
  project: <QueryI>{
    fields_search: "title,description",
    sort: "createdAt:desc",
    without: false,
    search: "",
    fields: "",
    limit: 5,
    pag: 1,
  },
  user: <QueryI>{
    fields_search: "email,fullname",
    sort: "email:desc",
    without: false,
    search: "",
    fields: "",
    limit: 5,
    pag: 1,
  },
  task: <QueryI>{
    fields_search: "name,content",
    sort: "position:desc",
    without: false,
    search: "",
    fields: "",
  },
};
