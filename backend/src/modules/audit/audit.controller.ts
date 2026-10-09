import { Controller, Get, Query } from "@nestjs/common";
import { RequirePermissions } from "../../common/decorators/permissions.decorator";
import { AuditService } from "./audit.service";

@Controller("admin")
export class AuditController {
  constructor(private readonly service: AuditService) {}

  /** ADM-AUDIT-01 */
  @Get("audit-logs")
  @RequirePermissions("audit.read")
  list(@Query() q: Record<string, string>) {
    return this.service.list(q);
  }

  /** ADM-DASH-01 */
  @Get("dashboard")
  dashboard(@Query() q: Record<string, string>) {
    return this.service.dashboard(q);
  }
}
