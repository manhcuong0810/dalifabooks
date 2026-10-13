import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { prisma } from "@dalifabooks/db";

type BookStatus = "draft" | "published" | "archived";
type EditionStatus = "draft" | "active" | "archived";
type EditionFormat = "paperback" | "hardcover";

type BookPayload = {
  title?: string;
  slug?: string;
  description?: string | null;
  status?: BookStatus;
  seo_title?: string | null;
  seo_description?: string | null;
  author_ids?: string[];
  category_ids?: string[];
  edition?: {
    sku?: string;
    isbn?: string | null;
    publisher_id?: string | null;
    language?: string;
    format?: EditionFormat;
    publication_date?: string | null;
    page_count?: number | null;
    list_price_vnd?: number | string | bigint | null;
    sale_price_vnd?: number | string | bigint | null;
    status?: EditionStatus;
  };
};

const normalizeSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "book";

const toNumber = (value: unknown) => {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  if (typeof value === "bigint") return Number(value);
  return 0;
};

const loadBook = async (id: string) =>
  prisma.book.findUnique({
    where: { id },
    include: {
      editions: {
        include: { publisher: true, inventory_balances: true },
        orderBy: [{ created_at: "desc" }],
      },
      book_authors: {
        include: { author: true },
        orderBy: [{ position: "asc" }],
      },
      book_categories: {
        include: { category: true },
      },
    },
  });

const getAvailableQuantity = (inventoryBalances: any[] = []) =>
  inventoryBalances.reduce((sum, balance) => {
    const onHand = Number(balance?.on_hand ?? 0);
    const reserved = Number(balance?.reserved ?? 0);
    return sum + Math.max(0, onHand - reserved);
  }, 0);

const mapEdition = (edition: any) => {
  if (!edition) return null;

  const availableQuantity = getAvailableQuantity(edition.inventory_balances ?? []);

  return {
    id: edition.id,
    sku: edition.sku,
    isbn: edition.isbn,
    publisher_id: edition.publisher_id,
    publisher: edition.publisher
      ? {
          id: edition.publisher.id,
          name: edition.publisher.name,
          slug: edition.publisher.slug,
        }
      : null,
    language: edition.language,
    format: edition.format,
    publication_date: edition.publication_date,
    page_count: edition.page_count,
    list_price_vnd: Number(edition.list_price_vnd ?? 0),
    sale_price_vnd: Number(edition.sale_price_vnd ?? 0),
    status: edition.status,
    available_quantity: availableQuantity,
    stock_status:
      availableQuantity <= 0 ? "out_of_stock" : availableQuantity <= 10 ? "low_stock" : "in_stock",
  };
};

const mapBook = (row: any) => {
  const edition = row.editions?.[0] ?? null;
  const authors = row.book_authors?.map((item: any) => item.author).filter(Boolean) ?? [];
  const categories = row.book_categories?.map((item: any) => item.category).filter(Boolean) ?? [];

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description ?? "",
    status: row.status,
    seo_title: row.seo_title ?? "",
    seo_description: row.seo_description ?? "",
    version: row.version,
    created_at: row.created_at,
    updated_at: row.updated_at,
    authors: authors.map((author: any) => ({
      id: author.id,
      name: author.name,
      slug: author.slug,
    })),
    categories: categories.map((category: any) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
    })),
    edition: mapEdition(edition),
    isbn: edition?.isbn ?? null,
    price: edition ? Number(edition.sale_price_vnd ?? 0) : 0,
  };
};

@Injectable()
export class BooksService {
  private async generateUniqueSlug(base: string, excludeId?: string) {
    const initial = normalizeSlug(base);
    let slug = initial;
    let index = 1;

    while (true) {
      const existing = await prisma.book.findFirst({
        where: {
          slug,
          ...(excludeId ? { id: { not: excludeId } } : {}),
        },
      });

      if (!existing) return slug;
      slug = `${initial}-${index}`;
      index += 1;
    }
  }

  private async syncBookAuthors(bookId: string, authorIds: string[]) {
    await prisma.bookAuthor.deleteMany({ where: { book_id: bookId } });
    if (!authorIds.length) return;

    await prisma.bookAuthor.createMany({
      data: authorIds.map((author_id, index) => ({
        book_id: bookId,
        author_id,
        position: index,
      })),
    });
  }

  private async syncBookCategories(bookId: string, categoryIds: string[]) {
    await prisma.bookCategory.deleteMany({ where: { book_id: bookId } });
    if (!categoryIds.length) return;

    await prisma.bookCategory.createMany({
      data: categoryIds.map((category_id) => ({
        book_id: bookId,
        category_id,
        is_primary: false,
      })),
    });
  }

  async listPublic(query: Record<string, string> = {}) {
    const search = (query.search ?? "").trim();
    const where: any = { status: "published" };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const rows = await prisma.book.findMany({
      where,
      include: {
        editions: {
          include: { publisher: true, inventory_balances: true },
          orderBy: [{ created_at: "desc" }],
          take: 1,
        },
        book_authors: { include: { author: true } },
        book_categories: { include: { category: true } },
      },
      orderBy: [{ updated_at: "desc" }],
      take: 24,
    });

    return rows.map(mapBook);
  }

  async getPublic(slug: string) {
    const row = await prisma.book.findFirst({
      where: { slug, status: "published" },
      include: {
        editions: {
          include: { publisher: true, inventory_balances: true },
          orderBy: [{ created_at: "desc" }],
          take: 1,
        },
        book_authors: { include: { author: true } },
        book_categories: { include: { category: true } },
      },
    });

    if (!row) {
      throw new NotFoundException({ code: "BOOK_NOT_FOUND", message: "Sách không tồn tại." });
    }

    return mapBook(row);
  }

  async getById(id: string) {
    const row = await prisma.book.findUnique({
      where: { id },
      include: {
        editions: {
          include: { publisher: true, inventory_balances: true },
          orderBy: [{ created_at: "desc" }],
          take: 1,
        },
        book_authors: { include: { author: true } },
        book_categories: { include: { category: true } },
      },
    });

    if (!row) {
      throw new NotFoundException({ code: "BOOK_NOT_FOUND", message: "Sách không tồn tại." });
    }

    return mapBook(row);
  }

  async adminList(query: Record<string, string> = {}) {
    const search = (query.search ?? "").trim();
    const status = query.status;
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const rows = await prisma.book.findMany({
      where,
      include: {
        editions: {
          include: { publisher: true, inventory_balances: true },
          orderBy: [{ created_at: "desc" }],
          take: 1,
        },
        book_authors: { include: { author: true } },
        book_categories: { include: { category: true } },
      },
      orderBy: [{ updated_at: "desc" }],
    });

    return rows.map(mapBook);
  }

  async adminSummary() {
    const rows = await prisma.book.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    const summary = {
      total: 0,
      published: 0,
      draft: 0,
      archived: 0,
      low_stock_warnings: 0,
    };

    for (const row of rows) {
      const count = row._count.status ?? 0;
      summary.total += count;

      if (row.status === "published") summary.published = count;
      if (row.status === "draft") summary.draft = count;
      if (row.status === "archived") summary.archived = count;
    }

    const balances = await prisma.inventoryBalance.findMany({
      select: {
        on_hand: true,
        reserved: true,
        low_stock_threshold: true,
      },
    });

    summary.low_stock_warnings = balances.filter(
      (item) => item.on_hand - item.reserved <= (item.low_stock_threshold ?? 0)
    ).length;

    return summary;
  }

  async create(body: unknown) {
    const payload = (body ?? {}) as BookPayload;
    const title = payload.title?.trim();

    if (!title) {
      throw new BadRequestException({
        code: "INVALID_INPUT",
        message: "Tên sách là bắt buộc.",
      });
    }

    const slug = await this.generateUniqueSlug(payload.slug || title);
    const book = await prisma.book.create({
      data: {
        title,
        slug,
        description: payload.description?.trim() || null,
        status: payload.status === "published" ? "published" : payload.status === "archived" ? "archived" : "draft",
        seo_title: payload.seo_title?.trim() || null,
        seo_description: payload.seo_description?.trim() || null,
        search_text: [title, payload.description ?? ""].filter(Boolean).join(" "),
      },
    });

    if (payload.author_ids?.length) {
      await this.syncBookAuthors(book.id, payload.author_ids);
    }

    if (payload.category_ids?.length) {
      await this.syncBookCategories(book.id, payload.category_ids);
    }

    if (payload.edition) {
      const editionPayload = payload.edition;
      const format = editionPayload.format ?? "paperback";
      const status = editionPayload.status ?? "draft";
      const listPrice = toNumber(editionPayload.list_price_vnd ?? 0);
      const salePrice = toNumber(editionPayload.sale_price_vnd ?? listPrice); 

      await prisma.bookEdition.create({
        data: {
          book_id: book.id,
          sku: editionPayload.sku || `${slug.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}-01`,
          isbn: editionPayload.isbn?.trim() || null,
          publisher_id: editionPayload.publisher_id || null,
          language: editionPayload.language || "vi",
          format,
          publication_date: editionPayload.publication_date ? new Date(editionPayload.publication_date) : null,
          page_count: editionPayload.page_count ?? null,
          list_price_vnd: BigInt(Math.max(0, Math.round(listPrice))),
          sale_price_vnd: BigInt(Math.max(0, Math.round(salePrice))),
          status,
        },
      });
    }

    return loadBook(book.id).then((row) => {
      if (!row) {
        throw new NotFoundException({ code: "BOOK_NOT_FOUND", message: "Sách vừa tạo không tìm thấy." });
      }
      return mapBook(row);
    });
  }

  async update(id: string, body: unknown) {
    const existing = await loadBook(id);
    if (!existing) {
      throw new NotFoundException({ code: "BOOK_NOT_FOUND", message: "Sách không tồn tại." });
    }

    const payload = (body ?? {}) as BookPayload;
    const title = payload.title?.trim();
    if (title !== undefined && !title) {
      throw new BadRequestException({
        code: "INVALID_INPUT",
        message: "Tên sách không được để trống.",
      });
    }

    const nextTitle = title ?? existing.title;
    const nextSlug = payload.slug ? await this.generateUniqueSlug(payload.slug, id) : existing.slug;

    await prisma.book.update({
      where: { id },
      data: {
        title: nextTitle,
        slug: nextSlug,
        description: payload.description !== undefined ? payload.description?.trim() || null : existing.description,
        status: payload.status === "published" ? "published" : payload.status === "archived" ? "archived" : payload.status === "draft" ? "draft" : existing.status,
        seo_title: payload.seo_title !== undefined ? payload.seo_title?.trim() || null : existing.seo_title,
        seo_description: payload.seo_description !== undefined ? payload.seo_description?.trim() || null : existing.seo_description,
        search_text: [nextTitle, payload.description ?? existing.description ?? ""].filter(Boolean).join(" "),
      },
    });

    if (payload.author_ids) {
      await this.syncBookAuthors(id, payload.author_ids);
    }

    if (payload.category_ids) {
      await this.syncBookCategories(id, payload.category_ids);
    }

    if (payload.edition) {
      const editionPayload = payload.edition;
      const edition = existing.editions[0] ?? null;

      if (edition) {
        await prisma.bookEdition.update({
          where: { id: edition.id },
          data: {
            sku: editionPayload.sku ?? edition.sku,
            isbn: editionPayload.isbn !== undefined ? editionPayload.isbn?.trim() || null : edition.isbn,
            publisher_id: editionPayload.publisher_id !== undefined ? editionPayload.publisher_id ?? null : edition.publisher_id,
            language: editionPayload.language ?? edition.language,
            format: editionPayload.format ?? edition.format,
            publication_date: editionPayload.publication_date !== undefined ? editionPayload.publication_date ? new Date(editionPayload.publication_date) : null : edition.publication_date,
            page_count: editionPayload.page_count ?? edition.page_count,
            list_price_vnd: BigInt(Math.max(0, Math.round(toNumber(editionPayload.list_price_vnd ?? edition.list_price_vnd)))),
            sale_price_vnd: BigInt(Math.max(0, Math.round(toNumber(editionPayload.sale_price_vnd ?? edition.sale_price_vnd)))),
            status: editionPayload.status ?? edition.status,
          },
        });
      } else {
        await prisma.bookEdition.create({
          data: {
            book_id: id,
            sku: editionPayload.sku || `${nextSlug.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}-01`,
            isbn: editionPayload.isbn?.trim() || null,
            publisher_id: editionPayload.publisher_id || null,
            language: editionPayload.language || "vi",
            format: editionPayload.format ?? "paperback",
            publication_date: editionPayload.publication_date ? new Date(editionPayload.publication_date) : null,
            page_count: editionPayload.page_count ?? null,
            list_price_vnd: BigInt(Math.max(0, Math.round(toNumber(editionPayload.list_price_vnd ?? 0)))),
            sale_price_vnd: BigInt(Math.max(0, Math.round(toNumber(editionPayload.sale_price_vnd ?? editionPayload.list_price_vnd ?? 0)))),
            status: editionPayload.status ?? "draft",
          },
        });
      }
    }

    const updated = await loadBook(id);
    if (!updated) {
      throw new NotFoundException({ code: "BOOK_NOT_FOUND", message: "Sách không tồn tại sau khi cập nhật." });
    }

    return mapBook(updated);
  }

  async publish(id: string, _version: number) {
    const book = await loadBook(id);
    if (!book) {
      throw new NotFoundException({ code: "BOOK_NOT_FOUND", message: "Sách không tồn tại." });
    }

    return prisma.book.update({
      where: { id },
      data: {
        status: "published",
        version: { increment: 1 },
      },
    });
  }

  async archive(id: string, _version: number) {
    const book = await loadBook(id);
    if (!book) {
      throw new NotFoundException({ code: "BOOK_NOT_FOUND", message: "Sách không tồn tại." });
    }

    return prisma.book.update({
      where: { id },
      data: {
        status: "archived",
        version: { increment: 1 },
      },
    });
  }

  async createEdition(bookId: string, body: unknown) {
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException({ code: "BOOK_NOT_FOUND", message: "Sách không tồn tại." });
    }

    const payload = (body ?? {}) as BookPayload["edition"];
    const sku = payload?.sku || `${book.slug.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}-01`;

    return prisma.bookEdition.create({
      data: {
        book_id: bookId,
        sku,
        isbn: payload?.isbn?.trim() || null,
        publisher_id: payload?.publisher_id || null,
        language: payload?.language || "vi",
        format: payload?.format || "paperback",
        publication_date: payload?.publication_date ? new Date(payload.publication_date) : null,
        page_count: payload?.page_count ?? null,
        list_price_vnd: BigInt(Math.max(0, Math.round(toNumber(payload?.list_price_vnd ?? 0)))),
        sale_price_vnd: BigInt(Math.max(0, Math.round(toNumber(payload?.sale_price_vnd ?? payload?.list_price_vnd ?? 0)))),
        status: payload?.status || "draft",
      },
    });
  }

  async updateEdition(bookId: string, editionId: string, body: unknown) {
    const book = await prisma.book.findUnique({ where: { id: bookId }, include: { editions: true } });
    if (!book) {
      throw new NotFoundException({ code: "BOOK_NOT_FOUND", message: "Sách không tồn tại." });
    }

    const edition = book.editions.find((item) => item.id === editionId);
    if (!edition) {
      throw new NotFoundException({ code: "EDITION_NOT_FOUND", message: "Phiên bản sách không tồn tại." });
    }

    const payload = (body ?? {}) as BookPayload["edition"];

    return prisma.bookEdition.update({
      where: { id: editionId },
      data: {
        sku: payload?.sku ?? edition.sku,
        isbn: payload?.isbn !== undefined ? payload.isbn?.trim() || null : edition.isbn,
        publisher_id: payload?.publisher_id !== undefined ? payload.publisher_id ?? null : edition.publisher_id,
        language: payload?.language ?? edition.language,
        format: payload?.format ?? edition.format,
        publication_date:
          payload?.publication_date !== undefined
            ? payload.publication_date
              ? new Date(payload.publication_date)
              : null
            : edition.publication_date,
        page_count: payload?.page_count ?? edition.page_count,
        list_price_vnd: BigInt(Math.max(0, Math.round(toNumber(payload?.list_price_vnd ?? edition.list_price_vnd)))),
        sale_price_vnd: BigInt(Math.max(0, Math.round(toNumber(payload?.sale_price_vnd ?? edition.sale_price_vnd)))),
        status: payload?.status ?? edition.status,
      },
    });
  }
}
