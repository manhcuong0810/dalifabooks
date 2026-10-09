// ADM-PAY-02 — Chi tiết thanh toán và hoàn tiền
export default function PaymentDetailPage({ params }: { params: { id: string } }) {
  return (
    <h1 className="text-xl font-semibold">
      Chi tiết thanh toán: {params.id} (ADM-PAY-02)
    </h1>
  );
}
