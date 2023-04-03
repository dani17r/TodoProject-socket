import { TaskI } from '@modules/tasks/Interfaces';
// import { rules } from "@modules/tasks/validate";
import Tasks from '@modules/tasks/model';
import { io } from '@main/server';

import { getSearchQuery, getFieldQuery, getFieldSort } from '@utils/querys';
import { QueryI } from '@modules/interfaces';
import { Types } from 'mongoose';

interface AllResI {
  query: QueryI;
  _project: string;
}
interface DeleteResI {
  _project: string;
  query: QueryI;
  _id?: string;
}
interface CreateResI {
  form: TaskI;
  query: QueryI;
}

const getAll = async (query: QueryI, _project: string) => {
  const search = getSearchQuery(query);
  const fields = getFieldQuery(query);
  const order = getFieldSort(query);

  const data = await Tasks.find(
    { ...search, _project, trash: false },
    fields
  ).sort(order);

  const trash = await Tasks.find({ _project, trash: true }).sort(order);
  return { data, trash };
};

export default () => {
  io.of('/task').on('connection', socket => {
    let userId = socket.handshake.headers['user'];

    socket.on('create', async ({ form, query }: CreateResI) => {
      const isInsert = await Tasks.create({
        ...form,
        _autor: new Types.ObjectId(form._autor),
        _project: new Types.ObjectId(form._project)
      });

      if (isInsert) {
        const tasks = await getAll(query, form._project);

        socket.broadcast.timeout(8000).emit(`broadcast:${userId}/create`);
        socket.emit('create/success', tasks);
      } else
        socket.emit('create/error', {
          message: `A task with this name already exists`,
          field: 'title'
        });
    });

    socket.on('update', async (form: TaskI) => {
      const newTask = await Tasks.findOneAndUpdate(
        { _id: form._id },
        { $set: form },
        { returnOriginal: false }
      );

      if (newTask) {
        socket.broadcast.timeout(8000).emit(`broadcast:${userId}/update`);
        socket.emit('update/success', newTask);
      } else
        socket.emit('update/error', {
          message: `Failed to update task`,
          field: 'title'
        });
    });

    socket.on('change-position', async (newPositions: TaskI[]) => {
      let successTasks = [];
      for (let position of newPositions) {
        const update = await Tasks.updateOne(
          { _id: position._id },
          { $set: position }
        );
        successTasks.push(update);
      }

      if (successTasks.length) {
        socket.broadcast
          .timeout(8000)
          .emit(`broadcast:${userId}/change-position`);
        socket.emit('change-position/success', 'success');
      } else
        socket.emit('change-position/error', {
          message: `Task positions have not been updated`
        });
    });

    socket.on('trash', async ({ _id, _project, query }: DeleteResI) => {
      const newTask = await Tasks.findOneAndUpdate(
        { _id: _id },
        { $set: { trash: true } },
        { returnOriginal: false }
      );

      if (newTask) {
        const tasks = await getAll(query, _project);
        socket.broadcast.timeout(8000).emit(`broadcast:${userId}/update`);
        socket.emit('trash/success', tasks);
      } else
        socket.emit('trash/error', {
          message: `Could not move to trash`,
          field: 'title'
        });
    });

    socket.on('delete', async ({ _id, _project, query }: DeleteResI) => {
      await Tasks.findByIdAndDelete(_id);
      const isDelete = Tasks.findById(_id).then(doc => doc == null);

      if (isDelete) {
        const tasks = await getAll(query, _project);

        socket.broadcast
          .timeout(8000)
          .emit(`broadcast:${userId}/delete`, { _id, tasks });
        socket.emit('delete/success', tasks);
      } else
        socket.emit('delete/error', {
          message: `could not delete`
        });
    });

    socket.on('delete-all', async ({ _project, query }: DeleteResI) => {
      const isDelete = await Tasks.deleteMany({ _project, trash: true });
      
      if (isDelete) {
        const tasks = await getAll(query, _project);

        socket.broadcast.timeout(8000).emit(`broadcast:${userId}/delete-all`);
        socket.emit('delete-all/success', tasks);
      } else
        socket.emit('delete-all/error', {
          message: `could not delete`
        });
    });

    socket.on('all', async ({ query, _project }: AllResI) => {
      if(_project){
        const tasks = await getAll(query, _project);
        socket.emit('all', tasks);
      }
    });
  });
};
