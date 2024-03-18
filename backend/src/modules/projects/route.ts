import * as controller from "@modules/projects/controller";
import * as middlewares from "@modules/general/middlewares";

export default (router) => {
  
  router.get("/project", middlewares.auth, controller.all);
  router.put("/project", middlewares.auth, controller.update);
  router.post("/project/:_id", middlewares.auth, controller.create);
  router.delete("/project/:_id", middlewares.auth, controller.remove);

  return router;
};
