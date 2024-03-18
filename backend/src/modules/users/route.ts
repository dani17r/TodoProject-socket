import * as controller from "@modules/users/controller";
import * as middlewares from "@modules/general/middlewares";

export default (router) => {
  
  router.post("/auth/login", controller.login);
  router.post("/auth/register", controller.register);
  router.get("/auth/logout", middlewares.auth, controller.logout);
  router.get("/auth/status", controller.status);
  router.post("/auth/change-password", middlewares.auth, controller.changePassword);

  router.get("/users", middlewares.auth, controller.all);
  router.put("/user/:_id", middlewares.auth, controller.update);
  router.post("/user/shared-with/:_id", middlewares.auth, controller.sharedWithUsers);

  return router;
};
