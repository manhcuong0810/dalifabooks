import { Module } from "@nestjs/common";
import { BooksController } from "./books/books.controller";
import { BooksService } from "./books/books.service";
import { CategoriesController } from "./categories/categories.controller";
import { CategoriesService } from "./categories/categories.service";
import { AuthorsController } from "./authors/authors.controller";
import { AuthorsService } from "./authors/authors.service";
import { PublishersController } from "./publishers/publishers.controller";
import { PublishersService } from "./publishers/publishers.service";

/** ADM-BOOK-01/02, ADM-META-01/02/03, SHOP-02/03 */
@Module({
  controllers: [
    BooksController,
    CategoriesController,
    AuthorsController,
    PublishersController,
  ],
  providers: [
    BooksService,
    CategoriesService,
    AuthorsService,
    PublishersService,
  ],
  exports: [BooksService],
})
export class CatalogModule {}
