import { Router, NextFunction, Request, Response } from 'express';
import { fileJsonGet } from './fileJsonGet';
import { fileJsonPost } from './fileJsonPost';

export const fileJsonRouter = Router();

fileJsonRouter.get('/json/:id', fileJsonGet);
fileJsonRouter.post('/json', fileJsonPost);