import * as dotenv from "dotenv";
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import ApplicationModule from '@infra/nestjs/application/application.module';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    // Swagger
    const config = new DocumentBuilder().setTitle('NestJS, CQRS, Saga, Event Sourcing, Clean Architecture').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const port = process.env.PORT_API ?? 3000;
    await app.listen(port);

    Logger.log(`Application is running on port: ${port}`);
}
bootstrap();
