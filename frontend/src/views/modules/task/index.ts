import { defineAsyncComponent } from "vue";

export default {
  ModalTrash: defineAsyncComponent(
    () => import("@modules/task/ModalTrash.vue")
  ),
  ModalEdit: defineAsyncComponent(() => import("@modules/task/ModalEdit.vue")),
  Options: defineAsyncComponent(() => import("@modules/task/MenuOptions.vue")),
  ModalView: defineAsyncComponent(() => import("@modules/task/ModalView.vue")),
  Content: defineAsyncComponent(() => import("@modules/task/NotFountId.vue")),
  List: defineAsyncComponent(() => import("@modules/task/ViewList.vue")),
};
