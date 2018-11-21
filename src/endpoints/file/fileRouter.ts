import { Router, NextFunction, Request, Response } from 'express';
import { config, S3 } from 'aws-sdk';
import * as multer from 'multer';

export const fileRouter = Router();
const bucketName = process.env.AWS_S3_BUCKET_NAME || '';
config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const s3 = new S3();


const storage = multer.memoryStorage()
const upload = (multer as any)({storage});

console.log9

fileRouter.get('/file/:id', fileGet);
fileRouter.post('/file/:id', upload.single("file"), filePost);

async function fileGet(req: Request, res: Response, next: NextFunction) {
    try {
        const parameters = {
            Bucket: bucketName,
            Key: req.params.id
        };

        const { Body, ContentType } = await s3.getObject(parameters).promise();
        res.set('Content-Type', ContentType);
        res.set('Content-Disposition', 'inline');
        res.send(Body);


    } catch (error) {
        next(error);
    }
}



 

async function filePost(req: Request, res: Response, next: NextFunction) {
	
    console.log(req.file.originalname);
    /*
	s3.upload(params, (err, data) => {
		if (err) {
			res.status(500).json({error:"Error -> " + err});
		}
		res.json({message: 'File uploaded successfully! -> keyname = ' + req.file.originalname});
    });
    */
}

