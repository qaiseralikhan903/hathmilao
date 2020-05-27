const Minio = require("minio");

class Storage {
  static client = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    useSSL: false,
    port: 9000,
    accessKey: process.env.MINIO_ACCESSKEY,
    secretKey: process.env.MINIO_SECRET
  });

  static async UploadFile(fileStream, metaData, path) {
    try {
    } catch (e) {
      console.log("Erro Uploading file to Storage: ", e.message);
    }
  }
}

export default Storage;
