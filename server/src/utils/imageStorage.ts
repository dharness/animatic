import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { s3Client, region } from "./S3";
import { v4 as uuidv4 } from "uuid";

const BUCKET_NAME =
  process.env.NODE_ENV === "production"
    ? "animatic-frames"
    : "animatic-frames-test";

const fileUrl = (bucket, key) => {
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

async function getAllImages() {
  const params = {
    Bucket: BUCKET_NAME,
  };
  try {
    const results = await s3Client.send(new ListObjectsCommand(params));
    const imageUrls = results.Contents.map(({ Key }) =>
      fileUrl(BUCKET_NAME, Key)
    );
    return imageUrls;
  } catch (err) {
    console.error("Error", err);
  }
}

async function saveImageBulk(base64Bulk: string[]) {
  return Promise.all(base64Bulk.map(saveImage));
}

async function saveImage(base64: string) {
  const imageName = `${uuidv4()}.png`;
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
    console.error("Error", err);
  }
}

async function deleteImageBulk(imageUrls: string[]) {
  const Objects = imageUrls.map((url) => {
    const key = url.split("/").pop();
    return { Key: key };
  });

  const command = new DeleteObjectsCommand({
    Bucket: BUCKET_NAME,
    Delete: { Objects },
  });

  try {
    const { Deleted } = await s3Client.send(command);
    return Deleted;
  } catch (err) {
    console.error(err);
  }
}

export { saveImage, saveImageBulk, deleteImageBulk, getAllImages };
