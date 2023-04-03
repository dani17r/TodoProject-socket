import { defineAsyncComponent } from "vue";

export default {
  Confirm: defineAsyncComponent(
    () => import("@components/modals/ModalConfirm.vue")
  ),
  Main: defineAsyncComponent(() => import("@components/modals/ModalMain.vue")),
};
