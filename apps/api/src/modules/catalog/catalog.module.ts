import { Controller, Get, Module, Param } from "@nestjs/common";

import { DemoStoreService } from "../../common/demo-store.service";

@Controller("catalog")
class CatalogController {
  constructor(private readonly demoStore: DemoStoreService) {}

  @Get("home")
  getHome() {
    return this.demoStore.getHome();
  }

  @Get("courses")
  listCourses() {
    return this.demoStore.listCourses();
  }

  @Get("courses/:slug")
  getCourse(@Param("slug") slug: string) {
    return this.demoStore.getCourse(slug);
  }
}

@Module({
  controllers: [CatalogController]
})
export class CatalogModule {}
