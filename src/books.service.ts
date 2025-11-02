import { api } from "./api";
import type { Book, Page } from "./types";

export async function listBooks(q = "", page = 0, size = 10) {
  const res = await api.get<Page<Book>>(`/books`, { params: { q, page, size } });
  return res.data;
}
export async function createBook(payload: Book) {
  const res = await api.post<Book>(`/books`, payload);
  return res.data;
}
export async function updateBook(id: number, payload: Book) {
  const res = await api.put<Book>(`/books/${id}`, payload);
  return res.data;
}
export async function deleteBook(id: number) {
  await api.delete(`/books/${id}`);
}
