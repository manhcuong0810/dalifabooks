// ADM-COUPON-02 — Sửa mã giảm giá
export default function EditCouponPage({ params }: { params: { id: string } }) {
  return (
    <h1 className="text-xl font-semibold">
      Sửa mã giảm giá: {params.id} (ADM-COUPON-02)
    </h1>
  );
}
