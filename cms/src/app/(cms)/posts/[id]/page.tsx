// ADM-CONTENT-02 — Sửa bài viết
export default function EditPostPage({ params }: { params: { id: string } }) {
  return (
    <h1 className="text-xl font-semibold">
      Sửa bài viết: {params.id} (ADM-CONTENT-02)
    </h1>
  );
}
