import {
  DeleteProject,
  AllDataI,
  OneDataI,
  ProjectI,
} from "@modules/projects/interfaces";
// import { rules } from "@modules/projects/validate";
import Projects from "@modules/projects/model";
import { QueryI } from "@modules/interfaces";
import querystring from "querystring";
import { io } from "@main/server";
import { Types } from "mongoose";
import {
  getPaginateQuery,
  getSearchQuery,
  getFieldQuery,
  getFieldSort,
} from "@utils/querys";

const getAll = async (query: QueryI, _author: string) => {
  const search = getSearchQuery(query);
  const pag = getPaginateQuery(query);
  const fields = getFieldQuery(query);
  const order = getFieldSort(query);

  return await Projects.find({ ...search, _author }, fields)
    .sort(order)
    .paginate(pag);
};

export default () => {
  io.of("/project").on("connection", (socket) => {
    let userId = socket.handshake.headers["user"];
    let projectId = socket.handshake.headers["project_id"];

    socket.on("create", async ({ form, query }: { form: ProjectI; query: QueryI }) => {
        
        const _author = new Types.ObjectId(form._author);

        const isInsert = await Projects.findOneAndUpdate(
          { title: form.title },
          {
            $setOnInsert: { ...form, _author },
          },
          { upsert: true }
        ).then((doc) => doc == null);

        if (isInsert) {
          getAll(query, form._author).then((projects) => {
            socket.broadcast.emit(`broadcast:${userId}/create`);
            socket.emit("create/success", projects);
          });
        } else
          socket.emit("create/error", {
            message: `A project with this name already exists`,
            field: "title",
          });
      }
    );

    socket.on("update", async (form: ProjectI) => {
      const updateProject = await Projects.findOneAndUpdate(
        { _id: form._id },
        { $set: form },
        { returnOriginal: false }
      );

      if (updateProject) {
        socket.broadcast.emit(`broadcast:${userId}/update`);
        socket.emit("update/success", updateProject);
      } else
        socket.emit("update/error", {
          message: `Could not update project`,
          field: "title",
        });
    });

    socket.on("delete", async ({ _id, _author, query }: DeleteProject) => {
      await Projects.findByIdAndDelete(_id);
      const isDelete = Projects.findById(_id).then((doc) => doc == null);

      if (isDelete) {
        getAll(query, _author).then((projects) => {
          socket.emit("delete/success", projects);
          socket.broadcast.emit(`broadcast:${userId}/delete`, {
            _id,
            projects,
          });
        });
      } else
        socket.emit("delete/error", {
          message: `Could not delete`,
        });
    });

    socket.on("all", async ({ query, _author }: AllDataI) => {
      getAll(query, _author)
        .then((projects) => {
          socket.emit("all/success", projects);
        })
        .catch(() => socket.emit("all/error"));
    });

    socket.on("one", async ({ _id }: OneDataI) => {
      await Projects.findById(_id)
        .then((project) => {
          socket.emit("one/success", project);
        })
        .catch(() => socket.emit("one/error"));
    });

    socket.on("change-share", async (updateProject: ProjectI) => {
      socket.broadcast.emit(
        `broadcast:${projectId}/change-share`,
        updateProject
      );
    });

    //Verify Id
    socket.on("verify-id", async (_id: string) => {
      const project = await Projects.findById(_id).catch(() => false);

      if (project) socket.emit("verify-id", { project, status: true });
      else socket.emit("verify-id", { project: null, status: false });
    });
  });
};

export const all = async (ctx) => {
  const { query, _author } = ctx.request.query;
  const queryParams = querystring.parse(query) as unknown as AllDataI["query"]; ;
  const data = await getAll(queryParams, _author);
  return ctx.body = data;
};


// db.getCollection("projects").find(
//   { "share.private.group._id": "6476635ea145d4a789aaba4e" },
//   {
//     _id: true,
//     _author: true,
//     title: true,
//   }
// );
