import { Body, Controller, Get, Module, Param, Post } from "@nestjs/common";
import { IsOptional, IsString } from "class-validator";

import { DemoStoreService } from "../../common/demo-store.service";

class ApprovalDecisionDto {
  @IsOptional()
  @IsString()
  notes?: string;
}

@Controller("admin")
class AdminController {
  constructor(private readonly demoStore: DemoStoreService) {}

  @Get("overview")
  overview() {
    return this.demoStore.getAdminOverview();
  }

  @Get("approvals")
  approvals() {
    return this.demoStore.listApprovals();
  }

  @Post("approvals/:applicationId/approve")
  approve(@Param("applicationId") applicationId: string, @Body() body: ApprovalDecisionDto) {
    return this.demoStore.approveApplication(applicationId, body.notes);
  }
}

@Module({
  controllers: [AdminController]
})
export class AdminModule {}
