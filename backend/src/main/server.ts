//Importaciones Externas
import { createServer } from "http";
import { Server } from "socket.io";
import config from "@main/config";
import koa from "koa";

//Importaciones Internas
import { cacheStatic, compress, corsOption } from "@main/options";
import { readFile } from "node:fs/promises";
import { connectDB } from "@main/database";
import staticFolder from "koa-static";
import { koaBody } from "koa-body";

import socket from "@main/socket";
import router from '@main/routes';
import cookie from "koa-cookie";
import cors from "koa2-cors";

//init
const app = new koa();

// Connection
connectDB();

//middlewares
app.use(koaBody({ multipart: true }));
app.use(cors(corsOption));
app.use(compress());
app.use(cookie());

app.use(router.routes()).use(router.allowedMethods());
app.use(staticFolder("./public"));
app.use(cacheStatic());

app.use(async (ctx) => {
  ctx.set("Content-Type", "text/html");
  ctx.body = await readFile("./public/index.html");
});

export const http = createServer(app.callback());
export const io = new Server(http, config.SOKET_IO);

socket();

//export default
export default app;
