// ACCOUNT-03 — Chi tiết đơn hàng
// Route: /tai-khoan/don-hang/[id]
export default function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <main>Chi tiết đơn hàng: {params.id} (ACCOUNT-03)</main>;
}
