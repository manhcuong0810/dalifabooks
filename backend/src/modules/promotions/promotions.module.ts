import { Module } from "@nestjs/common";
import { CouponsController } from "./coupons.controller";
import { CouponsService } from "./coupons.service";

/** ADM-COUPON-01/02 */
@Module({ controllers: [CouponsController], providers: [CouponsService], exports: [CouponsService] })
export class PromotionsModule {}
