import { isTokenValid, removeSession } from "@modules/users/options";
import User from "@modules/users/model";
import { Context } from "koa"

export const auth = async (ctx: Context, next) => {

  await isTokenValid(ctx, async (verify: boolean, token: string) => {
    const user = await User.findOne({ "sessions.token": token });
    
    if (!user) return ctx.status = 401;

    if (!verify) {
      await removeSession(user, token);
      return ctx.status = 401;
    }

    ctx.state['token'] = token;
    ctx.state['user_id'] = user._id;
    return next();
  });
}