import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule } from "@nestjs/throttler";

import { JwtAuthGuard } from "./common/guards/jwt-auth.guard";
import { AuthModule } from "./modules/auth/auth.module";
import { IdentityModule } from "./modules/identity/identity.module";
import { CatalogModule } from "./modules/catalog/catalog.module";
import { MediaModule } from "./modules/media/media.module";
import { InventoryModule } from "./modules/inventory/inventory.module";
import { CartModule } from "./modules/cart/cart.module";
import { CheckoutModule } from "./modules/checkout/checkout.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { ShipmentsModule } from "./modules/shipments/shipments.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { PromotionsModule } from "./modules/promotions/promotions.module";
import { ContentModule } from "./modules/content/content.module";
import { StaffModule } from "./modules/staff/staff.module";
import { SettingsModule } from "./modules/settings/settings.module";
import { AuditModule } from "./modules/audit/audit.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: "../.env" }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET ?? "dalifabooks-dev-secret",
        signOptions: {
          issuer: "dalifabooks",
          audience: "admin",
          expiresIn: "8h",
        },
      }),
    }),

    // Rate limit — áp dụng login/reset/OTP/checkout/upload theo đặc tả
    ThrottlerModule.forRoot([
      { name: "default", ttl: 60_000, limit: 100 },
      { name: "strict", ttl: 60_000, limit: 10 },
    ]),

    // Business modules
    AuthModule,
    IdentityModule,
    CatalogModule,
    MediaModule,
    InventoryModule,
    CartModule,
    CheckoutModule,
    OrdersModule,
    ShipmentsModule,
    PaymentsModule,
    PromotionsModule,
    ContentModule,
    StaffModule,
    SettingsModule,
    AuditModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
