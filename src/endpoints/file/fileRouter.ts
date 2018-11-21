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

fileRouter.get('/file/:id', fileGet);
fileRouter.post('/file/:id', filePost);

async function fileGet(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    try {
        const parameters = {
            Bucket: bucketName,
            Key: request.params.id,
        };

        const { Body, ContentType } = await s3.getObject(parameters).promise();
        response.set('Content-Type', ContentType);
        response.set('Content-Disposition', 'inline');
        response.send(Body);
    } catch (error) {
        next(error);
    }
}

async function filePost(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    try {
        const uploadResult = await s3
            .upload({
                Bucket: bucketName,
                Key: request.params.id,
                ContentType: 'application/json',
                Body: JSON.stringify(request.body),
            })
            .promise();

        response.json({
            message: `File uploaded successfully to "${
                uploadResult.Location
            }"!`,
        });
    } catch (error) {
        next(error);
    }
}
