/**
 * Seed dữ liệu mẫu cho development
 * Chạy: yarn workspace @dalifabooks/db seed
 *
 * Lưu ý: dữ liệu này chỉ dùng cho môi trường dev/staging.
 * Không chạy seed trên production.
 */

import { PrismaClient } from "@prisma/client";
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

  console.log("Seed complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
