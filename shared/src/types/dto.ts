/**
 * DTOs (Data Transfer Objects) — các type dùng cho request/response cụ thể.
 * Tách biệt với Prisma model để không lộ cấu trúc DB và giảm dependency.
 */

import type { VndAmount, IsoDateTime } from "./api";

// ── Book DTO ──────────────────────────────────────────────────────

export type BookListItemDto = {
  id: string;
  title: string;
  slug: string;
  authors: { id: string; name: string }[];
  price_from_vnd: VndAmount;
  sale_price_from_vnd?: VndAmount;
  cover_url?: string;
  status: "draft" | "published" | "archived";
};

export type BookDetailDto = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  authors: { id: string; name: string; slug: string }[];
  categories: { id: string; name: string; slug: string }[];
  publisher?: { id: string; name: string };
  editions: BookEditionDto[];
  images: { id: string; url: string; alt?: string }[];
  seo_title?: string;
  seo_description?: string;
};

export type BookEditionDto = {
  id: string;
  sku: string;
  isbn?: string;
  format: "paperback" | "hardcover";
  language: string;
  publication_date?: string;
  page_count?: number;
  list_price_vnd: VndAmount;
  sale_price_vnd: VndAmount;
  status: "draft" | "active" | "archived";
  available_quantity: number; // có thể bán = on_hand - reserved
};

// ── Cart DTO ──────────────────────────────────────────────────────

export type CartDto = {
  id: string;
  items: CartItemDto[];
  subtotal_vnd: VndAmount; // dự kiến, chưa có ship/coupon
};

export type CartItemDto = {
  id: string;
  edition_id: string;
  sku: string;
  title: string;
  format: string;
  cover_url?: string;
  unit_price_vnd: VndAmount; // giá hiện tại
  quantity: number;
  line_total_vnd: VndAmount;
  warnings?: string[]; // hết hàng, ngừng bán, giá đổi
};

// ── Order DTO ─────────────────────────────────────────────────────

export type OrderSummaryDto = {
  id: string;
  order_number: string;
  created_at: IsoDateTime;
  order_status: "pending" | "confirmed" | "completed" | "cancelled";
  payment_status: "unpaid" | "paid" | "partially_refunded" | "refunded";
  fulfillment_status: "unfulfilled" | "processing" | "shipped" | "delivered" | "returned";
  total_vnd: VndAmount;
  item_preview: { cover_url?: string; title: string }[];
};

export type OrderDetailDto = {
  id: string;
  order_number: string;
  created_at: IsoDateTime;
  order_status: "pending" | "confirmed" | "completed" | "cancelled";
  payment_status: "unpaid" | "paid" | "partially_refunded" | "refunded";
  fulfillment_status: "unfulfilled" | "processing" | "shipped" | "delivered" | "returned";
  contact: { recipient: string; phone: string; email?: string };
  address: { line: string; province: string; district: string; ward: string };
  items: OrderItemDto[];
  subtotal_vnd: VndAmount;
  discount_vnd: VndAmount;
  shipping_vnd: VndAmount;
  total_vnd: VndAmount;
  coupon_code?: string;
  payment_method: "cod" | "bank_transfer";
  payment_instructions?: Record<string, unknown>;
  shipments: ShipmentDto[];
  timeline: OrderEventDto[];
};

export type OrderItemDto = {
  id: string;
  sku: string;
  title: string;
  format: string;
  cover_url?: string;
  unit_price_vnd: VndAmount;
  discount_vnd: VndAmount;
  quantity: number;
};

export type ShipmentDto = {
  id: string;
  carrier?: string;
  tracking_code?: string;
  tracking_url?: string;
  status: "draft" | "shipped" | "delivered" | "returned" | "cancelled";
  shipped_at?: IsoDateTime;
  delivered_at?: IsoDateTime;
};

export type OrderEventDto = {
  id: string;
  event_type: string;
  created_at: IsoDateTime;
  visibility: "internal" | "customer";
  message: string;
};

// TODO: thêm các DTO khác khi implement từng module
