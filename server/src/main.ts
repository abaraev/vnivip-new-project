import * as process from "node:process";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import * as express from 'express';
import {BodyValidationPipe} from "./pipes/body-validation.pipe";
import {resolve} from "node:path";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as cookieParser from 'cookie-parser';
import * as fs from "node:fs";
import * as path from "node:path";

const isDev = process.env.MODE === 'development';

const options = isDev ? undefined : {
    key: fs.readFileSync(path.resolve(__dirname, '..', 'ssl', 'key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '..', 'ssl', 'cert.pem')),
};

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        httpsOptions: options,
    })
    app.enableCors({
        origin: isDev ? "http://localhost:3000" : process.env.ORIGIN,
        credentials: true,
    })
    app.use(cookieParser());
    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: true, limit: '10kb' }));
    app.use('/static', express.static(resolve(__dirname, '..', 'static')))

    app.use((err, req, res, next) => {
        if (err.statusCode === 413) {
            return res.status(413).send({ statusCode: 413, message: 'The request size includes the allowed limit (10 KB)'});
        }
    });

    app.useGlobalPipes(new BodyValidationPipe());

    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start();




