import { getPaginateQuery, getSearchQuery, getFieldQuery, getFieldSort } from "@utils/querys";
import Projects from "@modules/projects/model";
import { QueryI } from "@modules/interfaces";
import { io } from "@main/server";

export const emitCreateProject = (values) =>{
  io.of('/project').emit(`broadcast:${values._author}/create`);
}

export const emitUpdateProject = (values) =>{
  io.of('/project').emit(`broadcast:${values.user_id}/update`);
}

export const emitDeleteProject = (values, data) =>{
  io.of('/project').emit(`broadcast:${values._id}/delete`, {
    _id: values._id,
    data,
  });
}

export const getAllProjects = async (query: QueryI, _author: string) => {
  const search = getSearchQuery(query);
  const pag = getPaginateQuery(query);
  const fields = getFieldQuery(query);
  const order = getFieldSort(query);

  return await Projects.find({ ...search, _author }, fields)
    .sort(order)
    .paginate(pag)
};

export const createOneProject = async (values) => {
  return await Projects.findOneAndUpdate(
    { title: values.title },
    { $setOnInsert: values },
    { upsert: true }
  ).then((doc) => doc == null);
}

export const updateOneProject = async (values) => {
  return await await Projects.findOneAndUpdate(
    { _id: values._id },
    { $set: values },
    { returnOriginal: false }
  );
}

export const deleteOneProject = async (values: { _id: string }) => {
  return await Projects.findByIdAndDelete(values._id).then((doc) => doc == null);
}