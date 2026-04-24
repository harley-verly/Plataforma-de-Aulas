import { Body, Controller, Get, Module, Post } from "@nestjs/common";
import { IsEmail, IsString, IsUrl, MinLength } from "class-validator";

import { DemoStoreService } from "../../common/demo-store.service";

class AffiliateApplicationDto {
  @IsString()
  @MinLength(3)
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsUrl()
  channelUrl!: string;
}

@Controller("affiliate")
class AffiliateController {
  constructor(private readonly demoStore: DemoStoreService) {}

  @Get("overview")
  overview() {
    return this.demoStore.getAffiliateOverview();
  }

  @Post("apply")
  apply(@Body() body: AffiliateApplicationDto) {
    return this.demoStore.submitAffiliateApplication(body);
  }
}

@Module({
  controllers: [AffiliateController]
})
export class AffiliateModule {}
