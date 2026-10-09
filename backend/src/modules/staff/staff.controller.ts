import { Controller, Get, Post, Patch, Param, Body } from "@nestjs/common";
import { RequirePermissions } from "../../common/decorators/permissions.decorator";
import { StaffService } from "./staff.service";

@Controller("admin")
export class StaffController {
  constructor(private readonly service: StaffService) {}

  @Get("staff") @RequirePermissions("staff.manage") list() { return this.service.list(); }
  @Post("staff/invitations") @RequirePermissions("staff.manage") invite(@Body() body: unknown) { return this.service.invite(body); }
  @Patch("staff/:id") @RequirePermissions("staff.manage") update(@Param("id") id: string, @Body() body: unknown) { return this.service.update(id, body); }

  @Get("roles") @RequirePermissions("roles.manage") listRoles() { return this.service.listRoles(); }
  @Post("roles") @RequirePermissions("roles.manage") createRole(@Body() body: unknown) { return this.service.createRole(body); }
  @Patch("roles/:id") @RequirePermissions("roles.manage") updateRole(@Param("id") id: string, @Body() body: unknown) { return this.service.updateRole(id, body); }
  @Get("permissions") @RequirePermissions("roles.manage") listPermissions() { return this.service.listPermissions(); }
}
