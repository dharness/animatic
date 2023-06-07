import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, region } from "./S3";

const BUCKET_NAME = "animatic-frames";

const fileUrl = (bucket, key) => {
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

async function storeImage(imageName: string, base64: string) {
  const base64Buffer = Buffer.from(base64, "base64");
  var params = {
    Bucket: BUCKET_NAME,
    Key: imageName,
    Body: base64Buffer,
    ContentEncoding: "base64",
    ContentType: "image/png",
  };

  try {
    const results = await s3Client.send(new PutObjectCommand(params));
    if (results.$metadata.httpStatusCode !== 200) {
      throw new Error("Failed to store image");
    }
    return { url: fileUrl(BUCKET_NAME, imageName) };
  } catch (err) {
    console.log("Error", err);
  }
}

export { storeImage };
