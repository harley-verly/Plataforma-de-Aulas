import { Body, Controller, Module, Post } from "@nestjs/common";
import { IsObject, IsOptional, IsString } from "class-validator";

import { DemoStoreService } from "../../common/demo-store.service";

class AsaasWebhookDto {
  @IsString()
  event!: string;

  @IsOptional()
  @IsString()
  payment?: string;

  @IsObject()
  payload!: Record<string, unknown>;
}

@Controller("payments/webhooks")
class PaymentsController {
  constructor(private readonly demoStore: DemoStoreService) {}

  @Post("asaas")
  asaas(@Body() body: AsaasWebhookDto) {
    return this.demoStore.recordAsaasWebhook({
      event: body.event,
      payment: body.payment,
      payload: body.payload
    });
  }
}

@Module({
  controllers: [PaymentsController]
})
export class PaymentsModule {}
