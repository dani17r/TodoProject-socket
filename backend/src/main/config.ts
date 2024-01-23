const env = process.env;
const BASE = `${env.HOST}/` ?? "";
const FRONTEND = `${env.FRONTEND}` ?? "";

export default {
  PORT: Number(env.PORT) ?? 8080,
  TIME: Number(env.TIME) ?? 60 * 60 * 24 * 3, // 3 dias
  HOST: `${env.HOST}/` ?? "127.0.0.1/",
  URL_BASE: BASE,

  SECRET: env.SECRET_PRIMARY ?? "@mecretPrivadKeyP094@",

  DB_URI:
    env.MONGO_URI ??
    "mongodb://127.0.0.1:27017/taskList?directConnection=true&retryWrites=true&w=majority",

  URL_FRONTEND: FRONTEND,

  CORS: {
    origin: FRONTEND,
    credential: false,
  },
  SOKET_IO: {
    cors: {
      origin: FRONTEND,
      // credentials: true,
    },
  },
};
