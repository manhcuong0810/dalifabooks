import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { RequirePermissions } from "../../../common/decorators/permissions.decorator";
import { Public } from "../../../common/decorators/public.decorator";
import { CategoriesService } from "./categories.service";

@Controller()
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Public()
  @Get("categories")
  listPublic() {
    return this.service.listPublic();
  }

  @Get("admin/categories")
  @RequirePermissions("catalog.read")
  adminList() {
    return this.service.adminList();
  }

  @Post("admin/categories")
  @RequirePermissions("catalog.write")
  create(@Body() body: unknown) {
    return this.service.create(body);
  }

  @Patch("admin/categories/:id")
  @RequirePermissions("catalog.write")
  update(@Param("id") id: string, @Body() body: unknown) {
    return this.service.update(id, body);
  }

  @Delete("admin/categories/:id")
  @RequirePermissions("catalog.write")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id") id: string) {
    await this.service.remove(id);
  }
}
