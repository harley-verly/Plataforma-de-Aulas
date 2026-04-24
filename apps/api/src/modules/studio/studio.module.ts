import { Body, Controller, Get, Module, Post } from "@nestjs/common";
import { IsEmail, IsString, IsUrl, MinLength } from "class-validator";

import { DemoStoreService } from "../../common/demo-store.service";

class ProducerApplicationDto {
  @IsString()
  @MinLength(3)
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsUrl()
  portfolioUrl!: string;
}

class CreateCourseDraftDto {
  @IsString()
  @MinLength(5)
  title!: string;

  @IsString()
  @MinLength(20)
  summary!: string;
}

@Controller("studio")
class StudioController {
  constructor(private readonly demoStore: DemoStoreService) {}

  @Get("overview")
  overview() {
    return this.demoStore.getStudioOverview();
  }

  @Post("producers/apply")
  applyProducer(@Body() body: ProducerApplicationDto) {
    return this.demoStore.submitProducerApplication(body);
  }

  @Post("courses")
  createCourse(@Body() body: CreateCourseDraftDto) {
    return this.demoStore.createStudioCourse(body);
  }
}

@Module({
  controllers: [StudioController]
})
export class StudioModule {}
