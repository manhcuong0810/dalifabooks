import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { prisma } from "@dalifabooks/db";

type PublisherMetadata = {
  short_name?: string | null;
  code?: string | null;
  rep_name?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  region?: string | null;
  logo_url?: string | null;
  description?: string | null;
  status?: "active" | "archived";
};

type PublisherPayload = {
  name?: string;
  slug?: string;
  description?: string | null;
  status?: "active" | "archived";
  short_name?: string | null;
  code?: string | null;
  rep_name?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  region?: string | null;
  logo_url?: string | null;
};

const normalizeSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "publisher";

const parseDescription = (description?: string | null): PublisherMetadata => {
  if (!description) return {};

  try {
    const parsed = JSON.parse(description);
    if (parsed && typeof parsed === "object") {
      return parsed as PublisherMetadata;
    }
  } catch {
    return { description };
  }

  return {};
};

const serializeDescription = (payload: PublisherPayload) =>
  JSON.stringify({
    short_name: payload.short_name ?? "",
    code: payload.code ?? "",
    rep_name: payload.rep_name ?? "",
    email: payload.email ?? "",
    phone: payload.phone ?? "",
    address: payload.address ?? "",
    region: payload.region ?? "",
    logo_url: payload.logo_url ?? "",
    description: payload.description ?? "",
    status: payload.status ?? "active",
  });

const mapPublisher = (row: any) => {
  const metadata = parseDescription(row.description);

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    status: row.status,
    short_name: metadata.short_name ?? "",
    code: metadata.code ?? "",
    rep_name: metadata.rep_name ?? "",
    email: metadata.email ?? "",
    phone: metadata.phone ?? "",
    address: metadata.address ?? "",
    region: metadata.region ?? "",
    logo_url: metadata.logo_url ?? "",
    description: metadata.description ?? "",
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
};

@Injectable()
export class PublishersService {
  async listPublic() {
    const rows = await prisma.publisher.findMany({
      where: { status: "active" },
      orderBy: [{ name: "asc" }],
    });

    return rows.map(mapPublisher);
  }

  async adminList() {
    const rows = await prisma.publisher.findMany({
      orderBy: [{ name: "asc" }],
    });

    return rows.map(mapPublisher);
  }

  private async generateUniqueSlug(base: string, excludeId?: string) {
    const initial = normalizeSlug(base);
    let slug = initial;
    let index = 1;

    while (true) {
      const existing = await prisma.publisher.findFirst({
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
    const payload = (body ?? {}) as PublisherPayload;
    const name = payload.name?.trim();

    if (!name) {
      throw new BadRequestException({
        code: "INVALID_INPUT",
        message: "Tên nhà xuất bản là bắt buộc.",
      });
    }

    const slug = await this.generateUniqueSlug(payload.slug || name);
    const description = serializeDescription({
      ...payload,
      status: payload.status ?? "active",
    });

    return prisma.publisher.create({
      data: {
        name,
        slug,
        description,
        status: payload.status === "archived" ? "archived" : "active",
      },
    });
  }

  async update(id: string, body: unknown) {
    const existing = await prisma.publisher.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException({
        code: "PUBLISHER_NOT_FOUND",
        message: "Nhà xuất bản không tồn tại.",
      });
    }

    const payload = (body ?? {}) as PublisherPayload;
    const name = payload.name?.trim();
    if (name !== undefined && !name) {
      throw new BadRequestException({
        code: "INVALID_INPUT",
        message: "Tên nhà xuất bản không được để trống.",
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
      status: payload.status ?? (existing.status === "archived" ? "archived" : "active"),
    });

    return prisma.publisher.update({
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
    const existing = await prisma.publisher.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException({
        code: "PUBLISHER_NOT_FOUND",
        message: "Nhà xuất bản không tồn tại.",
      });
    }

    await prisma.publisher.delete({ where: { id } });
    return { id };
  }
}
