import { Controller, Get, Module } from "@nestjs/common";

@Controller("health")
class HealthController {
  @Get()
  getHealth() {
    return {
      status: "ok",
      service: "plataforma-de-aulas-api",
      stage: process.env.APP_STAGE ?? "local",
      timestamp: new Date().toISOString()
    };
  }
}

@Module({
  controllers: [HealthController]
})
export class HealthModule {}
