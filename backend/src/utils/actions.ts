import { existsSync, unlinkSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import * as crypto from "crypto";
import path from "node:path";

export const removeProperty = (data: Object, field: string) => {
  return (data[field] = undefined);
};

export const uploadImage = async (image: Array<Buffer>, name: string) => {
  const base = `public/upload/profile`;
  const oldImg = `${base}/${name}`;
  const format = `webp`;

  const notPlaceholder = name != `placeholder.${format}`;
  if (existsSync(oldImg) && notPlaceholder) unlinkSync(oldImg);

  const nameImage = crypto.randomBytes(12).toString("hex");
  const route = `${base}/${nameImage}.${format}`;
  const pathName = path.join(__dirname, `../../${route}`);
  await writeFile(pathName, image, "base64");

  return `${nameImage}.${format}`;
};
