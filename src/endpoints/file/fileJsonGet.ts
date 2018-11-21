import { bucketName, s3 } from './storage';
import { NextFunction, Request, Response } from 'express';

export async function fileJsonGet(
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

        const file = JSON.parse(Body as string);
        response.send(JSON.stringify(file,null,4));

    } catch (error) {
        next(error);
    }
}