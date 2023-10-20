import projects from "@modules/projects/route";
import Router from "koa-router";
const router = new Router();

projects(router);

export default router;