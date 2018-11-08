import * as winston from 'winston';
import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';

export const logger = new winston.Logger({
    level: process.env.LOG_LEVEL || 'debug',
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
            prettyPrint: true,
            // json: true,
            timestamp: () => new Date().toISOString(),
        }),
    ],
});

export function expressLogger(id: string = '') {
    const requestLogFormat =
        process.env.NODE_ENV !== 'development' ? 'short' : 'dev';
    const loggers = [
        morgan(requestLogFormat, {
            skip: (req, res) => res.statusCode >= 400,
            stream: logStream(id, logger.info),
        }),
        morgan(requestLogFormat, {
            skip: (req, res) => res.statusCode < 400,
            stream: logStream(id, logger.warn),
        }),
        morgan(requestLogFormat, {
            skip: (req, res) => res.statusCode < 500,
            stream: logStream(id, logger.error),
        }),
    ];
    return (req: Request, res: Response, next: NextFunction) => {
        loggers.forEach((logger) => logger(req, res, () => {}));
        next();
    };
}

function logStream(id: string, logMethod: any) {
    return {
        write: logRequest(id, logMethod),
    };
}

function logRequest(id: string, logMethod: any) {
    const prefix = id ? `${id}:` : '';
    return (message: string) => logMethod(prefix, message);
}
