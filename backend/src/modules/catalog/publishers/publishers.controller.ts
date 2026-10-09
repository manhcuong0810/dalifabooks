import { Controller, Get, Post, Patch, Param, Body } from "@nestjs/common";
import { RequirePermissions } from "../../../common/decorators/permissions.decorator";
import { Public } from "../../../common/decorators/public.decorator";
import { PublishersService } from "./publishers.service";

@Controller()
export class PublishersController {
  constructor(private readonly service: PublishersService) {}

  @Public() @Get("publishers") listPublic() { return this.service.listPublic(); }
  @Get("admin/publishers") @RequirePermissions("catalog.read") adminList() { return this.service.adminList(); }
  @Post("admin/publishers") @RequirePermissions("catalog.write") create(@Body() body: unknown) { return this.service.create(body); }
  @Patch("admin/publishers/:id") @RequirePermissions("catalog.write") update(@Param("id") id: string, @Body() body: unknown) { return this.service.update(id, body); }
}
