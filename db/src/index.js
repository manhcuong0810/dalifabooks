"use strict";
/**
 * @dalifabooks/db — re-export PrismaClient và types
 * Import từ package này thay vì dùng @prisma/client trực tiếp
 * để dễ mock trong test và quản lý connection tập trung.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.WebhookEventStatus = exports.EventVisibility = exports.OutboxStatus = exports.IdempotencyStatus = exports.RedemptionStatus = exports.CouponHoldStatus = exports.CouponType = exports.RefundStatus = exports.ReviewRequestStatus = exports.PaymentAttemptStatus = exports.PaymentProvider = exports.ShipmentSource = exports.ShipmentStatus = exports.PaymentMethod = exports.FulfillmentStatus = exports.PaymentStatus = exports.OrderStatus = exports.ReservationStatus = exports.CartStatus = exports.PostStatus = exports.AssetStatus = exports.AssetVisibility = exports.MetaStatus = exports.EditionStatus = exports.EditionFormat = exports.BookStatus = exports.AuthTokenPurpose = exports.SessionAudience = exports.UserStatus = exports.PrismaClient = void 0;
var client_1 = require("@prisma/client");
Object.defineProperty(exports, "PrismaClient", { enumerable: true, get: function () { return client_1.PrismaClient; } });
var client_2 = require("@prisma/client");
// Enums
Object.defineProperty(exports, "UserStatus", { enumerable: true, get: function () { return client_2.UserStatus; } });
Object.defineProperty(exports, "SessionAudience", { enumerable: true, get: function () { return client_2.SessionAudience; } });
Object.defineProperty(exports, "AuthTokenPurpose", { enumerable: true, get: function () { return client_2.AuthTokenPurpose; } });
Object.defineProperty(exports, "BookStatus", { enumerable: true, get: function () { return client_2.BookStatus; } });
Object.defineProperty(exports, "EditionFormat", { enumerable: true, get: function () { return client_2.EditionFormat; } });
Object.defineProperty(exports, "EditionStatus", { enumerable: true, get: function () { return client_2.EditionStatus; } });
Object.defineProperty(exports, "MetaStatus", { enumerable: true, get: function () { return client_2.MetaStatus; } });
Object.defineProperty(exports, "AssetVisibility", { enumerable: true, get: function () { return client_2.AssetVisibility; } });
Object.defineProperty(exports, "AssetStatus", { enumerable: true, get: function () { return client_2.AssetStatus; } });
Object.defineProperty(exports, "PostStatus", { enumerable: true, get: function () { return client_2.PostStatus; } });
Object.defineProperty(exports, "CartStatus", { enumerable: true, get: function () { return client_2.CartStatus; } });
Object.defineProperty(exports, "ReservationStatus", { enumerable: true, get: function () { return client_2.ReservationStatus; } });
Object.defineProperty(exports, "OrderStatus", { enumerable: true, get: function () { return client_2.OrderStatus; } });
Object.defineProperty(exports, "PaymentStatus", { enumerable: true, get: function () { return client_2.PaymentStatus; } });
Object.defineProperty(exports, "FulfillmentStatus", { enumerable: true, get: function () { return client_2.FulfillmentStatus; } });
Object.defineProperty(exports, "PaymentMethod", { enumerable: true, get: function () { return client_2.PaymentMethod; } });
Object.defineProperty(exports, "ShipmentStatus", { enumerable: true, get: function () { return client_2.ShipmentStatus; } });
Object.defineProperty(exports, "ShipmentSource", { enumerable: true, get: function () { return client_2.ShipmentSource; } });
Object.defineProperty(exports, "PaymentProvider", { enumerable: true, get: function () { return client_2.PaymentProvider; } });
Object.defineProperty(exports, "PaymentAttemptStatus", { enumerable: true, get: function () { return client_2.PaymentAttemptStatus; } });
Object.defineProperty(exports, "ReviewRequestStatus", { enumerable: true, get: function () { return client_2.ReviewRequestStatus; } });
Object.defineProperty(exports, "RefundStatus", { enumerable: true, get: function () { return client_2.RefundStatus; } });
Object.defineProperty(exports, "CouponType", { enumerable: true, get: function () { return client_2.CouponType; } });
Object.defineProperty(exports, "CouponHoldStatus", { enumerable: true, get: function () { return client_2.CouponHoldStatus; } });
Object.defineProperty(exports, "RedemptionStatus", { enumerable: true, get: function () { return client_2.RedemptionStatus; } });
Object.defineProperty(exports, "IdempotencyStatus", { enumerable: true, get: function () { return client_2.IdempotencyStatus; } });
Object.defineProperty(exports, "OutboxStatus", { enumerable: true, get: function () { return client_2.OutboxStatus; } });
Object.defineProperty(exports, "EventVisibility", { enumerable: true, get: function () { return client_2.EventVisibility; } });
Object.defineProperty(exports, "WebhookEventStatus", { enumerable: true, get: function () { return client_2.WebhookEventStatus; } });
const client_3 = require("@prisma/client");
// Singleton pattern — dùng trong server-side (NestJS / worker)
// Next.js dev có hot reload nên cần globalThis để không tạo nhiều connections
const globalForPrisma = globalThis;
exports.prisma = globalForPrisma.prisma ??
    new client_3.PrismaClient({
        log: process.env.NODE_ENV === "development"
            ? ["query", "warn", "error"]
            : ["warn", "error"],
    });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = exports.prisma;
}
//# sourceMappingURL=index.js.map