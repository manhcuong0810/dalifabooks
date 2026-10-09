import { Controller, Get, Post, Patch, Param, Body } from "@nestjs/common";
import { RequirePermissions } from "../../../common/decorators/permissions.decorator";
import { BannersService } from "./banners.service";

@Controller()
export class BannersController {
  constructor(private readonly service: BannersService) {}

  @Get("admin/banners") @RequirePermissions("content.read") list() { return this.service.list(); }
  @Post("admin/banners") @RequirePermissions("content.write") create(@Body() body: unknown) { return this.service.create(body); }
  @Patch("admin/banners/:id") @RequirePermissions("content.write") update(@Param("id") id: string, @Body() body: unknown) { return this.service.update(id, body); }
  @Get("admin/collections") @RequirePermissions("content.read") listCollections() { return this.service.listCollections(); }
  @Post("admin/collections") @RequirePermissions("content.write") createCollection(@Body() body: unknown) { return this.service.createCollection(body); }
  @Patch("admin/collections/:id") @RequirePermissions("content.write") updateCollection(@Param("id") id: string, @Body() body: unknown) { return this.service.updateCollection(id, body); }
}
