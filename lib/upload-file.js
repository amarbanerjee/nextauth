import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

export default async function uploadFile(imageFile)
{
      const randno = Math.floor(Math.random() * 5);
      const fileName = `image-${randno}-${imageFile.name}`;

      await uploadFileToS3(imageFile.path, fileName);
      // const image = fileName;  
      // console.log(image);
      return fileName;

}

async function uploadFileToS3(file, fileName) {
  
  const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY,
    },
  });

  const fileBuffer = await sharp(file)
  .jpeg({quality: 50})
  .resize(800, 400)
  .toBuffer();

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  try {
    const response = await s3Client.send(command);
    //console.log("File uploaded successfully:", response);
    return fileName;
  } catch (error) {
    throw error;
  }
}
