import { superForm } from "@utils/inputs";
import { reactive } from "vue";
import { pick } from "lodash";

import type { SelectProjectT, ProjectI } from "@interfaces/interfaces.project";
import type { ObjectI } from "@interfaces/interfaces.generals";
import notifyComposable from "@composables/notify";
import { projectStore } from "@stores/project";
import { superModals } from "@utils/inputs";

// const loading = reactive({
//   val: false,
//   enable: () => (loading.val = true),
//   disable: () => (loading.val = false),
// });

export default () => {
  const { getAll, remove, loading, query } = projectStore();
  const Notify = notifyComposable();

  const select = reactive({
    data: <SelectProjectT>{},
    id: "",
  });

  const dropdown = reactive({
    values: <ObjectI<boolean>>{},
    get: (index: number) => dropdown.values[index],
    toggle: (index: number) => {
      dropdown.values[index] = !dropdown.values[index];
    },
  });

  const search = superForm({
    input: "",
    find: () => {
      if (query.value.search != search.input) {
        query.value.search = search.input;
        getAll();
      }
    },
  });

  const modals = superModals({
    addEdit: false,
    confirm: false,
    open: {
      create: () => {
        modals.toggle("addEdit");
        select.data = {};
      },
      update: (project: ProjectI, index: number) => {
        select.data = pick(project, ["_id", "title", "description"]);
        dropdown.toggle(index);
        modals.toggle("addEdit");
      },
      delete: (_id: string, index: number) => {
        select.id = _id;
        dropdown.toggle(index);
        modals.toggle("confirm");
      },
    },
  });

  const deleted = () => {
    remove(select.id, {
      actions: () => modals.toggle("confirm"),
      error: (notify) => {
        modals.toggle("confirm");
        Notify.active({ msg: notify.message });
      },
    });
    select.id = "";
  };

  const ascDesc = (value: "asc" | "desc") => {
    if (query.value.sort != `createdAt:${value}`) {
      query.value.sort = `createdAt:${value}`;
      getAll();
    }
  };

  const refresh = () => {
    if (query.value.pag > 1) query.value.pag = 1;
    getAll();
  };

  const pagination = {
    next(isNext: boolean) {
      if (isNext) {
        query.value.pag = Number(query.value.pag) + 1;
        getAll();
      }
    },
    previe(isPrevie: boolean) {
      if (isPrevie) {
        query.value.pag = Number(query.value.pag) - 1;
        getAll();
      }
    },
    selectPag(item: number) {
      if (item != query.value.pag) {
        query.value.pag = item;
        getAll();
      }
    },
  };

  return {
    pagination,
    dropdown,
    refresh,
    ascDesc,
    loading,
    select,
    deleted,
    search,
    modals,
    query,
  };
};
