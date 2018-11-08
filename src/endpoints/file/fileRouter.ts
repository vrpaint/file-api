import { Router, NextFunction, Request, Response } from 'express';
import { config, S3 } from 'aws-sdk';

export const fileRouter = Router();
const bucketName = process.env.AWS_S3_BUCKET_NAME || '';
config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const s3 = new S3();
//const expiration = 60;

fileRouter.get('/file/:id', uploadFile);

async function uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
        const parameters = {
            Bucket: bucketName,
            Key: req.params.id,
            // Expires: expiration,
        };
        // const url = s3.getSignedUrl('getObject', parameters);
        // res.send(url);
        const { Body, ContentType } = await s3.getObject(parameters).promise();
        res.set('Content-Type', ContentType);
        // TODO: still forces the user to download the image...
        res.set('Content-Disposition', 'inline');
        res.send(Body);
    } catch (error) {
        next(error);
    }
}
