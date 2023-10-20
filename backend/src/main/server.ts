//Importaciones Externas
import { createServer } from "http";
import { Server } from "socket.io";
import koa from "koa";

//Importaciones Internas
import { cacheStatic, compress, corsOption } from "@main/options";
import { readFile } from "node:fs/promises";
import { connectDB } from "@main/database";
import staticFolder from "koa-static";
import config from "@main/config";
import router from '@main/routes';
//import serve from "koa-static";
import cookie from "koa-cookie";
import koaBody from "koa-body";
import cors from "koa2-cors";
import run from "@main/run";

//init
const app = new koa();

//middlewares
app.use(compress());
app.use(cors(corsOption));

app.use(router.routes()).use(router.allowedMethods());
app.use(staticFolder("./public"));
app.use(cacheStatic());
app.use(koaBody());
app.use(cookie());

app.use(async (ctx) => {
  ctx.set("Content-Type", "text/html");
  ctx.body = await readFile("./public/index.html");
});

// Connection
connectDB();

const http = createServer(app.callback());
const io = new Server(http, config.SOKET_IO);

run();

//export default
export { http, app, io };
