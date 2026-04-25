import { Module } from "@nestjs/common";

import { PlatformCommonModule } from "./common/platform-common.module";
import { HealthModule } from "./common/health.module";
import { AdminModule } from "./modules/admin/admin.module";
import { AffiliateModule } from "./modules/affiliate/affiliate.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CatalogModule } from "./modules/catalog/catalog.module";
import { CheckoutModule } from "./modules/checkout/checkout.module";
import { CommercialModule } from "./modules/commercial/commercial.module";
import { LearningModule } from "./modules/learning/learning.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { StudioModule } from "./modules/studio/studio.module";

@Module({
  imports: [
    PlatformCommonModule,
    HealthModule,
    AuthModule,
    CatalogModule,
    CommercialModule,
    LearningModule,
    StudioModule,
    AffiliateModule,
    AdminModule,
    CheckoutModule,
    PaymentsModule
  ]
})
export class AppModule {}
