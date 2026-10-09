// ADM-ORDER-02 — Chi tiết xử lý đơn
export default function OrderDetailPage({ params }: { params: { id: string } }) {
  return (
    <h1 className="text-xl font-semibold">
      Chi tiết đơn: {params.id} (ADM-ORDER-02)
    </h1>
  );
}
