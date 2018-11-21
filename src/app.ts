import express from 'express';
import bodyParser from 'body-parser';
import { fileJsonRouter } from './endpoints/file/fileJsonRouter';

import cors from 'cors';
import { expressLogger } from './logger';
import { json } from 'body-parser';

const app = express();

const corsOptions: cors.CorsOptions = {
    allowedHeaders: ['Content-Type'],
    methods: ['GET', 'POST'],
    origin: '*',
};

app.set('port', process.env.PORT || 3000);
app.disable('x-powered-by');

app.use(expressLogger('content-api'));
app.use(cors(corsOptions));
app.use(json({ limit: '25mb' }));
app.use(bodyParser.json());

app.use(fileJsonRouter);

export { app };
