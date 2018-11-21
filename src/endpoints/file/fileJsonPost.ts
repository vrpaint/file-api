import { bucketName, s3 } from './storage';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export async function fileJsonPost(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    try {

        const id = uuidv4();
        const uploadResult = await s3
            .upload({
                Bucket: bucketName,
                Key: id,
                ContentType: 'application/json',
                Body: JSON.stringify(request.body),
            })
            .promise();

        const fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
        response.json({
            id,
            url: `${fullUrl}/${id}`,
            message: `JSON successfully uploaded.`,
        });
    } catch (error) {
        next(error);
    }
}