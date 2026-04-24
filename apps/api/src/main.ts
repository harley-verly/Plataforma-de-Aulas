import "reflect-metadata";

import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true
    })
  );

  app.setGlobalPrefix("api");
  app.enableCors({
    origin: true,
    credentials: true
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  );

  const port = Number(process.env.API_PORT ?? 4000);
  await app.listen({ host: "0.0.0.0", port });
  logger.log(`API pronta em http://localhost:${port}/api`);
}

bootstrap().catch((error) => {
  const logger = new Logger("Bootstrap");
  logger.error("Falha ao iniciar a API", error instanceof Error ? error.stack : String(error));
  process.exit(1);
});
