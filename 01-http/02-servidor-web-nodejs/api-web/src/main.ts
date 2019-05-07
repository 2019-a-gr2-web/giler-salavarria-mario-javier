import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

//import {NestExpressApplication} from "@nestjs/platform-express";
//import {join} from "path";
// import * as cookieParser from 'cookie-parser'
const cookieParser = require('cookie-parser');
import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as path from 'path';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser('Me gusta el trago'));
    //app.setViewEngine('ejs');
    //app.setBaseViewsDir(join(__dirname, '..', 'views'));
    //@ts-ignore
    app.set('view engine', 'ejs');
    app.use(express.static('publico'));
    app.use(favicon(path.join(__dirname, '..','publico','imagenes','yugiohIcon.ico')));
    await app.listen(3000);
}

bootstrap();
