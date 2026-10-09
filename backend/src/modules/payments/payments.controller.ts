import { Controller, Get, Post, Param, Body, Query } from "@nestjs/common";
import { RequirePermissions } from "../../common/decorators/permissions.decorator";
import { PaymentsService } from "./payments.service";

@Controller("admin")
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Get("payment-attempts")
  @RequirePermissions("payments.read")
  list(@Query() q: Record<string, string>) {
    return this.service.list(q);
  }

  /** ADM-PAY-01 */
  @Post("payment-attempts/:id/reconcile")
  @RequirePermissions("payments.reconcile")
  reconcile(@Param("id") id: string, @Body() body: unknown) {
    return this.service.reconcile(id, body);
  }

  /** ADM-PAY-02 */
  @Post("payment-attempts/:id/refunds")
  @RequirePermissions("payments.refund")
  createRefund(@Param("id") id: string, @Body() body: unknown) {
    return this.service.createRefund(id, body);
  }

  @Post("refunds/:id/confirm-manual")
  @RequirePermissions("payments.refund")
  confirmManualRefund(@Param("id") id: string, @Body() body: unknown) {
    return this.service.confirmManualRefund(id, body);
  }
}
