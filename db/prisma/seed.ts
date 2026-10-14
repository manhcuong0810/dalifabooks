/**
 * Seed dữ liệu mẫu cho development
 * Chạy: yarn workspace @dalifabooks/db seed
 *
 * Lưu ý: dữ liệu này chỉ dùng cho môi trường dev/staging.
 * Không chạy seed trên production.
 */

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ── Kho mặc định ────────────────────────────────────────────────
  const defaultWarehouses = [
    {
      code: "HN-001",
      name: "Kho Hà Nội",
      city: "Hà Nội",
      address: "Long Biên, Hà Nội",
      manager: "Nguyễn Minh Hạnh",
      phone: "0908 111 222",
      capacity: 20000,
      status: "active" as const,
    },
    {
      code: "HCM-001",
      name: "Kho TP.HCM",
      city: "TP. Hồ Chí Minh",
      address: "Quận 7, TP. Hồ Chí Minh",
      manager: "Phạm Quốc Anh",
      phone: "0908 333 444",
      capacity: 18000,
      status: "active" as const,
    },
    {
      code: "DN-001",
      name: "Kho Đà Nẵng",
      city: "Đà Nẵng",
      address: "Hải Châu, Đà Nẵng",
      manager: "Lê Thị Tuyết",
      phone: "0908 555 666",
      capacity: 8000,
      status: "maintenance" as const,
    },
  ];

  for (const warehouseItem of defaultWarehouses) {
    await prisma.warehouse.upsert({
      where: { code: warehouseItem.code },
      update: {
        name: warehouseItem.name,
        city: warehouseItem.city,
        address: warehouseItem.address,
        manager: warehouseItem.manager,
        phone: warehouseItem.phone,
        capacity: warehouseItem.capacity,
        status: warehouseItem.status,
        active: true,
      },
      create: {
        id: randomUUID(),
        code: warehouseItem.code,
        name: warehouseItem.name,
        city: warehouseItem.city,
        address: warehouseItem.address,
        manager: warehouseItem.manager,
        phone: warehouseItem.phone,
        capacity: warehouseItem.capacity,
        status: warehouseItem.status,
        active: true,
      },
    });
  }

  const warehouseList = await prisma.warehouse.findMany({ orderBy: { name: "asc" } });
  console.log("Warehouses:", warehouseList.map((w) => w.code).join(", "));

  // ── Permissions cơ bản ──────────────────────────────────────────
  const permissionCodes = [
    "catalog.read", "catalog.write", "catalog.publish",
    "media.read", "media.upload", "media.delete",
    "inventory.read", "inventory.adjust",
    "orders.read", "orders.confirm", "orders.cancel", "orders.export",
    "shipping.create", "shipping.dispatch", "shipping.update",
    "payments.read", "payments.reconcile", "payments.refund",
    "content.read", "content.write", "content.publish",
    "coupons.read", "coupons.write",
    "staff.manage", "roles.manage", "settings.manage", "audit.read",
  ];

  for (const code of permissionCodes) {
    await prisma.permission.upsert({
      where: { code },
      update: {},
      create: { id: randomUUID(), code, description: code },
    });
  }
  console.log("Permissions seeded:", permissionCodes.length);

  // ── Role Owner (toàn bộ quyền) ──────────────────────────────────
  const ownerRole = await prisma.role.upsert({
    where: { code: "owner" },
    update: {},
    create: { id: randomUUID(), code: "owner", name: "Owner", description: "Toàn quyền quản trị" },
  });

  const allPermissions = await prisma.permission.findMany();
  for (const perm of allPermissions) {
    await prisma.rolePermission.upsert({
      where: { role_id_permission_id: { role_id: ownerRole.id, permission_id: perm.id } },
      update: {},
      create: { role_id: ownerRole.id, permission_id: perm.id },
    });
  }
  console.log("Owner role seeded with all permissions");

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@dalifabooks.local";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin@123";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      full_name: "Super Admin",
      status: "active",
      email_verified_at: new Date(),
    },
    create: {
      id: randomUUID(),
      email: adminEmail,
      full_name: "Super Admin",
      status: "active",
      email_verified_at: new Date(),
      credential: {
        create: {
          password_hash: passwordHash,
        },
      },
    },
  });

  await prisma.userRole.upsert({
    where: {
      user_id_role_id: {
        user_id: adminUser.id,
        role_id: ownerRole.id,
      },
    },
    update: {},
    create: {
      user_id: adminUser.id,
      role_id: ownerRole.id,
    },
  });

  const categoryTree = [
    {
      name: "Triết học & Tư tưởng",
      slug: "triet-hoc-tu-tuong",
      description: "Các tác phẩm triết học, tư tưởng và lý luận văn hóa.",
      children: [
        { name: "Triết học phương Đông", slug: "triet-hoc-phuong-dong", description: "Khảo sát tư tưởng phương Đông." },
        { name: "Triết học phương Tây", slug: "triet-hoc-phuong-tay", description: "Các trường phái và tác gia triết học phương Tây." },
      ],
    },
    {
      name: "Kinh tế & Quản trị",
      slug: "kinh-te-quan-tri",
      description: "Sách kinh doanh, quản trị và phát triển doanh nghiệp.",
      children: [
        { name: "Marketing & Bán hàng", slug: "marketing-ban-hang", description: "Chiến lược và kỹ thuật bán hàng." },
        { name: "Khởi nghiệp", slug: "khoi-nghiep", description: "Khởi nghiệp, xây dựng mô hình và tài chính." },
      ],
    },
    {
      name: "Văn học",
      slug: "van-hoc",
      description: "Tiểu thuyết, thơ ca và văn học đương đại.",
      children: [
        { name: "Văn học Việt Nam", slug: "van-hoc-viet-nam", description: "Tác phẩm văn học của Việt Nam." },
        { name: "Văn học nước ngoài", slug: "van-hoc-nuoc-ngoai", description: "Tác phẩm văn học quốc tế." },
      ],
    },
    {
      name: "Khoa học & Công nghệ",
      slug: "khoa-hoc-cong-nghe",
      description: "Tri thức khoa học, công nghệ và đổi mới sáng tạo.",
      children: [
        { name: "Công nghệ thông tin", slug: "cong-nghe-thong-tin", description: "CNTT, lập trình và hệ thống." },
        { name: "Khoa học tự nhiên", slug: "khoa-hoc-tu-nhien", description: "Vật lý, hóa học và thiên nhiên." },
      ],
    },
  ];

  for (const root of categoryTree) {
    let parent = await prisma.category.findFirst({
      where: {
        parent_id: null,
        slug: root.slug,
      },
    });

    if (!parent) {
      parent = await prisma.category.create({
        data: {
          id: randomUUID(),
          name: root.name,
          slug: root.slug,
          description: root.description,
          active: true,
          position: 0,
        },
      });
    } else {
      parent = await prisma.category.update({
        where: { id: parent.id },
        data: {
          name: root.name,
          description: root.description,
          active: true,
          position: 0,
        },
      });
    }

    for (const child of root.children ?? []) {
      let existingChild = await prisma.category.findFirst({
        where: {
          parent_id: parent.id,
          slug: child.slug,
        },
      });

      if (!existingChild) {
        await prisma.category.create({
          data: {
            id: randomUUID(),
            parent_id: parent.id,
            name: child.name,
            slug: child.slug,
            description: child.description,
            active: true,
            position: 0,
          },
        });
      } else {
        await prisma.category.update({
          where: { id: existingChild.id },
          data: {
            name: child.name,
            description: child.description,
            parent_id: parent.id,
            active: true,
            position: 0,
          },
        });
      }
    }
  }

  const categoryLookup = await prisma.category.findMany({
    select: { id: true, slug: true },
  });
  const categorySlugMap = Object.fromEntries(categoryLookup.map((category) => [category.slug, category.id]));

  const categoryRules = [
    {
      test: /javascript|react|python|ai|machine learning|data|programming|code|software|khoa học dữ liệu|công nghệ/i,
      slugs: ["cong-nghe-thong-tin", "khoa-hoc-tu-nhien"],
    },
    {
      test: /marketing|bán hàng|startup|khởi nghiệp|tài chính|thành công|đắc nhân tâm|kinh doanh/i,
      slugs: ["marketing-ban-hang", "khoi-nghiep"],
    },
    {
      test: /triết|tư duy|tư tưởng|lão tử|khổng tử|aristote|đạo lý|tự do|phương đông|phương tây/i,
      slugs: ["triet-hoc-phuong-dong", "triet-hoc-phuong-tay"],
    },
    {
      test: /văn học|harry potter|mắt biếc|dế mèn|tuổi thơ|nỗi buồn|mặt trời|hoa vàng|thơ|hoài niệm|bạn thân/i,
      slugs: ["van-hoc-viet-nam", "van-hoc-nuoc-ngoai"],
    },
    {
      test: /lịch sử|văn minh|xã hội|tôn giáo|nhân văn|hội|thế giới/i,
      slugs: ["khoa-hoc-xa-hoi-va-nhan-van"],
    },
  ];

  const books = await prisma.book.findMany({
    include: {
      editions: { select: { id: true, sku: true } },
      book_categories: { select: { category_id: true } },
    },
  });

  for (const book of books) {
    const chosenCategoryIds = new Set<string>();
    const title = book.title ?? "";

    for (const rule of categoryRules) {
      if (rule.test.test(title)) {
        for (const slug of rule.slugs) {
          const categoryId = categorySlugMap[slug];
          if (categoryId) chosenCategoryIds.add(categoryId);
        }
      }
    }

    if (chosenCategoryIds.size === 0) {
      const fallback = categorySlugMap["van-hoc-viet-nam"] ?? categorySlugMap["khoa-hoc-xa-hoi-va-nhan-van"] ?? Object.values(categorySlugMap)[0];
      if (fallback) chosenCategoryIds.add(fallback);
    }

    await prisma.bookCategory.deleteMany({ where: { book_id: book.id } });
    for (const categoryId of chosenCategoryIds) {
      await prisma.bookCategory.upsert({
        where: { book_id_category_id: { book_id: book.id, category_id: categoryId } },
        update: {},
        create: { book_id: book.id, category_id: categoryId, is_primary: false },
      });
    }

    for (const edition of book.editions) {
      const hash = [...book.title].reduce((sum, char) => sum + char.charCodeAt(0), 0) + edition.sku.length;
      let baseOnHand = ((hash % 24) + 4) * (hash % 2 === 0 ? 1 : 2);
      if (hash % 11 === 0) baseOnHand = 0;
      if (hash % 9 === 0) baseOnHand = 7;
      if (hash % 13 === 0) baseOnHand = 12;
      if (hash % 17 === 0) baseOnHand = 18;

      for (const warehouse of warehouseList) {
        const onHand = Math.max(0, baseOnHand + (warehouse.code === "HCM-001" ? 3 : warehouse.code === "DN-001" ? -2 : 0));
        const reserved = Math.min(6, Math.max(0, Math.floor(onHand * 0.2)));
        const threshold = onHand <= 5 ? 5 : onHand <= 12 ? 8 : 10;

        await prisma.inventoryBalance.upsert({
          where: {
            edition_id_warehouse_id: {
              edition_id: edition.id,
              warehouse_id: warehouse.id,
            },
          },
          update: {
            on_hand: onHand,
            reserved,
            low_stock_threshold: threshold,
          },
          create: {
            edition_id: edition.id,
            warehouse_id: warehouse.id,
            on_hand: onHand,
            reserved,
            low_stock_threshold: threshold,
          },
        });
      }
    }
  }

  console.log("Sample categories seeded:", categoryTree.length, "roots");
  console.log("Book category assignments synced:", books.length);
  console.log("Inventory balances synced for warehouses:", warehouseList.map((w) => w.code).join(", "));
  console.log("Default admin user seeded:", adminEmail);
  console.log("Default admin password:", adminPassword);
  console.log("Seed complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
