import { Controller, Get, Post, Patch, Param, Query, Body } from "@nestjs/common";
import { RequirePermissions } from "../../../common/decorators/permissions.decorator";
import { Public } from "../../../common/decorators/public.decorator";
import { BooksService } from "./books.service";

@Controller()
export class BooksController {
  constructor(private readonly service: BooksService) {}

  // ── Storefront (public) ─────────────────────────────────────────────────

  /** SHOP-02 — GET /books */
  @Public()
  @Get("books")
  listPublic(@Query() query: Record<string, string>) {
    return this.service.listPublic(query);
  }

  /** SHOP-03 — GET /books/:slug */
  @Public()
  @Get("books/:slug")
  getPublic(@Param("slug") slug: string) {
    return this.service.getPublic(slug);
  }

  // ── Admin ───────────────────────────────────────────────────────────────

  /** ADM-BOOK-01 — GET /admin/books */
  @Get("admin/books")
  @RequirePermissions("catalog.read")
  adminList(@Query() query: Record<string, string>) {
    return this.service.adminList(query);
  }

  /** ADM-BOOK-02 — POST /admin/books */
  @Post("admin/books")
  @RequirePermissions("catalog.write")
  create(@Body() body: unknown) {
    return this.service.create(body);
  }

  /** ADM-BOOK-02 — PATCH /admin/books/:id */
  @Patch("admin/books/:id")
  @RequirePermissions("catalog.write")
  update(@Param("id") id: string, @Body() body: unknown) {
    return this.service.update(id, body);
  }

  /** ADM-BOOK-02 — POST /admin/books/:id/publish */
  @Post("admin/books/:id/publish")
  @RequirePermissions("catalog.publish")
  publish(@Param("id") id: string, @Body() body: { version: number }) {
    return this.service.publish(id, body.version);
  }

  /** ADM-BOOK-01 — POST /admin/books/:id/archive */
  @Post("admin/books/:id/archive")
  @RequirePermissions("catalog.write")
  archive(@Param("id") id: string, @Body() body: { version: number }) {
    return this.service.archive(id, body.version);
  }

  /** ADM-BOOK-02 — POST /admin/books/:id/editions */
  @Post("admin/books/:id/editions")
  @RequirePermissions("catalog.write")
  createEdition(@Param("id") bookId: string, @Body() body: unknown) {
    return this.service.createEdition(bookId, body);
  }

  /** ADM-BOOK-02 — PATCH /admin/books/:id/editions/:editionId */
  @Patch("admin/books/:id/editions/:editionId")
  @RequirePermissions("catalog.write")
  updateEdition(
    @Param("id") bookId: string,
    @Param("editionId") editionId: string,
    @Body() body: unknown
  ) {
    return this.service.updateEdition(bookId, editionId, body);
  }
}
