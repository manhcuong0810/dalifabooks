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
  const warehouse = await prisma.warehouse.upsert({
    where: { code: "HN-001" },
    update: {},
    create: {
      id: randomUUID(),
      code: "HN-001",
      name: "Kho Hà Nội",
      active: true,
    },
  });
  console.log("Warehouse:", warehouse.code);

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
    const parent = await prisma.category.upsert({
      where: { slug: root.slug },
      update: {
        name: root.name,
        description: root.description,
        active: true,
        position: 0,
      },
      create: {
        id: randomUUID(),
        name: root.name,
        slug: root.slug,
        description: root.description,
        active: true,
        position: 0,
      },
    });

    for (const child of root.children ?? []) {
      await prisma.category.upsert({
        where: { slug: child.slug },
        update: {
          name: child.name,
          description: child.description,
          active: true,
          parent_id: parent.id,
          position: 0,
        },
        create: {
          id: randomUUID(),
          parent_id: parent.id,
          name: child.name,
          slug: child.slug,
          description: child.description,
          active: true,
          position: 0,
        },
      });
    }
  }

  console.log("Sample categories seeded:", categoryTree.length, "roots");
  console.log("Default admin user seeded:", adminEmail);
  console.log("Default admin password:", adminPassword);
  console.log("Seed complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
