/**
 * Danh sách permission codes — dùng chung giữa backend, CMS UI và seed.
 * Theo đặc tả section 16 bảng quyền.
 */
export const PERMISSIONS = {
  // Catalog
  CATALOG_READ: "catalog.read",
  CATALOG_WRITE: "catalog.write",
  CATALOG_PUBLISH: "catalog.publish",

  // Media
  MEDIA_READ: "media.read",
  MEDIA_UPLOAD: "media.upload",
  MEDIA_DELETE: "media.delete",

  // Inventory
  INVENTORY_READ: "inventory.read",
  INVENTORY_ADJUST: "inventory.adjust",

  // Orders
  ORDERS_READ: "orders.read",
  ORDERS_CONFIRM: "orders.confirm",
  ORDERS_CANCEL: "orders.cancel",
  ORDERS_EXPORT: "orders.export",

  // Shipping
  SHIPPING_CREATE: "shipping.create",
  SHIPPING_DISPATCH: "shipping.dispatch",
  SHIPPING_UPDATE: "shipping.update",

  // Finance
  PAYMENTS_READ: "payments.read",
  PAYMENTS_RECONCILE: "payments.reconcile",
  PAYMENTS_REFUND: "payments.refund",

  // Content
  CONTENT_READ: "content.read",
  CONTENT_WRITE: "content.write",
  CONTENT_PUBLISH: "content.publish",

  // Promotions
  COUPONS_READ: "coupons.read",
  COUPONS_WRITE: "coupons.write",

  // Administration
  STAFF_MANAGE: "staff.manage",
  ROLES_MANAGE: "roles.manage",
  SETTINGS_MANAGE: "settings.manage",
  AUDIT_READ: "audit.read",
} as const;

export type PermissionCode = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ALL_PERMISSION_CODES = Object.values(PERMISSIONS) as PermissionCode[];
