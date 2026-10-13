import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { prisma } from "@dalifabooks/db";

type CategoryInput = {
  name?: string;
  slug?: string;
  description?: string | null;
  parent_id?: string | null;
  position?: number;
  active?: boolean;
};

const normalizeSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "category";

const normalizeNameKey = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/\s+/g, " ")
    .replace(/[^a-z0-9 ]+/g, "")
    .trim();

export type CategoryTreeRecord = {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  description?: string | null;
  position: number;
  active: boolean;
  children: CategoryTreeRecord[];
  _count?: { book_categories: number };
};

const buildTree = (rows: any[], parentId: string | null = null): CategoryTreeRecord[] =>
  rows
    .filter((row) => row.parent_id === parentId)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0) || a.name.localeCompare(b.name))
    .map((row) => ({
      ...row,
      children: buildTree(rows, row.id),
    }));

@Injectable()
export class CategoriesService {
  async listPublic() {
    const rows = await prisma.category.findMany({
      where: { active: true },
      orderBy: [{ position: "asc" }, { name: "asc" }],
      include: {
        _count: { select: { book_categories: true } },
      },
    });

    return buildTree(rows);
  }

  async adminList() {
    const rows = await prisma.category.findMany({
      orderBy: [{ position: "asc" }, { name: "asc" }],
      include: {
        _count: { select: { book_categories: true } },
      },
    });

    return buildTree(rows);
  }

  private async ensureParentValid(parentId: string | null) {
    if (!parentId) return null;

    const parent = await prisma.category.findUnique({ where: { id: parentId } });
    if (!parent) {
      throw new BadRequestException({
        code: "INVALID_PARENT",
        message: "Danh mục cha không tồn tại.",
      });
    }

    return parentId;
  }

  private async generateUniqueSlug(base: string, parentId: string | null = null, excludeId?: string) {
    const initial = normalizeSlug(base);
    let slug = initial;
    let index = 1;

    while (true) {
      const category = await prisma.category.findFirst({
        where: {
          parent_id: parentId,
          slug,
          ...(excludeId ? { id: { not: excludeId } } : {}),
        },
      });

      if (!category) {
        return slug;
      }

      slug = `${initial}-${index}`;
      index += 1;
    }
  }

  private async ensureUniqueName(name: string, parentId: string | null, excludeId?: string) {
    const normalized = normalizeNameKey(name);
    if (!normalized) {
      throw new BadRequestException({
        code: "INVALID_INPUT",
        message: "Tên danh mục không được để trống.",
      });
    }

    const matching = await prisma.category.findMany({
      where: {
        parent_id: parentId,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
      select: { id: true, name: true },
    });

    const hasDuplicate = matching.some((item) => normalizeNameKey(item.name) === normalized);
    if (hasDuplicate) {
      throw new BadRequestException({
        code: "DUPLICATE_CATEGORY_NAME",
        message: "Tên danh mục đã tồn tại trong cùng cấp cha.",
      });
    }
  }

  async create(body: unknown) {
    const payload = (body ?? {}) as CategoryInput;
    const name = payload.name?.trim();

    if (!name) {
      throw new BadRequestException({
        code: "INVALID_INPUT",
        message: "Tên danh mục là bắt buộc.",
      });
    }

    const parentId = await this.ensureParentValid(payload.parent_id ?? null);
    await this.ensureUniqueName(name, parentId);
    const slug = await this.generateUniqueSlug(payload.slug || name, parentId);
    const position = Number(payload.position ?? 0);

    return prisma.category.create({
      data: {
        name,
        slug,
        description: payload.description?.trim() || null,
        parent_id: parentId,
        position: Number.isFinite(position) ? position : 0,
        active: payload.active ?? true,
      },
    });
  }

  async update(id: string, body: unknown) {
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException({
        code: "CATEGORY_NOT_FOUND",
        message: "Danh mục không tồn tại.",
      });
    }

    const payload = (body ?? {}) as CategoryInput;
    const name = payload.name?.trim();

    if (name !== undefined && !name) {
      throw new BadRequestException({
        code: "INVALID_INPUT",
        message: "Tên danh mục không được để trống.",
      });
    }

    const parentId = await this.ensureParentValid(payload.parent_id ?? existing.parent_id ?? null);
    if (parentId === id) {
      throw new BadRequestException({
        code: "INVALID_PARENT",
        message: "Danh mục không thể là cha của chính nó.",
      });
    }

    const nextName = name ?? existing.name;
    await this.ensureUniqueName(nextName, parentId, id);
    const nextSlug = payload.slug
      ? await this.generateUniqueSlug(payload.slug, parentId, id)
      : await this.generateUniqueSlug(existing.slug, parentId, id);
    const nextDescription = payload.description !== undefined ? payload.description?.trim() || null : existing.description;

    return prisma.category.update({
      where: { id },
      data: {
        name: nextName,
        slug: nextSlug,
        description: nextDescription,
        parent_id: parentId,
        position: payload.position !== undefined ? Number(payload.position ?? 0) : existing.position,
        active: payload.active !== undefined ? Boolean(payload.active) : existing.active,
      },
    });
  }

  async remove(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        book_categories: true,
      },
    });

    if (!category) {
      throw new NotFoundException({
        code: "CATEGORY_NOT_FOUND",
        message: "Danh mục không tồn tại.",
      });
    }

    if (category.book_categories.length > 0) {
      throw new BadRequestException({
        code: "CATEGORY_IN_USE",
        message: "Không thể xóa danh mục đang được gắn vào sách.",
      });
    }

    const collectIds = async (categoryId: string): Promise<string[]> => {
      const children = await prisma.category.findMany({
        where: { parent_id: categoryId },
        select: { id: true },
      });

      const childIds = children.map((item) => item.id);
      const descendants = await Promise.all(childIds.map((childId) => collectIds(childId)));

      return [categoryId, ...descendants.flat()];
    };

    const ids = await collectIds(id);
    const related = await prisma.category.findMany({
      where: { id: { in: ids.slice(1) } },
      include: { book_categories: true },
    });

    if (related.some((item) => item.book_categories.length > 0)) {
      throw new BadRequestException({
        code: "CATEGORY_IN_USE",
        message: "Không thể xóa danh mục chứa danh mục con đang được sử dụng.",
      });
    }

    await prisma.category.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
