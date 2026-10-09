import { Module } from "@nestjs/common";
import { ShipmentsController } from "./shipments.controller";
import { ShipmentsService } from "./shipments.service";

/** ADM-SHIP-01 */
@Module({ controllers: [ShipmentsController], providers: [ShipmentsService] })
export class ShipmentsModule {}
