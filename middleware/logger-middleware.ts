
// Middleware is an Express term for a function that transforms/uses youre req/res objects before passes it along to more middleware

import { Request, Response } from "express";
import winston, { format } from 'winston'

const logger = winston.createLogger({
    level:"info",
    format:winston.format.combine(winston.format.json()),
    defaultMeta: {service:"expensereport-back-end"},

    transports:[
        new winston.transports.File({filename:"RequestLogs.log"})
    ]
})

export default function logMiddleware(req:Request, res: Response, next:Function){
    const url = req.url
    const verb = req.method;
    const date = new Date().toLocaleDateString("en-UK");
    logger.info(`A  ${verb} request was made to ${url} on ${date}`)
    next()
}