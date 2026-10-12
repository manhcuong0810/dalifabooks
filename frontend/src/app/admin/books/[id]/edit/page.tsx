"use client";

import { BookEditor } from "@/app/admin/books/BookEditor";
import { useParams } from "next/navigation";

export default function AdminBookEditPage() {
  const params = useParams<{ id: string }>();
  return <BookEditor mode="edit" bookId={params?.id} />;
}
