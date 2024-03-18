
import { 
  createOneProject, 
  deleteOneProject, 
  emitCreateProject, 
  emitDeleteProject, 
  emitUpdateProject, 
  getAllProjects, 
  updateOneProject
} from "@modules/projects/services";

import { OneDataI, ProjectI, CreatedI, UpdatedI } from "@modules/projects/interfaces";
import { messages } from "@modules/projects/options";
import { rules } from "@modules/projects/validate";
import Projects from "@modules/projects/model";
import { QueryI } from "@modules/interfaces";
import { validate } from "@utils/validate";
import { msgError } from "@utils/handle";
import { io } from "@main/server";
import { Context } from "koa";

export default () => {
  io.of("/project").on("connection", (socket) => {
    console.log("connection: /project");

    let userId = socket.handshake.headers["user_id"];
    let projectId = socket.handshake.headers["project_id"];

    socket.on("one", async ({ _id }: OneDataI) => {
      console.log("connection: /project/one");
      await Projects.findById(_id)
        .then((project) => {
          socket.emit("one/success", project);
        })
        .catch(() => socket.emit("one/error"));
    });

    socket.on("change-share", async (updateProject: ProjectI) => {
      console.log("connection: /project/change-share");
      socket.broadcast.emit(
        `broadcast:${projectId}/change-share`,
        updateProject
      );
    });

    //Verify Id
    socket.on("verify-id", async (_id: string) => {
      console.log("connection: /project/verify-id");
      const project = await Projects.findById(_id).catch(() => false);

      if (project) socket.emit("verify-id", { project, status: true });
      else socket.emit("verify-id", { project: null, status: false });
    });
  });
};

export const all = async (ctx) => {
  const query = ctx.request.query;
  const _author = ctx.state.user_id;

  await getAllProjects(query, _author)
    .then((projects) => ctx.body = projects)
    .catch((error) => msgError(ctx, 404, error));
};

export const create = async (ctx: Context) => {
  const query = ctx.request.query as unknown as QueryI;
  const form = ctx.request.body as CreatedI;
  const msg = messages.created;

  const validation = validate(ctx);

  const action = async (values: any) => {
    const newProject = await createOneProject(values);

    if (newProject) {
      await getAllProjects(query, form._author)
        .then((projects) => {
          emitCreateProject(values);
          return ctx.body = projects;
        })
        .catch((error) => msgError(ctx, 404, error));

    } else return msgError(ctx, 400, msg.existingProject)
  };

  await validation(form, rules.created, action);
};

export const update = async (ctx: Context) => {
  const query = ctx.request.query as any;
  const form = ctx.request.body as ProjectI;
  const msg = messages.update;

  const validation = validate(ctx);

  const action = async (values: ProjectI) => {
 
    const updateProject = await updateOneProject(values);

    if (updateProject) {
      await getAllProjects(query, values._author)
        .then((projects) => {
          emitUpdateProject({ user_id: values._author });
          return ctx.body = projects;
        })
        .catch((error) => msgError(ctx, 404, error));

    } else return msgError(ctx, 400, msg.noProjectUpdate)
  };

  await validation(form, rules.updated, action);
};

export const remove = async (ctx) => {
  const query = ctx.request.query;
  const params = ctx.request.params;
  const _author = ctx.state.user_id;
  const msg = messages.remove;

  const validation = validate(ctx);

  const action = async (values: any) => {
    const isDelete = await deleteOneProject(values);

    if (!isDelete) {
      await getAllProjects(query, _author)
        .then((projects) => {
          emitDeleteProject(values, projects);
          return ctx.body = projects;
        })
        .catch((error) => msgError(ctx, 404, error))
    }
    else return msgError(ctx, 400, msg.noDelete);
  }

  await validation(params, rules.removed, action);
}