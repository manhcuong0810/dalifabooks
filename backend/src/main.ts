import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  // Global prefix — tất cả route đều dưới /api/v1
  app.setGlobalPrefix("api/v1");

  // CORS — chỉ cho phép storefront và CMS
  app.enableCors({
    origin: [
      process.env.STOREFRONT_URL ?? "http://localhost:3000",
      process.env.CMS_URL ?? "http://localhost:3001",
    ],
    credentials: true,
  });

  const port = process.env.PORT ?? 4000;
  await app.listen(port, "0.0.0.0");
  console.log(`Backend running on http://localhost:${port}/api/v1`);
}

bootstrap();
