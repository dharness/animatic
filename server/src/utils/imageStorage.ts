import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./S3";

const BUCKET_NAME = "animatic_frames";

async function storeImage(imageName: string, base64: string) {
  var params = {
    Bucket: BUCKET_NAME,
    Key: imageName,
    Body: base64,
    ContentEncoding: "base64",
    ContentType: "image/png",
  };

  try {
    const results = await s3Client.send(new PutObjectCommand(params));
    return results;
  } catch (err) {
    console.log("Error", err);
  }
}

export { storeImage };
