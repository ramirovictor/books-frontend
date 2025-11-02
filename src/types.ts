export type BookStatus = "AVAILABLE" | "SOLD_OUT";

export interface Book {
  id?: number;
  title: string;
  author: string;
  price: number;
  publishedAt?: string;
  status?: BookStatus;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  number: number;
  size: number;
}
