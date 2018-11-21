import { app } from './app';
import { logger } from './logger';



app.listen(app.get('port'), () => {
    logger.info(
        `App is running at http://localhost:${app.get('port')} in ${app.get(
            'env',
        )} mode`,
    );
});


/*
const awsServerlessExpress = require('aws-serverless-express')
const server = awsServerlessExpress.createServer(app)
exports.handler = (event:any, context:any) => { awsServerlessExpress.proxy(server, event, context) }
*/