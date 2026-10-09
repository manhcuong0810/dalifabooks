/**
 * @dalifabooks/db — re-export PrismaClient và types
 * Import từ package này thay vì dùng @prisma/client trực tiếp
 * để dễ mock trong test và quản lý connection tập trung.
 */

export { PrismaClient } from "@prisma/client";
export type {
  // Identity
  User,
  Credential,
  Session,
  AuthToken,
  AuthChallenge,
  MfaCredential,
  MfaRecoveryCode,
  Role,
  Permission,
  UserRole,
  RolePermission,
  StaffInvitation,
  InvitationRole,
  UserConsent,
  Address,

  // Catalog
  Book,
  BookEdition,
  Author,
  Publisher,
  Category,
  BookAuthor,
  BookCategory,
  MediaAsset,
  BookImage,
  BookCollection,
  CollectionBook,
  Post,
  PostRevision,
  ContentPage,
  PageRevision,
  Banner,
  SiteSetting,
  ShippingRule,

  // Cart & Quote
  Cart,
  CartItem,
  CheckoutQuote,

  // Inventory
  Warehouse,
  InventoryBalance,
  InventoryReservation,
  StockMovement,

  // Orders & Shipping
  Order,
  OrderItem,
  OrderEvent,
  OrderNote,
  OrderAccessToken,
  GuestAccessChallenge,
  Shipment,
  ShipmentItem,
  ShipmentEvent,

  // Payment & Coupon
  PaymentAttempt,
  PaymentReceipt,
  PaymentReviewRequest,
  Refund,
  WebhookEvent,
  Coupon,
  CouponCategory,
  CouponEdition,
  CouponReservation,
  CouponRedemption,

  // Infrastructure
  IdempotencyKey,
  OutboxEvent,
  JobAttempt,
  AuditLog,
} from "@prisma/client";

export {
  // Enums
  UserStatus,
  SessionAudience,
  AuthTokenPurpose,
  BookStatus,
  EditionFormat,
  EditionStatus,
  MetaStatus,
  AssetVisibility,
  AssetStatus,
  PostStatus,
  CartStatus,
  ReservationStatus,
  OrderStatus,
  PaymentStatus,
  FulfillmentStatus,
  PaymentMethod,
  ShipmentStatus,
  ShipmentSource,
  PaymentProvider,
  PaymentAttemptStatus,
  ReviewRequestStatus,
  RefundStatus,
  CouponType,
  CouponHoldStatus,
  RedemptionStatus,
  IdempotencyStatus,
  OutboxStatus,
  EventVisibility,
  WebhookEventStatus,
} from "@prisma/client";

import { PrismaClient } from "@prisma/client";

// Singleton pattern — dùng trong server-side (NestJS / worker)
// Next.js dev có hot reload nên cần globalThis để không tạo nhiều connections
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
