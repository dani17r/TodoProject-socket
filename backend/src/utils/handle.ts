export const msgError = (ctx, code: number, message: Object | string) => {
  ctx.status = code;
  ctx.body = message;
}