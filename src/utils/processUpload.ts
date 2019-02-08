import shortid from "shortid";
import { createWriteStream } from "fs";
import { Stream } from "stream";

const storeUpload = async (createReadStream: () => Stream, mimetype: string): Promise<any> => {

  const extension = mimetype.split("/")[1];

  const id = `${shortid.generate()}.${extension}`;
  const path = `images/${id}`;

  return new Promise((resolve, reject) =>
     createReadStream()
        .pipe(createWriteStream(path)
        .on("finish", () => resolve({ id, path }))
        .on("error", () => reject({ id: null }))
        ))

};

export const processUpload = async (upload: any) => {

  const { createReadStream, mimetype } = await upload;

  const { id } = await storeUpload(createReadStream, mimetype);
  return id;
};

export const processUploads = async (uploads: any[]) => {
  return uploads.map( async (upload) => {
    const { createReadStream, mimetype } = await upload;
    const { id } = await storeUpload(createReadStream, mimetype);
    return id;
  })

};
