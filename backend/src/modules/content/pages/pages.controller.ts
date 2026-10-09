import { Controller, Get, Param } from "@nestjs/common";
import { Public } from "../../../common/decorators/public.decorator";
import { PagesService } from "./pages.service";

@Controller()
export class PagesController {
  constructor(private readonly service: PagesService) {}

  @Public() @Get("pages/:slug") getPage(@Param("slug") slug: string) { return this.service.getPage(slug); }
}
