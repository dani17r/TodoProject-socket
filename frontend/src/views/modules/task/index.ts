import { defineAsyncComponent } from "vue";

export default {
  ModalSelectUserForShare: defineAsyncComponent(
    () => import("@modules/task/share/ModalSelectUserForShare.vue")
  ),
  ModalPublicShare: defineAsyncComponent(
    () => import("@modules/task/share/ModalPublicShare.vue")
  ),
  ModalPrivateShare: defineAsyncComponent(
    () => import("@modules/task/share/ModalPrivateShare.vue")
  ),
  TablePrivateShare: defineAsyncComponent(
    () => import("@modules/task/share/TablePrivateShare.vue")
  ),
  MenuShare: defineAsyncComponent(
    () => import("@modules/task/share/MenuBtnForShare.vue")
  ),
  Content: defineAsyncComponent(
    () => import("@modules/task/share/ContentShare.vue")
  ),
  UrlShare: defineAsyncComponent(
    () => import("@modules/task/share/ShareUrl.vue")
  ),
  ModalTrash: defineAsyncComponent(
    () => import("@modules/task/ModalTrash.vue")
  ),
  ModalEdit: defineAsyncComponent(() => import("@modules/task/ModalEdit.vue")),
  Options: defineAsyncComponent(() => import("@modules/task/MenuOptions.vue")),
  ModalView: defineAsyncComponent(() => import("@modules/task/ModalView.vue")),
  List: defineAsyncComponent(() => import("@modules/task/ViewList.vue")),
};
