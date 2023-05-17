import { isAuthLoginUser, isNotAuthLoginUser } from "@middlewares/auth";
import { createRouter, createWebHistory } from "vue-router";
import templateAuth from "@layouts/LayoutAuth.vue";
import templateBase from "@layouts/LayoutMain.vue";
import { isRealId } from "@middlewares/one";
import { TitleHeader } from "@utils/main";
import Home from "@pages/ProjectsPage.vue";
import Login from "@pages/LoginPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: templateBase,
      beforeEnter: [isAuthLoginUser],
      children: [
        {
          path: "",
          name: "home",
          component: Home,
          meta: {
            title: "Start",
          },
        },
        {
          path: "project/:id",
          name: "project-one",
          meta: {
            title: "One Task",
            back: true,
          },
          beforeEnter: [isRealId],
          component: () => import("@pages/TasksPage.vue"),
        },
        {
          name: "profile",
          path: "profile/:id",
          meta: {
            title: "User Profile",
            back: true,
          },
          beforeEnter: [isRealId],
          component: () => import("@pages/ProfilePage.vue"),
        },
      ],
    },
    {
      path: "/",
      component: templateAuth,
      beforeEnter: [isNotAuthLoginUser],
      children: [
        {
          path: "login",
          name: "login",
          component: Login,
          meta: {
            title: "Login",
          },
        },
        {
          path: "register",
          name: "register",
          component: () => import("@pages/RegisterPage.vue"),
          meta: {
            title: "Signup",
          },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@pages/NotFoundPage.vue"),
      meta: {
        title: "Error",
      },
    },
  ],
});

router.beforeEach((to) => {
  document.title = TitleHeader(String(to.meta?.title));
});

export default router;
