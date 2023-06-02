import { defineAsyncComponent } from "vue";

export default {
  ModalAddOrEdit: defineAsyncComponent(
    () => import("@modules/project/ModalAddOrEdit.vue")
  ),
  Paginate: defineAsyncComponent(
    () => import("@modules/project/PaginateList.vue")
  ),
  Options: defineAsyncComponent(
    () => import("@modules/project/MenuOptions.vue")
  ),
  List: defineAsyncComponent(() => import("@modules/project/ViewList.vue")),

  MenuShare: defineAsyncComponent(
    () => import("@modules/project/MenuBtnForShare.vue")
  ),
};
