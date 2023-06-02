import { superForm } from "@utils/inputs";
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import { pick } from "lodash";

import type { SelectProjectT, ProjectI } from "@interfaces/interfaces.project";
import type { ObjectI } from "@interfaces/interfaces.generals";
import notifyComposable from "@composables/notify";
import { superModals } from "@utils/inputs";
import useProjectStore from "@stores/project";

export default () => {
  const store = useProjectStore();
  const { query } = storeToRefs(store);
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
        store.getAll();
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

  const remove = () => {
    store.remove(select.id, {
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
      store.getAll();
    }
  };

  const getAll = () => {
    if (query.value.pag > 1) query.value.pag = 1;
    store.getAll();
  };

  const pagination = {
    next(isNext: boolean) {
      if (isNext) {
        query.value.pag = Number(query.value.pag) + 1;
        store.getAll();
      }
    },
    previe(isPrevie: boolean) {
      if (isPrevie) {
        query.value.pag = Number(query.value.pag) - 1;
        store.getAll();
      }
    },
    selectPag(item: number) {
      if (item != query.value.pag) {
        query.value.pag = item;
        store.getAll();
      }
    },
  };

  return {
    pagination,
    dropdown,
    ascDesc,
    getAll,
    select,
    remove,
    search,
    modals,
    query,
  };
};
