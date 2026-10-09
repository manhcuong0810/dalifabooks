/**
 * Validation helpers dùng chung — không phụ thuộc framework.
 * Backend dùng Zod cho full validation; đây là helpers nhanh cho client.
 */

/** Chuẩn hóa email: trim + lowercase */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Chuẩn hóa số điện thoại Việt Nam về định dạng quốc tế +84
 * Theo đặc tả CHECKOUT-01: chuẩn hóa về định dạng quốc tế và kiểm tra số VN hợp lệ
 */
export function normalizeVietnamesePhone(phone: string): string | null {
  const cleaned = phone.replace(/[\s\-().]/g, "");
  // 0xxxxxxxxx → +84xxxxxxxxx
  if (/^0[3-9]\d{8}$/.test(cleaned)) {
    return "+84" + cleaned.slice(1);
  }
  // +84xxxxxxxxx
  if (/^\+84[3-9]\d{8}$/.test(cleaned)) {
    return cleaned;
  }
  return null; // không hợp lệ
}

/** Kiểm tra ISBN-10 hoặc ISBN-13 */
export function isValidIsbn(isbn: string): boolean {
  const cleaned = isbn.replace(/[\s\-]/g, "");
  if (cleaned.length === 10) {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      const d = parseInt(cleaned[i]);
      if (isNaN(d)) return false;
      sum += d * (10 - i);
    }
    const last = cleaned[9] === "X" ? 10 : parseInt(cleaned[9]);
    if (isNaN(last)) return false;
    return (sum + last) % 11 === 0;
  }
  if (cleaned.length === 13) {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const d = parseInt(cleaned[i]);
      if (isNaN(d)) return false;
      sum += d * (i % 2 === 0 ? 1 : 3);
    }
    const check = (10 - (sum % 10)) % 10;
    return check === parseInt(cleaned[12]);
  }
  return false;
}

/** Chuẩn hóa slug: lowercase, chỉ chữ thường và dấu gạch nối */
export function normalizeSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Chuẩn hóa coupon code: uppercase ASCII */
export function normalizeCouponCode(code: string): string {
  return code.trim().toUpperCase();
}

/** Kiểm tra URL thuộc allowlist cho banner/carrier */
export function isSafeUrl(url: string, allowedHosts?: string[]): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    if (!allowedHosts || allowedHosts.length === 0) return true;
    return allowedHosts.some(
      (h) => parsed.hostname === h || parsed.hostname.endsWith("." + h)
    );
  } catch {
    return false;
  }
}
