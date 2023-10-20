import staticCache from "koa-static-cache";
import Compress from "koa-compress";
import config from "@main/config";
import { constants } from "zlib";
import path from "path";

export const compress = () => {
  return Compress({
    filter(content_type: string) {
      return /text/i.test(content_type);
    },
    threshold: 2048,
    gzip: {
      flush: constants.Z_SYNC_FLUSH,
    },
    deflate: {
      flush: constants.Z_SYNC_FLUSH,
    },
    br: false, // disable brotli
  });
};

export const cacheStatic = () => {
  return staticCache(path.join(__dirname, "src/public"), {
    maxAge: 365 * 24 * 60 * 60, //1 año
    gzip: true,
    buffer: true,
    usePrecompiledGzip: true,
  });
};

export const corsOption = {
  origin: config.URL_FRONTEND,
  credentials: true, //access-control-allow-credentials:true
};
