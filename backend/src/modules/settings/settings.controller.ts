import { Controller, Get, Patch, Body } from "@nestjs/common";
import { RequirePermissions } from "../../common/decorators/permissions.decorator";
import { Public } from "../../common/decorators/public.decorator";
import { SettingsService } from "./settings.service";

@Controller("admin/settings")
export class SettingsController {
  constructor(private readonly service: SettingsService) {}

  @Get()
  @RequirePermissions("settings.manage")
  get() { return this.service.get(); }

  @Patch()
  @RequirePermissions("settings.manage")
  update(@Body() body: unknown) { return this.service.update(body); }
}
