import * as controller from "@modules/projects/controller";

export default (router) => {
  
  router.get("/projects/all", controller.all);

  return router;
};
