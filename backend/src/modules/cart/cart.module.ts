import { Module } from "@nestjs/common";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";

/** CART-01 */
@Module({ controllers: [CartController], providers: [CartService], exports: [CartService] })
export class CartModule {}
