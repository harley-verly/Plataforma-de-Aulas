import { Global, Module } from "@nestjs/common";

import { DemoStoreService } from "./demo-store.service";
import { PrismaService } from "../prisma/prisma.service";

@Global()
@Module({
  providers: [DemoStoreService, PrismaService],
  exports: [DemoStoreService, PrismaService]
})
export class PlatformCommonModule {}
