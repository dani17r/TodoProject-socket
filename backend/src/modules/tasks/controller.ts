import { AllResI, CreateResI, DeleteResI, TaskI, TrashResI } from "@modules/tasks/Interfaces";
// import { rules } from "@modules/tasks/validate";
import Tasks from "@modules/tasks/model";
import { io } from "@main/server";

import { getSearchQuery, getFieldQuery, getFieldSort } from "@utils/querys";
import { QueryI } from "@modules/interfaces";
import { Types } from "mongoose";


const getAll = async (query: QueryI, _project: string) => {
  const search = getSearchQuery(query);
  const fields = getFieldQuery(query);
  const order = getFieldSort(query);

  const data = await Tasks.find(
    { ...search, _project, trash: false },
    fields
  ).sort(order);

  const trash = await Tasks.find({ _project, trash: true }).sort({
    updatedAt: "desc",
  });
  return { data, trash };
};

export default () => {
  io.of("/task").on("connection", (socket) => {
    console.log("connection: /task");
    let projectId = socket.handshake.headers['project_id'];
    
    socket.on("create", async ({ form, query }: CreateResI) => {
      console.log("connection: /task/create");
      const isInsert = await Tasks.create({
        ...form,
        _author: new Types.ObjectId(form._author),
        _project: new Types.ObjectId(form._project),
      });

      if (isInsert) {
        getAll(query, form._project).then((tasks) => {
          socket.broadcast.emit(`broadcast:${projectId}/create`);
          socket.emit("create/success", tasks);
        });
      } else
        socket.emit("create/error", {
          message: `A task with this name already exists`,
          field: "title",
        });
    });

    socket.on("update", async (form: TaskI) => {
      console.log("connection: /task/update");
      
      const newTask = await Tasks.findOneAndUpdate(
        { _id: form._id },
        { $set: form },
        { returnOriginal: false }
      );

      if (newTask) {
        console.log(`connection: /task/broadcast:${projectId}/update`);
        socket.broadcast.emit(`broadcast:test/update`);
        socket.broadcast.emit(`broadcast:${projectId}/update`);
        socket.emit("update/success", newTask);
      } else
        socket.emit("update/error", {
          message: `Failed to update task`,
          field: "title",
        });
    });

    socket.on("change-position", async (newPositions: TaskI[]) => {
      console.log("connection: /task/change-position");
      let successTasks = [];
      for (let position of newPositions) {
        const update = await Tasks.updateOne(
          { _id: position._id },
          { $set: position }
        );
        successTasks.push(update);
      }

      if (successTasks.length) {
        socket.broadcast.emit(`broadcast:${projectId}/change-position`);

        socket.emit("change-position/success", "success");
      } else
        socket.emit("change-position/error", {
          message: `Task positions have not been updated`,
        });
    });

    socket.on("trash", async ({ _ids, _project, query }: TrashResI) => {
      console.log("connection: /task/trash");
      const update = await Tasks.updateMany(
        { _id: { $in: _ids } },
        { $set: { trash: true } }
      );

      if (Number(update?.modifiedCount) > 0) {
        getAll(query, _project).then((tasks) => {
          socket.broadcast.emit(`broadcast:${projectId}/update`);
          socket.emit("trash/success", tasks);
        });
      } else
        socket.emit("trash/error", {
          message: `Could not move to trash`,
          field: "notify",
        });
    });

    socket.on("delete", async ({ _id, _project, query }: DeleteResI) => {
      console.log("connection: /task/delete");
      await Tasks.findByIdAndDelete(_id);
      const isDelete = Tasks.findById(_id).then((doc) => doc == null);

      if (isDelete) {
        getAll(query, _project).then((tasks) => {
          socket.emit("delete/success", tasks);

          socket.broadcast.emit(`broadcast:${projectId}/delete`, {
            _id,
            tasks,
          });
        });
      } else
        socket.emit("delete/error", {
          message: `could not delete`,
        });
    });

    socket.on("delete-all", async ({ _project, query }: DeleteResI) => {
      console.log("connection: /task/delete-all");
      const isDelete = await Tasks.deleteMany({ _project, trash: true });

      if (isDelete) {
        getAll(query, _project).then((tasks) => {
          socket.broadcast.emit(`broadcast:${projectId}/delete-all`);
          socket.emit("delete-all/success", tasks);
        });
      } else
        socket.emit("delete-all/error", {
          message: `could not delete`,
        });
    });

    socket.on("all", async ({ query, _project }: AllResI) => {
      console.log("connection: /task/all");
      if (_project) {
        getAll(query, _project).then((tasks) => {
          socket.emit("all/success", tasks);
        });
      }
    });
  });
};
