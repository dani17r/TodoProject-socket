import { superForm } from "@utils/inputs";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import { pick } from "lodash";

import type { SelectProjectT, ProjectI } from "@interfaces/interfaces.project";
import type { ObjectI } from "@interfaces/interfaces.generals";
import notifyComposable from "@composables/notify";
import { superModals } from "@utils/inputs";
import useProjectStore from "@stores/project";

export default () => {
  const projectStore = useProjectStore();
  const { query } = storeToRefs(projectStore);
  const Notify = notifyComposable();

  const dropdownMenu = reactive<ObjectI<boolean>>({});
  const selectProject = ref<SelectProjectT>({});
  const search = superForm({ input: "" });
  const selectId = ref("");

  const modals = superModals({
    addEditProject: false,
    confirmProject: false,
  });

  const openCreateProject = () => {
    modals.toggle("addEditProject");
    selectProject.value = {};
  };

  const openUpdateProject = (project: ProjectI, index: number) => {
    selectProject.value = pick(project, ["_id", "title", "description"]);
    dropdownMenu[index] = false;
    modals.toggle("addEditProject");
  };

  const openDeleteProject = (_id: string, index: number) => {
    selectId.value = _id;
    dropdownMenu[index] = false;
    modals.toggle("confirmProject");
  };

  const deleteProject = () => {
    projectStore.remove(selectId.value, {
      actions: () => modals.toggle("confirmProject"),
      error: (notify) => {
        modals.toggle("confirmProject");
        Notify.active({ msg: notify.message });
      },
    });
    selectId.value = "";
  };

  const searchProject = () => {
    if (query.value.search != search.input) {
      query.value.search = search.input;
      projectStore.getAll();
    }
  };

  const ascDescProject = (value: "asc" | "desc") => {
    if (query.value.sort != `createdAt:${value}`) {
      query.value.sort = `createdAt:${value}`;
      projectStore.getAll();
    }
  };

  const getAllByLimit = () => {
    if (query.value.pag > 1) query.value.pag = 1;
    projectStore.getAll();
  };

  const pagination = {
    next(isNext: boolean) {
      if (isNext) {
        query.value.pag = Number(query.value.pag) + 1;
        projectStore.getAll();
      }
    },
    previe(isPrevie: boolean) {
      if (isPrevie) {
        query.value.pag = Number(query.value.pag) - 1;
        projectStore.getAll();
      }
    },
    selectPag(item: number) {
      query.value.pag = item;
      projectStore.getAll();
    },
  };

  return {
    openDeleteProject,
    openUpdateProject,
    openCreateProject,
    getAllByLimit,
    dropdownMenu,
    ascDescProject,
    searchProject,
    pagination,
    selectProject,
    deleteProject,
    selectId,
    search,
    modals,
    query,
  };
};
