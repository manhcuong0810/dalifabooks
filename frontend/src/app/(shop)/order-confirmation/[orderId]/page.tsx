// CHECKOUT-02 — Kết quả đặt hàng
// Route: /dat-hang/[orderId]
export default function OrderConfirmationPage({
  params,
}: {
  params: { orderId: string };
}) {
  return <main>Kết quả đặt hàng: {params.orderId} (CHECKOUT-02)</main>;
}
