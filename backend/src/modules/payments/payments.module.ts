import { Module } from "@nestjs/common";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

/** ADM-PAY-01/02 */
@Module({ controllers: [PaymentsController], providers: [PaymentsService] })
export class PaymentsModule {}
