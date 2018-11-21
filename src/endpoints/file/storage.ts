import { config, S3 } from 'aws-sdk';
export const bucketName = process.env.AWS_S3_BUCKET_NAME || '';
config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

export const s3 = new S3();