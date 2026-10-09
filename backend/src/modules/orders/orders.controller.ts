import { Controller, Get, Post, Param, Body, Query } from "@nestjs/common";
import { RequirePermissions } from "../../common/decorators/permissions.decorator";
import { OrdersService } from "./orders.service";

@Controller()
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  // ── Customer ────────────────────────────────────────────────────────────

  @Get("me/orders")
  myOrders(@Query() q: Record<string, string>) {
    return this.service.myOrders(q);
  }

  @Get("me/orders/:id")
  myOrderDetail(@Param("id") id: string) {
    return this.service.myOrderDetail(id);
  }

  @Post("orders/:id/cancel")
  cancelOrder(@Param("id") id: string, @Body() body: { reason: string }) {
    return this.service.cancel(id, body.reason);
  }

  // ── Guest access ────────────────────────────────────────────────────────

  @Post("guest/order-access/request")
  guestAccessRequest(@Body() body: unknown) {
    return this.service.guestAccessRequest(body);
  }

  @Post("guest/order-access/confirm")
  guestAccessConfirm(@Body() body: unknown) {
    return this.service.guestAccessConfirm(body);
  }

  // ── Admin ───────────────────────────────────────────────────────────────

  @Get("admin/orders")
  @RequirePermissions("orders.read")
  adminList(@Query() q: Record<string, string>) {
    return this.service.adminList(q);
  }

  @Get("admin/orders/:id")
  @RequirePermissions("orders.read")
  adminDetail(@Param("id") id: string) {
    return this.service.adminDetail(id);
  }

  @Post("admin/orders/:id/transitions")
  @RequirePermissions("orders.confirm")
  transition(@Param("id") id: string, @Body() body: unknown) {
    return this.service.transition(id, body);
  }

  @Post("admin/orders/:id/notes")
  @RequirePermissions("orders.read")
  addNote(@Param("id") id: string, @Body() body: { note: string }) {
    return this.service.addNote(id, body.note);
  }

  @Post("admin/orders/exports")
  @RequirePermissions("orders.export")
  exportOrders(@Body() body: unknown) {
    return this.service.exportOrders(body);
  }
}
