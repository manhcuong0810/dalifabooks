import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { prisma } from "@dalifabooks/db";

type AuthorRole = "author" | "translator" | "editor" | "reviewer" | "co-author";

type AuthorMetadata = {
  role?: AuthorRole | string;
  country?: string | null;
  years?: string | null;
  pen_name?: string | null;
  biography?: string | null;
  featured_title?: string | null;
  featured_subtitle?: string | null;
  avatar_url?: string | null;
  is_verified?: boolean;
  position?: number;
};

type AuthorPayload = {
  name?: string;
  slug?: string;
  description?: string | null;
  status?: "active" | "archived";
  role?: AuthorRole | string;
  country?: string | null;
  years?: string | null;
  pen_name?: string | null;
  biography?: string | null;
  featured_title?: string | null;
  featured_subtitle?: string | null;
  avatar_url?: string | null;
  is_verified?: boolean;
  position?: number;
};

const normalizeSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "author";

const parseDescription = (description?: string | null): AuthorMetadata => {
  if (!description) return {};

  try {
    const parsed = JSON.parse(description);
    if (parsed && typeof parsed === "object") {
      return parsed as AuthorMetadata;
    }
  } catch {
    return { biography: description };
  }

  return {};
};

const serializeDescription = (payload: AuthorPayload) =>
  JSON.stringify({
    role: payload.role ?? "author",
    country: payload.country ?? "",
    years: payload.years ?? "",
    pen_name: payload.pen_name ?? "",
    biography: payload.biography ?? payload.description ?? "",
    featured_title: payload.featured_title ?? "",
    featured_subtitle: payload.featured_subtitle ?? "",
    avatar_url: payload.avatar_url ?? "",
    is_verified: Boolean(payload.is_verified),
    position: Number(payload.position ?? 0),
  });

const mapAuthor = (row: any) => {
  const metadata = parseDescription(row.description);

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    status: row.status,
    role: metadata.role ?? "author",
    country: metadata.country ?? "",
    years: metadata.years ?? "",
    pen_name: metadata.pen_name ?? row.name,
    biography: metadata.biography ?? "",
    featured_title: metadata.featured_title ?? "",
    featured_subtitle: metadata.featured_subtitle ?? "",
    avatar_url: metadata.avatar_url ?? "",
    is_verified: Boolean(metadata.is_verified),
    position: Number(metadata.position ?? 0),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
};

@Injectable()
export class AuthorsService {
  async listPublic() {
    const rows = await prisma.author.findMany({
      where: { status: "active" },
      orderBy: [{ name: "asc" }],
    });

    return rows.map(mapAuthor);
  }

  async adminList() {
    const rows = await prisma.author.findMany({
      orderBy: [{ name: "asc" }],
    });

    return rows.map(mapAuthor);
  }

  private async generateUniqueSlug(base: string, excludeId?: string) {
    const initial = normalizeSlug(base);
    let slug = initial;
    let index = 1;

    while (true) {
      const existing = await prisma.author.findFirst({
        where: {
          slug,
          ...(excludeId ? { id: { not: excludeId } } : {}),
        },
      });

      if (!existing) {
        return slug;
      }

      slug = `${initial}-${index}`;
      index += 1;
    }
  }

  async create(body: unknown) {
    const payload = (body ?? {}) as AuthorPayload;
    const name = payload.name?.trim();

    if (!name) {
      throw new BadRequestException({
        code: "INVALID_INPUT",
        message: "Tên tác giả hoặc dịch giả là bắt buộc.",
      });
    }

    const slug = await this.generateUniqueSlug(payload.slug || name);
    const description = serializeDescription(payload);

    return prisma.author.create({
      data: {
        name,
        slug,
        description,
        status: payload.status === "archived" ? "archived" : "active",
      },
    });
  }

  async update(id: string, body: unknown) {
    const existing = await prisma.author.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException({
        code: "AUTHOR_NOT_FOUND",
        message: "Tác giả / dịch giả không tồn tại.",
      });
    }

    const payload = (body ?? {}) as AuthorPayload;
    const name = payload.name?.trim();
    if (name !== undefined && !name) {
      throw new BadRequestException({
        code: "INVALID_INPUT",
        message: "Tên tác giả / dịch giả không được để trống.",
      });
    }

    const nextName = name ?? existing.name;
    const nextSlug = payload.slug
      ? await this.generateUniqueSlug(payload.slug, id)
      : existing.slug;

    const mergedDescription = serializeDescription({
      ...parseDescription(existing.description),
      ...payload,
      name: nextName,
    });

    return prisma.author.update({
      where: { id },
      data: {
        name: nextName,
        slug: nextSlug,
        description: mergedDescription,
        status: payload.status === "archived" ? "archived" : existing.status,
      },
    });
  }

  async remove(id: string) {
    const existing = await prisma.author.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException({
        code: "AUTHOR_NOT_FOUND",
        message: "Tác giả / dịch giả không tồn tại.",
      });
    }

    await prisma.author.delete({ where: { id } });
    return { id };
  }
}
