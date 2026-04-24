import { Body, Controller, Get, Module, Param, Post } from "@nestjs/common";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

import { DemoStoreService } from "../../common/demo-store.service";

class CreateCheckoutSessionDto {
  @IsString()
  offerId!: string;

  @IsString()
  @MinLength(3)
  buyerName!: string;

  @IsEmail()
  buyerEmail!: string;

  @IsOptional()
  @IsString()
  affiliateCode?: string;
}

@Controller("checkout")
class CheckoutController {
  constructor(private readonly demoStore: DemoStoreService) {}

  @Get("offers/:offerId")
  getOffer(@Param("offerId") offerId: string) {
    return this.demoStore.getCheckoutOffer(offerId);
  }

  @Post("sessions")
  createSession(@Body() body: CreateCheckoutSessionDto) {
    return this.demoStore.createCheckoutSession(body);
  }
}

@Module({
  controllers: [CheckoutController]
})
export class CheckoutModule {}
