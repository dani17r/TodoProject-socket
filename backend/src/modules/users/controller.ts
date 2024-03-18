import { LoginI, UpdateI, RegisterI, ChangePasswordI } from "@modules/users/interfaces";
import { createSession, isTokenValid, messages, removeSession } from "./options";
import { getAllUserByQuery } from "@modules/users/services";
import { rules } from "@modules/users/validate";
import { uploadImage } from "@utils/actions";
import { msgError } from "@utils/handle";
import { io } from "@main/server";
import { isEmpty } from "lodash";

import Projects from "@modules/projects/model";
import { QueryI } from "@modules/interfaces";
import { validate } from "@utils/validate";
import { newPassword } from "@utils/auth";
import User from "@modules/users/model";
import { Context } from "koa";

export default () => {
  io.of("/auth").on("connection", (socket) => {
    console.log('online');

    socket.on("disconnect", () => {
      console.log('offline');
    });

    socket.on("change-share-user", async (usersIds) => {
      console.log("connection: /auth/change-share-user");
      usersIds.forEach((userId: string) => {
        socket.broadcast.emit(`broadcast:${userId}/change-share-user`);
      })
    });
  })
};

export const all = async (ctx: Context) => {
  const query = ctx.request.query as unknown as QueryI & { not_equal_users: string[] };

  getAllUserByQuery(query, query.not_equal_users)
    .then((users) => {
      return ctx.body = users;
    })
    .catch((error) => {
      return msgError(ctx, 400, error.message);
    });
}

export const login = async (ctx: Context) => {
  const form = ctx.request.body as LoginI;
  const validation = validate(ctx);

  const action = async (values: LoginI) => {
    const credential = { email: values.email };
    const isUser = await User.findOne(credential).select("+password");
    const msg = messages.login;

    if (!isEmpty(isUser)){
      if (await isUser.passwordCompare(values.password)) {
        const session = await createSession(credential, isUser._id);
        return ctx.body = msg.success(session);
      } 
      return msgError(ctx, 400, msg.password);
    }
    return msgError(ctx, 404, msg.userNotFount);
  };

  await validation(form, rules.login, action);
}

export const register = async (ctx: Context) => {
  const form = ctx.request.body as RegisterI;
  const validation = validate(ctx);

  const action = async (values: RegisterI) => {
    const msg = messages.register;
    const isEmailExist = await User.exists({ email: values.email });

    if (!isEmailExist) {
      let user = await User.create(values);
      if (!isEmpty(user)) return ctx.body = msg.success;
      msgError(ctx, 401, msg.notCreated);
    }
    msgError(ctx, 400, msg.email);
  };

  await validation(form, rules.register, action);

}

export const status = async (ctx: Context) => {
  return await isTokenValid(ctx, async (verify:boolean, token:string)=> {
    const msg = messages.status;
    if (verify) {
      const user = await User.findOne({ "sessions.token": token }).then((data) => {
        data.sessions = data.sessions.filter((session) => session.token == token);
        return data;
      });
      if (user) return ctx.body = msg.success(user);
      return msgError(ctx, 200, msg.error);
    }
    return msgError(ctx, 200, msg.error);
  })
}

export const logout = async (ctx: Context) => {
  const token = ctx.state['token'];
  const msg = messages.logout;

  let user = await User.findOne({ "sessions.token": token });
  if (!user) return ctx.status = 404;

  let isUpdate = await removeSession(user, token);
  if (isUpdate) return ctx.body = msg.success;

  return msgError(ctx, 404, msg.error);
}

export const update = async (ctx: Context) => {
  const form = ctx.request.body as UpdateI;
  const _id = ctx.params._id;
  const msg = messages.update;

  if (form?.file?.length) {
    const oldImageName = form.image;
    const name = await uploadImage(form.file, oldImageName).catch(()=> {
      msgError(ctx, 400, msg.error);
      return `--error-${oldImageName}`;
    });
    form.image = name;
  }
  
  const user = await User.findOneAndUpdate(
    { _id },
    { $set: form },
    { returnOriginal: false }
  );

  if (user) {
    io.of('/auth').emit(`broadcast:${_id}/update`);
    return ctx.body = user;
  } 
  return msgError(ctx, 400, 'User not found');
}

export const changePassword = async (ctx: Context) => {
  const form = ctx.request.body as ChangePasswordI;
  const validation = validate(ctx);

  const action = async (values: ChangePasswordI) => {
    const credential = { _id: values.user_id };
    const msgPass = messages.changePassword;
    const msg = messages.login;

    const isUser = await User.findOne(credential).select("+password");

    if (isUser) {
      if (await isUser.passwordCompare(values.currentPassword)) {
        await User.findByIdAndUpdate(credential, {
          password: await newPassword(values.newPassword),
        }).select("+password");

        return ctx.body = msgPass.success;
      } 
      else return msgError(ctx, 400, msg.password);
    }
    else return  msgError(ctx, 404, msg.userNotFount);
  };

  await validation(form, rules.changePassword, action);
}

export const sharedWithUsers = async (ctx: Context) => {
  const _id = ctx.params._id;
  await Projects.aggregate([
    {
      $match: {
        "share.private.group._id": _id,
        "share.private.status": true,
      },
    },
    { $unwind: "$share.private.group" },
    { $match: { "share.private.group._id": _id } },
    {
      $lookup: {
        from: "users",
        localField: "_author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $project: {
        title: true,
        description: true,
        permissions: "$share.private.group.permissions",
        author: { $arrayElemAt: ["$author", 0] },
      },
    },
    {
      $project: {
        title: true,
        description: true,
        permissions: true,
        author: {
          fullname: true,
          email: true,
        },
      },
    },
  ])
    .then((projects) => ctx.body = projects)
    .catch((error) => msgError(ctx, 404, error));
}