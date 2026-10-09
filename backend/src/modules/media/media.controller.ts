import { Controller, Get, Post, Param, Body, Query } from "@nestjs/common";
import { RequirePermissions } from "../../common/decorators/permissions.decorator";
import { MediaService } from "./media.service";

/**
 * ADM-MEDIA-01
 * POST /admin/media/upload-intents — tạo presigned URL
 * POST /admin/media/:id/finalize   — xác nhận upload xong
 * GET  /admin/media                — danh sách
 */
@Controller("admin/media")
export class MediaController {
  constructor(private readonly service: MediaService) {}

  @Get()
  @RequirePermissions("media.read")
  list(@Query() query: Record<string, string>) {
    return this.service.list(query);
  }

  @Post("upload-intents")
  @RequirePermissions("media.upload")
  createUploadIntent(@Body() body: unknown) {
    return this.service.createUploadIntent(body);
  }

  @Post(":id/finalize")
  @RequirePermissions("media.upload")
  finalize(@Param("id") id: string) {
    return this.service.finalize(id);
  }
}
