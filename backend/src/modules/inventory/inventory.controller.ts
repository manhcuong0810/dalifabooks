import { Controller, Get, Post, Patch, Param, Body, Query } from "@nestjs/common";
import { RequirePermissions } from "../../common/decorators/permissions.decorator";
import { InventoryService } from "./inventory.service";

@Controller("admin/inventory")
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  /** ADM-STOCK-01 */
  @Get()
  @RequirePermissions("inventory.read")
  list(@Query() query: Record<string, string>) {
    return this.service.list(query);
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
