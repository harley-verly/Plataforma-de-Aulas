import { Body, Controller, Get, Module, Param, Post } from "@nestjs/common";
import { IsInt, IsString, Max, Min } from "class-validator";

import { DemoStoreService } from "../../common/demo-store.service";

class UpdateProgressDto {
  @IsString()
  lessonId!: string;

  @IsInt()
  @Min(0)
  @Max(100)
  watchedPct!: number;
}

@Controller("learning")
class LearningController {
  constructor(private readonly demoStore: DemoStoreService) {}

  @Get("overview")
  overview() {
    return this.demoStore.getLearningOverview();
  }

  @Get("courses/:slug")
  getCourse(@Param("slug") slug: string) {
    return this.demoStore.getLearningCourse(slug);
  }

  @Post("progress")
  updateProgress(@Body() body: UpdateProgressDto) {
    return this.demoStore.updateLessonProgress(body);
  }
}

@Module({
  controllers: [LearningController]
})
export class LearningModule {}
