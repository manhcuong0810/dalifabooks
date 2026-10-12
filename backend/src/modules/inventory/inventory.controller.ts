import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { RequirePermissions } from "../../common/decorators/permissions.decorator";
import { InventoryService } from "./inventory.service";

@Controller("admin/inventory")
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Get()
  @RequirePermissions("inventory.read")
  list(@Query() query: Record<string, string>) {
    return this.service.list(query);
  }

  @Get(":id")
  @RequirePermissions("inventory.read")
  getById(@Param("id") id: string) {
    return this.service.getById(id);
  }

  @Post()
  @RequirePermissions("inventory.adjust")
  create(@Body() body: Record<string, unknown>) {
    return this.service.create(body);
  }

  @Patch(":id")
  @RequirePermissions("inventory.adjust")
  update(@Param("id") id: string, @Body() body: Record<string, unknown>) {
    return this.service.update(id, body);
  }

  @Delete(":id")
  @RequirePermissions("inventory.adjust")
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }

  /** ADM-STOCK-02 — lịch sử movements */
  @Get(":editionId/movements")
  @RequirePermissions("inventory.read")
  movements(@Param("editionId") id: string) {
    return this.service.movements(id);
  }

  /** ADM-STOCK-01 — cập nhật threshold */
  @Patch(":editionId/threshold")
  @RequirePermissions("inventory.adjust")
  updateThreshold(@Param("editionId") id: string, @Body() body: { threshold: number }) {
    return this.service.updateThreshold(id, body.threshold);
  }

  /** ADM-STOCK-02 — điều chỉnh tồn kho */
  @Post("adjustments")
  @RequirePermissions("inventory.adjust")
  adjust(@Body() body: unknown) {
    return this.service.adjust(body);
  }
}
