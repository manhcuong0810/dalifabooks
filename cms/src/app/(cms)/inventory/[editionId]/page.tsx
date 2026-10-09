// ADM-STOCK-02 — Lịch sử và điều chỉnh tồn kho
export default function InventoryDetailPage({
  params,
}: {
  params: { editionId: string };
}) {
  return (
    <h1 className="text-xl font-semibold">
      Lịch sử tồn kho: {params.editionId} (ADM-STOCK-02)
    </h1>
  );
}
