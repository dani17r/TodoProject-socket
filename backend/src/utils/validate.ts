import { SocketT } from '@modules/interfaces';

export const validateSocket = (socket: SocketT) => {
  const validation = async (data: Object, rule: any, action: Function) => {
    const { error, value } = rule.validate(data);

    if (error != (null || undefined)) {
      socket.emit('login/error', {
        field: error.details.map((d: any) => d.context.label)[0],
        message: error.details.map((d: any) => d.message.replace(/\"/g, ''))[0]
      });
    } else await action(value);
  };

  return validation;
};

export const validate = (ctx) => {
  const validation = async (data: Object, rule: any, action: Function) => {
    const { error, value } = rule.validate(data);

    if (error != (null || undefined)) {
      ctx.status = 400;
      ctx.body = {
        field: error.details.map((d: any) => d.context.label)[0],
        message: error.details.map((d: any) => d.message.replace(/\"/g, ''))[0]
      };
    } else await action(value);
  };

  return validation;
};
