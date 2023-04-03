import { defineAsyncComponent } from "vue";

export default {
  MenuVertical: defineAsyncComponent(
    () => import("@components/icons/IconMenuVertical.vue")
  ),
  CircleCheck: defineAsyncComponent(
    () => import("@components/icons/IconCircleCheck.vue")
  ),
  Descending: defineAsyncComponent(
    () => import("@components/icons/IconDescending.vue")
  ),
  Ascending: defineAsyncComponent(
    () => import("@components/icons/IconAscending.vue")
  ),
  Register: defineAsyncComponent(
    () => import("@components/icons/IconRegister.vue")
  ),
  Delete: defineAsyncComponent(
    () => import("@components/icons/IconDelete.vue")
  ),
  Previe: defineAsyncComponent(
    () => import("@components/icons/IconPrevie.vue")
  ),
  Logout: defineAsyncComponent(
    () => import("@components/icons/IconLogout.vue")
  ),
  Remove: defineAsyncComponent(
    () => import("@components/icons/IconRemove.vue")
  ),
  Search: defineAsyncComponent(
    () => import("@components/icons/IconSearch.vue")
  ),
  Danger: defineAsyncComponent(
    () => import("@components/icons/IconDanger.vue")
  ),
  Close: defineAsyncComponent(() => import("@components/icons/IconClose.vue")),
  Login: defineAsyncComponent(() => import("@components/icons/IconLogin.vue")),
  Back: defineAsyncComponent(() => import("@components/icons/IconBack.vue")),
  Edit: defineAsyncComponent(() => import("@components/icons/IconEdit.vue")),
  Next: defineAsyncComponent(() => import("@components/icons/IconNext.vue")),
  Plus: defineAsyncComponent(() => import("@components/icons/IconPlus.vue")),
};
