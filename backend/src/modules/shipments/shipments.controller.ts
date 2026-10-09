import { Controller, Post, Param, Body } from "@nestjs/common";
import { RequirePermissions } from "../../common/decorators/permissions.decorator";
import { ShipmentsService } from "./shipments.service";

@Controller("admin")
export class ShipmentsController {
  constructor(private readonly service: ShipmentsService) {}

  @Post("orders/:id/shipments")
  @RequirePermissions("shipping.create")
  create(@Param("id") orderId: string, @Body() body: unknown) {
    return this.service.create(orderId, body);
  }

  @Post("shipments/:id/dispatch")
  @RequirePermissions("shipping.dispatch")
  dispatch(@Param("id") id: string, @Body() body: unknown) {
    return this.service.dispatch(id, body);
  }

  @Post("shipments/:id/events")
  @RequirePermissions("shipping.update")
  addEvent(@Param("id") id: string, @Body() body: unknown) {
    return this.service.addEvent(id, body);
  }
}
