import { Module } from "@nestjs/common";
import { PostsController } from "./posts/posts.controller";
import { PostsService } from "./posts/posts.service";
import { BannersController } from "./banners/banners.controller";
import { BannersService } from "./banners/banners.service";
import { PagesController } from "./pages/pages.controller";
import { PagesService } from "./pages/pages.service";

/** ADM-CONTENT-01/02/03, CONTENT-01/02 */
@Module({
  controllers: [PostsController, BannersController, PagesController],
  providers: [PostsService, BannersService, PagesService],
})
export class ContentModule {}
