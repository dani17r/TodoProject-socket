import projects from "@modules/projects/route";
import users from "@modules/users/route";
import Router from "koa-router";
const router = new Router();

users(router);
projects(router);

export default router;