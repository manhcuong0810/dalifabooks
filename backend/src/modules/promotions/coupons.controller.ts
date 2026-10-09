import { Controller, Get, Post, Patch, Param, Body, Query } from "@nestjs/common";
import { RequirePermissions } from "../../common/decorators/permissions.decorator";
import { CouponsService } from "./coupons.service";

@Controller("admin/coupons")
export class CouponsController {
  constructor(private readonly service: CouponsService) {}

  @Get()
  @RequirePermissions("coupons.read")
  list(@Query() q: Record<string, string>) { return this.service.list(q); }

  @Post()
  @RequirePermissions("coupons.write")
  create(@Body() body: unknown) { return this.service.create(body); }

  @Patch(":id")
  @RequirePermissions("coupons.write")
  update(@Param("id") id: string, @Body() body: unknown) { return this.service.update(id, body); }
}
