/**
 * @dalifabooks/db — re-export PrismaClient và types
 * Import từ package này thay vì dùng @prisma/client trực tiếp
 * để dễ mock trong test và quản lý connection tập trung.
 */
export { PrismaClient } from "@prisma/client";
export type { User, Credential, Session, AuthToken, AuthChallenge, MfaCredential, MfaRecoveryCode, Role, Permission, UserRole, RolePermission, StaffInvitation, InvitationRole, UserConsent, Address, Book, BookEdition, Author, Publisher, Category, BookAuthor, BookCategory, MediaAsset, BookImage, BookCollection, CollectionBook, Post, PostRevision, ContentPage, PageRevision, Banner, SiteSetting, ShippingRule, Cart, CartItem, CheckoutQuote, Warehouse, InventoryBalance, InventoryReservation, StockMovement, Order, OrderItem, OrderEvent, OrderNote, OrderAccessToken, GuestAccessChallenge, Shipment, ShipmentItem, ShipmentEvent, PaymentAttempt, PaymentReceipt, PaymentReviewRequest, Refund, WebhookEvent, Coupon, CouponCategory, CouponEdition, CouponReservation, CouponRedemption, IdempotencyKey, OutboxEvent, JobAttempt, AuditLog, } from "@prisma/client";
export { UserStatus, SessionAudience, AuthTokenPurpose, BookStatus, EditionFormat, EditionStatus, MetaStatus, AssetVisibility, AssetStatus, PostStatus, CartStatus, ReservationStatus, OrderStatus, PaymentStatus, FulfillmentStatus, PaymentMethod, ShipmentStatus, ShipmentSource, PaymentProvider, PaymentAttemptStatus, ReviewRequestStatus, RefundStatus, CouponType, CouponHoldStatus, RedemptionStatus, IdempotencyStatus, OutboxStatus, EventVisibility, WebhookEventStatus, } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
export declare const prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
//# sourceMappingURL=index.d.ts.map