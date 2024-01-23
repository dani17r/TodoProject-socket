import { createSession, getEmailJwt, messages, removeSession } from "./options";
import { rules } from "@modules/users/validate";
import { uploadImage } from "@utils/actions";
import { io } from "@main/server";
import { isEmpty } from "lodash";
import {
  LoginI,
  UpdateI,
  AllDataI,
  RegisterI,
  ChangePasswordI,
} from "@modules/users/interfaces";

import Projects from "@modules/projects/model";
import { QueryI } from "@modules/interfaces";
import { newPassword } from "@utils/auth";
import User from "@modules/users/model";
import validate from "@utils/validate";
import {
  getPaginateQuery,
  getSearchQuery,
  getFieldQuery,
  getFieldSort,
} from "@utils/querys";

const getAll = async (query: QueryI, _ids: string[]) => {
  const search = getSearchQuery(query);
  const pag = getPaginateQuery(query);
  const fields = getFieldQuery(query);
  const order = getFieldSort(query);

  if (query.search.length) {
    return await User.find({ _id: { $nin: _ids }, ...search }, fields)
      .sort(order)
      .paginate(pag);
  } else {
    return {
      paginate: {
        currentPag: pag.pag,
        totalPaginate: 0,
        limit: pag.limit,
        totalPag: 0,
        total: 0,
      },
      data: [],
    };
  }
};

export default () => {
  io.of("/user").on("connection", (socket) => {
    console.log("connection: /user");
    
    socket.on("all", async ({ query, _ids }: AllDataI) => {
      getAll(query, _ids)
        .then((users) => {
          socket.emit("all/success", users);
        })
        .catch(() => socket.emit("all/error"));
    });
   
  });

  io.of("/auth").on("connection", (socket) => {
    console.log("connection: /auth");
    let userId = socket.handshake.headers["user_id"];
    const validation = validate(socket);

    //Login
    socket.on("login", async (form: LoginI) => {
      console.log("connection: /auth/login");
      const action = async (values: LoginI) => {
        const credential = { email: values.email };
        const isUser = await User.findOne(credential).select("+password");
        const msg = messages.login;

        if (!isEmpty(isUser))
          if (await isUser.passwordCompare(values.password)) {
            const session = await createSession(credential, isUser._id);

            socket.emit("login/success", msg.success(session));
          } else socket.emit("login/error", msg.password);
        else socket.emit("login/error", msg.userNotFount);

        socket.disconnect(true);
      };

      await validation(form, rules.login, action);
    });

    //Register
    socket.on("register", async (form: RegisterI) => {
      console.log("connection: /auth/register");
      const action = async (values: RegisterI) => {
        const msg = messages.register;

        if (!(await User.exists({ email: values.email }))) {
          let user = await User.create(values);
          if (!isEmpty(user)) {
            socket.emit("register/success", msg.success);
          } else socket.emit("register/error", msg.notCreated);
        } else socket.emit("register/error", msg.email);

        socket.disconnect(true);
      };

      await validation(form, rules.register, action);
    });

    //Status
    socket.on("status", async (token: string) => {
      console.log("connection: /auth/status");
      const msg = messages.status;
      if (!isEmpty(token)) {
        const isUser = getEmailJwt(token);

        if (!isEmpty(isUser)) {
          const user = await User.findOne({ email: isUser.email });
          socket.emit("status/response", msg.success(user));
        } else socket.emit("status/response", msg.error);
      } else socket.emit("status/response", msg.error);
    });

    //Logout
    socket.on("logout", async (token: string) => {
      console.log("connection: /auth/logout");
      const msg = messages.logout;

      const isUser = getEmailJwt(token);

      if (!isEmpty(isUser)) {
        let user = await User.findOne({ email: isUser.email });
        let isUpdate = removeSession(user, token);

        if (isUpdate) socket.emit("logout/success", msg.success);
        else socket.emit("logout/error", msg.error);
      } else socket.emit("logout/error", msg.error);
    });

    //Update
    socket.on("update", async (form: UpdateI) => {
      console.log("connection: /auth/update");
      let userId = socket.handshake.headers["user"];
      const msg = messages.update;

      if (form.file.length) {
        const oldImageName = form.image;
        const name = await uploadImage(form.file, oldImageName);
        form.image = name;
      }

      const user = await User.findOneAndUpdate(
        { _id: form._id },
        { $set: form },
        { returnOriginal: false }
      );

      if (user) {
        socket.broadcast.emit(`broadcast:${userId}/update`);
        socket.emit("update/success", user);
      } else socket.emit("logout/error", msg.error);
    });

    //ChangePassword
    socket.on("change-password", async (form: ChangePasswordI) => {
      console.log("connection: /auth/change-password");
      const action = async (values: ChangePasswordI) => {
        const credential = { _id: values._id };
        const msgPass = messages.changePassword;
        const msg = messages.login;

        const isUser = await User.findOne(credential).select("+password");

        if (!isEmpty(isUser)) {
          if (await isUser.passwordCompare(values.currentPassword)) {
            await User.findByIdAndUpdate(credential, {
              password: await newPassword(values.newPassword),
            }).select("+password");

            socket.emit("change-password/success", msgPass.success);
          } else socket.emit("change-password/error", msg.password);
        } else socket.emit("change-password/error", msg.userNotFount);
      };

      await validation(form, rules.changePassword, action);
    });

    socket.on("shared-with-user", async () => {
      console.log("connection: /auth/shared-with-user");
      await Projects.aggregate([
        {
          $match: {
            "share.private.group._id": userId,
            "share.private.status": true,
          },
        },
        { $unwind: "$share.private.group" },
        { $match: { "share.private.group._id": userId } },
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
        .then((projects) => {
          socket.emit("shared-with-user/success", projects);
        })
        .catch(() => socket.emit("shared-with-user/error"));
    });

    socket.on("change-share-user", async (usersIds) => {
      console.log("connection: /auth/change-share-user");
      usersIds.forEach((userId:string) => {
        socket.broadcast.emit(`broadcast:${userId}/change-share-user`);
      })
    });

  });
};
