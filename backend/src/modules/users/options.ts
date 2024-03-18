import { CredentialI, ResultLoginI, UserI } from "./interfaces";
import User from "@modules/users/model";
import config from "@main/config";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

export const isTokenValid = async (ctx, func: Function) => {
  let getAuthoritation = ctx.headers.authorization?.split(' ');
  if (!ctx.headers.authorization) getAuthoritation = [null, null];

  const bearer = getAuthoritation[0];
  const token = getAuthoritation[1];

  if (bearer === 'Bearer' && token) {
    try {
      jwt.verify(token, config.SECRET);    
      return await func(true, token);
    } catch (err) {
      return await func(false, token);
    }
  }
  else {
    return await func(false, null);
  }
}

export const createSession = async (
  credential: CredentialI,
  _id: Types.ObjectId
): Promise<ResultLoginI> => {
  const time = { expiresIn: config.TIME };
  const token = jwt.sign(credential, config.SECRET, time);

  const session = {
    start: new Date().getTime(),
    token,
  };

  let user = await User.findOneAndUpdate(
    { _id },
    { $push: { sessions: session } },
    { returnOriginal: false }
  );
  user.sessions = undefined;

  return { user, token };
};

export const removeSession = async (user: UserI, token: string) => {
  const getSession = user.sessions.find((session) => session.token == token);
  if (!getSession) return false;

  const newSession = user.sessions.filter(session => session.token != token);

  const isUpdate = await User.findOneAndUpdate(
    { email: user.email },
    { $set: { sessions: newSession } },
    { returnOriginal: false }
  ).then(() => true).catch(() => false)

  return isUpdate;
};

export const messages = {
  login: {
    success: (session: ResultLoginI) => ({
      notify: {
        message: "login success",
        field: "notify",
      },
      token: session.token,
      user: session.user,
    }),
    password: {
      message: "Incorrect password",
      field: "password",
    },
    userNotFount: {
      message: "There is no user with this email",
      field: "email",
    },
  },
  register: {
    email: {
      message: "Email is already in use",
      field: "email",
    },
    success: {
      notify: {
        message: "User successfully registered",
        field: "notify",
      },
    },
    notCreated: {
      message: "Error creating a user",
      field: "notify",
    },
  },
  status: {
    success: (user: CredentialI) => ({ user, isSession: true }),
    error: { user: null, isSession: false },
  },
  logout: {
    success: {
      notify: {
        message: "Logout successful",
        field: "notify",
      },
    },
    error: {
      message: "The session could not be closed",
      field: "notify",
    },
  },
  update: {
    error: {
      messages: "Error upload Image",
      field: "notify",
    },
  },
  changePassword: {
    success: {
      message: "Update password success",
      field: "notify",
    },
  },
};
