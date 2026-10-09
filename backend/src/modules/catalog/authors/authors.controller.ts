import { Controller, Get, Post, Patch, Param, Body } from "@nestjs/common";
import { RequirePermissions } from "../../../common/decorators/permissions.decorator";
import { Public } from "../../../common/decorators/public.decorator";
import { AuthorsService } from "./authors.service";

@Controller()
export class AuthorsController {
  constructor(private readonly service: AuthorsService) {}

  @Public()
  @Get("authors")
  listPublic() { return this.service.listPublic(); }

  @Get("admin/authors")
  @RequirePermissions("catalog.read")
  adminList() { return this.service.adminList(); }

  @Post("admin/authors")
  @RequirePermissions("catalog.write")
  create(@Body() body: unknown) { return this.service.create(body); }

  @Patch("admin/authors/:id")
  @RequirePermissions("catalog.write")
  update(@Param("id") id: string, @Body() body: unknown) { return this.service.update(id, body); }
}
