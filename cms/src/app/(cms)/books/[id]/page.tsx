// ADM-BOOK-02 — Sửa sách
// Route CMS: /books/[id]
export default function EditBookPage({ params }: { params: { id: string } }) {
  return (
    <h1 className="text-xl font-semibold">
      Sửa sách: {params.id} (ADM-BOOK-02)
    </h1>
  );
}
