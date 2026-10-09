import { Controller, Get, Post, Patch, Param, Body, Query } from "@nestjs/common";
import { RequirePermissions } from "../../../common/decorators/permissions.decorator";
import { Public } from "../../../common/decorators/public.decorator";
import { PostsService } from "./posts.service";

@Controller()
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @Public() @Get("posts") listPublic(@Query() q: Record<string, string>) { return this.service.listPublic(q); }
  @Public() @Get("posts/:slug") getPublic(@Param("slug") slug: string) { return this.service.getPublic(slug); }

  @Get("admin/posts") @RequirePermissions("content.read") adminList(@Query() q: Record<string, string>) { return this.service.adminList(q); }
  @Post("admin/posts") @RequirePermissions("content.write") create(@Body() body: unknown) { return this.service.create(body); }
  @Patch("admin/posts/:id") @RequirePermissions("content.write") update(@Param("id") id: string, @Body() body: unknown) { return this.service.update(id, body); }
  @Post("admin/posts/:id/publish") @RequirePermissions("content.publish") publish(@Param("id") id: string, @Body() body: unknown) { return this.service.publish(id, body); }
  @Get("admin/posts/:id/revisions") @RequirePermissions("content.read") revisions(@Param("id") id: string) { return this.service.revisions(id); }
}
